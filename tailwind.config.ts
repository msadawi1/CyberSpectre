import type { Config } from 'tailwindcss';

/**
 * Tailwind config — mirrors src/constants.ts so the design tokens
 * are available as Tailwind utility classes (e.g. `bg-bg-card`, `text-accent-mint`).
 *
 * Keep in sync with src/constants.ts.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-outer': '#04081C',
        'bg-frame': '#070E28',
        'bg-elevated': '#0C1638',
        'bg-card': '#0E1A40',
        'bg-card-hover': '#152042',

        // Borders (use as `border-soft`, `border-strong`, etc.)
        'border-soft': 'rgba(255, 255, 255, 0.07)',
        'border-strong': 'rgba(255, 255, 255, 0.14)',
        'border-active': 'rgba(255, 255, 255, 0.25)',

        // Text
        'text-1': '#FAFAFA',
        'text-2': '#C8CDDD',
        'text-3': '#A4A8BD',
        'text-4': '#80849A',

        // Accents
        accent: {
          blue: '#2A52D9',
          'blue-soft': 'rgba(42, 82, 217, 0.18)',
          mint: '#5C82DD',
          'mint-soft': 'rgba(92, 130, 221, 0.18)',
          purple: '#3F66D4',
          ghost: '#C5D2F0',
          shadow: '#0F1A40',
          success: '#4ADE80',
          'navy-deep': '#0F2774',
          'navy-light': '#5B82E0',
        },

        // Status
        success: '#4ADE80',
        warning: '#FFD060',
        error: '#FF7070',

        // Kali terminal palette
        kali: {
          bg: '#1A1B26',
          blue: '#7AA2F7',
          purple: '#BB9AF7',
          green: '#9ECE6A',
          red: '#F7768E',
          text: '#C0CAF5',
          'text-dim': '#80849A',
        },
      },
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "SF Mono", "Menlo", "monospace"],
        cyber: ["Share Tech Mono", "Geist Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '14px',
        lg: '22px',
        xl: '28px',
      },
      animation: {
        'kali-blink': 'kaliBlink 1s steps(2) infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'stage-fade': 'stageFadeIn 0.4s ease-out',
        'matrix-fade-out': 'fadeOut 5s forwards',
      },
      keyframes: {
        kaliBlink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        stageFadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%, 40%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
      },
      boxShadow: {
        'card-glow':
          '0 30px 80px -20px rgba(0, 0, 0, 0.6), 0 0 60px -15px rgba(92, 130, 221, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'cmd-modal':
          '0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 60px -10px rgba(92, 130, 221, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
