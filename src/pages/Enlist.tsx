import { useState, useEffect, useRef } from 'react';
import {
  TRACKS,
  TrackKey,
  CLEARANCE_LEVELS,
  HANDLE_ADJECTIVES,
  HANDLE_NOUNS,
  FACULTIES,
  YEARS,
  STORAGE_KEYS,
} from '../constants';

interface EnlistData {
  name?: string;
  email?: string;
  faculty?: string;
  year?: string;
  handle?: string;
  track?: TrackKey;
  skill?: number;
  oath?: boolean;
  uid?: string;
}

const OATH = `I, the operative, do solemnly swear:

  ▸ to use my skills with intent — never causing harm,
    never crossing into systems I have no permission to touch.

  ▸ to share what I learn — every senior member was once a beginner,
    and the next one needs me.

  ▸ to operate ethically, even when nobody is watching —
    especially when nobody is watching.

  ▸ to protect, not exploit — the people behind every screen
    are real, and they trust us.

  ▸ to stay curious, stay humble, stay learning —
    confusion is the feeling of growing.

So shall I serve the collective. So shall I represent MMU.
Present everywhere. Seen nowhere.`;

const TOTAL_STAGES = 6;

export default function Enlist() {
  const [stage, setStage] = useState(1);
  const [data, setData] = useState<EnlistData>({});
  const [oathText, setOathText] = useState('');
  const [showCard, setShowCard] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.enlistData) || '{}');
    setData(saved);
  }, []);

  const update = (patch: Partial<EnlistData>) => {
    const merged = { ...data, ...patch };
    setData(merged);
    localStorage.setItem(STORAGE_KEYS.enlistData, JSON.stringify(merged));
  };

  const goNext = (from: number, to: number) => {
    if (!validate(from, data)) return;
    setStage(to);
    window.scrollTo({ top: 200, behavior: 'smooth' });
    if (to === 5) animateOath();
    if (to === 6) finalize();
  };

  const animateOath = () => {
    let i = 0;
    setOathText('');
    const tick = () => {
      i += Math.max(1, Math.floor(OATH.length / 200));
      setOathText(OATH.slice(0, i));
      if (i < OATH.length) requestAnimationFrame(tick);
      else setOathText(OATH);
    };
    requestAnimationFrame(tick);
  };

  const finalize = () => {
    if (!data.uid) {
      const uid = randomUID();
      update({ uid });
    }
    setTimeout(() => setShowCard(true), 1500);
  };

  return (
    <>
      <section className="page-hero text-center">
        <div className="kicker justify-center mb-4"><span className="kicker-bar" />// OPERATIVE INTAKE CONSOLE</div>
        <h1 className="page-title">
          Six stages. <span className="hl-mono">One ID card.</span> <span className="hl-italic">No paperwork.</span>
        </h1>
        <p className="page-subtitle mx-auto">
          A regular form is for regular clubs. CyberSpectre intake is an interactive console — answer at your pace, build your operative identity, and walk out with a personalized hacker ID badge.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-[880px] mx-auto">
        <div className="bg-bg-card border border-border-soft rounded-[22px] p-6 md:p-10 shadow-card-glow">
          {/* PROGRESS */}
          <div className="mb-10">
            <div className="h-1 bg-bg-outer rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-accent-mint to-success transition-[width] duration-700"
                style={{ width: `${((stage - 1) / (TOTAL_STAGES - 1)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[0.6875rem] text-text-4 tracking-wider">
              {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map((s) => (
                <span
                  key={s}
                  className={
                    s === stage ? 'text-accent-mint font-bold' : s < stage ? 'text-success' : ''
                  }
                >
                  {s.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          {stage === 1 && <Stage1 data={data} update={update} onNext={() => goNext(1, 2)} />}
          {stage === 2 && <Stage2 data={data} update={update} onNext={() => goNext(2, 3)} onBack={() => setStage(1)} />}
          {stage === 3 && <Stage3 data={data} update={update} onNext={() => goNext(3, 4)} onBack={() => setStage(2)} />}
          {stage === 4 && <Stage4 data={data} update={update} onNext={() => goNext(4, 5)} onBack={() => setStage(3)} />}
          {stage === 5 && <Stage5 data={data} update={update} oathText={oathText} onNext={() => goNext(5, 6)} onBack={() => setStage(4)} />}
          {stage === 6 && <Stage6 data={data} showCard={showCard} />}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────
function validate(from: number, d: EnlistData): boolean {
  if (from === 1) {
    if (!d.name?.trim()) return alert('Please enter your full name.'), false;
    if (!d.email?.includes('@')) return alert('Please enter a valid email.'), false;
    if (!d.faculty) return alert('Please select your faculty.'), false;
    if (!d.year) return alert('Please select your year of study.'), false;
  }
  if (from === 2) {
    if (!d.handle || !/^[a-z0-9_]{3,20}$/.test(d.handle)) {
      return alert('Handle must be 3–20 chars, lowercase letters/numbers/underscores only.'), false;
    }
  }
  if (from === 3 && !d.track) return alert('Pick a specialty track.'), false;
  if (from === 4 && d.skill === undefined) return alert('Please answer all three questions.'), false;
  if (from === 5 && !d.oath) return alert('Please check the oath box to confirm.'), false;
  return true;
}

// ─────────────────────────────────────────────────────────
// Stage 1 — Identity
// ─────────────────────────────────────────────────────────
function Stage1({ data, update, onNext }: { data: EnlistData; update: (p: Partial<EnlistData>) => void; onNext: () => void }) {
  return (
    <Stage tag="// STAGE 01 — IDENTITY" title="Who are you?" desc="Tell us who's enlisting. Used only to send you the Discord invite + intake confirmation.">
      <div className="space-y-5">
        <Field label="Full name">
          <input type="text" value={data.name || ''} onChange={(e) => update({ name: e.target.value })} className={fieldCls} placeholder="e.g. Ammar Yasser" />
        </Field>
        <Field label="MMU email">
          <input type="email" value={data.email || ''} onChange={(e) => update({ email: e.target.value })} className={fieldCls} placeholder="you@student.mmu.edu.my" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Faculty">
            <select value={data.faculty || ''} onChange={(e) => update({ faculty: e.target.value })} className={fieldCls}>
              <option value="">— select —</option>
              {FACULTIES.map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Year of study">
            <select value={data.year || ''} onChange={(e) => update({ year: e.target.value })} className={fieldCls}>
              <option value="">— select —</option>
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
          </Field>
        </div>
      </div>
      <StageNav onNext={onNext} />
    </Stage>
  );
}

// ─────────────────────────────────────────────────────────
// Stage 2 — Callsign
// ─────────────────────────────────────────────────────────
function Stage2({ data, update, onNext, onBack }: { data: EnlistData; update: (p: Partial<EnlistData>) => void; onNext: () => void; onBack: () => void }) {
  const valid = !!(data.handle && /^[a-z0-9_]{3,20}$/.test(data.handle));

  const generate = () => {
    const adj = HANDLE_ADJECTIVES[Math.floor(Math.random() * HANDLE_ADJECTIVES.length)];
    const noun = HANDLE_NOUNS[Math.floor(Math.random() * HANDLE_NOUNS.length)];
    const num = Math.random() > 0.5 ? '_' + Math.floor(Math.random() * 99) : '';
    update({ handle: `${adj}_${noun}${num}` });
  };

  return (
    <Stage tag="// STAGE 02 — CALLSIGN" title="Pick your handle." desc="Inside CyberSpectre, you're known by your handle — not your real name. Pick something memorable, or roll the dice.">
      <div className="space-y-5">
        <div className="bg-bg-outer border border-dashed border-border-strong rounded-[14px] py-8 px-6 text-center font-mono text-2xl md:text-4xl">
          <span className="text-accent-mint">@</span>
          <span className={valid ? 'text-success' : 'text-text-4'}>{data.handle || 'choose_a_handle'}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={data.handle || ''}
            onChange={(e) => update({ handle: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
            placeholder="lowercase, underscores ok"
            maxLength={20}
            className={`${fieldCls} flex-1 min-w-[220px]`}
          />
          <button type="button" className="tool-btn" onClick={generate}>🎲 Generate</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['no spaces', 'lowercase only', '3–20 chars', 'underscores ok'].map((h) => (
            <span key={h} className="bg-bg-elevated border border-border-soft text-text-4 px-2.5 py-1 rounded-full font-mono text-[0.6875rem]">
              {h}
            </span>
          ))}
        </div>
      </div>
      <StageNav onNext={onNext} onBack={onBack} nextLabel="Lock it in" />
    </Stage>
  );
}

// ─────────────────────────────────────────────────────────
// Stage 3 — Track
// ─────────────────────────────────────────────────────────
function Stage3({ data, update, onNext, onBack }: { data: EnlistData; update: (p: Partial<EnlistData>) => void; onNext: () => void; onBack: () => void }) {
  return (
    <Stage tag="// STAGE 03 — TRACK ALIGNMENT" title="Pick your specialty." desc="Five tracks. Don't worry — you can switch later. This just tells us what to teach you first.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(TRACKS) as TrackKey[]).map((k) => {
          const t = TRACKS[k];
          const selected = data.track === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => update({ track: k })}
              className={`text-left p-5 rounded-[14px] border transition-all ${
                selected
                  ? 'border-success bg-success/5 shadow-[0_0_0_2px_rgba(74,222,128,0.2)]'
                  : 'border-border-soft bg-bg-elevated hover:border-accent-mint hover:-translate-y-0.5'
              }`}
            >
              <div className="text-3xl mb-2">{t.emoji}</div>
              <div className="font-semibold text-text-1 mb-1">{t.label}</div>
              <p className="text-text-3 text-[0.8125rem] leading-relaxed">{t.desc}</p>
            </button>
          );
        })}
      </div>
      <StageNav onNext={onNext} onBack={onBack} />
    </Stage>
  );
}

// ─────────────────────────────────────────────────────────
// Stage 4 — Skill check
// ─────────────────────────────────────────────────────────
function Stage4({ data, update, onNext, onBack }: { data: EnlistData; update: (p: Partial<EnlistData>) => void; onNext: () => void; onBack: () => void }) {
  const [a, setA] = useState<number | undefined>();
  const [b, setB] = useState<number | undefined>();
  const [c, setC] = useState<number | undefined>();

  useEffect(() => {
    if (a !== undefined && b !== undefined && c !== undefined) {
      update({ skill: a + b + c });
    }
  }, [a, b, c]);

  const Q = ({ num, prompt, options, value, set }: { num: number; prompt: React.ReactNode; options: string[]; value: number | undefined; set: (n: number) => void }) => (
    <div className="bg-bg-elevated border border-border-soft rounded-[14px] p-5">
      <p className="mb-4"><strong className="text-accent-mint mr-2">Q{num}.</strong>{prompt}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${value === i ? 'border-success bg-success/5 text-text-1' : 'border-border-soft bg-bg-outer text-text-2 hover:border-accent-mint'}`}>
            <input type="radio" checked={value === i} onChange={() => set(i)} className="accent-success" />
            <span dangerouslySetInnerHTML={{ __html: opt }} />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <Stage tag="// STAGE 04 — SKILL CHECK" title="Honest answers only." desc="Three quick questions. There's no wrong answer — this just helps us match you with the right starting cohort.">
      <div className="space-y-5">
        <Q
          num={1}
          prompt="Have you opened a Linux terminal before?"
          options={["Never · what's a terminal?", "A few times · I can <code>ls</code> and <code>cd</code>", "Daily · I live in the shell"]}
          value={a}
          set={setA}
        />
        <Q
          num={2}
          prompt="Have you ever solved a CTF challenge?"
          options={["Never · what's a CTF?", "A couple of beginner ones", "Multiple events · I have write-ups"]}
          value={b}
          set={setB}
        />
        <Q
          num={3}
          prompt="How comfortable are you with reading code?"
          options={["Looks like alien runes", "I can mostly follow along", "I can write it from scratch"]}
          value={c}
          set={setC}
        />
      </div>
      <StageNav onNext={onNext} onBack={onBack} />
    </Stage>
  );
}

