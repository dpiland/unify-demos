/**
 * Horizon Bank - Application Shell
 *
 * Layout shell with left sidebar navigation, promotional banner,
 * floating chat widget, and React Router.
 */

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Badge, Button, Card, Drawer, Dropdown, FloatButton, Input, Layout, Menu, Space, Switch, Tooltip, Typography } from 'antd';
import {
  BankOutlined,
  BellOutlined,
  CloseOutlined,
  CreditCardOutlined,
  ExclamationCircleOutlined,
  GiftOutlined,
  HomeOutlined,
  FundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SendOutlined,
  SwapOutlined,
  ToolOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useFeatureFlag, useFeatureFlagString } from './hooks/useFeatureFlag';
import { theme as antdTheme } from 'antd';
import { getUserInitials, type User } from './lib/users';
import { AccountSummary } from './pages/AccountSummary';
import { TransferPay } from './pages/TransferPay';
import { Investments } from './pages/Investments';
import { Rewards } from './pages/Rewards';
import { MortgageSimulator } from './pages/MortgageSimulator';
import { Notifications } from './pages/Notifications';
import { CardControls } from './pages/CardControls';
import { useThemeMode } from './contexts/ThemeContext';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AppProps {
  currentUser: User;
  userMenuItems: MenuProps['items'];
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

// Map URL paths to menu keys
const pathToKey: Record<string, string> = {
  '/': 'accounts',
  '/accounts': 'accounts',
  '/transfers': 'transfers',
  '/investments': 'investments',
  '/rewards': 'rewards',
  '/notifications': 'notifications',
  '/card-controls': 'card-controls',
  '/mortgage-simulator': 'mortgage-simulator',
};

// ============================================
// System Alert Banner Component
// ============================================

const SYSTEM_ALERT_CONTENT: Record<string, { type: 'warning' | 'error' | 'info'; icon: React.ReactNode; message: string; description: string }> = {
  'maintenance-scheduled': {
    type: 'warning',
    icon: <ToolOutlined />,
    message: 'Scheduled Maintenance Tonight',
    description: 'Online banking will be unavailable from 2:00 AM - 4:00 AM ET for system upgrades. Please plan transactions accordingly.',
  },
  'zelle-degraded': {
    type: 'error',
    icon: <ExclamationCircleOutlined />,
    message: 'Zelle Service Disruption',
    description: 'Zelle transfers are experiencing delays. Sent payments may take up to 30 minutes to process. We are working to resolve this.',
  },
  'rate-limit-active': {
    type: 'info',
    icon: <WarningOutlined />,
    message: 'High Traffic Notice',
    description: 'We are experiencing higher than normal traffic. Some features may respond slower than usual. Thank you for your patience.',
  },
};

function SystemAlertBanner({ alertType }: { alertType: string }) {
  const [dismissed, setDismissed] = useState(false);
  const alert = SYSTEM_ALERT_CONTENT[alertType];

  if (!alert || dismissed) return null;

  const colors = {
    warning: { bg: '#fffbe6', border: '#ffe58f', text: '#ad6800' },
    error: { bg: '#fff2f0', border: '#ffccc7', text: '#cf1322' },
    info: { bg: '#e6f4ff', border: '#91caff', text: '#0958d9' },
  };
  const c = colors[alert.type];

  return (
    <div
      style={{
        background: c.bg,
        borderBottom: `1px solid ${c.border}`,
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ color: c.text, fontSize: 16 }}>{alert.icon}</span>
      <div style={{ flex: 1 }}>
        <Text strong style={{ color: c.text }}>{alert.message}</Text>
        <Text style={{ color: c.text, marginLeft: 8, fontSize: 13 }}>{alert.description}</Text>
      </div>
      <CloseOutlined
        style={{ color: c.text, cursor: 'pointer', fontSize: 12, opacity: 0.6 }}
        onClick={() => setDismissed(true)}
      />
    </div>
  );
}

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
    text: 'Earn 5x points on travel this summer with your Horizon Cash Rewards card.',
    cta: 'Learn More',
  },
  'savings-bonus': {
    bg: 'linear-gradient(90deg, #2d6a4f 0%, #52c41a 100%)',
    text: 'Open a Horizon Savings account with $25,000+ and earn a $200 bonus.',
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
  link?: { label: string; path: string };
}

