import { Link } from 'react-router-dom';
import { TRACKS, TrackKey } from '../constants';

export default function Programs() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>programs</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 02 — TRAINING</div>
        <h1 className="page-title">
          Five tracks. <span className="hl-italic">From beginner to elite.</span>
        </h1>
        <p className="page-subtitle">
          Pick a specialty, level up week by week. Every track has a beginner-friendly onramp + a competition-team upgrade path.
        </p>
      </section>

      <section className="section" id="training" data-flag="flag{programs_have_secrets_too}">
        <div className="kicker mb-4"><span className="kicker-bar" />// 01 — TRAINING TRACKS</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">The five disciplines.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(TRACKS) as TrackKey[]).filter(k => k !== 'general').map((k) => {
            const t = TRACKS[k];
            return (
              <div key={k} className="bg-bg-card border border-border-soft rounded-[14px] p-6 hover:border-accent-mint transition-colors">
                <div className="text-3xl mb-3">{t.emoji}</div>
                <div className="font-semibold text-text-1 mb-2">{t.label}</div>
                <p className="text-text-3 text-sm leading-relaxed">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" id="ctfs">
        <div className="kicker mb-4"><span className="kicker-bar" />// 02 — CTF ROADMAP</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">From local to international.</h2>
        <div className="space-y-4 max-w-[800px]">
          {[
            { tier: 'TIER 0', name: 'Internal Beginner CTF', when: 'T1 Week 14' },
            { tier: 'TIER 1', name: 'Public CTFs (CTFtime listed)', when: 'T2' },
            { tier: 'TIER 2', name: 'Malaysian National CTF (Wargames.MY)', when: 'T3 Week 13' },
            { tier: 'TIER 3', name: 'CSPECTRE OPEN — Inter-uni', when: 'Phase 3 Week 13' },
            { tier: 'TIER 4', name: 'International CTFs', when: 'Year 2+' },
          ].map((c, i) => (
            <div key={i} className="bg-bg-card border border-border-soft rounded-lg p-5 flex justify-between items-center">
              <div>
                <span className="font-mono text-[0.6875rem] text-accent-mint tracking-wider">{c.tier}</span>
                <div className="text-text-1 font-semibold mt-1">{c.name}</div>
              </div>
              <span className="font-mono text-xs text-text-3">{c.when}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="bg-bg-card border border-border-soft rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <div>
            <div className="kicker mb-2"><span className="kicker-bar" />// READY?</div>
            <h3 className="text-2xl font-bold">Pick your path. <span className="hl-italic">Enlist now.</span></h3>
            <p className="text-text-3 mt-2 max-w-md">Six stages. One ID card. Less than five minutes.</p>
          </div>
          <Link to="/enlist" className="btn-primary btn-primary-lg whitespace-nowrap">Enlist now</Link>
        </div>
      </section>
    </>
  );
}
