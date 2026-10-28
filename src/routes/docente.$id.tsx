import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronRight, ExternalLink, GraduationCap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortalFooter, PortalHeader } from '@/components/portal-layout';
import { facultyOptions, lattesUrl } from '@/lib/faculty';
import { profileDetails } from '@/lib/profile-details';
import { WordCloud, TagList } from '@/components/word-cloud';
import { SchoolStatistics, FapespStatistics } from '@/components/profile-statistics';
import type React from 'react';
export const Route = createFileRoute('/docente/$id')({
  loader: async ({ context, params }) => { const rows = await context.queryClient.ensureQueryData(facultyOptions); const faculty = rows.find(f => f.id === params.id); if (!faculty) throw notFound(); return faculty; },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? 'Docente'} | Portal da Produção Docente` }, { name: 'description', content: loaderData?.bio ?? 'Trajetória acadêmica de docentes da Universidade Santo Amaro.' }, { property: 'og:title', content: `${loaderData?.name ?? 'Docente'} · Unisa` }, { property: 'og:description', content: loaderData?.bio ?? 'Conheça a pesquisa e a trajetória acadêmica na Unisa.' }, { property: 'og:type', content: 'profile' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Profile,
});
const PENDING = 'Informação disponível após validação institucional do currículo Lattes.';
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="profile-section"><h2 className="label">{title}</h2>{children}</section>; }
function Card({ title, children }: { title: string; children: React.ReactNode }) { return <div className="profile-card"><h2>{title}</h2>{children}</div>; }
function Pending() { return <p className="pending">{PENDING}</p>; }
function Profile() {
 const { data } = useSuspenseQuery(facultyOptions); const { id } = Route.useParams(); const f = data.find(row => row.id === id);
 if (!f) return null;
 const d = profileDetails(f);
 return <><PortalHeader/><main className="portal-container profile-content wide"><div className="breadcrumb"><Link to="/">Início</Link><ChevronRight size={13}/><Link to="/docentes">Corpo docente</Link><ChevronRight size={13}/><span>Perfil</span></div>{f.is_demo && <p className="mb-5 text-sm text-muted-foreground"><Info className="inline mr-2" size={14}/> Perfil fictício de demonstração — sem vínculo institucional com a Unisa. Os dados abaixo são ilustrativos.</p>}<div className="profile-title"><div className="initials">{f.name.split(' ').slice(0,2).map(n=>n[0]).join('')}</div><div><span className="faculty-area">{f.area}</span><h1>{f.name}</h1><p>{f.degree} · {f.department}</p></div></div>
 <div className="profile-grid"><div>
  <Section title="Resumo Lattes"><p>{d ? d.summary : f.bio}</p></Section>
  <Section title="Atividades de Pesquisa">{d ? <ul className="profile-list">{d.research.map(r=><li key={r}>• {r}</li>)}</ul> : <Pending/>}</Section>
  <Section title="Palavras-Chave"><TagList words={f.keywords}/></Section>
  <Section title="Palavras-Chave Lattes">{d ? <WordCloud words={d.lattesKeywords}/> : <Pending/>}</Section>
  <Section title="Coautores">{d ? <TagList words={d.coauthors}/> : <Pending/>}</Section>
 </div><aside className="profile-aside">
  <Card title="Últimas Formações">{d ? <div className="profile-list">{d.formations.map(x=><div key={x.title}><strong>{x.period}</strong> · {x.title}</div>)}</div> : <Pending/>}</Card>
  <Card title="Idiomas">{d ? <div className="profile-list">{d.languages.map(l=><div key={l.name}><strong className="text-foreground">{l.name}</strong><div className="keyword-list" style={{marginTop:6}}>{l.skills.map(([a,b])=><span key={a}>{a} <b>{b}</b></span>)}</div></div>)}</div> : <Pending/>}</Card>
 </aside></div>
  <Section title="Estatística Escolar">{d ? <SchoolStatistics data={d.school}/> : <Pending/>}</Section>
  <Section title="Estatísticas FAPESP">{d ? <FapespStatistics data={d.fapesp}/> : <Pending/>}</Section>
  <section className="profile-section"><h2 className="label">Currículo Lattes</h2>{f.is_demo ? <p>Este perfil é fictício e não possui currículo na Plataforma Lattes.</p> : <><p>{f.lattes_id ? 'Consulte o currículo completo na Plataforma Lattes do CNPq.' : 'O identificador Lattes deste docente ainda não foi validado. Consulte o nome na busca oficial do CNPq.'}</p><Button asChild className="mt-5"><a href={lattesUrl(f.lattes_id)} target="_blank" rel="noreferrer">{f.lattes_id ? 'Abrir currículo Lattes' : 'Pesquisar na Plataforma Lattes'}<ExternalLink/></a></Button></>}</section>
 {!f.is_demo && <p className="catalog-source"><Info size={13}/> Registro da referência fornecida. Informações sujeitas à validação institucional da Unisa.</p>}<Button variant="outline" asChild className="mt-7"><Link to="/docentes"><ArrowLeft/> Voltar aos docentes</Link></Button></main><PortalFooter/></>;
}