// ─────────────────────────────────────────────────────────
// Stage 5 — Oath
// ─────────────────────────────────────────────────────────
function Stage5({ data, update, oathText, onNext, onBack }: { data: EnlistData; update: (p: Partial<EnlistData>) => void; oathText: string; onNext: () => void; onBack: () => void }) {
  return (
    <Stage tag="// STAGE 05 — THE OATH" title="The Operative's Oath." desc="Cybersecurity is power. We use it ethically. Read the oath, then check the box if you agree.">
      <div className="bg-bg-outer border border-border-strong rounded-[14px] p-6 max-h-[320px] overflow-y-auto mb-5">
        <pre className="font-mono text-sm leading-7 text-text-2 whitespace-pre-wrap min-h-[200px]">{oathText}</pre>
      </div>
      <label className="flex items-center gap-2 px-5 py-4 bg-success/5 border border-success/30 rounded-lg cursor-pointer">
        <input type="checkbox" checked={!!data.oath} onChange={(e) => update({ oath: e.target.checked })} className="accent-success w-4 h-4" />
        <span className="text-text-1 font-medium">I solemnly swear to uphold the Operative's Oath.</span>
      </label>
      <StageNav onNext={onNext} onBack={onBack} nextLabel="Finalize enlistment" disabled={!data.oath} />
    </Stage>
  );
}

