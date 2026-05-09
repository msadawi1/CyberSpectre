import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6 text-center">
      <div>
        <div className="font-mono text-accent-mint text-sm mb-3">// 404 — RESOURCE NOT FOUND</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Off the map.</h1>
        <p className="text-text-3 max-w-md mx-auto mb-6">
          That route doesn't exist on our network. Maybe try the command palette? <kbd className="bg-bg-elevated px-1.5 py-0.5 rounded text-accent-mint font-mono text-xs">/</kbd> opens it.
        </p>
        <Link to="/" className="btn-primary btn-primary-lg">← Back to home</Link>
      </div>
    </section>
  );
}
