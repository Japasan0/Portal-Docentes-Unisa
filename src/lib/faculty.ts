import { queryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { demoFaculty } from './demo-faculty';

export type Faculty = {
  id: string; name: string; degree: string; area: string; department: string;
  bio: string; keywords: string[]; lattes_id: string | null; lattes_updated_at: string | null;
  is_demo?: boolean;
};
export const facultyOptions = queryOptions({
  queryKey: ['public-faculty'],
  queryFn: async (): Promise<Faculty[]> => {
    const { data, error } = await supabase.from('faculty').select('id,name,degree,area,department,bio,keywords,lattes_id,lattes_updated_at').order('name');
    if (error) throw new Error('Não foi possível carregar os docentes. Tente novamente.');
    return [...(data ?? []), ...demoFaculty];
  },
});
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
export function filterFaculty(rows: Faculty[], query: string, area: string, degree: string) {
  return rows.filter(row => (!area || row.area === area) && (!degree || row.degree === degree) && normalize([row.name, row.bio, row.department, ...row.keywords].join(' ')).includes(normalize(query.trim())));
}
export function lattesUrl(id: string | null) {
  return id && /^\d{16}$/.test(id) ? `https://lattes.cnpq.br/${id}` : 'https://buscatextual.cnpq.br/buscatextual/busca.do?metodo=apresentar';
}
export function parseLattesXml(source: string): Faculty {
  if (source.includes('<!DOCTYPE') || source.includes('<!ENTITY')) throw new Error('Este arquivo XML contém declarações não permitidas.');
  const doc = new DOMParser().parseFromString(source, 'application/xml');
  const root = doc.querySelector('CURRICULO-VITAE');
  const general = doc.querySelector('DADOS-GERAIS');
  const name = general?.getAttribute('NOME-COMPLETO');
  const id = root?.getAttribute('NUMERO-IDENTIFICADOR');
  if (doc.querySelector('parsererror') || !root || !name || !id || !/^\d{16}$/.test(id)) throw new Error('Selecione um currículo XML exportado pela Plataforma Lattes.');
  const degree = doc.querySelector('POS-DOUTORADO') ? 'Pós-doutor' : doc.querySelector('DOUTORADO') ? 'Doutor' : doc.querySelector('MESTRADO') ? 'Mestre' : doc.querySelector('GRADUACAO') ? 'Graduado' : 'Titulação a confirmar';
  const area = doc.querySelector('AREA-DE-ATUACAO')?.getAttribute('NOME-DA-GRANDE-AREA-DO-CONHECIMENTO') ?? 'Área a confirmar';
  return { id: 'xml-preview', name, degree, area, department: 'Currículo Lattes', bio: doc.querySelector('RESUMO-CV')?.getAttribute('TEXTO-RESUMO-CV-RH') ?? '', keywords: [], lattes_id: id, lattes_updated_at: null };
}