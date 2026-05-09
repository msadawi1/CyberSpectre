import { useState } from 'react';
import {
  base64Encode,
  base64Decode,
  caesar,
  caesarBruteforce,
  rot13,
  hexEncode,
  hexDecode,
  binaryEncode,
  binaryDecode,
  reverseText,
  sha256,
} from '../lib/crypto';

export default function Tools() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <a href="/" className="hover:text-text-1">cyberspectre</a>
          <span className="mx-2">/</span>
          <span>tools</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 09 — HACKER TOOLKIT</div>
        <h1 className="page-title">
          Your <span className="hl-mono">arsenal</span> of <span className="hl-italic">decoders.</span>
        </h1>
        <p className="page-subtitle">
          Quick CTF helpers — encode and decode in one place. Built into the website so you never have to leave when solving challenges.
        </p>
      </section>

      <section className="section">
        <div className="grid md:grid-cols-2 gap-5">
          <Base64Card />
          <CaesarCard />
          <Rot13Card />
          <HexCard />
          <UrlCard />
          <HashCard />
          <BinaryCard />
          <ReverseCard />
        </div>

        <div className="flex gap-4 bg-accent-blue-soft border border-accent-mint/30 rounded-[14px] p-5 mt-8 text-text-2">
          <span className="text-2xl">💡</span>
          <p>
            <strong>Pro tip:</strong> Try chaining tools. Many CTF challenges layer multiple encodings — Base64 of ROT13 of Hex, for example. Decode each layer until you hit a flag.
          </p>
        </div>

        <div className="bg-bg-card border border-success rounded-[22px] p-7 mt-8">
          <span className="font-mono text-[0.6875rem] text-success tracking-widest uppercase">// MICRO-CHALLENGE</span>
          <h3 className="text-xl mt-2 mb-4">What does this decode to?</h3>
          <code className="block bg-bg-outer border border-border-strong rounded-lg p-4 text-accent-mint font-mono text-[0.8125rem] break-all mb-4">
            Q3liZXJTcGVjdHJlIGlzIHJlY3J1aXRpbmcgaW4gQXVndXN0LiBmbGFne3NoYXJwX2V5ZXNfb3Blbn0=
          </code>
          <p className="text-text-3 text-sm">
            Hint: it's encoded with one of the tools above. Decode it. The flag inside counts toward your{' '}
            <a href="/flags" className="text-accent-mint hover:text-accent-success underline">CTF score</a>.
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// Reusable tool card
// ─────────────────────────────────────────────────────────
interface ToolCardProps {
  num: string;
  title: string;
  icon: string;
  desc: React.ReactNode;
  children: React.ReactNode;
}

function ToolCard({ num, title, icon, desc, children }: ToolCardProps) {
  return (
    <div className="bg-bg-card border border-border-soft rounded-[22px] p-6 flex flex-col gap-3 hover:border-accent-mint hover:-translate-y-0.5 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <span className="font-mono text-[0.6875rem] text-text-4 tracking-wider block mb-1">{num}</span>
          <h3 className="text-lg font-semibold text-text-1">{title}</h3>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-text-3 text-sm leading-relaxed">{desc}</p>
      {children}
    </div>
  );
}

function ToolOutput({ value, mono = false }: { value: string; mono?: boolean }) {
  return (
    <div
      className={`bg-bg-outer border border-border-strong border-dashed rounded-lg p-3 text-success font-mono text-[0.8125rem] min-h-[50px] break-all whitespace-pre-wrap ${
        mono ? 'text-[0.75rem] text-accent-mint' : ''
      }`}
    >
      {value || '→ output appears here'}
    </div>
  );
}

const inputCls =
  'bg-bg-outer border border-border-strong rounded-lg p-3 text-text-1 font-mono text-sm resize-y min-h-[60px] focus:outline-none focus:border-accent-mint';

const copy = (text: string) => navigator.clipboard?.writeText(text);

