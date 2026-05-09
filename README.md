# CyberSpectre

MMU's elite cybersecurity collective — built with **React + TypeScript + Tailwind CSS**.

## Stack
- **Vite** — build tool & dev server
- **React 18** + **React Router 6** — UI & routing
- **TypeScript** (strict)
- **Tailwind CSS** — utility-first styling, themed via `tailwind.config.ts`
- **`src/constants.ts`** — central source of truth for colors, fonts, links, theme tokens

## Project structure

```
.
├── index.html                # Vite entry
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts        # mirrors src/constants.ts
├── postcss.config.js
├── public/
│   ├── assets/               # images
│   └── robots.txt            # contains a flag 🚩
├── legacy/                   # old static HTML (kept for reference)
├── src/
│   ├── main.tsx              # entry
│   ├── App.tsx               # router
│   ├── constants.ts          # ⭐ THE THEME — colors, fonts, links, all tokens
│   ├── styles/
│   │   └── globals.css       # Tailwind imports + base styles
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Topbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── KonamiCodeWatcher.tsx
│   │   ├── MatrixRain.tsx
│   │   └── CommandPalette.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Programs.tsx
│   │   ├── Events.tsx
│   │   ├── Tools.tsx
│   │   ├── Flags.tsx
│   │   ├── Enlist.tsx
│   │   ├── FAQ.tsx
│   │   ├── Quiz.tsx
│   │   ├── Recon.tsx
│   │   ├── Scoreboard.tsx
│   │   └── NotFound.tsx
│   └── lib/
│       └── crypto.ts         # encoders, decoders, SHA-256
```

## Commands

```bash
npm install     # install dependencies
npm run dev     # start dev server at http://localhost:8000
npm run build   # production build → dist/
npm run preview # preview production build
npm run lint    # type-check
```

## Theme

Everything visual lives in `src/constants.ts`:
- **`COLORS`** — backgrounds, borders, text, accents, status, Kali palette
- **`FONTS`** — `sans` (Geist), `mono` (Geist Mono), `cyber` (Share Tech Mono)
- **`SITE`** — name, tagline, email, copyright
- **`NAV_LINKS`** / **`FOOTER_LINKS`**
- **`TRACKS`** — the 5 specialty tracks + Generalist
- **`VALID_FLAGS`** — flag-hunt definitions
- **`HANDLE_ADJECTIVES`** / **`HANDLE_NOUNS`** — handle generator pool

Tailwind reads these as utility classes (e.g. `bg-bg-card`, `text-accent-mint`) — config is in `tailwind.config.ts`.

## Features

- **Multi-stage Enlist Console** (`/enlist`) — 6 stages → personalized ID card
- **Hacker Tools** (`/tools`) — Base64, Caesar, ROT13, Hex, URL, SHA-256, Binary, Reverse
- **Flag Hunt** (`/flags`) — 10 flags scattered across the site
- **Konami Code** → Matrix Rain mode
- **Command Palette** — press `/` anywhere
- **Console easter eggs** — open DevTools

## Legacy

The old static HTML/CSS/JS is preserved in `legacy/` for reference. Safe to delete once the React version is fully verified.
