import { Link } from 'react-router-dom';

export default function Quiz() {
  return (
    <>
      <section className="page-hero">
        <div className="font-mono text-xs text-text-4 mb-3">
          <Link to="/" className="hover:text-text-1">cyberspectre</Link>
          <span className="mx-2">/</span>
          <span>quiz</span>
        </div>
        <div className="kicker mb-4"><span className="kicker-bar" />// HACKER ARCHETYPE QUIZ</div>
        <h1 className="page-title">What kind of hacker <span className="hl-italic">are you?</span></h1>
        <p className="page-subtitle">A short quiz to recommend your starting track. Coming soon as part of the React rebuild.</p>
      </section>
      <section className="section text-center">
        <Link to="/enlist" className="btn-primary btn-primary-lg">Skip the quiz, just enlist</Link>
      </section>
    </>
  );
}
