import { Link } from 'react-router-dom';

const EVENTS = [
  { date: 'Aug 10, 2026', name: 'Welcome Aboard — Town Hall', tier: 'OPEN' },
  { date: 'Aug 17–24, 2026', name: 'Linux Foundations (3-week block)', tier: 'BEGINNER' },
  { date: 'Sep 7, 2026', name: 'Industry Talk #1 — SOC analyst', tier: 'OPEN' },
  { date: 'Sep 21, 2026', name: 'CSPECTRE Mini Open House', tier: 'PUBLIC' },
  { date: 'Jan 18, 2027', name: '🇲🇾 Malaysian National CTF', tier: 'COMPETITION' },
  { date: 'Jun 22, 2027', name: '🚀 CSPECTRE OPEN — Inter-uni CTF', tier: 'FLAGSHIP' },
];

export default function Events() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>events</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 03 — EVENTS</div>
        <h1 className="page-title">Workshops, CTFs, and <span className="hl-italic">talks.</span></h1>
        <p className="page-subtitle">Every Sunday. Plus flagship events throughout the year.</p>
      </section>

      <section className="section">
        <div className="space-y-3">
          {EVENTS.map((e, i) => (
            <div key={i} className="bg-bg-card border border-border-soft rounded-lg p-5 flex justify-between items-center hover:border-accent-mint transition-colors">
              <div>
                <span className="font-mono text-[0.6875rem] text-text-4 tracking-wider">{e.date}</span>
                <div className="text-text-1 font-semibold mt-1">{e.name}</div>
              </div>
              <span className="bg-accent-mint-soft text-accent-mint border border-accent-mint/30 px-2.5 py-1 rounded font-mono text-[0.6875rem] tracking-widest font-bold">
                {e.tier}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
