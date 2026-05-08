/**
 * Design Tokens - Ridgeline Outfitters
 *
 * Patagonia-inspired earth-tone palette with deep navy, forest green,
 * warm amber, and warm slate grays. Clean, minimal, nature-inspired.
 */

/**
 * Color Palette
 *
 * Earth-tone palette inspired by outdoor/mountain aesthetics.
 * Deep navy primary, forest greens, warm ambers, warm grays.
 */
export const colors = {
  // Primary brand colors (deep navy)
  primary: {
    50: '#eef2f7',
    100: '#d4dde8',
    200: '#a9bbcf',
    300: '#7e99b7',
    400: '#53779e',
    500: '#1e3a5f', // Primary - deep navy
    600: '#1a3354',
    700: '#152b47',
    800: '#10223a',
    900: '#0b1a2e',
  },

  // Success colors (forest green)
  success: {
    50: '#f0f7f1',
    100: '#d4e8d6',
    200: '#a8d1ab',
    300: '#7cba80',
    400: '#50a355',
    500: '#2f5233', // Forest green
    600: '#28472d',
    700: '#213c26',
    800: '#1a3120',
    900: '#132619',
  },

  // Warning colors (warm amber)
  warning: {
    50: '#fdf6ec',
    100: '#fae5c5',
    200: '#f5cb8b',
    300: '#f0b151',
    400: '#d99a2b',
    500: '#c17817', // Warm amber
    600: '#a66614',
    700: '#8b5411',
    800: '#70420e',
    900: '#55310a',
  },

  // Error colors (muted red)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#f87171',
    400: '#dc2626',
    500: '#b91c1c', // Muted red
    600: '#991b1b',
    700: '#7f1d1d',
    800: '#661717',
    900: '#4c1111',
  },

  // Neutral colors (warm slate grays)
  neutral: {
    50: '#faf9f7',
    100: '#f5f3ef',
    200: '#e8e5df',
    300: '#d4d0c8',
    400: '#b8b3a8',
    500: '#8c8780',
    600: '#5c5850',
    700: '#434038',
    800: '#2d2d2d',
    900: '#1a1a2e',
    950: '#111114',
  },
};

/**
 * Typography Scale
 */
export const typography = {
  fontFamily: {
    base: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    heading: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
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
