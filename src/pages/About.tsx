import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <meta name="cs-flag" content="flag{about_the_about_page}" />

      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>about</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// FILE 01 — IDENTITY</div>
        <h1 className="page-title">
          The mission, the <span className="hl-mono">manifesto</span>, and what makes us <span className="hl-italic">different.</span>
        </h1>
        <p className="page-subtitle">
          CyberSpectre exists to develop highly skilled, industry-ready cybersecurity graduates while elevating MMU's national and international standing.
        </p>
      </section>

      <section className="section">
        <div className="kicker mb-4"><span className="kicker-bar" />// 01 — THE MISSION</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          Build operators. <span className="hl-italic">Not students.</span>
        </h2>
        <div className="text-text-2 leading-relaxed text-lg max-w-[760px] space-y-4">
          <p>We don't run lectures. We run operations. Members come in curious. They leave able to defend a network, break into one (ethically), explain why it matters, and represent MMU on national CTF leaderboards.</p>
          <p>The job market doesn't care about your GPA. It cares about whether you've broken into something real. We give you that practice — and the network of people you'll trust for the next decade.</p>
        </div>
      </section>

      <section className="section">
        <div className="kicker mb-4"><span className="kicker-bar" />// 02 — THE ACRONYM</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          <span className="hl-mono">C.S.P.E.C.T.R.E</span> — the <span className="hl-italic">acronym,</span> broken down.
        </h2>
        <p className="text-text-2 mb-8 max-w-[640px]">
          SPECTRE is also the name of a legendary fictional intelligence organisation — secretive, elite, operating in the shadows. The double meaning is intentional. Each letter is a discipline we operate in.
        </p>
        <div className="space-y-2 max-w-[900px]">
          {[
            ['C', 'Cyber', 'The domain we operate in. Every digital surface, every connected system.'],
            ['S', 'Surveillance', 'All-seeing, always-watching reconnaissance.'],
            ['P', 'Penetration', 'The core skill we master. Breaking in, ethically and effectively.'],
            ['E', 'Exploitation', "Finding what's hidden. Turning blind spots into footholds."],
            ['C', 'Covert', 'Invisible. No footprint, no trace, no warning.'],
            ['T', 'Tactical', 'Precision over brute force. Surgical operations, every time.'],
            ['R', 'Recon', 'Know before you strike. Information is the first weapon.'],
            ['E', 'Execution', 'Flawless, ghost-like delivery. Plan to outcome — no noise.'],
          ].map(([letter, key, meaning], i) => (
            <div key={i} className="grid grid-cols-[40px_120px_1fr_50px] gap-4 items-center py-3 border-b border-border-soft">
              <span className="text-2xl font-bold text-accent-mint font-cyber">{letter}</span>
              <span className="font-semibold text-text-1">{key}</span>
              <span className="text-text-3">{meaning}</span>
              <span className="text-text-4 font-mono text-xs">/{(i + 1).toString().padStart(2, '0')}</span>
            </div>
          ))}
        </div>
        <p className="italic text-text-2 mt-8 max-w-[600px]">
          "Present everywhere. Seen nowhere." — our tagline isn't aesthetic, it's the operating principle.
        </p>
      </section>
    </>
  );
}
