import { useState } from 'react';
import { Link } from 'react-router-dom';
import { base64Decode, caesar, hexDecode } from '../lib/crypto';

interface PuzzleProps {
  num: string;
  title: string;
  cipher: string;
  expected: string;
  hint: React.ReactNode;
  solve: (input: string) => boolean;
  onSolved: () => void;
}

function Puzzle({ num, title, cipher, hint, solve, onSolved }: PuzzleProps) {
  const [val, setVal] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'right'>('idle');

  const submit = () => {
    if (solve(val.trim())) {
      setFeedback('right');
      onSolved();
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <div className="bg-bg-card border border-border-soft rounded-[14px] p-6">
      <div className="flex justify-between mb-3">
        <span className="font-mono text-[0.6875rem] text-accent-mint tracking-widest">// {num} — {title}</span>
        <span className="bg-accent-mint-soft text-accent-mint px-2 py-0.5 rounded font-mono text-[0.6875rem]">
          EASY
        </span>
      </div>
      <code className="block bg-bg-outer border border-border-strong rounded-lg p-4 text-accent-mint font-mono text-sm mb-4 break-all">
        {cipher}
      </code>
      <div className="flex gap-2">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="enter decoded answer..."
          className="flex-1 bg-bg-outer border border-border-strong rounded-lg px-3 py-2 text-text-1 font-mono text-sm focus:outline-none focus:border-accent-mint"
        />
        <button onClick={submit} className="btn-primary">SUBMIT</button>
      </div>
      {feedback === 'right' && <p className="mt-3 text-success font-mono text-sm">✓ Correct!</p>}
      {feedback === 'wrong' && <p className="mt-3 text-error font-mono text-sm">✗ Try again.</p>}
      <p className="mt-3 text-text-4 text-xs">// hint: {hint}</p>
    </div>
  );
}

export default function Recon() {
  const [solved, setSolved] = useState({ p1: false, p2: false, p3: false });
  const allSolved = solved.p1 && solved.p2 && solved.p3;

  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>recon</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// CHALLENGE 00 · UNCLASSIFIED</div>
        <h1 className="page-title">
          Three ciphers. <span className="hl-mono">One badge.</span> <span className="hl-italic">Solve to enter.</span>
        </h1>
        <p className="page-subtitle">
          Anyone can fill out a form. We want to see how you think. Decode all three to unlock the application.
        </p>
      </section>

      <section className="section max-w-[820px]">
        <div className="space-y-5">
          <Puzzle
            num="01" title="BASE64"
            cipher="Z2hvc3QtcHJvdG9jb2w="
            expected="ghost-protocol"
            hint={<>try a Base64 decoder (we have one in <Link to="/tools" className="text-accent-mint underline">/tools</Link>)</>}
            solve={(input) => {
              try { return base64Decode("Z2hvc3QtcHJvdG9jb2w=") === input.toLowerCase(); }
              catch { return false; }
            }}
            onSolved={() => setSolved((s) => ({ ...s, p1: true }))}
          />
          <Puzzle
            num="02" title="CAESAR CIPHER"
            cipher="FBEHUVSHFWUH"
            expected="cyberspectre"
            hint={<>shift each letter back by <code className="bg-bg-outer px-1 rounded text-accent-mint">3</code> positions</>}
            solve={(input) => caesar("FBEHUVSHFWUH", -3).toLowerCase() === input.toLowerCase()}
            onSolved={() => setSolved((s) => ({ ...s, p2: true }))}
          />
          <Puzzle
            num="03" title="HEX → ASCII"
            cipher="73 65 65 6e 20 6e 6f 77 68 65 72 65"
            expected="seen nowhere"
            hint={<><code className="bg-bg-outer px-1 rounded text-accent-mint">0x73 = 's'</code> — convert each pair</>}
            solve={(input) => {
              try { return hexDecode("73 65 65 6e 20 6e 6f 77 68 65 72 65").toLowerCase() === input.toLowerCase(); }
              catch { return false; }
            }}
            onSolved={() => setSolved((s) => ({ ...s, p3: true }))}
          />
        </div>

        {allSolved && (
          <div className="mt-10 p-7 bg-success/5 border border-success rounded-[22px] text-center animate-fade-in">
            <div className="status-pill mb-4 mx-auto">
              <span className="status-dot" />
              <span>BADGE UNLOCKED · RECON_INITIATE</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Three for three. <span className="hl-italic">Welcome.</span></h2>
            <p className="text-text-2 mb-6">
              You decoded all three. Bring this badge to your application — we'll know.
            </p>
            <Link to="/enlist" className="btn-primary btn-primary-lg">Apply with badge</Link>
          </div>
        )}
      </section>
    </>
  );
}
