/**
 * Design Tokens
 *
 * Centralized design tokens for colors, spacing, typography, etc.
 * These can be customized per demo to match different brand identities.
 */

/**
 * Color Palette
 *
 * Delta Airlines brand colors with semantic naming.
 * Official Delta brand identity colors for authentic airline experience.
 */
export const colors = {
  // Primary brand colors (Delta Blue - Navy)
  primary: {
    50: '#E6EBF0',
    100: '#CCDBE6',
    200: '#99B8CC',
    300: '#6694B3',
    400: '#337099',
    500: '#003366', // Delta Navy (Primary Brand Color)
    600: '#002952',
    700: '#001F3D',
    800: '#001429',
    900: '#000A14',
  },

  // Success colors (green) - Keep for positive confirmations
  success: {
    50: '#f6ffed',
    100: '#d9f7be',
    200: '#b7eb8f',
    300: '#95de64',
    400: '#73d13d',
    500: '#52c41a', // Success
    600: '#389e0d',
    700: '#237804',
    800: '#135200',
    900: '#092b00',
  },

  // Accent colors (Delta Red) - Premium features, CTAs, alerts
  accent: {
    50: '#FCE8E9',
    100: '#F8D0D3',
    200: '#F1A1A7',
    300: '#EA737B',
    400: '#E3444F',
    500: '#D1232B', // Delta Red (Primary Accent Color)
    600: '#A71C23',
    700: '#7D151A',
    800: '#530E12',
    900: '#2A0709',
  },

  // Highlight colors (Sky Blue) - Interactive elements, status indicators
  highlight: {
    50: '#E6F5FF',
    100: '#CCEBFF',
    200: '#99D6FF',
    300: '#66C2FF',
    400: '#33ADFF',
    500: '#0099FF', // Sky Blue
    600: '#007ACC',
    700: '#005C99',
    800: '#003D66',
    900: '#001F33',
  },

  // Secondary colors (Delta Gray) - Secondary text, borders
  secondary: {
    50: '#F5F5F5',
    100: '#E8E8E8',
    200: '#D1D1D1',
    300: '#BABABA',
    400: '#A3A3A3',
    500: '#666666', // Delta Gray
    600: '#525252',
    700: '#3D3D3D',
    800: '#292929',
    900: '#141414',
  },

  // Warning colors (amber/orange) - Caution, alerts
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Warning amber
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error colors (red) - Errors, critical alerts
  error: {
    50: '#fff1f0',
    100: '#ffccc7',
    200: '#ffa39e',
    300: '#ff7875',
    400: '#ff4d4f',
    500: '#f5222d', // Error
    600: '#cf1322',
    700: '#a8071a',
    800: '#820014',
    900: '#5c0011',
  },

  // Neutral colors (grays) - Backgrounds, dividers
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e8e8e8',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1f1f1f',
    950: '#141414',
  },
};

/**
 * Typography Scale
 */
export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '38px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Spacing Scale (based on 8px grid)
 */
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

/**
 * Border Radius
 */
export const borderRadius = {
  none: '0',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

/**
 * Shadows
 */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

/**
 * Breakpoints (for responsive design)
 */
export const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};
