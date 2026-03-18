/**
 * AppWithAuth Component
 *
 * Wraps the main App component with authentication/user selection.
 * Shows LoginPage until a user is selected, then shows the main app
 * with a user dropdown in the top-right corner.
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

  useEffect(() => {
    const storedUser = loadCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      setUserProperties(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setUserProperties(user);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    window.location.reload();
  };

  const handleSwitchUser = (userId: string) => {
    const user = DEFAULT_USERS.find(u => u.id === userId);
    if (user) {
      handleSelectUser(user);
      window.location.reload();
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'current',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Text strong>{currentUser?.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {currentUser?.properties.strings.planTier} plan &middot; {currentUser?.properties.strings.role}
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

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return <LoginPage onSelectUser={handleSelectUser} />;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* User menu in top-right corner */}
      <div
        style={{
          position: 'fixed',
          top: 12,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
          <Button
            type="default"
            size="small"
            style={{
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <Space>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#1890ff',
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
              <span style={{ fontSize: 13 }}>{currentUser.name.split(' ')[0]}</span>
              <UserOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <App />
    </div>
  );
}
