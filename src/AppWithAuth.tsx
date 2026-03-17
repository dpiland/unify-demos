/**
 * AppWithAuth Component
 *
 * Wraps the main App component with authentication/user selection.
 * Shows LoginPage until a user is selected, then passes user props to App.
 */

import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import App from './App';
import { LoginPage } from './components/LoginPage';
import {
  type User,
  loadCurrentUser,
  saveCurrentUser,
  clearCurrentUser,
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

  // Build dropdown menu items for user switching (rendered in App's header)
  const userMenuItems: MenuProps['items'] = currentUser
    ? [
        {
          key: 'current',
          label: (
            <div style={{ padding: '8px 0' }}>
              <Text strong>{currentUser.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {currentUser.properties.strings.userTier} &bull; {currentUser.properties.strings.region}
              </Text>
            </div>
          ),
          disabled: true,
        },
        { type: 'divider' as const },
        {
          key: 'switch',
          label: 'Switch User',
          icon: <SwapOutlined />,
          children: DEFAULT_USERS.map(user => ({
            key: user.id,
            label: user.name,
            onClick: () => handleSwitchUser(user.id),
            disabled: user.id === currentUser.id,
          })),
        },
        { type: 'divider' as const },
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
          danger: true,
          onClick: handleLogout,
        },
      ]
    : [];

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return <LoginPage onSelectUser={handleSelectUser} />;
  }

  return <App currentUser={currentUser} userMenuItems={userMenuItems} />;
}
