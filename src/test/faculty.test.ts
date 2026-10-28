import { describe, expect, it } from 'vitest';
import { filterFaculty, lattesUrl, parseLattesXml, type Faculty } from '@/lib/faculty';
const row: Faculty = { id: '1', name: 'João Silva', degree: 'Doutor', area: 'Saúde', department: 'Unisa', bio: 'Pesquisa em fisiologia', keywords: ['Biofísica'], lattes_id: null, lattes_updated_at: null };
describe('Faculty search and Lattes', () => {
 it('finds names without accents', () => { expect(filterFaculty([row], 'joao', '', '').map(r=>r.id)).toEqual(['1']); expect(filterFaculty([row], 'Maria', '', '')).toEqual([]); });
 it('combines degree and area filters', () => { expect(filterFaculty([row], '', 'Saúde', 'Mestre')).toEqual([]); expect(filterFaculty([row], '', 'Saúde', 'Doutor')).toHaveLength(1); });
 it('only links validated sixteen digit Lattes IDs', () => { expect(lattesUrl('1234567890123456')).toBe('https://lattes.cnpq.br/1234567890123456'); expect(lattesUrl('abc')).not.toContain('/abc'); });
 it('extracts a Lattes XML curriculum', () => { const parsed = parseLattesXml('<CURRICULO-VITAE NUMERO-IDENTIFICADOR="1234567890123456"><DADOS-GERAIS NOME-COMPLETO="João Silva"/><DOUTORADO/><RESUMO-CV TEXTO-RESUMO-CV-RH="Pesquisa em fisiologia"/></CURRICULO-VITAE>'); expect(parsed.name).toBe('João Silva'); expect(parsed.degree).toBe('Doutor'); expect(parsed.lattes_id).toBe('1234567890123456'); });
 it('rejects non Lattes XML and entity declarations', () => { expect(()=>parseLattesXml('<example/>')).toThrow(); expect(()=>parseLattesXml('<!DOCTYPE foo><foo/>')).toThrow(); });
});