// Keyword-to-route mapping for chatbot navigation
const CHAT_ROUTES: { keywords: string[]; path: string; label: string; response: string }[] = [
  { keywords: ['transfer', 'send money', 'move money', 'pay bill', 'zelle', 'payment'], path: '/transfers', label: 'Go to Transfer & Pay', response: 'I can help with that! Let me take you to Transfer & Pay.' },
  { keywords: ['schedule', 'recurring', 'autopay', 'auto pay', 'automatic'], path: '/transfers', label: 'Go to Scheduled Payments', response: 'Sure! You can set up scheduled payments in the Transfer & Pay section.' },
  { keywords: ['reward', 'points', 'cashback', 'cash back', 'redeem', 'offer'], path: '/rewards', label: 'Go to Rewards & Offers', response: 'Let me pull up your rewards. You can view points and redeem them here.' },
  { keywords: ['invest', 'portfolio', 'stock', 'market', 'holding'], path: '/investments', label: 'Go to Investments', response: 'Here\'s your investment portfolio. Let me take you there.' },
  { keywords: ['account', 'balance', 'checking', 'savings', 'summary', 'transaction'], path: '/', label: 'Go to Account Summary', response: 'Let me pull up your account details right away.' },
  { keywords: ['notification', 'alert', 'bell', 'message'], path: '/notifications', label: 'Go to Notifications', response: 'Let me check your notifications for you.' },
  { keywords: ['card', 'freeze', 'lock', 'unfreeze', 'spending limit', 'international', 'contactless', 'pin', 'replacement'], path: '/card-controls', label: 'Go to Card Controls', response: 'I can help with that! Let me take you to Card Controls.' },
  { keywords: ['crypto', 'bitcoin', 'ethereum', 'coin', 'trading'], path: '/investments', label: 'Go to Crypto Trading', response: 'Let me take you to the Investments page where you can view crypto trading.' },
  { keywords: ['advisor', 'advisory', 'financial planner', 'risk assessment', 'consultation'], path: '/investments', label: 'Go to Investment Advisory', response: 'I\'ll take you to Investment Advisory where you can review recommendations and schedule a call.' },
  { keywords: ['mortgage', 'home loan', 'house', 'refinance', 'pre-qual', 'prequalif', 'amortization', 'home price'], path: '/mortgage-simulator', label: 'Go to Mortgage Simulator', response: 'Let me pull up the Mortgage Simulator so you can explore your options.' },
];

const FALLBACK_RESPONSES = [
  'I can help with that! Could you tell me more about what you\'re looking for?',
  'Great question. For security, I\'ll need to verify your identity first. Can you confirm the last 4 digits of your SSN?',
  'I see your account information here. What specific changes would you like to make?',
  'That\'s been updated for you. Is there anything else I can help with?',
  'You can manage your accounts, transfers, rewards, cards, and more. Just let me know what you need!',
];

