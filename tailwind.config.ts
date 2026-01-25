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
          DEFAULT: '#0a0e1a',
          secondary: '#141824',
          tertiary: '#1e2330',
          light: '#252b3f',
          card: '#161b2e',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          teal: '#06b6d4',
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f59e0b',
          green: '#10b981',
          cyan: '#22d3ee',
          violet: '#a855f7',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          muted: '#94a3b8',
          dimmed: '#64748b',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
        'gradient-teal': 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #fbbf24 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(250, 95%, 70%, 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200, 95%, 60%, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280, 95%, 70%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(330, 95%, 65%, 0.15) 0px, transparent 50%)',
      },
      borderColor: {
        primary: 'rgba(59, 130, 246, 0.4)',
        'primary-light': 'rgba(59, 130, 246, 0.2)',
      },
      boxShadow: {
        'glow-sm': '0 0 25px rgba(139, 92, 246, 0.4), 0 0 50px rgba(59, 130, 246, 0.2)',
        'glow-md': '0 0 35px rgba(139, 92, 246, 0.5), 0 0 70px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 50px rgba(139, 92, 246, 0.6), 0 0 100px rgba(59, 130, 246, 0.4)',
        'glow-teal': '0 0 35px rgba(6, 182, 212, 0.5), 0 0 70px rgba(20, 184, 166, 0.3)',
        'glow-purple': '0 0 35px rgba(139, 92, 246, 0.5), 0 0 70px rgba(168, 85, 247, 0.3)',
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
