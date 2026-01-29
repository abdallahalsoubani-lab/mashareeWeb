import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#2A2A2A',
          tertiary: '#1a1a1a',
          light: '#3a3a3a',
          card: '#2A2A2A',
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
        primary: 'rgba(143, 127, 94, 0.4)',
        'primary-light': 'rgba(143, 127, 94, 0.2)',
      },
      boxShadow: {
        'glow-sm': '0 0 25px rgba(143, 127, 94, 0.3), 0 0 50px rgba(143, 127, 94, 0.15)',
        'glow-md': '0 0 35px rgba(143, 127, 94, 0.4), 0 0 70px rgba(143, 127, 94, 0.2)',
        'glow-lg': '0 0 50px rgba(143, 127, 94, 0.5), 0 0 100px rgba(143, 127, 94, 0.25)',
        'glow-gold': '0 0 35px rgba(143, 127, 94, 0.4), 0 0 70px rgba(143, 127, 94, 0.2)',
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
