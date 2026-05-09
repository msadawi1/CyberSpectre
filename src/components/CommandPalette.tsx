import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OutputLine {
  text: string;
  type: 'info' | 'error' | 'flag' | 'prompt';
}

const ROUTES: Record<string, string> = {
  home: '/',
  about: '/about',
  programs: '/programs',
  events: '/events',
  tools: '/tools',
  flags: '/flags',
  enlist: '/enlist',
  faq: '/faq',
  scoreboard: '/scoreboard',
  quiz: '/quiz',
  recon: '/recon',
};

const SUMMARIES: Record<string, string> = {
  home: "CyberSpectre — MMU's elite cybersecurity collective.",
  about: 'The mission, manifesto, and what makes us different.',
  programs: 'Five tracks. From beginner to elite.',
  events: 'CTFs, workshops, and talks.',
  tools: 'Hacker toolkit — Base64, Caesar, ROT13, Hex, URL, SHA-256, Binary, Reverse.',
  flags: 'Find 10 hidden flags across the site. Earn your rank.',
  enlist: 'Operative intake console — six stages, one ID card.',
  faq: 'Common questions before joining.',
  scoreboard: 'Top operators this month.',
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Open on "/"
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === '/' && !open) {
        e.preventDefault();
        setOpen(true);
        setOutput([
          { text: 'CyberSpectre Command Palette · v1.0', type: 'info' },
          { text: 'type "help" for commands, "exit" to close', type: 'info' },
        ]);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  const print = (text: string, type: OutputLine['type'] = 'info') => {
    setOutput((prev) => [...prev, { text, type }]);
  };

  const run = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    print(`cyberspectre@mmu:~$ ${trimmed}`, 'prompt');
    setHistory((prev) => [trimmed, ...prev]);
    setHistIdx(-1);

    const [base, ...args] = trimmed.split(/\s+/);

    switch (base) {
      case 'help':
        print('Available commands:', 'info');
        print('  goto <page>    — navigate (home, about, programs, events, tools, flags, enlist, faq)');
        print('  whoami         — display current identity');
        print('  ls             — list pages');
        print('  cat <page>     — show page summary');
        print('  date           — current date');
        print('  flag           — drop a flag for the curious 🚩');
        print('  clear          — clear screen');
        print('  exit           — close palette');
        break;
      case 'ls':
        print(Object.keys(ROUTES).join('  '));
        break;
      case 'whoami':
        print('guest@cyberspectre · enlist at /enlist');
        break;
      case 'date':
        print(new Date().toString());
        break;
      case 'flag':
        print('flag{slash_unlocks_the_terminal}', 'flag');
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'exit':
        setOpen(false);
        break;
      case 'goto':
        if (args[0] && ROUTES[args[0]]) {
          navigate(ROUTES[args[0]]);
          setOpen(false);
        } else {
          print(`goto: unknown page '${args[0] || ''}'`, 'error');
        }
        break;
      case 'cat':
        if (args[0] && SUMMARIES[args[0]]) {
          print(SUMMARIES[args[0]]);
        } else {
          print(`cat: ${args[0] || ''}: No such page`, 'error');
        }
        break;
      default:
        print(`command not found: ${base}. type 'help' for a list.`, 'error');
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        const n = histIdx + 1;
        setHistIdx(n);
        setInput(history[n]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        const n = histIdx - 1;
        setHistIdx(n);
        setInput(history[n]);
      } else {
        setHistIdx(-1);
        setInput('');
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-start justify-center pt-[12vh] bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-[min(680px,92vw)] max-h-[70vh] flex flex-col bg-[#050B22] border border-accent-mint rounded-[14px] shadow-cmd-modal overflow-hidden font-mono">
        <div className="px-5 py-4 text-success text-sm border-b border-border-soft flex items-center gap-2">
          <span>cyberspectre@mmu:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="type 'help' and press Enter..."
            className="flex-1 bg-transparent border-0 outline-none text-text-1 text-sm"
            autoComplete="off"
          />
        </div>
        <div ref={outputRef} className="flex-1 overflow-y-auto px-5 py-4 text-[0.8125rem] leading-7 text-text-2">
          {output.map((line, i) => (
            <div
              key={i}
              className={
                line.type === 'prompt'
                  ? 'text-success'
                  : line.type === 'error'
                    ? 'text-error'
                    : line.type === 'flag'
                      ? 'text-success font-bold'
                      : 'text-text-2'
              }
            >
              {line.text}
            </div>
          ))}
        </div>
        <div className="px-5 py-2 border-t border-border-soft text-text-4 text-xs">
          esc to close · ↑↓ history
        </div>
      </div>
    </div>
  );
}
