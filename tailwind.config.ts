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
          DEFAULT: '#1a1a1a',
          secondary: '#5c4d3a',
          tertiary: '#8b7355',
          light: '#2a2a2a',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#d4b94c',
          dark: '#9a7b1c',
        },
        text: {
          primary: '#f5f0e8',
          secondary: '#b0a090',
          muted: '#8b7355',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4b94c 0%, #c9a227 50%, #9a7b1c 100%)',
        'noise-pattern': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
      },
      borderColor: {
        gold: 'rgba(201, 162, 39, 0.3)',
        'gold-light': 'rgba(201, 162, 39, 0.2)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 162, 39, 0.3)',
        'gold-lg': '0 0 50px rgba(201, 162, 39, 0.5)',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
