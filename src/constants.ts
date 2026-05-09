/**
 * CyberSpectre — central theme & site constants
 * ═══════════════════════════════════════════════
 * All colors, fonts, spacings, and global config live here.
 * Changing a value here updates the whole app (and tailwind.config.ts reads from this file too).
 */

// ─────────────────────────────────────────────────────────
// COLORS — editorial dark palette
// ─────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds (deepest → lightest)
  bg: {
    outer: '#04081C',
    frame: '#070E28',
    elevated: '#0C1638',
    card: '#0E1A40',
    cardHover: '#152042',
  },

  // Borders
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.07)',
    strong: 'rgba(255, 255, 255, 0.14)',
    active: 'rgba(255, 255, 255, 0.25)',
  },

  // Text (primary → muted)
  text: {
    DEFAULT: '#FAFAFA',
    secondary: '#C8CDDD',
    tertiary: '#A4A8BD',
    quaternary: '#80849A',
  },

  // Accents
  accent: {
    blue: '#2A52D9',
    blueSoft: 'rgba(42, 82, 217, 0.18)',
    mint: '#5C82DD',
    mintSoft: 'rgba(92, 130, 221, 0.18)',
    purple: '#3F66D4',
    ghost: '#C5D2F0',
    shadow: '#0F1A40',
    success: '#4ADE80',
    navyDeep: '#0F2774',
    navyLight: '#5B82E0',
  },

  // Status colors
  status: {
    success: '#4ADE80',
    warning: '#FFD060',
    error: '#FF7070',
  },

  // Kali terminal palette
  kali: {
    bg: '#1A1B26',
    blue: '#7AA2F7',
    purple: '#BB9AF7',
    green: '#9ECE6A',
    red: '#F7768E',
    text: '#C0CAF5',
    textDim: '#80849A',
  },
} as const;

// ─────────────────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────────────────
export const FONTS = {
  sans: "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
  mono: "'Geist Mono', 'JetBrains Mono', 'SF Mono', Menlo, monospace",
  cyber: "'Share Tech Mono', 'Geist Mono', 'JetBrains Mono', monospace",
} as const;

// Google Fonts URL (used in index.html)
export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&family=Share+Tech+Mono&display=swap';

// ─────────────────────────────────────────────────────────
// SPACING & RADIUS
// ─────────────────────────────────────────────────────────
export const RADIUS = {
  sm: '8px',
  DEFAULT: '14px',
  lg: '22px',
  xl: '28px',
} as const;

export const TRANSITION = '0.3s cubic-bezier(0.4, 0, 0.2, 1)';

// ─────────────────────────────────────────────────────────
// SITE METADATA
// ─────────────────────────────────────────────────────────
export const SITE = {
  name: 'CyberSpectre',
  tagline: 'Present everywhere. Seen nowhere.',
  description:
    "MMU's elite cybersecurity collective — operating in the shadows, training in the open.",
  org: 'MMU Cybersecurity Club',
  email: 'cyberspectre@mmu.edu.my',
  twitter: '@C_Spectre',
  copyright: '© 2026 CyberSpectre — MMU Cybersecurity Club',
  motto: '// SECURE · DEFEND · WIN',
} as const;

// ─────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Tools', href: '/tools' },
  { label: 'Enlist', href: '/enlist' },
] as const;

export const FOOTER_LINKS = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Events', href: '/events' },
    { label: 'Tools', href: '/tools' },
    { label: 'Enlist', href: '/enlist' },
  ],
  operations: [
    { label: 'Training', href: '/programs#training' },
    { label: 'CTFs', href: '/programs#ctfs' },
    { label: 'Flag Hunt', href: '/flags' },
    { label: 'FAQ', href: '/faq' },
  ],
  channels: [
    { label: 'Discord', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'CTFtime', href: '#' },
  ],
} as const;

// ─────────────────────────────────────────────────────────
// TRACKS — the 5 specialty tracks + Generalist
// ─────────────────────────────────────────────────────────
export type TrackKey = 'web' | 'crypto' | 'pwn' | 'forensics' | 'redteam' | 'general';

export const TRACKS: Record<TrackKey, { label: string; emoji: string; desc: string }> = {
  web: {
    label: 'WEB SECURITY',
    emoji: '🌐',
    desc: 'SQLi, XSS, IDOR, business logic. The bread and butter of bug bounty.',
  },
  crypto: {
    label: 'CRYPTOGRAPHY',
    emoji: '🔐',
    desc: 'Ciphers, hashes, RSA, elliptic curves. Math meets puzzles.',
  },
  pwn: {
    label: 'PWN / REVERSE',
    emoji: '💣',
    desc: 'Binary exploitation, reverse engineering, low-level hacking.',
  },
  forensics: {
    label: 'FORENSICS / OSINT',
    emoji: '🔬',
    desc: 'Memory dumps, packet captures, hidden data, tracking ghosts.',
  },
  redteam: {
    label: 'RED TEAM',
    emoji: '🎯',
    desc: 'Full attack chains. Recon → exploit → post-exploit. The whole story.',
  },
  general: {
    label: 'GENERALIST',
    emoji: '🧭',
    desc: 'Try everything. Pick later. Best for total beginners.',
  },
};

