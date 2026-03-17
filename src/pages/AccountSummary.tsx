/**
 * Account Summary Page
 *
 * Wells Fargo-inspired account overview showing all accounts with rich detail cards,
 * quick actions, and recent activity.
 *
 * Feature flags used:
 * - dashboardLayout (string): controls card arrangement (classic/modern/compact)
 * - recentTransactionsToShow (number): controls transaction table row count
 */

import { Button, Card, Col, Row, Space, Statistic, Table, Typography } from 'antd';
import {
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
  SendOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlagString, useFeatureFlagNumber } from '../hooks/useFeatureFlag';
import { ACCOUNTS, TRANSACTIONS, TRANSACTION_COLUMNS, type Account } from '../data/mockData.tsx';
import type { User } from '../lib/users';

const { Title, Text } = Typography;

interface AccountSummaryProps {
  currentUser: User;
}

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  checking: <BankOutlined style={{ fontSize: 24, color: '#1a3c5e' }} />,
  savings: <WalletOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
  credit: <CreditCardOutlined style={{ fontSize: 24, color: '#faad14' }} />,
  mortgage: <HomeOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
};

const ACCENT_COLORS: Record<string, string> = {
  checking: '#1a3c5e',
  savings: '#52c41a',
  credit: '#faad14',
  mortgage: '#722ed1',
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function AccountCard({ account, compact }: { account: Account; compact: boolean }) {
  const accentColor = ACCENT_COLORS[account.type];

  return (
    <Card
      size={compact ? 'small' : 'default'}
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            {ACCOUNT_ICONS[account.type]}
            <div>
              <Text strong>{account.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>{account.accountNumber}</Text>
            </div>
          </Space>
          <Statistic
            value={account.balance}
            precision={2}
            prefix="$"
            valueStyle={{
              fontSize: compact ? 18 : 22,
              color: account.type === 'credit' ? '#faad14' : undefined,
            }}
          />
        </div>

        {/* Account-specific details */}
        <div style={{ paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
          {account.type === 'checking' && (
            <Text type="secondary">Available: ${account.available?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          )}
          {account.type === 'savings' && (
            <Space split={<Text type="secondary">&bull;</Text>}>
              <Text type="secondary">{account.interestRate}% APY</Text>
              <Text style={{ color: '#52c41a' }}>+${account.interestEarned?.toFixed(2)} earned this month</Text>
            </Space>
          )}
          {account.type === 'credit' && (
            <Space split={<Text type="secondary">&bull;</Text>}>
              <Text type="secondary">Available credit: ${account.available?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
              <Text type="secondary">Min payment: ${account.minimumPayment?.toFixed(2)} due {account.dueDate}</Text>
            </Space>
          )}
          {account.type === 'mortgage' && (
            <Space split={<Text type="secondary">&bull;</Text>}>
              <Text type="secondary">{account.interestRate}% APR</Text>
              <Text type="secondary">${account.monthlyPayment?.toLocaleString('en-US', { minimumFractionDigits: 2 })}/mo</Text>
              <Text type="secondary">Next payment: {account.dueDate}</Text>
            </Space>
          )}
        </div>

        {/* Mini recent transactions */}
        {!compact && account.recentTransactions.length > 0 && (
          <div style={{ marginTop: 4 }}>
            {account.recentTransactions.slice(0, 3).map(tx => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  fontSize: 12,
                }}
              >
                <Text type="secondary">{tx.description}</Text>
                <Text style={{ color: tx.amount >= 0 ? '#52c41a' : '#f5222d', fontSize: 12 }}>
                  {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </Text>
              </div>
            ))}
          </div>
        )}
      </Space>
    </Card>
  );
}

export function AccountSummary({ currentUser }: AccountSummaryProps) {
  const navigate = useNavigate();

  // String flag: controls card layout arrangement
  const dashboardLayout = useFeatureFlagString('dashboardLayout');

  // Number flag: controls recent activity row count
  const transactionCount = useFeatureFlagNumber('recentTransactionsToShow');

  const isCompact = dashboardLayout === 'compact';
  const isModern = dashboardLayout === 'modern';

  const accountColSpan = isCompact
    ? { xs: 24, sm: 12 }
    : isModern
    ? { xs: 24 }
    : { xs: 24, lg: 12 };

  const firstName = currentUser.name.split(' ')[0];
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Space direction="vertical" size={isCompact ? 'middle' : 'large'} style={{ width: '100%' }}>
      {/* Welcome Section */}
      <div>
        <Title level={3} style={{ marginBottom: 4 }}>
          {getGreeting()}, {firstName}
        </Title>
        <Text type="secondary">{today}</Text>
      </div>

      {/* Account Cards */}
      <Row gutter={[16, 16]}>
        {ACCOUNTS.map(account => (
          <Col key={account.id} {...accountColSpan}>
            <AccountCard account={account} compact={isCompact} />
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Card size={isCompact ? 'small' : 'default'}>
        <Row gutter={[16, 12]}>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              size={isCompact ? 'middle' : 'large'}
              block
              onClick={() => navigate('/transfers')}
            >
              Transfer Money
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              icon={<FileTextOutlined />}
              size={isCompact ? 'middle' : 'large'}
              block
              onClick={() => navigate('/transfers')}
            >
              Pay Bills
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              icon={<DollarOutlined />}
              size={isCompact ? 'middle' : 'large'}
              block
            >
              Deposit Check
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity" size={isCompact ? 'small' : 'default'}>
        <Table
          dataSource={TRANSACTIONS.slice(0, transactionCount)}
          columns={TRANSACTION_COLUMNS}
          rowKey="id"
          pagination={false}
          size={isCompact ? 'small' : 'middle'}
          scroll={{ x: 600 }}
        />
        <div style={{ marginTop: 12 }}>
          <Text type="secondary">
            Showing <strong>{transactionCount}</strong> of {TRANSACTIONS.length} transactions
          </Text>
        </div>
      </Card>
    </Space>
  );
}
