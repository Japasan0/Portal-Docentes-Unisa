import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowLeft, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortalHeader, PortalFooter } from '@/components/portal-layout';
import { facultyAreas } from '@/lib/demo-faculty';

export const Route = createFileRoute('/areas')({
  head: () => ({ meta: [
    { title: 'Área do Conhecimento | Portal da Produção Docente' },
    { name: 'description', content: 'Consulte as oito áreas do conhecimento e encontre docentes e pesquisadores da Unisa por especialidade.' },
    { property: 'og:title', content: 'Áreas do conhecimento · Unisa' },
    { property: 'og:description', content: 'Encontre docentes e pesquisadores por área do conhecimento na Universidade Santo Amaro.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: KnowledgeAreas,
});

function KnowledgeAreas() {
  return <><PortalHeader/><main className="catalog"><div className="portal-container">
    <div className="section-heading"><div><div className="eyebrow">Pesquisa Unisa</div><h1 className="catalog-title">Área do Conhecimento</h1></div></div>
    <div className="knowledge-area-grid">{facultyAreas.map(area => <Button variant="outline" className="portal-category" key={area} asChild><Link to="/docentes" search={{ area }}><Shapes aria-hidden="true"/><span>{area}</span><ArrowRight className="category-arrow" aria-hidden="true"/></Link></Button>)}</div>
    <Button variant="link" className="mt-8" asChild><Link to="/"><ArrowLeft/> Voltar ao início</Link></Button>
  </div></main><PortalFooter/></>;
}