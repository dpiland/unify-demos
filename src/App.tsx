/**
 * CloudBees Unify — DevSecOps Control Plane
 *
 * Sidebar-based layout with state-driven page routing.
 * Feature flags control which platform modules are available:
 * - enableFeatureManagement (Boolean) — Feature Management module
 * - enableApplications (Boolean) — Applications module
 * - enableSmartTests (Boolean) — Smart Tests module
 * - enableSecurity (Boolean) — Security module
 * - planTier (String) — Controls support/SLA display
 */

import { useState } from 'react';
import { Breadcrumb, Layout, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString } from './hooks/useFeatureFlag';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/pages/HomePage';
import { ComponentsPage } from './components/pages/ComponentsPage';
import { RunsPage } from './components/pages/RunsPage';
import { ApplicationsPage } from './components/pages/ApplicationsPage';
import { FeatureManagementPage } from './components/pages/FeatureManagementPage';
import { SecurityPage } from './components/pages/SecurityPage';
import { AuditHistoryPage } from './components/pages/AuditHistoryPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { ConfigurationsPage } from './components/pages/ConfigurationsPage';
import { JenkinsManagementPage } from './components/pages/JenkinsManagementPage';
import { SmartTestsPage } from './components/pages/SmartTestsPage';
import { ReleasesPage } from './components/pages/ReleasesPage';
import './App.css';

const { Content } = Layout;
const { Text } = Typography;

const PAGE_TITLES: Record<string, string> = {
  home: 'Home',
  components: 'Components',
  runs: 'Runs',
  applications: 'Applications',
  releases: 'Releases',
  'feature-management': 'Feature management',
  security: 'Security',
  'audit-history': 'Audit history',
  analytics: 'Analytics',
  configurations: 'Configurations',
  'jenkins-management': 'Jenkins management',
  'smart-tests': 'Smart tests',
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [collapsed, setCollapsed] = useState(false);

  // Boolean flags — gate platform modules
  const enableFeatureManagement = useFeatureFlag('enableFeatureManagement');
  const enableApplications = useFeatureFlag('enableApplications');
  const enableSmartTests = useFeatureFlag('enableSmartTests');
  const enableSecurity = useFeatureFlag('enableSecurity');

  // String flag — controls support/SLA tier display
  const planTier = useFeatureFlagString('planTier');

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <HomePage planTier={planTier} />;
      case 'components':
        return <ComponentsPage />;
      case 'runs':
        return <RunsPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'releases':
        return <ReleasesPage planTier={planTier} />;
      case 'feature-management':
        return <FeatureManagementPage />;
      case 'security':
        return <SecurityPage />;
      case 'audit-history':
        return <AuditHistoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'configurations':
        return <ConfigurationsPage />;
      case 'jenkins-management':
        return <JenkinsManagementPage />;
      case 'smart-tests':
        return <SmartTestsPage />;
      default:
        return <HomePage planTier={planTier} />;
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        enableFeatureManagement={enableFeatureManagement}
        enableApplications={enableApplications}
        enableSmartTests={enableSmartTests}
        enableSecurity={enableSecurity}
        planTier={planTier}
      />

      <Layout>
        {/* Breadcrumb Header */}
        <div
          style={{
            background: '#fff',
            padding: '12px 24px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Breadcrumb
            items={[
              { title: <HomeOutlined /> },
              ...(currentPage !== 'home'
                ? [{ title: <Text>{PAGE_TITLES[currentPage] || currentPage}</Text> }]
                : []),
            ]}
          />
        </div>

        {/* Content Area */}
        <Content style={{ padding: 24, background: '#f0f2f5' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {renderPage()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
