import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          black: '#05070d',
          panel: '#0b1220',
          card: '#111a2d',
          line: '#26344f',
          blue: '#3776ab',
          yellow: '#ffd43b',
          ink: '#d9e6f2',
          muted: '#8aa0b7',
          green: '#37d399',
        },
      },
      boxShadow: {
        glow: '0 0 60px rgba(55, 118, 171, 0.35)',
        card: '0 18px 70px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
