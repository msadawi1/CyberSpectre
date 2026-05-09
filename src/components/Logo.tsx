import { Link } from 'react-router-dom';
import { SITE } from '../constants';

interface LogoProps {
  size?: number;
  showName?: boolean;
  className?: string;
}

export default function Logo({ size = 40, showName = true, className = '' }: LogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/assets/logo.png"
        alt={`${SITE.name} logo`}
        width={size}
        height={size}
        className="rounded-md"
      />
      {showName && (
        <span className="font-semibold tracking-tight text-text-1">
          {SITE.name.toLowerCase()}
        </span>
      )}
    </Link>
  );
}
