import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, ExternalLink, FileCode2, GraduationCap, Grid2X2, Info, List, Search, SlidersHorizontal, Upload, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PortalFooter, PortalHeader } from '@/components/portal-layout';
import { facultyOptions, filterFaculty, lattesUrl, parseLattesXml, type Faculty } from '@/lib/faculty';
import { facultyAreas } from '@/lib/demo-faculty';

export const Route = createFileRoute('/docentes')({
  validateSearch: (search: Record<string, unknown>): { area?: string | undefined } => ({ area: typeof search['area'] === 'string' && facultyAreas.includes(search['area']) ? search['area'] : undefined }),
  head: () => ({ meta: [{ title: 'Encontrar Docente | Portal da Produção Docente' }, { name: 'description', content: 'Encontre docentes da Universidade Santo Amaro por nome, área e titulação. Conheça suas trajetórias e consulte a Plataforma Lattes.' }, { property: 'og:title', content: 'Pesquisa de docentes | Portal da Produção Docente' }, { property: 'og:description', content: 'Pessoas que constroem conhecimento. Explore os docentes e a pesquisa da Unisa.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(facultyOptions),
  component: Index,
});

function Index() {
  const selectedArea = Route.useSearch().area;
  const { data: faculty } = useSuspenseQuery(facultyOptions);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [area, setArea] = useState(selectedArea ?? '');
  const [degree, setDegree] = useState('');
  const [sort, setSort] = useState('asc');
  const [view, setView] = useState('grid');
  const [xmlOpen, setXmlOpen] = useState(false);
  const [preview, setPreview] = useState<Faculty | null>(null);
  const [xmlError, setXmlError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const areas = facultyAreas;
  const degrees = [...new Set(faculty.map(f => f.degree))].sort();
  const results = filterFaculty(faculty, query, area, degree).sort((a, b) => sort === 'asc' ? a.name.localeCompare(b.name, 'pt-BR') : b.name.localeCompare(a.name, 'pt-BR'));
  function clearFilters() { setInput(''); setQuery(''); setArea(''); setDegree(''); }
  async function readXml(file?: File) {
    setPreview(null); setXmlError('');
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setXmlError('O arquivo deve ter no máximo 5 MB.'); return; }
    try { setPreview(parseLattesXml(await file.text())); } catch (e) { setXmlError(e instanceof Error ? e.message : 'Não foi possível ler o arquivo.'); }
  }
  return <>
    <PortalHeader/>
    <main>
      <section className="catalog" id="docentes"><div className="portal-container">
        <div className="section-heading"><div><div className="eyebrow">Pessoas que constroem conhecimento</div><h1 className="catalog-title">Encontre um docente.</h1><p>Explore especialidades, descubra pesquisas e conheça diferentes trajetórias.</p></div><a className="lattes-note" href={lattesUrl(null)} target="_blank" rel="noreferrer"><ExternalLink size={13}/> Plataforma Lattes · CNPq <ArrowUpRight size={13}/></a></div>
        <form className="search-panel" onSubmit={e => { e.preventDefault(); setQuery(input); }}>
          <div className="search-main"><div className="search-input"><Search/><input aria-label="Pesquisar docentes" placeholder="Busque por nome, área de atuação ou palavra-chave" list="faculty-names" value={input} onChange={e => setInput(e.target.value)}/><datalist id="faculty-names">{faculty.map(f => <option key={f.id} value={f.name}/>)}</datalist></div><Button type="submit"><Search/><span>Pesquisar</span></Button></div>
          <div className="filter-row"><span className="filter-label"><SlidersHorizontal size={13}/> Refinar busca</span><select aria-label="Área do conhecimento" value={area} onChange={e => setArea(e.target.value)}><option value="">Todas as áreas</option>{areas.map(a => <option key={a}>{a}</option>)}</select><select aria-label="Titulação" value={degree} onChange={e => setDegree(e.target.value)}><option value="">Todas as titulações</option>{degrees.map(d => <option key={d}>{d}</option>)}</select><Button variant="ghost" className="reset" type="button" onClick={clearFilters}><X size={12}/> Limpar filtros</Button></div>
        </form>
        <div className="result-toolbar"><p><strong>{results.length}</strong> {results.length === 1 ? 'docente encontrado' : 'docentes encontrados'}</p><div className="result-tools"><select aria-label="Ordenar docentes" value={sort} onChange={e => setSort(e.target.value)}><option value="asc">Nome: A a Z</option><option value="desc">Nome: Z a A</option></select><div className="view-toggle"><Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" aria-label="Visualizar em grade" title="Visualizar em grade" onClick={() => setView('grid')}><Grid2X2/></Button><Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" aria-label="Visualizar em lista" title="Visualizar em lista" onClick={() => setView('list')}><List/></Button></div></div></div>
        <div className={`faculty-grid ${view === 'list' ? 'list' : ''}`}>
          {results.map(f => <article className="faculty-card" key={f.id}><div className="faculty-top"><div className="initials">{f.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')}</div><div><span className="faculty-area">{f.area}</span><span className="degree"><GraduationCap size={13}/>{f.degree}</span></div></div><h3><Link to="/docente/$id" params={{ id: f.id }}>{f.name}</Link></h3><p className="department">{f.department}</p><p className="bio">{f.bio}</p><div className="card-bottom"><Link to="/docente/$id" params={{ id: f.id }}>Conhecer docente <ArrowRight size={14}/></Link><span className="record-status"><CheckCircle2 size={11}/> {f.is_demo ? 'Perfil fictício' : 'Registro institucional'}</span></div></article>)}
        </div>
        {results.length === 0 && <div className="empty-state"><Search size={28}/><h3>Nenhum docente encontrado</h3><p>Tente outro nome ou uma combinação diferente de filtros.</p><Button variant="outline" onClick={clearFilters}>Limpar busca</Button></div>}
        <p className="catalog-source"><Info size={12}/> Os perfis fictícios são exemplos de demonstração, sem vínculo institucional ou currículo Lattes. Os demais registros aguardam validação da Unisa.</p>
      </div></section>
      <section className="lattes-band"><div className="portal-container"><div className="lattes-band-left"><FileCode2/><div><h3>Trajetórias acadêmicas na Plataforma Lattes.</h3><p>Currículos, formação e produção científica em um só lugar.<br/>A sincronização institucional depende de autorização do CNPq.</p></div></div><div className="lattes-actions"><Button variant="outline" onClick={() => { setPreview(null); setXmlError(''); setXmlOpen(true); }}><Upload/> Consultar XML</Button><Button variant="outline" asChild><a href={lattesUrl(null)} target="_blank" rel="noreferrer">Acessar Lattes <ArrowUpRight/></a></Button></div></div></section>
    </main>
    <PortalFooter/>
    <Dialog open={xmlOpen} onOpenChange={setXmlOpen}><DialogContent><DialogHeader><DialogTitle>Consultar currículo Lattes</DialogTitle><DialogDescription>Selecione o XML exportado pela Plataforma Lattes. A consulta é local e não publica os dados no catálogo.</DialogDescription></DialogHeader><input type="file" accept=".xml,text/xml,application/xml" ref={fileInput} hidden onChange={e => readXml(e.target.files?.[0])}/><Button variant="outline" onClick={() => fileInput.current?.click()}><Upload/> Selecionar arquivo XML</Button>{xmlError && <p className="text-destructive text-sm" role="alert">{xmlError}</p>}{preview && <div className="xml-preview"><h3>{preview.name}</h3><p>{preview.degree} · {preview.area}</p><p className="my-3">{preview.bio}</p><Button asChild><a href={lattesUrl(preview.lattes_id)} target="_blank" rel="noreferrer">Abrir currículo Lattes <ExternalLink/></a></Button></div>}<p className="text-xs text-muted-foreground">Formato XML · até 5 MB</p></DialogContent></Dialog>
  </>;
}
