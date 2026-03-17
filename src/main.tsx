/**
 * Application Entry Point
 *
 * Initializes the React application with all required providers:
 * - StrictMode for development warnings
 * - FeatureFlagProvider for CloudBees feature flags
 * - ConfigProvider for Ant Design theming
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.css';
import { AppWithAuth } from './AppWithAuth.tsx';
import { FeatureFlagProvider } from './contexts/FeatureFlagContext';
import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FeatureFlagProvider>
        <ConfigProvider theme={theme}>
          <AppWithAuth />
        </ConfigProvider>
      </FeatureFlagProvider>
    </BrowserRouter>
  </StrictMode>,
);
