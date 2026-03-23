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
            {currentUser?.properties.strings.membershipTier} • {currentUser?.properties.strings.region}
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
      {/* User menu - fixed top-right, offset to avoid cart/search overlap */}
      <div
        style={{
          position: 'fixed',
          top: 34,
          right: 150,
          zIndex: 1000,
        }}
      >
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <Button
            type="text"
            size="small"
            style={{
              height: 48,
              padding: '0 12px',
            }}
          >
            <Space size={8}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#1a2744',
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
              <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>
                {currentUser.name.split(' ')[0]}
              </span>
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Main app */}
      <App />
    </div>
  );
}
