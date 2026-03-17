/**
 * AppWithAuth Component
 *
 * Wraps the main App component with authentication/user selection.
 * Shows LoginPage until a user is selected, then shows the main app.
 */

import { useState, useEffect } from 'react';
import { Button, Dropdown, Space, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import App from './App';
import { LoginPage } from './components/LoginPage';
import {
  type User,
  loadCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
  getUserInitials,
  DEFAULT_USERS,
} from './lib/users';
import { setUserProperties } from './lib/featureFlags';

const { Text } = Typography;

export function AppWithAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = loadCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      // Set properties for feature flag targeting
      setUserProperties(storedUser);
    }
    setIsLoading(false);
  }, []);

  // Handle user selection from login page
  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    // Set properties for feature flag targeting
    setUserProperties(user);
  };

  // Handle logout
  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    // Optionally reload to reset feature flags
    window.location.reload();
  };

  // Handle switching users
  const handleSwitchUser = (userId: string) => {
    const user = DEFAULT_USERS.find(u => u.id === userId);
    if (user) {
      handleSelectUser(user);
      // Reload to apply new user properties
      window.location.reload();
    }
  };

  // Build dropdown menu for user switching
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'current',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Text strong>{currentUser?.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {currentUser?.properties.strings.role} • {currentUser?.properties.strings.department}
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'switch',
      label: 'Switch User',
      icon: <SwapOutlined />,
      children: DEFAULT_USERS.map(user => ({
        key: user.id,
        label: user.name,
        onClick: () => handleSwitchUser(user.id),
        disabled: user.id === currentUser?.id,
      })),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  // Show loading state
  if (isLoading) {
    return null; // or a loading spinner
  }

  // Show login page if no user
  if (!currentUser) {
    return <LoginPage onSelectUser={handleSelectUser} />;
  }

  // Show app with user menu
  return (
    <div style={{ position: 'relative' }}>
      {/* User menu in top-right corner */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <Button
            type="default"
            size="large"
            style={{
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              borderRadius: 10,
              border: '1px solid rgba(0,0,0,0.06)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Space>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {getUserInitials(currentUser.name)}
              </div>
              <span style={{ fontWeight: 500 }}>{currentUser.name.split(' ')[0]}</span>
              <UserOutlined style={{ color: '#8c8c8c' }} />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Main app */}
      <App />
    </div>
  );
}