// ─────────────────────────────────────────────────────────
// Individual cards
// ─────────────────────────────────────────────────────────
function Base64Card() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 01" title="Base64" icon="🅱️" desc="Encode plain text to Base64 or decode Base64 back to text. Most common encoding in CTFs.">
      <textarea className={inputCls} placeholder="Type or paste here..." rows={3} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => { try { setOutput(base64Encode(input)); } catch { setOutput('⚠ contains non-Latin1 characters'); } }}>Encode</button>
        <button className="tool-btn" onClick={() => { try { setOutput(base64Decode(input)); } catch { setOutput('⚠ invalid Base64'); } }}>Decode</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}

function CaesarCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shift, setShift] = useState(3);

  return (
    <ToolCard num="// 02" title="Caesar Cipher" icon="🏛️" desc='Shift each letter by N positions. Try shift=3 for classic Caesar, or click "Brute force" to see all 25 shifts.'>
      <textarea className={inputCls} placeholder="Type or paste here..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <label className="font-mono text-xs text-text-3">Shift: <span className="text-accent-mint">{shift}</span></label>
      <input type="range" min={0} max={25} value={shift} onChange={(e) => setShift(parseInt(e.target.value))} className="w-full accent-accent-mint" />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(caesar(input, shift))}>Shift</button>
        <button className="tool-btn" onClick={() => setOutput(caesarBruteforce(input))}>Brute force all 25</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}

function Rot13Card() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 03" title="ROT13" icon="🔁" desc='Caesar with shift=13. Apply twice to get the original. Beloved by CTF authors for "easy" challenges.'>
      <textarea className={inputCls} placeholder="Type or paste here..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(rot13(input))}>ROT13</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}

function HexCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 04" title="Hex ⇄ Text" icon="🔢" desc={<>Convert plain text to hexadecimal or vice versa. Useful when you see <code className="bg-bg-elevated px-1 rounded text-accent-mint">48656c6c6f</code> in a challenge.</>}>
      <textarea className={inputCls} placeholder="Type text or hex (with or without spaces)..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(hexEncode(input))}>Text → Hex</button>
        <button className="tool-btn" onClick={() => { try { setOutput(hexDecode(input)); } catch { setOutput('⚠ invalid hex'); } }}>Hex → Text</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}

function UrlCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 05" title="URL Encode" icon="🔗" desc={<>Convert special characters to <code className="bg-bg-elevated px-1 rounded text-accent-mint">%20</code>-style encoding for URLs.</>}>
      <textarea className={inputCls} placeholder="Type or paste here..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(encodeURIComponent(input))}>Encode</button>
        <button className="tool-btn" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { setOutput('⚠ invalid URL encoding'); } }}>Decode</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}

function HashCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 06" title="SHA-256 Hash" icon="🔐" desc="Generate a SHA-256 hash of any string. One-way function — you can hash, but you can't unhash.">
      <textarea className={inputCls} placeholder="Type or paste here..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={async () => setOutput(await sha256(input))}>Hash</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} mono />
    </ToolCard>
  );
}

function BinaryCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 07" title="Binary ⇄ Text" icon="0️⃣1️⃣" desc={<>Convert plain text to <code className="bg-bg-elevated px-1 rounded text-accent-mint">01001000 01101001</code> or back.</>}>
      <textarea className={inputCls} placeholder="Type text or binary..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(binaryEncode(input))}>Text → Binary</button>
        <button className="tool-btn" onClick={() => { try { setOutput(binaryDecode(input)); } catch { setOutput('⚠ invalid binary (must be groups of 8 bits)'); } }}>Binary → Text</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} mono />
    </ToolCard>
  );
}

function ReverseCard() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolCard num="// 08" title="Reverse Text" icon="↩️" desc="Flip a string backwards. Sometimes flags are just hidden in reverse — always check.">
      <textarea className={inputCls} placeholder="Type or paste here..." rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2 flex-wrap">
        <button className="tool-btn tool-btn-primary" onClick={() => setOutput(reverseText(input))}>Reverse</button>
        <button className="tool-btn tool-btn-ghost" onClick={() => copy(output)}>Copy</button>
      </div>
      <ToolOutput value={output} />
    </ToolCard>
  );
}
