import { useState, useEffect } from 'react';
import { VALID_FLAGS, FLAG_RANKS, STORAGE_KEYS } from '../constants';

const TOTAL_FLAGS = Object.keys(VALID_FLAGS).length;
const TOTAL_POINTS = Object.values(VALID_FLAGS).reduce((s, f) => s + f.points, 0);

interface Mission {
  num: number;
  title: string;
  hint: React.ReactNode;
  points: number;
}

const MISSIONS: Mission[] = [
  { num: 1, title: 'The Welcome Mat', hint: 'The very first page might say more in its source than on screen. Look at HTML comments.', points: 10 },
  { num: 2, title: 'About Face', hint: "The About page tells our story. There's a flag tucked into one of the section's metadata.", points: 10 },
  { num: 3, title: 'Programs Whisper', hint: "Our programs page lists what we teach — but one element has an attribute it shouldn't have.", points: 10 },
  { num: 4, title: "The Tools Don't Lie", hint: <>The tools page knows secrets. Check its <code className="bg-bg-outer px-1 rounded text-accent-mint">head</code>.</>, points: 10 },
  { num: 5, title: "Tool's Microchallenge", hint: 'The tools page has a public micro-challenge. Decode it. There\'s a flag inside.', points: 15 },
  { num: 6, title: 'Console Logs', hint: 'Open the developer console on any page. We may or may not log a flag for the curious.', points: 10 },
  { num: 7, title: "Konami's Honor", hint: <>↑ ↑ ↓ ↓ ← → ← → B A — the legendary code. Try it on the home page. <em>Something will happen.</em></>, points: 15 },
  { num: 8, title: 'The Slash', hint: <>Press <kbd className="bg-bg-outer px-1 rounded text-accent-mint">/</kbd> on any page. A command palette opens. Type <code className="bg-bg-outer px-1 rounded text-accent-mint">help</code>.</>, points: 15 },
  { num: 9, title: 'Robot Overlords', hint: <>Every good website has a robots.txt. Ours does too. <a href="/robots.txt" className="text-accent-mint underline">Check it out.</a></>, points: 10 },
  { num: 10, title: 'Final Boss', hint: <>This page itself hides a flag in its CSS. <code className="bg-bg-outer px-1 rounded text-accent-mint">display: none</code> isn't always invisible to those who look.</>, points: 20 },
];

const rankFor = (n: number): string => {
  for (const r of FLAG_RANKS) {
    if (n >= r.min && n <= r.max) return r.label;
  }
  return 'ROOKIE 🌱';
};

export default function Flags() {
  const [found, setFound] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'warn' | 'fail' } | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.foundFlags) || '[]');
    setFound(saved);
  }, []);

  const points = found.reduce((s, f) => s + (VALID_FLAGS[f]?.points || 0), 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim().toLowerCase();
    if (VALID_FLAGS[raw]) {
      if (found.includes(raw)) {
        setFeedback({ text: `🟡 Already submitted: ${VALID_FLAGS[raw].label}`, type: 'warn' });
      } else {
        const newFound = [...found, raw];
        setFound(newFound);
        localStorage.setItem(STORAGE_KEYS.foundFlags, JSON.stringify(newFound));
        setFeedback({ text: `✅ FLAG ACCEPTED · ${VALID_FLAGS[raw].label} · +${VALID_FLAGS[raw].points} pts`, type: 'success' });
        setInput('');
        if (newFound.length === TOTAL_FLAGS) {
          setTimeout(() => alert('🎉 ALL 10 FLAGS FOUND!\n\nYou are now a CyberSpectre GHOST. Screenshot this and post it in Discord.'), 300);
        }
      }
    } else {
      setFeedback({ text: '❌ Not a valid flag. Keep hunting.', type: 'fail' });
    }
  };

  const reset = () => {
    if (confirm('Reset all your flag-hunt progress?')) {
      localStorage.removeItem(STORAGE_KEYS.foundFlags);
      setFound([]);
      setFeedback(null);
    }
  };

  const isFound = (n: number) => found.some((f) => VALID_FLAGS[f]?.mission === n);

  return (
    <>
      <section className="page-hero">
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 10 — RECON CHALLENGE</div>
        <h1 className="page-title">
          Find the <span className="hl-mono">hidden flags.</span> Earn your <span className="hl-italic">points.</span>
        </h1>
        <p className="page-subtitle">
          There are <strong>10 flags</strong> hidden across this website. View page source. Inspect elements. Decode strings. Open the console.
        </p>
      </section>

      <section className="section">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-5 mb-12">
          {/* Score panel */}
          <div className="bg-bg-card border border-border-soft rounded-[22px] p-8 text-center">
            <div className="kicker justify-center mb-2"><span className="kicker-bar" />// YOUR SCORE</div>
            <h2 className="text-6xl font-bold font-mono text-accent-mint tracking-tight my-2">
              {found.length} / {TOTAL_FLAGS}
            </h2>
            <p className="font-mono text-sm text-text-3 tracking-wider">
              Rank: {rankFor(found.length)} · {points}/{TOTAL_POINTS} pts
            </p>
            <div className="w-full h-2 bg-bg-outer rounded-full overflow-hidden my-4">
              <div
                className="h-full bg-gradient-to-r from-accent-mint to-success transition-[width] duration-700"
                style={{ width: `${(found.length / TOTAL_FLAGS) * 100}%` }}
              />
            </div>
            <button className="tool-btn tool-btn-ghost" onClick={reset}>Reset progress</button>
          </div>

          {/* Submit panel */}
          <div className="bg-bg-card border border-border-soft rounded-[22px] p-8">
            <div className="kicker mb-2"><span className="kicker-bar" />// SUBMIT FLAG</div>
            <h3 className="text-2xl mt-2 mb-2">Drop a flag here</h3>
            <p className="text-text-3 mb-5">
              Format: <code className="bg-bg-outer px-1.5 py-0.5 rounded text-accent-mint">flag{'{...}'}</code> — case-insensitive. Saved locally to your browser.
            </p>
            <form className="flex gap-2 flex-wrap" onSubmit={submit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="flag{example_text_here}"
                autoComplete="off"
                className="flex-1 min-w-[220px] bg-bg-outer border border-border-strong rounded-lg px-4 py-3 text-text-1 font-mono text-sm focus:outline-none focus:border-accent-mint"
              />
              <button type="submit" className="btn-primary">Submit</button>
            </form>
            {feedback && (
              <div
                className={`mt-4 px-4 py-3 rounded-lg font-mono text-sm border ${
                  feedback.type === 'success'
                    ? 'bg-success/10 border-success/30 text-success'
                    : feedback.type === 'warn'
                      ? 'bg-warning/10 border-warning/30 text-warning'
                      : 'bg-error/10 border-error/30 text-error'
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </div>

        {/* Mission briefings */}
        <div className="kicker mb-2"><span className="kicker-bar" />// MISSION BRIEFINGS</div>
        <h2 className="text-3xl font-bold mb-2">Where to look</h2>
        <p className="text-text-3 mb-6 max-w-[700px]">
          Each flag has a hint pointing to where it might be. Tick them off as you find them. Right-click and "View Source" is your friend.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MISSIONS.map((m) => {
            const done = isFound(m.num);
            return (
              <div
                key={m.num}
                className={`p-5 rounded-[14px] border transition-all ${
                  done
                    ? 'border-success bg-success/5'
                    : 'border-border-soft bg-bg-card hover:border-accent-mint'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[0.6875rem] text-text-4">{done ? '✅' : '⬜'} {m.num.toString().padStart(2, '0')}</span>
                  <span className="bg-accent-mint-soft text-accent-mint px-2 py-0.5 rounded text-[0.6875rem] font-mono">+{m.points} pts</span>
                </div>
                <h4 className="font-semibold text-text-1 mb-2">{m.title}</h4>
                <p className="text-text-3 text-[0.8125rem] leading-relaxed">{m.hint}</p>
              </div>
            );
          })}
        </div>

        {/* Hidden flag in CSS for the recon-er to find */}
        <div className="hidden" aria-hidden="true">flag{'{display_none_isnt_security}'}</div>
      </section>
    </>
  );
}
