/**
 * Horizon Bank - Application Shell
 *
 * Layout shell with left sidebar navigation, promotional banner,
 * floating chat widget, and React Router.
 */

import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Badge, Button, Card, Dropdown, FloatButton, Input, Layout, Menu, Space, Typography } from 'antd';
import {
  BankOutlined,
  CloseOutlined,
  GiftOutlined,
  HomeOutlined,
  FundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SendOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useFeatureFlag, useFeatureFlagString } from './hooks/useFeatureFlag';
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

// ============================================
// Promotional Banner Component
// ============================================

const PROMO_CONTENT: Record<string, { bg: string; text: string; cta: string }> = {
  'mortgage-refi': {
    bg: 'linear-gradient(90deg, #1a3c5e 0%, #2d6a4f 100%)',
    text: 'Refinance your mortgage — rates as low as 5.25% APR. Save up to $250/month.',
    cta: 'Check Rates',
  },
  'travel-rewards': {
    bg: 'linear-gradient(90deg, #0a1826 0%, #1a3c5e 100%)',
    text: 'Earn 5x points on travel this summer with your Active Cash card.',
    cta: 'Learn More',
  },
  'savings-bonus': {
    bg: 'linear-gradient(90deg, #2d6a4f 0%, #52c41a 100%)',
    text: 'Open a Way2Save account with $25,000+ and earn a $200 bonus.',
    cta: 'Open Account',
  },
};

function PromoBanner({ campaign }: { campaign: string }) {
  const [dismissed, setDismissed] = useState(false);
  const promo = PROMO_CONTENT[campaign];

  if (!promo || dismissed) return null;

  return (
    <div
      style={{
        background: promo.bg,
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 13 }}>{promo.text}</Text>
      <Space>
        <Button size="small" ghost style={{ color: '#fff', borderColor: '#fff' }}>
          {promo.cta}
        </Button>
        <CloseOutlined
          style={{ color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 12 }}
          onClick={() => setDismissed(true)}
        />
      </Space>
    </div>
  );
}

// ============================================
// Chat Support Widget
// ============================================

interface ChatMessage {
  from: 'user' | 'agent';
  text: string;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'agent', text: 'Hi! I\'m your Horizon Bank assistant. How can I help you today?' },
  ]);

  const RESPONSES = [
    'I can help with that! Let me pull up your account details.',
    'Great question. For security, I\'ll need to verify your identity first. Can you confirm the last 4 digits of your SSN?',
    'I see your account information here. What specific changes would you like to make?',
    'That\'s been updated for you. Is there anything else I can help with?',
    'You\'re welcome! Don\'t forget you can also manage this in the Transfer & Pay section.',
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const response = RESPONSES[messages.length % RESPONSES.length];
      setMessages(prev => [...prev, { from: 'agent', text: response }]);
    }, 800);
  };

  if (!open) {
    return (
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        badge={{ dot: true }}
        onClick={() => setOpen(true)}
        style={{ right: 24, bottom: 24, width: 56, height: 56 }}
      />
    );
  }

  return (
    <Card
      title={
        <Space>
          <Badge dot color="green">
            <MessageOutlined style={{ fontSize: 16 }} />
          </Badge>
          <span>Horizon Bank Support</span>
        </Space>
      }
      extra={<CloseOutlined onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} />}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 360,
        zIndex: 1000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        borderRadius: 12,
      }}
      styles={{
        body: { padding: 0 },
        header: { background: '#1a3c5e', color: '#fff', borderRadius: '12px 12px 0 0' },
      }}
    >
      {/* Messages */}
      <div style={{ height: 300, overflowY: 'auto', padding: 16 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: msg.from === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                background: msg.from === 'user' ? '#1a3c5e' : '#f0f0f0',
                color: msg.from === 'user' ? '#fff' : '#000',
                fontSize: 13,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8 }}>
        <Input
          placeholder="Type a message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          size="small"
        />
        <Button type="primary" size="small" icon={<SendOutlined />} onClick={handleSend} />
      </div>
    </Card>
  );
}

// ============================================
// App Component
// ============================================

function App({ currentUser, userMenuItems }: AppProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Feature flags
  const showInvestmentPortfolio = useFeatureFlag('showInvestmentPortfolio');
  const enableChatSupport = useFeatureFlag('enableChatSupport');
  const promotionalBanner = useFeatureFlagString('promotionalBanner');

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
        <div className="sider-logo">
          <BankOutlined style={{ fontSize: collapsed ? 24 : 28, color: '#1a3c5e' }} />
          {!collapsed && (
            <span className="sider-logo-text">Horizon Bank</span>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>

      <Layout>
        {/* Promotional Banner - controlled by promotionalBanner string flag */}
        {promotionalBanner !== 'none' && (
          <PromoBanner campaign={promotionalBanner} />
        )}

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

      {/* Chat Support Widget - controlled by enableChatSupport boolean flag */}
      {enableChatSupport && <ChatWidget />}
    </Layout>
  );
}

export default App;
