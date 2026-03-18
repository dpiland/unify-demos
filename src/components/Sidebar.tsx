/**
 * Sidebar Component — CloudBees Unify Navigation
 *
 * Dark navy sidebar with navigation menu. Flag-gated items show
 * a lock icon when their feature is disabled; clicking still navigates
 * to that page (which will show the FeaturePreview marketing state).
 */

import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  PlayCircleOutlined,
  AppstoreAddOutlined,
  FlagOutlined,
  SafetyCertificateOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  DeploymentUnitOutlined,
  ExperimentOutlined,
  LockOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  enableFeatureManagement: boolean;
  enableApplications: boolean;
  enableSmartTests: boolean;
  enableSecurity: boolean;
  planTier: string;
}

function JenkinsIcon() {
  return (
    <img
      src="https://www.jenkins.io/images/logos/jenkins/jenkins.svg"
      alt=""
      style={{ width: 16, height: 16 }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

export function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onCollapse,
  enableFeatureManagement,
  enableApplications,
  enableSmartTests,
  enableSecurity,
  planTier,
}: SidebarProps) {
  const hasReleases = planTier === 'team' || planTier === 'enterprise';
  const gatedLabel = (label: string, enabled: boolean) =>
    enabled ? label : (
      <span>
        {label} <LockOutlined style={{ fontSize: 10, color: '#a0a3bd', marginLeft: 4 }} />
      </span>
    );

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'components',
      icon: <AppstoreOutlined />,
      label: 'Components',
    },
    {
      key: 'runs',
      icon: <PlayCircleOutlined />,
      label: 'Runs',
    },
    {
      key: 'applications',
      icon: <AppstoreAddOutlined />,
      label: gatedLabel('Applications', enableApplications),
    },
    {
      key: 'releases',
      icon: <DeploymentUnitOutlined />,
      label: gatedLabel('Releases', hasReleases),
    },
    {
      key: 'feature-management',
      icon: <FlagOutlined />,
      label: gatedLabel('Feature management', enableFeatureManagement),
    },
    {
      key: 'security',
      icon: <SafetyCertificateOutlined />,
      label: gatedLabel('Security', enableSecurity),
    },
    { type: 'divider' },
    {
      key: 'audit-history',
      icon: <FileSearchOutlined />,
      label: 'Audit history',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: 'configurations',
      icon: <SettingOutlined />,
      label: 'Configurations',
    },
    {
      key: 'jenkins-management',
      icon: <JenkinsIcon />,
      label: 'Jenkins Management',
    },
    {
      key: 'smart-tests',
      icon: <ExperimentOutlined />,
      label: gatedLabel('Smart tests', enableSmartTests),
    },
  ];

  return (
    <Sider
      className="unify-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={260}
      style={{ background: '#1b1f3b' }}
    >
      {/* Logo */}
      <div className="unify-sider-logo">
        {!collapsed && (
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            CloudBees
          </Title>
        )}
        {collapsed && (
          <Title level={4} style={{ color: '#fff', margin: '0 auto' }}>
            CB
          </Title>
        )}
      </div>

      {/* Navigation */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPage]}
        items={menuItems}
        onClick={({ key }) => onNavigate(key)}
        style={{ background: 'transparent', borderRight: 0 }}
      />
    </Sider>
  );
}
