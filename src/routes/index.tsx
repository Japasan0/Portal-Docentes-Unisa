import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Shapes, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortalFooter, PortalHeader } from '@/components/portal-layout';
import campus from '@/assets/unisa-campus.jpg.asset.json';


export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Portal da Produção Docente | Unisa' },
  { name: 'description', content: 'Conheça o Portal da Produção Docente da Unisa, encontre pesquisadores, explore áreas do conhecimento e acesse os cursos de graduação e pós-graduação.' },
  { property: 'og:title', content: 'Portal da Produção Docente' },
  { property: 'og:description', content: 'Pesquisa, pessoas e conhecimento. Encontre docentes, áreas do conhecimento e cursos da Universidade Santo Amaro.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: Index,
});
function Index() {
 return <><PortalHeader/><main>
  <section className="portal-hero">
   <img className="hero-photo" src={campus.url} alt="Educadores conversando no ambiente universitário"/><div className="hero-shade"/>
   <div className="portal-container hero-content">
    <h1>Portal da<br/>Produção <span>Docente.</span></h1>
    <p>Por trás de cada descoberta, pessoas.<br/>Encontre quem inspira e transforma o conhecimento.</p>
    <Button className="find-faculty-cta" variant="secondary" size="lg" asChild><Link to="/docentes"><Search/> Encontrar Docente <ArrowRight/></Link></Button>
   </div>
  </section>
  <section className="knowledge-strip"><div className="portal-container strip-inner"><div className="strip-intro"><span className="strip-icon"><BookOpen size={21}/></span><div><strong>O conhecimento começa com pessoas.</strong><p>Trajetórias que conectam ensino, pesquisa e sociedade.</p></div></div><div className="strip-meta"><span><Users size={16}/> Corpo docente Unisa</span><span><GraduationCap size={17}/> Diferentes áreas do conhecimento</span></div></div></section>
  <section className="portal-categories" aria-label="Categorias do portal"><div className="portal-container">
   <h2 className="categories-title">Explore por Categorias</h2>
   <div className="category-grid">
    <Button variant="outline" className="portal-category" asChild><Link to="/docentes"><Users aria-hidden="true"/><span>Docentes e Pesquisadores</span><ArrowRight className="category-arrow" aria-hidden="true"/></Link></Button>
    <Button variant="outline" className="portal-category" asChild><a href="https://www.unisa.br/cursos/pos-graduacao/" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true"/><span>Programas de Pós Graduação</span><ArrowUpRight className="category-arrow" aria-hidden="true"/></a></Button>
    <Button variant="outline" className="portal-category" asChild><Link to="/areas"><Shapes aria-hidden="true"/><span>Área do Conhecimento</span><ArrowRight className="category-arrow" aria-hidden="true"/></Link></Button>
    <Button variant="outline" className="portal-category" asChild><a href="https://www.unisa.br/cursos/graduacao/" target="_blank" rel="noreferrer"><GraduationCap aria-hidden="true"/><span>Cursos de Graduação</span><ArrowUpRight className="category-arrow" aria-hidden="true"/></a></Button>
   </div>
  </div></section>
 </main><PortalFooter/></>;
}
