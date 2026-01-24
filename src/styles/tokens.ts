/**
 * Design Tokens
 * Extracted from Masharee.jsx
 * All colors, effects, and styling constants for the Masharee platform
 */

export const colors = {
  // Main backgrounds
  background: {
    primary: '#1a1a1a',
    secondary: '#5c4d3a',
    tertiary: '#8b7355',
    light: '#2a2a2a',
  },

  // Gold/Primary accent color
  gold: {
    DEFAULT: '#c9a227',
    light: '#d4b94c',
    dark: '#9a7b1c',
  },

  // Text colors
  text: {
    primary: '#f5f0e8',
    secondary: '#b0a090',
    muted: '#8b7355',
  },

  // Status colors
  status: {
    success: 'rgb(34, 197, 94)', // green-500
    warning: 'rgb(249, 115, 22)', // orange-500
    info: 'rgb(59, 130, 246)', // blue-500
    exclusive: 'rgb(168, 85, 247)', // purple-500
    error: 'rgb(239, 68, 68)', // red-500
  },

  // Border colors
  border: {
    gold: 'rgba(201, 162, 39, 0.3)',
    subtle: 'rgba(139, 115, 85, 0.3)',
    goldLight: 'rgba(201, 162, 39, 0.2)',
  },
};

export const effects = {
  // Glass morphism effect
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    blur: 'blur(10px)',
    border: '1px solid rgba(201, 162, 39, 0.2)',
  },

  // Gold gradient
  goldGradient: 'linear-gradient(135deg, #d4b94c 0%, #c9a227 50%, #9a7b1c 100%)',

  // Noise overlay
  noiseOverlay: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,

  // Pattern
  pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

export const typography = {
  fontFamily: {
    default: "'Tajawal', sans-serif",
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
    black: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
};

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  gold: '0 0 30px rgba(201, 162, 39, 0.3)',
  'gold-lg': '0 0 50px rgba(201, 162, 39, 0.5)',
};

export const animations = {
  fadeInUp: 'fadeInUp 0.8s ease-out forwards',
  float: 'float 3s ease-in-out infinite',
  shimmer: 'shimmer 2s ease-in-out infinite',
  pulse: 'pulse 2s infinite',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