// ─────────────────────────────────────────────────────────
// ENLIST CLEARANCE LEVELS
// ─────────────────────────────────────────────────────────
export const CLEARANCE_LEVELS = [
  { min: 0, max: 1, label: 'LEVEL 1 · INITIATE' },
  { min: 2, max: 3, label: 'LEVEL 2 · CADET' },
  { min: 4, max: 5, label: 'LEVEL 3 · OPERATIVE' },
  { min: 6, max: 6, label: 'LEVEL 4 · WRAITH' },
] as const;

// ─────────────────────────────────────────────────────────
// FLAG HUNT — definitions
// ─────────────────────────────────────────────────────────
export const VALID_FLAGS: Record<
  string,
  { mission: number; points: number; label: string }
> = {
  'flag{welcome_to_the_machine}':       { mission: 1,  points: 10, label: 'Welcome Mat' },
  'flag{about_the_about_page}':         { mission: 2,  points: 10, label: 'About Face' },
  'flag{programs_have_secrets_too}':    { mission: 3,  points: 10, label: 'Programs Whisper' },
  'flag{recon_pays_off_check_tools}':   { mission: 4,  points: 10, label: "Tools Don't Lie" },
  'flag{sharp_eyes_open}':              { mission: 5,  points: 15, label: "Tool's Microchallenge" },
  'flag{console_logs_reveal_secrets}':  { mission: 6,  points: 10, label: 'Console Logs' },
  'flag{up_up_down_down_left_right}':   { mission: 7,  points: 15, label: "Konami's Honor" },
  'flag{slash_unlocks_the_terminal}':   { mission: 8,  points: 15, label: 'The Slash' },
  'flag{robots_dot_txt_is_open_intel}': { mission: 9,  points: 10, label: 'Robot Overlords' },
  'flag{display_none_isnt_security}':   { mission: 10, points: 20, label: 'Final Boss' },
};

export const FLAG_RANKS = [
  { min: 0,  max: 0,  label: 'ROOKIE 🌱' },
  { min: 1,  max: 2,  label: 'CADET 🟢' },
  { min: 3,  max: 4,  label: 'AGENT 🟡' },
  { min: 5,  max: 6,  label: 'OPERATIVE 🟠' },
  { min: 7,  max: 8,  label: 'SHADOW 🔴' },
  { min: 9,  max: 9,  label: 'SPECTRE 🟣' },
  { min: 10, max: 10, label: 'GHOST 👻 — ALL FLAGS FOUND' },
] as const;

// ─────────────────────────────────────────────────────────
// HANDLE GENERATOR (for callsigns)
// ─────────────────────────────────────────────────────────
export const HANDLE_ADJECTIVES = [
  'ghost', 'shadow', 'phantom', 'silent', 'cyber', 'neon', 'midnight', 'rogue',
  'binary', 'crypto', 'null', 'void', 'echo', 'wraith', 'specter', 'glitch',
  'zero', 'cipher', 'recon', 'nyx',
] as const;

export const HANDLE_NOUNS = [
  'byte', 'bit', 'shell', 'packet', 'hash', 'flag', 'proxy', 'daemon', 'kernel',
  'agent', 'fox', 'hawk', 'wolf', 'raven', 'snake', 'tiger', 'cobra', 'lynx',
  'orbit', 'spectre',
] as const;

// ─────────────────────────────────────────────────────────
// FACULTIES & YEARS (MMU)
// ─────────────────────────────────────────────────────────
export const FACULTIES = [
  'FCI — Computing & Informatics',
  'FOE — Engineering',
  'FOM — Management',
  'FCM — Creative Multimedia',
  'FOL — Law',
  'FAC — Applied Communication',
  'Other',
] as const;

export const YEARS = [
  'Foundation',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4+',
  'Postgrad',
] as const;

// ─────────────────────────────────────────────────────────
// LOCAL STORAGE KEYS
// ─────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  enlistData: 'cs_enlist_data',
  foundFlags: 'cs_found_flags',
  kaliHistory: 'cs_kali_history',
  intakeTarget: 'cs_intake_target',
} as const;

// ─────────────────────────────────────────────────────────
// KONAMI CODE
// ─────────────────────────────────────────────────────────
export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const;
