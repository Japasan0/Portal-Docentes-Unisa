import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandIcon, type BrandIconName } from '@/components/brand-icons';
import { lattesUrl } from '@/lib/faculty';
import { campuses } from '@/lib/campuses';
import logo from '@/assets/unisa-official.png.asset.json';
import whiteLogo from '@/assets/unisa-white.png.asset.json';

type Social = { name: BrandIconName; label: string; handle: string; url: string };

export const socialNetworks: Social[] = [
  { name: 'instagram', label: 'Instagram', handle: '@unisaoficial', url: 'https://www.instagram.com/unisaoficial/' },
  { name: 'facebook', label: 'Facebook', handle: '/unisaoficial', url: 'https://www.facebook.com/unisaoficial' },
  { name: 'x', label: 'X', handle: '@unisaoficial', url: 'https://x.com/unisaoficial' },
  { name: 'linkedin', label: 'LinkedIn', handle: 'Universidade Santo Amaro', url: 'https://www.linkedin.com/school/universidade-de-santo-amaro' },
  { name: 'youtube', label: 'YouTube', handle: '@UnisaOficial', url: 'https://www.youtube.com/@UnisaOficial' },
];

export function PortalHeader() {
  return <header className="portal-header"><div className="portal-container header-inner"><Link to="/" className="brand" aria-label="Unisa — início"><img src={logo.url} alt="Unisa — Universidade Santo Amaro"/><span>Portal da<br/><strong>Produção Docente</strong></span></Link><nav aria-label="Navegação principal"><Link to="/" activeProps={{ className: 'nav-active' }} activeOptions={{ exact: true }}>Início</Link><Link to="/docentes" activeProps={{ className: 'nav-active' }}>Corpo docente</Link><Button asChild><Link to="/docentes"><Search/> Encontrar Docente</Link></Button></nav></div></header>;
}

export function PortalFooter() {
  return <footer className="portal-footer">
    <div className="portal-container footer-top">
      <div className="footer-brand">
        <img src={whiteLogo.url} alt="Unisa — Universidade Santo Amaro"/>
        <p>Ensino. Pesquisa. Conexões.</p>
        <span>Portal da Produção Docente · Universidade Santo Amaro</span>
      </div>
      <nav className="footer-links" aria-label="Links do portal">
        <span className="footer-links-title">Navegação</span>
        <Link to="/">Início</Link>
        <Link to="/docentes">Corpo docente</Link>
        <a href={lattesUrl(null)} target="_blank" rel="noreferrer">Plataforma Lattes <ArrowUpRight size={12}/></a>
        <a href="https://www.unisa.br/" target="_blank" rel="noreferrer">Site institucional <ArrowUpRight size={12}/></a>
      </nav>
      <div className="footer-social">
        <span className="footer-social-title">Siga a Unisa</span>
        <ul>{socialNetworks.map(s => <li key={s.name}><a href={s.url} target="_blank" rel="noreferrer" aria-label={`Unisa no ${s.label}`} title={`${s.label} · ${s.handle}`}><BrandIcon name={s.name} size={17}/></a></li>)}</ul>
      </div>
    </div>
    <section className="portal-container footer-campuses" aria-labelledby="footer-campuses-title">
      <h2 id="footer-campuses-title">Onde nos encontrar</h2>
      <div className="footer-campus-list">{campuses.map(c => <div className="footer-campus" key={c.name}>
        <h3>{c.name}</h3>
        {c.addresses.map(a => <address key={a.street}>{a.label && <strong>{a.label} · </strong>}{a.street}{a.neighborhood && <span className="footer-campus-hood">{a.neighborhood}</span>}</address>)}
        <span className="footer-campus-city">{c.city}</span>
      </div>)}</div>
    </section>
    <div className="portal-container footer-bottom"><span>© 2026 Unisa · Portal da Produção Docente</span><span>Conhecimento que conecta pessoas.</span></div>
  </footer>;
}
