import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      'xs': ['0.6rem', { lineHeight: '0.9rem' }],
      'sm': ['0.7rem', { lineHeight: '1.1rem' }],
      'base': ['0.8rem', { lineHeight: '1.3rem' }],
      'lg': ['0.9rem', { lineHeight: '1.5rem' }],
      'xl': ['1rem', { lineHeight: '1.6rem' }],
      '2xl': ['1.2rem', { lineHeight: '1.8rem' }],
      '3xl': ['1.5rem', { lineHeight: '2rem' }],
      '4xl': ['1.8rem', { lineHeight: '2.2rem' }],
      '5xl': ['2.2rem', { lineHeight: '1' }],
      '6xl': ['2.6rem', { lineHeight: '1' }],
      '7xl': ['3rem', { lineHeight: '1' }],
      '8xl': ['3.8rem', { lineHeight: '1' }],
      '9xl': ['5rem', { lineHeight: '1' }],
    },
    spacing: {
      '0': '0',
      '1': '0.2rem',
      '2': '0.4rem',
      '3': '0.6rem',
      '4': '0.8rem',
      '5': '1rem',
      '6': '1.2rem',
      '7': '1.4rem',
      '8': '1.6rem',
      '9': '1.8rem',
      '10': '2rem',
      '11': '2.2rem',
      '12': '2.4rem',
      '14': '2.8rem',
      '16': '3.2rem',
      '20': '4rem',
      '24': '4.8rem',
      '28': '5.6rem',
      '32': '6.4rem',
      '36': '7.2rem',
      '40': '8rem',
      '44': '8.8rem',
      '48': '9.6rem',
      '52': '10.4rem',
      '56': '11.2rem',
      '60': '12rem',
      '64': '12.8rem',
      '72': '14.4rem',
      '80': '16rem',
      '96': '19.2rem',
    },
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000',
          secondary: '#000000',
          tertiary: '#151515',
          light: '#1a1a1a',
          card: '#0A0A0A',
        },
        primary: {
          DEFAULT: '#8F7F5E',
          50: '#f5f3ef',
          100: '#ebe7dd',
          200: '#d7cfbb',
          300: '#c3b799',
          400: '#af9f77',
          500: '#8F7F5E',
          600: '#72664b',
          700: '#564c38',
          800: '#393326',
          900: '#1d1913',
        },
        secondary: {
          DEFAULT: '#99A1AF',
          light: '#b3b9c5',
          dark: '#7f8999',
        },
        accent: {
          gold: '#8F7F5E',
          gray: '#99A1AF',
          teal: '#8F7F5E',
          purple: '#8F7F5E',
          green: '#8F7F5E',
        },
        text: {
          primary: '#ffffff',
          secondary: '#99A1AF',
          muted: '#6b7280',
          dimmed: '#4b5563',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8F7F5E 0%, #72664b 50%, #564c38 100%)',
        'gradient-accent': 'linear-gradient(135deg, #8F7F5E 0%, #99A1AF 100%)',
        'gradient-gold': 'linear-gradient(135deg, #8F7F5E 0%, #72664b 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(35, 25%, 47%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(210, 12%, 64%, 0.1) 0px, transparent 50%)',
      },
      borderColor: {
        primary: 'rgba(143, 127, 94, 0.8)',
        'primary-light': 'rgba(143, 127, 94, 0.6)',
        'primary-lighter': 'rgba(143, 127, 94, 0.4)',
      },
      boxShadow: {
        'glow-sm': '0 0 30px rgba(143, 127, 94, 0.4), 0 0 60px rgba(143, 127, 94, 0.2), 0 6px 16px rgba(0, 0, 0, 0.6)',
        'glow-md': '0 0 40px rgba(143, 127, 94, 0.5), 0 0 80px rgba(143, 127, 94, 0.25), 0 8px 20px rgba(0, 0, 0, 0.7)',
        'glow-lg': '0 0 60px rgba(143, 127, 94, 0.6), 0 0 120px rgba(143, 127, 94, 0.3), 0 10px 24px rgba(0, 0, 0, 0.8)',
        'glow-gold': '0 0 40px rgba(143, 127, 94, 0.5), 0 0 80px rgba(143, 127, 94, 0.25), 0 8px 20px rgba(0, 0, 0, 0.7)',
        'card': '0 6px 20px rgba(0, 0, 0, 0.7), 0 0 35px rgba(143, 127, 94, 0.25), inset 0 0 40px rgba(143, 127, 94, 0.05)',
        'card-hover': '0 10px 28px rgba(0, 0, 0, 0.8), 0 0 50px rgba(143, 127, 94, 0.35), inset 0 0 60px rgba(143, 127, 94, 0.08)',
        'input': '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(143, 127, 94, 0.15), inset 0 0 30px rgba(143, 127, 94, 0.05)',
        'input-focus': '0 6px 16px rgba(0, 0, 0, 0.6), 0 0 30px rgba(143, 127, 94, 0.4), inset 0 0 40px rgba(143, 127, 94, 0.08)',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInScale: {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.6)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
