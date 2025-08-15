/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* light gray border */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* deep trust blue */
        background: 'var(--color-background)', /* warm off-white */
        foreground: 'var(--color-foreground)', /* rich black */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep trust blue */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* vibrant indigo */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* light gray */
          foreground: 'var(--color-muted-foreground)', /* balanced gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* electric amber */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* rich black */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)', /* rich black */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* fresh green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        'conversion-accent': {
          DEFAULT: 'var(--color-conversion-accent)', /* electric purple */
          foreground: 'var(--color-conversion-accent-foreground)', /* white */
        },
        'urban-pulse': {
          DEFAULT: 'var(--color-urban-pulse)', /* vibrant yellow */
          foreground: 'var(--color-urban-pulse-foreground)', /* rich black */
        },
        'text-primary': 'var(--color-text-primary)', /* rich black */
        'text-secondary': 'var(--color-text-secondary)', /* balanced gray */
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        headline: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        cta: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        headline: '800',
        'value-prop': '600',
        body: '400',
        cta: '700',
        accent: '400',
      },
      letterSpacing: {
        headline: '-0.02em',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'brand-card': 'var(--shadow-brand-card)',
        'brand-modal': 'var(--shadow-brand-modal)',
      },
      animation: {
        'pulse-brand': 'pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        'pulse-brand': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        'text-reveal': {
          'from': {
            'clip-path': 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
          },
          'to': {
            'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          },
        },
      },
      transitionTimingFunction: {
        'brand': 'ease-out',
        'micro': 'ease-out',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        'brand': '300ms',
        'micro': '200ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}