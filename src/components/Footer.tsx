import { Link } from 'react-router-dom';
import { SITE, FOOTER_LINKS } from '../constants';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-frame">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
          <div className="space-y-3">
            <Logo size={48} />
            <p className="text-text-3 font-mono text-xs tracking-wider">
              // {SITE.tagline.toUpperCase()}
            </p>
            <p className="text-text-3 text-sm max-w-md">{SITE.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <FooterColumn title="Pages" links={FOOTER_LINKS.pages} />
            <FooterColumn title="Operations" links={FOOTER_LINKS.operations} />
            <FooterColumn title="Channels" links={FOOTER_LINKS.channels} external />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-soft flex flex-col sm:flex-row justify-between gap-2 text-sm">
          <p className="text-text-4">{SITE.copyright}</p>
          <p className="text-text-4 font-mono">{SITE.motto}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  external?: boolean;
}) {
  return (
    <div>
      <h5 className="text-text-1 text-sm font-semibold mb-3">{title}</h5>
      <ul className="space-y-2">
        {links.map((link) =>
          external ? (
            <li key={link.label}>
              <a href={link.href} className="text-text-3 hover:text-text-1 text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link to={link.href} className="text-text-3 hover:text-text-1 text-sm transition-colors">
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
