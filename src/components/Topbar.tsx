import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

export default function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-bg-frame/80 border-b border-border-soft">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Logo size={36} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-text-1' : 'text-text-3 hover:text-text-1'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <div className="status-pill">
            <span className="status-dot" />
            <span>INTAKE OPEN</span>
          </div>
          <Link to="/enlist" className="btn-primary text-sm">
            <span>Enlist now</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-bg-elevated"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block w-6 h-0.5 bg-text-1 mb-1.5" />
          <span className="block w-6 h-0.5 bg-text-1" />
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-soft bg-bg-frame">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-text-1' : 'text-text-3'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/enlist" className="btn-primary mt-2 justify-center" onClick={() => setMobileOpen(false)}>
              Enlist now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
