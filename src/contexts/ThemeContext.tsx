/**
 * Theme Context
 *
 * Provides theme mode state and toggle function to the entire app.
 * Works alongside the themeMode feature flag — the flag sets the default,
 * but users can override it with the UI toggle.
 */

import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeMode: 'light',
  setThemeMode: () => {},
  toggleDarkMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeContext);
}
