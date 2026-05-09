import { Link } from 'react-router-dom';

const TOP = [
  { rank: '01', handle: '@phantom', tier: 'WRAITH', meta: 'Year 3 · FCI · 42 solves', points: 2840 },
  { rank: '02', handle: '@nullbyte', tier: 'SPECTRE', meta: 'Year 2 · FCI · 38 solves', points: 2615 },
  { rank: '03', handle: '@cipher', tier: 'SPECTRE', meta: 'Year 3 · FOE · 35 solves', points: 2410 },
  { rank: '04', handle: '@halfbyte', tier: 'OPERATIVE', meta: 'Year 2 · FCM · 28 solves', points: 1890 },
  { rank: '05', handle: '@reverb', tier: 'OPERATIVE', meta: 'Year 1 · FCI · 24 solves', points: 1650 },
  { rank: '06', handle: '@wraith', tier: 'AGENT', meta: 'Year 1 · FCI · 20 solves', points: 1420 },
];

export default function Scoreboard() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>scoreboard</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// LEADERBOARD</div>
        <h1 className="page-title">Top operators <span className="hl-italic">this month.</span></h1>
        <p className="page-subtitle">
          Points earned through CTF placements, workshop attendance, write-ups, and Discord activity. Climb to the top three for special Discord roles.
        </p>
      </section>

      <section className="section max-w-[900px]">
        <div className="space-y-2">
          {TOP.map((m, i) => (
            <div
              key={m.handle}
              className={`grid grid-cols-[60px_1fr_auto] gap-4 items-center p-4 rounded-lg border ${
                i === 0
                  ? 'border-success bg-success/5'
                  : i < 3
                    ? 'border-accent-mint bg-accent-mint-soft/30'
                    : 'border-border-soft bg-bg-card'
              }`}
            >
              <div className="font-mono font-bold text-2xl text-accent-mint">{m.rank}</div>
              <div>
                <div className="text-text-1 font-semibold">{m.handle}</div>
                <div className="text-text-3 font-mono text-xs flex flex-wrap gap-2">
                  <span className="bg-accent-mint-soft text-accent-mint px-2 py-0.5 rounded font-bold">{m.tier}</span>
                  <span>{m.meta}</span>
                </div>
              </div>
              <div className="text-text-1 font-mono font-bold text-lg">
                {m.points.toLocaleString()}<span className="text-text-4 text-xs ml-1">pts</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-7 bg-bg-card border border-border-soft rounded-[22px] text-center">
          <h3 className="text-xl font-bold mb-2">Your name could be <span className="hl-italic">on this board.</span></h3>
          <p className="text-text-3 mb-5">Enlist now and start earning points from your first CTF.</p>
          <Link to="/enlist" className="btn-primary btn-primary-lg">Enlist now</Link>
        </div>
      </section>
    </>
  );
}