function ChatWidget() {
  const navigate = useNavigate();
  const { token: chatToken } = antdTheme.useToken();
  const chatIsDark = chatToken.colorBgContainer !== '#ffffff';
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: 'agent', text: 'Hi! I\'m your Horizon Bank assistant. How can I help you today?' },
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = { from: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    const input = inputValue.toLowerCase();
    setInputValue('');

    setTimeout(() => {
      // Match user input against route keywords
      const match = CHAT_ROUTES.find(route =>
        route.keywords.some(kw => input.includes(kw))
      );

      if (match) {
        setMessages(prev => [...prev, {
          from: 'agent',
          text: match.response,
          link: { label: match.label, path: match.path },
        }]);
      } else {
        const response = FALLBACK_RESPONSES[messages.length % FALLBACK_RESPONSES.length];
        setMessages(prev => [...prev, { from: 'agent', text: response }]);
      }
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
                background: msg.from === 'user' ? '#1a3c5e' : (chatIsDark ? '#333' : '#f0f0f0'),
                color: msg.from === 'user' ? '#fff' : (chatIsDark ? '#fafafa' : '#000'),
                fontSize: 13,
              }}
            >
              {msg.text}
              {msg.link && (
                <div style={{ marginTop: 6 }}>
                  <Button
                    type="link"
                    size="small"
                    style={{ padding: 0, color: msg.from === 'user' ? '#91caff' : '#1677ff', fontSize: 12 }}
                    onClick={() => { navigate(msg.link!.path); setOpen(false); }}
                  >
                    {msg.link.label} &rarr;
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '8px 12px', borderTop: `1px solid ${chatIsDark ? '#434343' : '#f0f0f0'}`, display: 'flex', gap: 8 }}>
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = antdTheme.useToken();
  const { themeMode, toggleDarkMode } = useThemeMode();
  const isMobile = useIsMobile();

  // Feature flags
  const showInvestmentPortfolio = useFeatureFlag('showInvestmentPortfolio');
  const enableNotificationCenter = useFeatureFlag('enableNotificationCenter');
  const enableCardControls = useFeatureFlag('enableCardControls');
  const enableMortgageSimulator = useFeatureFlag('enableMortgageSimulator');
  const promotionalBanner = useFeatureFlagString('promotionalBanner');
  const systemAlert = useFeatureFlagString('systemAlert');

  // Mobile-aware flag defaults:
  // - Chat support OFF on mobile (covers too much screen)
  // - Notifications ON on mobile (push-style alerts are expected)
  // - Card controls ON on mobile (freeze card on the go)
  const enableChatSupportFlag = useFeatureFlag('enableChatSupport');
  const enableChatSupport = enableChatSupportFlag && !isMobile;

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
    ...(enableNotificationCenter
      ? [
          {
            key: 'notifications',
            icon: <BellOutlined />,
            label: 'Notifications',
          },
        ]
      : []),
    ...(enableCardControls
      ? [
          {
            key: 'card-controls',
            icon: <CreditCardOutlined />,
            label: 'Card Controls',
          },
        ]
      : []),
    ...(enableMortgageSimulator
      ? [
          {
            key: 'mortgage-simulator',
            icon: <HomeOutlined />,
            label: 'Mortgage Simulator',
          },
        ]
      : []),
  ];

  // Bottom tab bar items for mobile (core pages only, "More" opens drawer)
  const bottomTabs = [
    { key: 'accounts', icon: <HomeOutlined />, label: 'Accounts' },
    { key: 'transfers', icon: <SwapOutlined />, label: 'Transfers' },
    { key: 'rewards', icon: <GiftOutlined />, label: 'Rewards' },
    { key: 'more', icon: <MenuUnfoldOutlined />, label: 'More' },
  ];

  const routes: Record<string, string> = {
    accounts: '/',
    transfers: '/transfers',
    investments: '/investments',
    rewards: '/rewards',
    notifications: '/notifications',
    'card-controls': '/card-controls',
    'mortgage-simulator': '/mortgage-simulator',
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(routes[key] || '/');
    if (isMobile) setDrawerOpen(false);
  };

  const handleBottomTabClick = (key: string) => {
    if (key === 'more') {
      setDrawerOpen(true);
    } else {
      navigate(routes[key] || '/');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Sidebar - Desktop only */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          width={240}
          style={{
            background: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
          breakpoint="lg"
          collapsedWidth={80}
        >
          <div className="sider-logo">
            <BankOutlined style={{ fontSize: collapsed ? 24 : 28, color: themeMode === 'dark' ? '#ffffff' : '#1a3c5e' }} />
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
      )}

      {/* Mobile Drawer for "More" menu */}
      {isMobile && (
        <Drawer
          title={
            <Space>
              <BankOutlined style={{ color: '#1a3c5e' }} />
              <span>Horizon Bank</span>
            </Space>
          }
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          width={280}
          styles={{ body: { padding: 0 } }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ border: 'none' }}
          />
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${token.colorBorderSecondary}` }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Text type="secondary">Dark Mode</Text>
              <Switch
                checked={themeMode === 'dark'}
                onChange={() => toggleDarkMode()}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
              />
            </Space>
          </div>
        </Drawer>
      )}

      <Layout>
        {/* System Alert - controlled by systemAlert string flag (ops demo) */}
        {systemAlert !== 'none' && (
          <SystemAlertBanner alertType={systemAlert} />
        )}

        {/* Promotional Banner - controlled by promotionalBanner string flag */}
        {promotionalBanner !== 'none' && (
          <PromoBanner campaign={promotionalBanner} />
        )}

        {/* Top Header */}
        <Header
          style={{
            background: token.colorBgContainer,
            padding: isMobile ? '0 12px' : '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            height: isMobile ? 52 : 64,
            paddingTop: isMobile ? 'env(safe-area-inset-top)' : 0,
          }}
        >
          {isMobile ? (
            <Space>
              <BankOutlined style={{ fontSize: 20, color: themeMode === 'dark' ? '#ffffff' : '#1a3c5e' }} />
              <Text strong style={{ fontSize: 16 }}>Horizon Bank</Text>
            </Space>
          ) : (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16 }}
            />
          )}

          <Space size={isMobile ? 'small' : 'middle'}>
            {!isMobile && (
              <Tooltip title={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={() => toggleDarkMode()}
                  checkedChildren="🌙"
                  unCheckedChildren="☀️"
                  style={{ marginTop: 2 }}
                />
              </Tooltip>
            )}

            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Button type="text" size={isMobile ? 'middle' : 'large'}>
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
                  {!isMobile && <Text>{currentUser.name}</Text>}
                  <UserOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        {/* Page Content */}
        <Content
          style={{
            padding: isMobile ? 12 : 24,
            paddingBottom: isMobile ? 72 : 24,
            background: token.colorBgLayout,
            overflow: 'auto',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={<AccountSummary currentUser={currentUser} />} />
              <Route path="/accounts" element={<AccountSummary currentUser={currentUser} />} />
              <Route path="/transfers" element={<TransferPay />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/card-controls" element={<CardControls currentUser={currentUser} />} />
              <Route path="/mortgage-simulator" element={<MortgageSimulator />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <div className="mobile-bottom-tabs">
          {bottomTabs.map(tab => (
            <div
              key={tab.key}
              className={`mobile-tab ${selectedKey === tab.key ? 'mobile-tab-active' : ''}`}
              onClick={() => handleBottomTabClick(tab.key)}
            >
              <span className="mobile-tab-icon">{tab.icon}</span>
              <span className="mobile-tab-label">{tab.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chat Support Widget - controlled by enableChatSupport boolean flag */}
      {enableChatSupport && <ChatWidget />}
    </Layout>
  );
}

export default App;
