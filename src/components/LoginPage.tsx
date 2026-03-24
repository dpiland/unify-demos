/**
 * LoginPage Component
 *
 * Realistic bank login screen with email/password fields and
 * quick-select persona buttons for demo purposes.
 */

import { useState } from 'react';
import { Button, Input, Typography, Space, Tag } from 'antd';
import { BankOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { DEFAULT_USERS, type User } from '../lib/users';

const { Title, Text } = Typography;

interface LoginPageProps {
  onSelectUser: (user: User) => void;
}

const PERSONA_COLORS: Record<string, string> = {
  student: '#52c41a',
  mortgage: '#fa8c16',
  'financial-planning': '#faad14',
  'checking-savings': '#1890ff',
  admin: '#722ed1',
};

const PERSONA_LABELS: Record<string, string> = {
  student: 'Student',
  mortgage: 'Mortgage',
  'financial-planning': 'Wealth',
  'checking-savings': 'Everyday',
  admin: 'Admin',
};

export function LoginPage({ onSelectUser }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Match email to a persona, or default to first user
    const matched = DEFAULT_USERS.find(u => u.email === email);
    onSelectUser(matched || DEFAULT_USERS[0]);
  };

  const handleQuickSelect = (user: User) => {
    setEmail(user.email);
    setPassword('••••••');
    // Brief delay so user sees the fields fill in
    setTimeout(() => onSelectUser(user), 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a3c5e 0%, #0a1826 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 16,
          padding: '48px 40px 40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Bank Branding */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <BankOutlined style={{ fontSize: 40, color: '#1a3c5e', marginBottom: 12 }} />
          <Title level={2} style={{ color: '#1a3c5e', marginBottom: 4, fontWeight: 700 }}>
            Horizon Bank
          </Title>
          <Text type="secondary">Your trusted banking partner</Text>
        </div>

        {/* Login Form */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Input
              size="large"
              placeholder="Email"
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onPressEnter={handleLogin}
              style={{ borderRadius: 8 }}
            />
          </div>

          <div>
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onPressEnter={handleLogin}
              style={{ borderRadius: 8 }}
            />
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleLogin}
            style={{
              height: 48,
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              background: '#1a3c5e',
              borderColor: '#1a3c5e',
            }}
          >
            Login
          </Button>
        </Space>

        {/* Demo Quick-Select */}
        <div
          style={{
            marginTop: 32,
            padding: 20,
            border: '2px solid #52c41a',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
            Demo accounts:
          </Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {DEFAULT_USERS.map(user => {
              const segment = user.properties.strings.customerSegment;
              const color = PERSONA_COLORS[segment] || '#1890ff';
              const label = PERSONA_LABELS[segment] || segment;

              return (
                <Tag
                  key={user.id}
                  color={color}
                  onClick={() => handleQuickSelect(user)}
                  style={{
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: '4px 16px',
                    borderRadius: 20,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {label}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
