import { Link } from 'react-router-dom';

const FAQS = [
  { q: "I've never coded before. Can I still join?", a: "Yes. The first 8 weeks have zero coding required. We start from scratch — what is a terminal, what is the internet, what is a hack." },
  { q: "Do I have to be a CS student?", a: "No. We have members from Engineering, Business, Design, Law, Communication. Cybersecurity is a mindset, not a major." },
  { q: "How much time will it take?", a: "About 3–5 hours per teaching week — Sunday lab (2h) + optional Wednesday office hours + async Discord. ZERO during exam weeks." },
  { q: "Will I get left behind if I miss a session?", a: "No. Recap videos in Discord, Wednesday office hours, and your buddy catches you up. Buddies don't let buddies fall behind." },
  { q: "Why is Burp Suite four weeks?", a: "Because it actually takes four weeks to be comfortable. A 1-day 'Burp crash course' produces members who don't remember it the next week. We move slow on purpose." },
  { q: "When will I get to do 'real' hacking?", a: "Phase 3 Week 1. By then you'll have foundations + tools, and the hacking will feel earned." },
  { q: "Is there a fee?", a: "Free to join. Free workshops. Free tools. We're a club, not a course." },
  { q: "Does the club help with internships?", a: "That's a core goal. Active members get early access through the Discord #opportunities channel." },
];

export default function FAQ() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>faq</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 04 — FAQ</div>
        <h1 className="page-title">Common questions, <span className="hl-italic">before joining.</span></h1>
      </section>

      <section className="section max-w-[800px]">
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="bg-bg-card border border-border-soft rounded-lg p-5 group">
              <summary className="flex items-center gap-3 cursor-pointer">
                <span className="font-mono text-[0.6875rem] text-accent-mint">/{(i + 1).toString().padStart(2, '0')}</span>
                <span className="font-semibold text-text-1 flex-1">{f.q}</span>
                <span className="text-text-4 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-text-3 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 p-7 bg-bg-card border border-border-soft rounded-[22px] text-center">
          <h3 className="text-xl font-bold mb-2">Question not <span className="hl-italic">answered?</span></h3>
          <p className="text-text-3 mb-5">Ask us in Discord — we usually reply within an hour.</p>
          <Link to="/enlist" className="btn-primary btn-primary-lg">Enlist now</Link>
        </div>
      </section>
    </>
  );
}
