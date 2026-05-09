import { Link } from 'react-router-dom';
import { SITE } from '../constants';
//  @ts-ignore
import logo from '../../assets/logo.png';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="max-w-[880px] mx-auto relative z-10">
          <img
            src={logo}
            alt="CyberSpectre logo"
            className="w-[140px] md:w-[180px] mx-auto mb-6"
          />

          <h1 className="text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.95] tracking-[-0.05em] mb-7">
            <span className="text-text-1">Cyber</span>
            <span className="bg-gradient-to-r from-accent-mint to-accent-blue bg-clip-text text-transparent">
              Spectre
            </span>
          </h1>

          <p className="text-text-3 text-lg leading-relaxed max-w-[620px] mx-auto mb-8">
            We are <span className="text-text-1 font-medium">MMU's elite cybersecurity collective.</span>{' '}
            {SITE.tagline} — CTFs, hands-on workshops, and the team putting MMU on Malaysia's cybersecurity map.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link to="/enlist" className="btn-primary btn-primary-lg">
              <span>Enlist now</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border-strong text-text-2 hover:text-text-1 hover:border-accent-mint transition-colors"
            >
              <span>✦</span>
              <span>Read our manifesto</span>
            </Link>
          </div>

          {/* Hero stats */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-text-3 font-mono text-sm">
            <span><strong className="text-text-1">121</strong> surveyed</span>
            <span className="text-text-4">·</span>
            <span><strong className="text-text-1">99.2%</strong> said yes</span>
            <span className="text-text-4">·</span>
            <span><strong className="text-text-1">120+</strong> members</span>
          </div>
        </div>
      </section>

      {/* QUICK CARDS — file system style */}
      <section className="section">
        <div className="kicker mb-6">
          <span className="kicker-bar" />// QUICK ACCESS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">
          Explore the <span className="hl-italic">collective.</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickCard
            num="/01 — IDENTITY"
            title="About CyberSpectre"
            desc="The mission, the CSPECTRE acronym, and what makes us different from every other club."
            tags={['mission', 'vision', 'differentiators']}
            href="/about"
          />
          <QuickCard
            num="/02 — TRAINING"
            title="Programs & CTFs"
            desc="Five training tracks, the CTF roadmap from local to international, and how members level up."
            tags={['workshops', 'CTFs', 'roadmap']}
            href="/programs"
          />
          <QuickCard
            num="/03 — TOOLKIT"
            title="Hacker Toolkit"
            desc="Base64, Caesar, ROT13, Hex, URL, SHA-256, Binary — quick CTF helpers built into the website."
            tags={['decoders', 'ciphers', 'hashes']}
            href="/tools"
          />
          <QuickCard
            num="/04 — ENLIST"
            title="Operative Intake"
            desc="Six stages. One personalized hacker ID card. The most fun way you'll ever apply to a club."
            tags={['intake', 'ID card', 'console']}
            href="/enlist"
          />
        </div>
      </section>

      {/* FOUNDING INTAKE CTA */}
      <section className="section">
        <div className="bg-bg-card border border-border-soft rounded-[22px] p-8 md:p-12 text-center">
          <div className="kicker justify-center mb-4">
            <span className="kicker-bar" />// READY?
          </div>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Open to all MMU students. <span className="hl-italic">Beginners welcome.</span>
          </h3>
          <p className="text-text-3 max-w-[540px] mx-auto mb-6">
            No prior experience needed. We move slow on purpose — confusion is the feeling of learning. Stick with us, we'll get you through it.
          </p>
          <Link to="/enlist" className="btn-primary btn-primary-lg">
            <span>Start enlistment</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

function QuickCard({
  num,
  title,
  desc,
  tags,
  href,
}: {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group block bg-bg-card border border-border-soft rounded-[14px] p-5 hover:border-accent-mint hover:bg-bg-card-hover transition-all"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[0.6875rem] text-text-4 tracking-wider">{num}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="text-text-4 group-hover:text-accent-mint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        >
          <path
            d="M5 15L15 5M15 5H7M15 5V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-text-1 text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-3 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[0.6875rem] font-mono text-text-3 bg-bg-elevated border border-border-soft rounded px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
