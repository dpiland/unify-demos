/**
 * Application Entry Point
 *
 * Initializes the React application with all required providers:
 * - StrictMode for development warnings
 * - FeatureFlagProvider for CloudBees feature flags
 * - ConfigProvider for Ant Design theming
 */

import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';
import { AppWithAuth } from './AppWithAuth.tsx';
import { FeatureFlagProvider } from './contexts/FeatureFlagContext';
import { ThemeContext, type ThemeMode } from './contexts/ThemeContext';
import { useFeatureFlagString } from './hooks/useFeatureFlag';
import { lightTheme, darkTheme, highContrastTheme } from './theme';

const THEME_MAP: Record<string, typeof lightTheme> = {
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
};

function ThemedApp() {
  const flagThemeMode = useFeatureFlagString('themeMode') as ThemeMode;
  const [userOverride, setUserOverride] = useState<ThemeMode | null>(null);

  // Sync with flag when it changes (e.g. from CloudBees), unless user has overridden
  useEffect(() => {
    setUserOverride(null);
  }, [flagThemeMode]);

  const effectiveMode: ThemeMode = userOverride ?? (THEME_MAP[flagThemeMode] ? flagThemeMode : 'light');
  const activeTheme = THEME_MAP[effectiveMode] || lightTheme;
  const isDark = effectiveMode === 'dark';

  return (
    <ThemeContext.Provider value={{
      themeMode: effectiveMode,
      setThemeMode: setUserOverride,
      toggleDarkMode: () => setUserOverride(prev => (prev ?? effectiveMode) === 'dark' ? 'light' : 'dark'),
    }}>
      <ConfigProvider theme={activeTheme}>
        <div
          data-theme={effectiveMode}
          style={{
            minHeight: '100vh',
            background: isDark ? '#141414' : undefined,
            color: isDark ? '#fafafa' : undefined,
          }}
        >
          <AppWithAuth />
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FeatureFlagProvider>
        <ThemedApp />
      </FeatureFlagProvider>
    </BrowserRouter>
  </StrictMode>,
);
