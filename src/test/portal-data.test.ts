import { describe, expect, it } from 'vitest';
import { demoFaculty, facultyAreas } from '@/lib/demo-faculty';
import { campuses } from '@/lib/campuses';
import { filterFaculty } from '@/lib/faculty';

describe('Portal example catalogue', () => {
 it.each(facultyAreas)('provides fictional profiles in %s', area => {
  expect(filterFaculty(demoFaculty, '', area, '').length).toBeGreaterThan(0);
 });
 it('keeps fictional profiles separate from institutional Lattes identities', () => {
  expect(demoFaculty).toHaveLength(16);
  for (const row of demoFaculty) { expect(row.is_demo).toBe(true); expect(row.lattes_id).toBeNull(); }
 });
 it('finds fictional faculty by name', () => {
  expect(filterFaculty(demoFaculty, 'Sofia Almeida Brito', '', '').map(row => row.name)).toEqual(['Sofia Almeida Brito']);
 });
});
describe('Campus addresses supplied by Unisa', () => {
 it.each([
  ['Interlagos', ['R. Prof. Enéas de Siqueira Neto, 340']],
  ['Metrô Adolfo Pinheiro-Unisa', ['R. Isabel Schmidt, 349']],
  ['Metrô Marechal Deodoro', ['R. Dr. Gabriel dos Santos, 30']],
  ['Guarulhos', ['Av. Anton Philips, 446', 'Rua Barão de Mauá, 95A']],
  ['Metrô Liberdade', ['Rua Fagundes, 97']],
 ])('preserves the addresses for %s', (name, streets) => {
  expect(campuses.find(campus => campus.name === name)?.addresses.map(address => address.street)).toEqual(streets);
 });
});