// ─────────────────────────────────────────────────────────
// Stage 6 — ID Card
// ─────────────────────────────────────────────────────────
function Stage6({ data, showCard }: { data: EnlistData; showCard: boolean }) {
  const trackKey = data.track || 'general';
  const track = TRACKS[trackKey];
  const clearance = clearanceFor(data.skill || 0);

  return (
    <>
      <div className="font-mono text-[0.6875rem] text-accent-mint tracking-widest uppercase mb-2">// STAGE 06 — INTAKE COMPLETE</div>
      <div className="bg-bg-outer border border-border-strong rounded-[14px] p-5 mb-6 font-mono text-sm leading-7 text-text-2">
        {['identity verified', 'handle registered', 'track assigned', 'cohort matched', 'oath sworn', 'generating ID card...'].map((line, i) => (
          <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.18}s`, animationFillMode: 'both' }}>
            [ <span className="text-success font-bold">✓</span> ] {line}
          </div>
        ))}
      </div>

      <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-opacity duration-700 ${showCard ? 'opacity-100' : 'opacity-0'}`}>
        Welcome aboard.
      </h2>

      {/* ID CARD */}
      <div
        className={`mx-auto max-w-[480px] transition-all duration-700 ${
          showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="rounded-[18px] p-6 border border-accent-mint shadow-card-glow relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(92, 130, 221, 0.15) 0%, rgba(42, 82, 217, 0.1) 50%, rgba(74, 222, 128, 0.08) 100%), #0E1A40',
          }}
        >
          <div className="flex justify-between items-center pb-4 border-b border-dashed border-border-strong">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="" width={44} height={44} className="rounded-md" />
              <div>
                <div className="font-cyber text-base font-bold tracking-widest">CYBERSPECTRE</div>
                <div className="text-[0.6875rem] text-text-4 tracking-wider">MMU Cybersecurity Collective</div>
              </div>
            </div>
            <span className="bg-success/15 text-success border border-success px-2.5 py-1 rounded font-mono text-[0.6875rem] tracking-widest font-bold">
              RECRUIT
            </span>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-5 py-5">
            <div className="w-24 h-24 bg-bg-outer border border-border-strong rounded-xl grid place-items-center text-5xl">
              {track.emoji}
            </div>
            <div className="space-y-1.5">
              {[
                ['CALLSIGN', `@${data.handle || 'operative'}`],
                ['CLEARANCE', clearance],
                ['TRACK', `${track.emoji} ${track.label}`],
                ['FACULTY', (data.faculty || '—').split(' — ')[0]],
                ['ENLISTED', new Date().toISOString().slice(0, 10) + ' · 2026 COHORT'],
                ['CARD ID', data.uid || 'CS-XXXX-XXXX-XXXX'],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[90px_1fr] gap-2 items-center font-mono text-[0.8125rem]">
                  <span className="text-text-4 text-[0.6875rem] tracking-wider">{label}</span>
                  <span className={label === 'CARD ID' ? 'text-accent-mint' : 'text-text-1'}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-dashed border-border-strong pt-4">
            <Barcode seed={(data.uid || '') + (data.handle || '')} />
            <div className="font-mono text-[0.6875rem] text-text-4 tracking-widest text-center mt-2">
              // PRESENT EVERYWHERE · SEEN NOWHERE
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-8 p-7 bg-bg-elevated border border-border-soft rounded-[22px] transition-all duration-700 delay-300 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h3 className="text-xl mb-3">Three things happen now</h3>
        <ol className="list-decimal pl-5 text-text-2 leading-loose mb-5 space-y-1">
          <li><strong>Save your ID card</strong> — right-click the card, save image. You'll need it on Discord.</li>
          <li><strong>Join Discord</strong> — that's where everything happens.</li>
          <li><strong>Show up Sunday</strong> — first weekly lab is your real intake.</li>
        </ol>
        <div className="flex flex-wrap gap-3">
          <a href="#" className="btn-primary btn-primary-lg">Join Discord</a>
          <button
            type="button"
            className="tool-btn"
            onClick={() => {
              if (confirm('Reset and start enlistment over?')) {
                localStorage.removeItem(STORAGE_KEYS.enlistData);
                location.reload();
              }
            }}
          >
            ↻ Start over
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Reusable bits
// ─────────────────────────────────────────────────────────
const fieldCls = 'w-full bg-bg-outer border border-border-strong rounded-lg px-4 py-3 text-text-1 text-[0.9375rem] focus:outline-none focus:border-accent-mint focus:shadow-[0_0_0_4px_rgba(92,130,221,0.12)] transition-all';

function Stage({ tag, title, desc, children }: { tag: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="animate-stage-fade">
      <div className="font-mono text-[0.6875rem] text-accent-mint tracking-widest uppercase mb-2">{tag}</div>
      <h2 className="text-2xl md:text-4xl font-bold mb-2 leading-tight tracking-tight">{title}</h2>
      <p className="text-text-3 mb-8 leading-relaxed">{desc}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-xs text-text-3 tracking-wider uppercase mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function StageNav({ onNext, onBack, nextLabel = 'Continue', disabled = false }: { onNext: () => void; onBack?: () => void; nextLabel?: string; disabled?: boolean }) {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-border-soft">
      {onBack ? (
        <button type="button" className="tool-btn tool-btn-ghost" onClick={onBack}>← back</button>
      ) : (
        <button type="button" className="tool-btn tool-btn-ghost opacity-40" disabled>← back</button>
      )}
      <button type="button" className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed" onClick={onNext} disabled={disabled}>
        <span>{nextLabel}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function Barcode({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const bars = [];
  for (let i = 0; i < 60; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const w = (h % 4) + 1;
    const dark = h % 3 !== 0;
    bars.push(<span key={i} className={dark ? 'bg-text-1' : 'bg-transparent'} style={{ width: `${w}px`, height: '100%', display: 'inline-block' }} />);
  }
  return <div className="flex h-8 gap-px items-center">{bars}</div>;
}

function clearanceFor(skill: number): string {
  for (const c of CLEARANCE_LEVELS) {
    if (skill >= c.min && skill <= c.max) return c.label;
  }
  return CLEARANCE_LEVELS[0].label;
}

function randomUID(): string {
  const hex = '0123456789ABCDEF';
  const part = (n: number) => Array.from({ length: n }, () => hex[Math.floor(Math.random() * 16)]).join('');
  return `CS-${part(4)}-${part(4)}-${part(4)}`;
}
