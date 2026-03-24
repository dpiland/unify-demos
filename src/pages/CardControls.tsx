/**
 * Card Controls Page
 *
 * Manage card security settings: freeze/unfreeze, spending limits,
 * international transactions, contactless payments, and ATM withdrawals.
 * Controlled by enableCardControls boolean flag.
 */

import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  List,
  Row,
  Slider,
  Space,
  Statistic,
  Switch,
  Tag,
  Typography,
  message,
  theme as antdTheme,
} from 'antd';
import {
  CreditCardOutlined,
  DollarOutlined,
  GlobalOutlined,
  LockOutlined,
  SafetyOutlined,
  StopOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from '@ant-design/icons';
import { ACCOUNTS } from '../data/mockData';
import type { User } from '../lib/users';

const { Title, Text, Paragraph } = Typography;

interface CardState {
  frozen: boolean;
  internationalEnabled: boolean;
  contactlessEnabled: boolean;
  atmEnabled: boolean;
  onlinePurchasesEnabled: boolean;
  dailySpendLimit: number;
  dailyAtmLimit: number;
}

const INITIAL_CARDS: Record<string, CardState> = {
  checking: {
    frozen: false,
    internationalEnabled: true,
    contactlessEnabled: true,
    atmEnabled: true,
    onlinePurchasesEnabled: true,
    dailySpendLimit: 5000,
    dailyAtmLimit: 500,
  },
  credit: {
    frozen: false,
    internationalEnabled: false,
    contactlessEnabled: true,
    atmEnabled: true,
    onlinePurchasesEnabled: true,
    dailySpendLimit: 10000,
    dailyAtmLimit: 1000,
  },
};

export function CardControls({ currentUser }: { currentUser: User }) {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const bgSubtle = isDark ? '#262626' : '#fafafa';

  // Student accounts get lower limits
  const isStudent = currentUser.properties.booleans.isStudent ?? false;
  const maxDailySpend = isStudent ? 2000 : 25000;
  const maxDailyAtm = isStudent ? 300 : 2000;

  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedCard, setSelectedCard] = useState<string>('checking');

  const cardAccounts = ACCOUNTS.filter(a =>
    a.type === 'checking' || (!isStudent && a.type === 'credit')
  );
  const currentAccount = cardAccounts.find(a => a.id === selectedCard);
  const state = cards[selectedCard];

  const updateCard = (field: keyof CardState, value: boolean | number) => {
    setCards(prev => ({
      ...prev,
      [selectedCard]: { ...prev[selectedCard], [field]: value },
    }));
  };

  const toggleFreeze = () => {
    const newFrozen = !state.frozen;
    updateCard('frozen', newFrozen);
    if (newFrozen) {
      message.warning('Card has been frozen. No transactions will be processed.');
    } else {
      message.success('Card has been unfrozen. Transactions are enabled.');
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ marginBottom: 0 }}>
        <Space>
          <CreditCardOutlined />
          Card Controls
        </Space>
      </Title>

      {/* Card Selector */}
      <Row gutter={[16, 16]}>
        {cardAccounts.map(account => (
          <Col xs={24} sm={12} key={account.id}>
            <Card
              hoverable
              onClick={() => setSelectedCard(account.id)}
              style={{
                borderColor: selectedCard === account.id ? '#1677ff' : undefined,
                borderWidth: selectedCard === account.id ? 2 : 1,
              }}
            >
              <Space>
                <CreditCardOutlined style={{ fontSize: 24, color: account.type === 'credit' ? '#722ed1' : '#1a3c5e' }} />
                <div>
                  <Text strong>{account.name}</Text>
                  <br />
                  <Text type="secondary">{account.accountNumber}</Text>
                </div>
                {cards[account.id]?.frozen && <Tag color="red">FROZEN</Tag>}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {currentAccount && state && (
        <Row gutter={[24, 24]}>
          {/* Freeze / Lock */}
          <Col xs={24} lg={8}>
            <Card style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="large">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: state.frozen
                      ? (isDark ? '#2a1215' : '#fff2f0')
                      : (isDark ? '#162312' : '#f6ffed'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                >
                  {state.frozen
                    ? <StopOutlined style={{ fontSize: 36, color: '#f5222d' }} />
                    : <SafetyOutlined style={{ fontSize: 36, color: '#52c41a' }} />
                  }
                </div>
                <div>
                  <Title level={4} style={{ marginBottom: 4 }}>
                    {state.frozen ? 'Card is Frozen' : 'Card is Active'}
                  </Title>
                  <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                    {state.frozen
                      ? 'All transactions are blocked. Unfreeze to resume.'
                      : 'Your card is active and processing transactions normally.'}
                  </Paragraph>
                </div>
                <Button
                  type={state.frozen ? 'primary' : 'default'}
                  danger={!state.frozen}
                  icon={state.frozen ? <SafetyOutlined /> : <LockOutlined />}
                  size="large"
                  onClick={toggleFreeze}
                  block
                >
                  {state.frozen ? 'Unfreeze Card' : 'Freeze Card'}
                </Button>
              </Space>
            </Card>

            {state.frozen && (
              <Alert
                message="Card Frozen"
                description="While frozen, all purchases, ATM withdrawals, and recurring payments will be declined."
                type="error"
                showIcon
                style={{
                  marginTop: 16,
                  background: isDark ? '#2a1215' : undefined,
                  border: isDark ? '1px solid #58181c' : undefined,
                  color: isDark ? '#fafafa' : undefined,
                }}
              />
            )}
          </Col>

          {/* Toggle Controls */}
          <Col xs={24} lg={8}>
            <Card title="Transaction Controls">
              <List
                dataSource={[
                  {
                    key: 'internationalEnabled',
                    icon: <GlobalOutlined />,
                    title: 'International Transactions',
                    description: 'Allow purchases from outside the US',
                    value: state.internationalEnabled,
                  },
                  {
                    key: 'contactlessEnabled',
                    icon: <WifiOutlined />,
                    title: 'Contactless Payments',
                    description: 'Tap to pay at supported terminals',
                    value: state.contactlessEnabled,
                  },
                  {
                    key: 'onlinePurchasesEnabled',
                    icon: <CreditCardOutlined />,
                    title: 'Online Purchases',
                    description: 'Allow e-commerce transactions',
                    value: state.onlinePurchasesEnabled,
                  },
                  {
                    key: 'atmEnabled',
                    icon: <DollarOutlined />,
                    title: 'ATM Withdrawals',
                    description: 'Allow cash withdrawals at ATMs',
                    value: state.atmEnabled,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Switch
                        checked={item.value}
                        onChange={(checked) => {
                          updateCard(item.key as keyof CardState, checked);
                          message.info(`${item.title} ${checked ? 'enabled' : 'disabled'}`);
                        }}
                        disabled={state.frozen}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<span style={{ fontSize: 20, opacity: state.frozen ? 0.3 : 1 }}>{item.icon}</span>}
                      title={<Text style={{ opacity: state.frozen ? 0.5 : 1 }}>{item.title}</Text>}
                      description={<Text type="secondary" style={{ fontSize: 12 }}>{item.description}</Text>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Spending Limits */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Card title="Daily Spending Limit">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Statistic
                    value={Math.min(state.dailySpendLimit, maxDailySpend)}
                    prefix="$"
                    suffix="/ day"
                  />
                  <Slider
                    min={isStudent ? 100 : 500}
                    max={maxDailySpend}
                    step={isStudent ? 100 : 500}
                    value={Math.min(state.dailySpendLimit, maxDailySpend)}
                    onChange={(val) => updateCard('dailySpendLimit', val)}
                    disabled={state.frozen}
                    marks={isStudent
                      ? { 100: '$100', 1000: '$1K', 2000: '$2K' }
                      : { 500: '$500', 12500: '$12.5K', 25000: '$25K' }
                    }
                  />
                  {isStudent && (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Student accounts are limited to $2,000/day
                    </Text>
                  )}
                </Space>
              </Card>

              <Card title="Daily ATM Limit">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Statistic
                    value={Math.min(state.dailyAtmLimit, maxDailyAtm)}
                    prefix="$"
                    suffix="/ day"
                  />
                  <Slider
                    min={50}
                    max={maxDailyAtm}
                    step={50}
                    value={Math.min(state.dailyAtmLimit, maxDailyAtm)}
                    onChange={(val) => updateCard('dailyAtmLimit', val)}
                    disabled={state.frozen}
                    marks={isStudent
                      ? { 50: '$50', 150: '$150', 300: '$300' }
                      : { 100: '$100', 1000: '$1K', 2000: '$2K' }
                    }
                  />
                  {isStudent && (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Student accounts are limited to $300/day
                    </Text>
                  )}
                </Space>
              </Card>

              <Card size="small" style={{ background: bgSubtle }}>
                <Space direction="vertical">
                  <Text strong><ThunderboltOutlined /> Quick Actions</Text>
                  <Button size="small" block onClick={() => message.info('Replacement card requested. Arrives in 3-5 business days.')}>
                    Request Replacement Card
                  </Button>
                  <Button size="small" block onClick={() => message.info('Your new PIN will arrive by mail in 5-7 business days.')}>
                    Change PIN
                  </Button>
                  <Button size="small" block onClick={() => message.info('Travel notice added for your upcoming trip.')}>
                    Set Travel Notice
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      )}
    </Space>
  );
}
