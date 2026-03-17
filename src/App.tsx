/**
 * Horizon Bank - Application Shell
 *
 * Layout shell with left sidebar navigation and React Router.
 * Individual pages live in src/pages/ and render in the Content area.
 */

import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import {
  BankOutlined,
  GiftOutlined,
  HomeOutlined,
  FundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useFeatureFlag } from './hooks/useFeatureFlag';
import { getUserInitials, type User } from './lib/users';
import { AccountSummary } from './pages/AccountSummary';
import { TransferPay } from './pages/TransferPay';
import { Investments } from './pages/Investments';
import { Rewards } from './pages/Rewards';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AppProps {
  currentUser: User;
  userMenuItems: MenuProps['items'];
}

// Map URL paths to menu keys
const pathToKey: Record<string, string> = {
  '/': 'accounts',
  '/accounts': 'accounts',
  '/transfers': 'transfers',
  '/investments': 'investments',
  '/rewards': 'rewards',
};

function App({ currentUser, userMenuItems }: AppProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Boolean flag: controls sidebar visibility of Investments nav item
  const showInvestmentPortfolio = useFeatureFlag('showInvestmentPortfolio');

  const selectedKey = pathToKey[location.pathname] || 'accounts';

  const menuItems: MenuProps['items'] = [
    {
      key: 'accounts',
      icon: <HomeOutlined />,
      label: 'Account Summary',
    },
    {
      key: 'transfers',
      icon: <SwapOutlined />,
      label: 'Transfer & Pay',
    },
    // Conditionally include Investments based on feature flag
    ...(showInvestmentPortfolio
      ? [
          {
            key: 'investments',
            icon: <FundOutlined />,
            label: 'Investments',
          },
        ]
      : []),
    {
      key: 'rewards',
      icon: <GiftOutlined />,
      label: 'Rewards & Offers',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const routes: Record<string, string> = {
      accounts: '/',
      transfers: '/transfers',
      investments: '/investments',
      rewards: '/rewards',
    };
    navigate(routes[key] || '/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={240}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
        }}
        breakpoint="lg"
        collapsedWidth={80}
      >
        {/* Logo */}
        <div className="sider-logo">
          <BankOutlined style={{ fontSize: collapsed ? 24 : 28, color: '#1a3c5e' }} />
          {!collapsed && (
            <span className="sider-logo-text">Horizon Bank</span>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>

      <Layout>
        {/* Top Header */}
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16 }}
          />

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <Button type="text" size="large">
              <Space>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#1a3c5e',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {getUserInitials(currentUser.name)}
                </div>
                <Text>{currentUser.name}</Text>
                <UserOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Header>

        {/* Page Content */}
        <Content style={{ padding: 24, background: '#f5f5f5', overflow: 'auto' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={<AccountSummary currentUser={currentUser} />} />
              <Route path="/accounts" element={<AccountSummary currentUser={currentUser} />} />
              <Route path="/transfers" element={<TransferPay />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
