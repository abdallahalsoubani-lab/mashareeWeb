/**
 * Dashboard Design Tokens
 * Light theme with blue primary color
 */

export const dashboardColors = {
  background: {
    primary: '#f8fafc',    // slate-50
    secondary: '#f1f5f9',  // slate-100
    tertiary: '#e2e8f0',   // slate-200
    card: '#ffffff',
  },
  primary: {
    DEFAULT: '#2563eb',    // blue-600
    light: '#3b82f6',      // blue-500
    lighter: '#60a5fa',    // blue-400
    dark: '#1d4ed8',       // blue-700
    darker: '#1e40af',     // blue-800
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
  },
  text: {
    primary: '#0f172a',    // slate-900
    secondary: '#475569',  // slate-600
    tertiary: '#64748b',   // slate-500
    muted: '#94a3b8',      // slate-400
    light: '#cbd5e1',      // slate-300
  },
  border: {
    DEFAULT: '#e2e8f0',    // slate-200
    light: '#f1f5f9',      // slate-100
    lighter: '#f8fafc',    // slate-50
  },
  status: {
    success: '#22c55e',    // green-500
    warning: '#f59e0b',    // amber-500
    error: '#ef4444',      // red-500
    info: '#0ea5e9',       // cyan-500
  },
  overlay: {
    dark: 'rgba(15, 23, 42, 0.1)',
    light: 'rgba(15, 23, 42, 0.05)',
  },
};

export const sidebarGradient = 'linear-gradient(180deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)';

export const shadowStyles = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};
