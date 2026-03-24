/**
 * Notifications / Alerts Center Page
 *
 * Transaction alerts, security notices, account updates, and promotional messages.
 * Controlled by enableNotificationCenter boolean flag.
 */

import { useState } from 'react';
import { Badge, Button, Card, Col, Empty, List, Row, Segmented, Space, Statistic, Tag, Typography, theme as antdTheme } from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  DeleteOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  GiftOutlined,
  LockOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Notification {
  id: string;
  type: 'transaction' | 'security' | 'account' | 'promotion';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon: React.ReactNode;
  tagColor: string;
  tagLabel: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'transaction',
    title: 'Large Purchase Detected',
    description: 'A charge of $487.32 was made at Best Buy on your Horizon Cash Rewards Card ending in 3456.',
    timestamp: '2 hours ago',
    read: false,
    icon: <CreditCardOutlined />,
    tagColor: 'blue',
    tagLabel: 'Transaction',
  },
  {
    id: 'n2',
    type: 'security',
    title: 'New Device Login',
    description: 'Your account was accessed from a new device (iPhone 16 Pro) in Portland, OR. If this wasn\'t you, secure your account immediately.',
    timestamp: '5 hours ago',
    read: false,
    icon: <LockOutlined />,
    tagColor: 'red',
    tagLabel: 'Security',
  },
  {
    id: 'n3',
    type: 'account',
    title: 'Direct Deposit Received',
    description: 'A direct deposit of $3,245.00 from ACME Corp Payroll has been credited to your Horizon Checking account.',
    timestamp: '1 day ago',
    read: false,
    icon: <DollarOutlined />,
    tagColor: 'green',
    tagLabel: 'Account',
  },
  {
    id: 'n4',
    type: 'promotion',
    title: 'Earn 5x on Travel This Summer',
    description: 'Book through our travel portal and earn 5x points on flights and hotels with your Horizon Cash Rewards Card.',
    timestamp: '1 day ago',
    read: true,
    icon: <GiftOutlined />,
    tagColor: 'purple',
    tagLabel: 'Offer',
  },
  {
    id: 'n5',
    type: 'security',
    title: 'Password Changed Successfully',
    description: 'Your online banking password was changed. If you did not make this change, contact us immediately.',
    timestamp: '2 days ago',
    read: true,
    icon: <SafetyOutlined />,
    tagColor: 'red',
    tagLabel: 'Security',
  },
  {
    id: 'n6',
    type: 'transaction',
    title: 'Recurring Payment Processed',
    description: 'Your monthly payment of $1,892.00 for Home Mortgage (****9012) has been processed.',
    timestamp: '3 days ago',
    read: true,
    icon: <DollarOutlined />,
    tagColor: 'blue',
    tagLabel: 'Transaction',
  },
  {
    id: 'n7',
    type: 'account',
    title: 'Low Balance Alert',
    description: 'Your Horizon Checking account balance is below $500. Current balance: $487.23. Consider transferring funds.',
    timestamp: '3 days ago',
    read: true,
    icon: <ExclamationCircleOutlined />,
    tagColor: 'orange',
    tagLabel: 'Account',
  },
  {
    id: 'n8',
    type: 'transaction',
    title: 'International Transaction',
    description: 'A charge of $126.50 (CAD $172.40) was made at Shopify Inc. in Ottawa, Canada on your Horizon Cash Rewards Card.',
    timestamp: '4 days ago',
    read: true,
    icon: <CreditCardOutlined />,
    tagColor: 'blue',
    tagLabel: 'Transaction',
  },
  {
    id: 'n9',
    type: 'promotion',
    title: '$200 Savings Bonus',
    description: 'Open a new Horizon Savings account with $25,000+ and earn a $200 bonus after 90 days. Limited time offer.',
    timestamp: '5 days ago',
    read: true,
    icon: <GiftOutlined />,
    tagColor: 'purple',
    tagLabel: 'Offer',
  },
];

export function Notifications() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const bgSubtle = isDark ? '#262626' : '#fafafa';

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const securityCount = notifications.filter(n => n.type === 'security').length;
  const transactionCount = notifications.filter(n => n.type === 'transaction').length;

  const filtered = filter === 'all'
    ? notifications
    : filter === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ marginBottom: 0 }}>
          <Space>
            <BellOutlined />
            Notifications
            {unreadCount > 0 && <Badge count={unreadCount} />}
          </Space>
        </Title>
        {unreadCount > 0 && (
          <Button type="link" icon={<CheckCircleOutlined />} onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={8}>
          <Card size="small">
            <Statistic title="Unread" value={unreadCount} valueStyle={{ color: unreadCount > 0 ? '#1677ff' : undefined }} />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small">
            <Statistic title="Security" value={securityCount} valueStyle={{ color: '#f5222d' }} prefix={<LockOutlined />} />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small">
            <Statistic title="Transactions" value={transactionCount} prefix={<CreditCardOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* Filter */}
      <Segmented
        value={filter}
        onChange={(val) => setFilter(val as string)}
        options={[
          { value: 'all', label: 'All' },
          { value: 'unread', label: `Unread (${unreadCount})` },
          { value: 'transaction', label: 'Transactions' },
          { value: 'security', label: 'Security' },
          { value: 'account', label: 'Account' },
          { value: 'promotion', label: 'Offers' },
        ]}
      />

      {/* Notification List */}
      <Card styles={{ body: { padding: 0 } }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 48 }}>
            <Empty description="No notifications" />
          </div>
        ) : (
          <List
            dataSource={filtered}
            renderItem={(item) => (
              <List.Item
                style={{
                  padding: '16px 24px',
                  background: item.read ? 'transparent' : (isDark ? 'rgba(22, 119, 255, 0.08)' : 'rgba(22, 119, 255, 0.04)'),
                  cursor: 'pointer',
                }}
                onClick={() => markRead(item.id)}
                actions={[
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => { e.stopPropagation(); dismiss(item.id); }}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: bgSubtle,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      {item.icon}
                    </div>
                  }
                  title={
                    <Space>
                      {!item.read && <Badge dot />}
                      <Text strong={!item.read}>{item.title}</Text>
                      <Tag color={item.tagColor} style={{ fontSize: 11 }}>{item.tagLabel}</Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <Paragraph type="secondary" style={{ marginBottom: 4, fontSize: 13 }}>{item.description}</Paragraph>
                      <Text type="secondary" style={{ fontSize: 12 }}>{item.timestamp}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </Space>
  );
}
