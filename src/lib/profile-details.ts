// Detalhes ilustrativos do perfil. Perfis fictícios recebem dados gerados; registros institucionais aguardam validação.
type Base = { id: string; name: string; area: string; degree: string; department: string; bio: string; keywords: string[]; is_demo?: boolean };

export type ProfileDetails = {
  summary: string;
  research: string[];
  formations: { period: string; title: string }[];
  languages: { name: string; skills: [string, string][] }[];
  lattesKeywords: string[];
  coauthors: string[];
  school: { label: string; value: number }[];
  fapesp: { label: string; value: number }[];
} | null;

const COAUTHORS = ['Ana Paula Ribeiro', 'Marcos Vinícius Lopes', 'Juliana Ferraz', 'Pedro Henrique Sales', 'Larissa Gomes', 'Thiago Moreira', 'Fernanda Rios', 'Rodrigo Teixeira', 'Beatriz Salgado Prado', 'Otávio Bittencourt', 'Carla Menezes Vidal', 'Eduardo Nakamura', 'Patrícia Alcântara', 'Vitor Hugo Sanches', 'Renata Figueiredo', 'Marcelo Amaral Bastos'];

function seed(id: string) { let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

export function profileDetails(f: Base): ProfileDetails {
  if (!f.is_demo) return null;
  const s = seed(f.id);
  const n = (min: number, max: number, k: number) => min + ((s >> k) % (max - min + 1));
  const start = 2008 + (s % 8);
  return {
    summary: `${f.bio} Atua no ${f.department} da Unisa, com projetos voltados a ${f.keywords.slice(0, 3).join(', ').toLowerCase()} e à integração entre ensino, pesquisa e extensão.`,
    research: f.keywords.slice(0, 5).map(k => `Estudos aplicados em ${k.toLowerCase()} no contexto de ${f.area.toLowerCase()};`),
    formations: [
      { period: `${start + 8} - ${start + 10}`, title: 'Pós-Doutorado, Universidade de São Paulo' },
      { period: `${start + 3} - ${start + 7}`, title: `Doutorado em ${f.area}, Universidade Estadual de Campinas` },
      { period: `${start} - ${start + 2}`, title: `Mestrado em ${f.area}, Universidade Santo Amaro` },
    ],
    languages: [
      { name: 'Inglês', skills: [['Compreende', 'Bem'], ['Fala', 'Bem'], ['Lê', 'Bem'], ['Escreve', 'Bem']] },
      { name: 'Espanhol', skills: [['Compreende', 'Bem'], ['Fala', 'Razoavelmente'], ['Lê', 'Bem'], ['Escreve', 'Razoavelmente']] },
    ],
    lattesKeywords: [...f.keywords.map(k => k.toLowerCase()), f.area.toLowerCase(), 'Ensino', 'Extensão universitária', 'Pesquisa aplicada', 'Interdisciplinaridade', 'Políticas públicas'],
    coauthors: Array.from({ length: 10 }, (_, i) => COAUTHORS[(s + i * 3) % COAUTHORS.length] as string).filter((v, i, a) => a.indexOf(v) === i),
    school: [
      { label: 'Orientações de mestrado', value: n(2, 14, 1) },
      { label: 'Orientações de doutorado', value: n(0, 8, 3) },
      { label: 'Iniciação científica', value: n(4, 25, 5) },
      { label: 'Disciplinas ministradas', value: n(5, 20, 7) },
    ],
    fapesp: [
      { label: 'Auxílios à pesquisa', value: n(1, 9, 2) },
      { label: 'Bolsas no Brasil', value: n(0, 12, 4) },
      { label: 'Bolsas no exterior', value: n(0, 3, 6) },
    ],
  };
}
