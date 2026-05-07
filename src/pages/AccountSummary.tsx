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

import { useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Modal, Row, Select, Space, Statistic, Table, Tag, Typography, Upload, message, theme as antdTheme } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  BankOutlined,
  BookOutlined,
  BulbOutlined,
  CameraOutlined,
  CloseOutlined,
  CreditCardOutlined,
  DollarOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  FundOutlined,
  HomeOutlined,
  InboxOutlined,
  LockOutlined,
  PhoneOutlined,
  ReadOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from '../hooks/useFeatureFlag';
import { ACCOUNTS, TRANSACTIONS, TRANSACTION_COLUMNS, type Account, type Transaction } from '../data/mockData.tsx';
import type { User } from '../lib/users';

const { Title, Text } = Typography;

interface AccountSummaryProps {
  currentUser: User;
  onLockCard?: () => void;
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

function AccountCard({ account, compact, onMortgageAction }: { account: Account; compact: boolean; onMortgageAction?: (action: 'payment' | 'amortization' | 'refinance') => void }) {
  const [expanded, setExpanded] = useState(false);
  const accentColor = ACCENT_COLORS[account.type];

  return (
    <Card
      size={compact ? 'small' : 'default'}
      hoverable
      style={{
        borderLeft: `4px solid ${accentColor}`,
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(!expanded)}
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
          <Space align="center">
            <Statistic
              value={account.balance}
              precision={2}
              prefix="$"
              valueStyle={{
                fontSize: compact ? 18 : 22,
                color: account.type === 'credit' ? '#faad14' : undefined,
              }}
            />
            <DownOutlined
              style={{
                fontSize: 12,
                color: '#8c8c8c',
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Space>
        </div>

        {/* Account-specific details */}
        <div style={{ paddingTop: 8, borderTop: '1px solid var(--ant-color-border-secondary, #f0f0f0)' }}>
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

        {/* Collapsed: mini preview */}
        {!expanded && !compact && account.recentTransactions.length > 0 && (
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

        {/* Expanded: full transaction table */}
        {expanded && (
          <div
            style={{ marginTop: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Table
              dataSource={account.recentTransactions}
              columns={TRANSACTION_COLUMNS}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 500 }}
            />
            {account.type === 'checking' && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button size="small" type="primary">View All Transactions</Button>
                <Button size="small">Download Statement</Button>
              </div>
            )}
            {account.type === 'savings' && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button size="small" type="primary">Transfer Funds</Button>
                <Button size="small">View Interest History</Button>
              </div>
            )}
            {account.type === 'credit' && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button size="small" type="primary">Make a Payment</Button>
                <Button size="small">View Statements</Button>
                <Button size="small">Report Lost Card</Button>
              </div>
            )}
            {account.type === 'mortgage' && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button size="small" type="primary" onClick={() => onMortgageAction?.('payment')}>Make Extra Payment</Button>
                <Button size="small" onClick={() => onMortgageAction?.('amortization')}>View Amortization</Button>
                <Button size="small" onClick={() => onMortgageAction?.('refinance')}>Refinance Options</Button>
              </div>
            )}
          </div>
        )}
      </Space>
    </Card>
  );
}

function AccountCardRedesigned({ account }: { account: Account }) {
  const accentColor = ACCENT_COLORS[account.type];
  const { token: cardToken } = antdTheme.useToken();
  const cardIsDark = cardToken.colorBgContainer !== '#ffffff';

  const detailChips: { label: string; value: string }[] = [];
  if (account.type === 'checking' && account.available != null) {
    detailChips.push({ label: 'Available', value: `$${account.available.toLocaleString('en-US', { minimumFractionDigits: 2 })}` });
  }
  if (account.type === 'savings') {
    detailChips.push({ label: 'APY', value: `${account.interestRate}%` });
    if (account.interestEarned != null) detailChips.push({ label: 'Earned', value: `+$${account.interestEarned.toFixed(2)}` });
  }
  if (account.type === 'credit') {
    if (account.available != null) detailChips.push({ label: 'Available', value: `$${account.available.toLocaleString('en-US', { minimumFractionDigits: 2 })}` });
    if (account.minimumPayment != null) detailChips.push({ label: 'Min Due', value: `$${account.minimumPayment.toFixed(2)}` });
  }
  if (account.type === 'mortgage') {
    detailChips.push({ label: 'APR', value: `${account.interestRate}%` });
    if (account.monthlyPayment != null) detailChips.push({ label: 'Payment', value: `$${account.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}` });
  }

  return (
    <Card
      hoverable
      style={{
        background: cardIsDark
          ? `linear-gradient(135deg, #1f1f1f 0%, ${accentColor}15 100%)`
          : `linear-gradient(135deg, white 0%, ${accentColor}08 100%)`,
        borderLeft: `4px solid ${accentColor}`,
      }}
      bodyStyle={{ padding: '16px 20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Space size="middle" style={{ minWidth: 180 }}>
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
            fontSize: 22,
            fontWeight: 600,
            color: account.type === 'credit' ? '#faad14' : accentColor,
          }}
          style={{ minWidth: 140 }}
        />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          {detailChips.map(chip => (
            <Tag
              key={chip.label}
              style={{
                borderRadius: 16,
                padding: '2px 12px',
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <Text type="secondary" style={{ fontSize: 11 }}>{chip.label}: </Text>
              <Text strong style={{ fontSize: 12 }}>{chip.value}</Text>
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: '#52c41a',
  Income: '#1890ff',
  Transportation: '#faad14',
  Entertainment: '#722ed1',
  Transfer: '#8c8c8c',
  Shopping: '#eb2f96',
  Dining: '#fa541c',
  Utilities: '#13c2c2',
  Health: '#f5222d',
  Cash: '#595959',
};

function SpendingBreakdown({ transactions }: { transactions: Transaction[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const chartData = useMemo(() => {
    const spending: Record<string, number> = {};
    transactions.forEach(tx => {
      if (tx.amount < 0) {
        spending[tx.category] = (spending[tx.category] || 0) + Math.abs(tx.amount);
      }
    });
    return Object.entries(spending)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (!selectedCategory) return [];
    return transactions.filter(tx => tx.category === selectedCategory);
  }, [transactions, selectedCategory]);

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  const handlePieClick = (_: unknown, index: number) => {
    const category = chartData[index]?.name;
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <Card
      title={selectedCategory ? `Spending: ${selectedCategory}` : 'Spending Breakdown'}
      style={{ height: '100%' }}
      extra={selectedCategory && (
        <Button size="small" type="link" onClick={() => setSelectedCategory(null)}>
          Back to chart
        </Button>
      )}
    >
      {!selectedCategory ? (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={2}
                cursor="pointer"
                onClick={handlePieClick}
              >
                {chartData.map(entry => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#8c8c8c'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Text type="secondary">
              Total spending: <Text strong>${total.toFixed(2)}</Text>
            </Text>
          </div>
        </>
      ) : (
        <div style={{ maxHeight: 340, overflowY: 'auto' }}>
          {filteredTransactions.map(tx => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid var(--ant-color-border-secondary, #f0f0f0)',
              }}
            >
              <div>
                <Text>{tx.description}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{tx.date}</Text>
              </div>
              <Text strong style={{ color: tx.amount >= 0 ? '#52c41a' : '#f5222d' }}>
                {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
              </Text>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function AccountSummary({ currentUser, onLockCard }: AccountSummaryProps) {
  const navigate = useNavigate();
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [studentLoanModal, setStudentLoanModal] = useState<'payment' | 'repayment' | 'forgiveness' | null>(null);
  const [mortgageModal, setMortgageModal] = useState<'payment' | 'amortization' | 'refinance' | null>(null);
  const [subscriptionModal, setSubscriptionModal] = useState<'unused' | 'limit' | 'cancel' | 'price-review' | null>(null);
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState<Record<string, string>>({}); // key: subscription name, value: cancellation date
  const [reviewedPriceChanges, setReviewedPriceChanges] = useState<string[]>([]); // subscriptions whose price changes have been reviewed
  const [fraudAlertDismissed, setFraudAlertDismissed] = useState(false);
  const { token } = antdTheme.useToken();

  // Theme-aware helper colors
  const isDark = token.colorBgContainer !== '#ffffff';
  const bgSubtle = isDark ? '#262626' : '#fafafa';
  const bgMuted = isDark ? '#1f1f1f' : '#f5f5f5';
  const borderSubtle = isDark ? '#434343' : '#f0f0f0';
  const progressTrack = isDark ? '#434343' : '#f0f0f0';

  // Boolean flag: show fraud alert banner with client-side 50/50 split
  // Fraud alerts flag - controlled entirely by CloudBees UI (no client-side bucketing)
  const showFraudAlerts = useFeatureFlag('fraudAlerts');

  // Boolean flag: show student loan summary
  const showStudentLoans = useFeatureFlag('showStudentLoans');

  // Boolean flag: show mortgage account card
  const showMortgageAccount = useFeatureFlag('showMortgageAccount');

  // Boolean flag: show AI-powered budget insights (kill switch demo)
  const showBudgetInsights = useFeatureFlag('enableSmartBudgetInsights');

  // String flag: personalized welcome experience by segment
  const welcomeExperience = useFeatureFlagString('welcomeExperience');

  // Boolean flag: A/B test redesigned account cards
  const useRedesignedCards = useFeatureFlag('enableRedesignedAccountCards');

  // Boolean flag: show credit score (entitlement gating demo)
  const showCreditScore = useFeatureFlag('showCreditScore');

  // Boolean flag: show recurring subscriptions tracker
  const showRecurringSubscriptions = useFeatureFlag('showRecurringSubscriptions');

  // Student persona: no credit card, lower balances
  const isStudent = currentUser.properties.booleans.isStudent ?? false;

  // String flag: controls card layout arrangement
  // Mobile always uses compact layout for better readability
  const dashboardLayoutFlag = useFeatureFlagString('dashboardLayout');
  const isMobileView = window.innerWidth < 768;
  const dashboardLayout = isMobileView ? 'compact' : dashboardLayoutFlag;

  // Number flag: controls recent activity row count (default)
  const transactionCountDefault = useFeatureFlagNumber('recentTransactionsToShow');
  const [transactionCount, setTransactionCount] = useState<number | null>(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const effectiveCount = showAllTransactions ? TRANSACTIONS.length : (transactionCount ?? transactionCountDefault);

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
      {/* Welcome Section - controlled by welcomeExperience string flag */}
      {welcomeExperience === 'student-focused' ? (
        <Card
          style={{ background: isDark ? 'linear-gradient(135deg, #0a2e2a 0%, #0d1b2e 100%)' : 'linear-gradient(135deg, #e6fffb 0%, #f0f5ff 100%)', border: isDark ? '1px solid #1a4a44' : '1px solid #b5f5ec' }}
          bodyStyle={{ padding: '20px 24px' }}
        >
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={14}>
              <Title level={3} style={{ marginBottom: 4 }}>
                {getGreeting()}, {firstName}
              </Title>
              <Text type="secondary">{today}</Text>
              <div style={{ marginTop: 16 }}>
                <ReadOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
                <Text strong style={{ color: '#13c2c2' }}>Student Financial Tip:</Text>
                <Text style={{ marginLeft: 8 }}>Set up automatic transfers to savings — even $25/week adds up to $1,300/year.</Text>
              </div>
            </Col>
            <Col xs={24} md={10}>
              <Card size="small" style={{ background: token.colorBgContainer }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Savings Goal: Emergency Fund</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0 4px' }}>
                  <Text strong>$1,820 of $3,000</Text>
                  <Text strong style={{ color: '#13c2c2' }}>61%</Text>
                </div>
                <div style={{ height: 8, background: progressTrack, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: '61%', height: '100%', background: '#13c2c2', borderRadius: 4 }} />
                </div>
                <Button type="link" size="small" style={{ padding: 0, marginTop: 8, color: '#13c2c2' }} onClick={() => navigate('/rewards')}>Student Resources →</Button>
              </Card>
            </Col>
          </Row>
        </Card>
      ) : welcomeExperience === 'wealth-management' ? (
        <Card
          style={{ background: isDark ? 'linear-gradient(135deg, #1a0a2e 0%, #2e1a00 100%)' : 'linear-gradient(135deg, #f9f0ff 0%, #fff7e6 100%)', border: isDark ? '1px solid #4a2a7a' : '1px solid #d3adf7' }}
          bodyStyle={{ padding: '20px 24px' }}
        >
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={8}>
              <Title level={3} style={{ marginBottom: 4 }}>
                {getGreeting()}, {firstName}
              </Title>
              <Text type="secondary">{today}</Text>
            </Col>
            <Col xs={24} md={10}>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Statistic
                    title={<Text type="secondary" style={{ fontSize: 12 }}>Portfolio Value</Text>}
                    value={487250}
                    precision={2}
                    prefix="$"
                    valueStyle={{ fontSize: 18 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={<Text type="secondary" style={{ fontSize: 12 }}>Today's Change</Text>}
                    value={1842.50}
                    precision={2}
                    prefix={<RiseOutlined />}
                    valueStyle={{ fontSize: 18, color: '#52c41a' }}
                    suffix={<Text style={{ fontSize: 12, color: '#52c41a' }}>+0.38%</Text>}
                  />
                </Col>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 11 }}>S&P 500</Text>
                  <br />
                  <Text style={{ fontSize: 13, color: '#52c41a' }}>+0.42%</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 11 }}>NASDAQ</Text>
                  <br />
                  <Text style={{ fontSize: 13, color: '#52c41a' }}>+0.67%</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 11 }}>DOW</Text>
                  <br />
                  <Text style={{ fontSize: 13, color: '#f5222d' }}>-0.15%</Text>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={6} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<PhoneOutlined />} style={{ background: '#722ed1', borderColor: '#722ed1' }} onClick={() => message.success('Your advisor will call you within 1 business day.')}>
                Schedule Advisor Call
              </Button>
              <br />
              <Button type="link" size="small" style={{ color: '#722ed1', marginTop: 4 }} onClick={() => navigate('/investments')}>
                <FundOutlined /> View Full Portfolio →
              </Button>
            </Col>
          </Row>
        </Card>
      ) : welcomeExperience === 'homeowner' ? (
        <Card
          style={{ background: isDark ? 'linear-gradient(135deg, #2e0a0a 0%, #2e1a00 100%)' : 'linear-gradient(135deg, #fff1f0 0%, #fff7e6 100%)', border: isDark ? '1px solid #6e2a2a' : '1px solid #ffccc7' }}
          bodyStyle={{ padding: '20px 24px' }}
        >
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={8}>
              <Title level={3} style={{ marginBottom: 4 }}>
                {getGreeting()}, {firstName}
              </Title>
              <Text type="secondary">{today}</Text>
            </Col>
            <Col xs={24} md={10}>
              <Row gutter={[16, 8]}>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Est. Home Value</Text>
                  <br />
                  <Text strong style={{ fontSize: 16 }}>$412,000</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Equity</Text>
                  <br />
                  <Text strong style={{ fontSize: 16, color: '#52c41a' }}>$124,568</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 11 }}>30.2%</Text>
                </Col>
                <Col span={8}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Your Rate vs. Today</Text>
                  <br />
                  <Text strong style={{ fontSize: 16, color: '#f5222d' }}>5.875%</Text>
                  <Text type="secondary" style={{ fontSize: 11 }}> vs </Text>
                  <Text strong style={{ fontSize: 16, color: '#52c41a' }}>5.25%</Text>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={6} style={{ textAlign: 'right' }}>
              <Button type="primary" icon={<DollarOutlined />} style={{ background: '#fa541c', borderColor: '#fa541c' }} onClick={() => setMortgageModal('refinance')}>
                Explore Refinancing
              </Button>
              <br />
              <Button type="link" size="small" style={{ color: '#fa541c', marginTop: 4 }} onClick={() => setMortgageModal('amortization')}>
                <HomeOutlined /> Home Equity Options →
              </Button>
            </Col>
          </Row>
        </Card>
      ) : (
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            {getGreeting()}, {firstName}
          </Title>
          <Text type="secondary">{today}</Text>
        </div>
      )}

      {/* Fraud Alert Banner - controlled by fraudAlerts boolean flag */}
      {showFraudAlerts && !fraudAlertDismissed && (
        <div
          style={{
            background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)',
            borderRadius: 8,
            padding: 20,
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(207, 19, 34, 0.3)',
          }}
        >
          {/* Background pattern/icon */}
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: -20,
              fontSize: 180,
              opacity: 0.1,
              transform: 'rotate(-15deg)',
            }}
          >
            🚨
          </div>

          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={16}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <ExclamationCircleOutlined style={{ fontSize: 24, color: '#fff' }} />
                  <Text strong style={{ color: '#fff', fontSize: 18 }}>
                    Suspicious Activity Detected
                  </Text>
                </Space>
                <Text style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: 14 }}>
                  We detected an unusual transaction on your Horizon Cash Rewards Card
                </Text>
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 6,
                    padding: '12px 16px',
                    marginTop: 8,
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong style={{ color: '#fff', fontSize: 15 }}>
                        Electronics Plus - Miami, FL
                      </Text>
                      <br />
                      <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}>
                        May 7, 2026 at 2:47 AM
                      </Text>
                    </Col>
                    <Col>
                      <Text strong style={{ color: '#fff', fontSize: 22 }}>
                        $1,247.99
                      </Text>
                    </Col>
                  </Row>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  danger
                  size="large"
                  icon={<LockOutlined />}
                  style={{
                    width: '100%',
                    background: '#fff',
                    borderColor: '#fff',
                    color: '#cf1322',
                    fontWeight: 600,
                    height: 44,
                  }}
                  onClick={() => {
                    message.success('Card frozen successfully. A new card will be mailed within 3-5 business days.');
                    setFraudAlertDismissed(true);
                    onLockCard?.();
                  }}
                >
                  Freeze Card Now
                </Button>
                <Button
                  size="middle"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                  }}
                  onClick={() => {
                    message.info('Thank you for confirming. No action needed.');
                    setFraudAlertDismissed(true);
                  }}
                >
                  This was me
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Close button */}
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: '#fff',
              opacity: 0.7,
            }}
            onClick={() => setFraudAlertDismissed(true)}
          />
        </div>
      )}

      {/* Student Loans - controlled by showStudentLoans boolean flag */}
      {showStudentLoans && (
        <Card
          size={isCompact ? 'small' : 'default'}
          style={{ borderLeft: '4px solid #13c2c2' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <Space>
              <BookOutlined style={{ fontSize: 24, color: '#13c2c2' }} />
              <div>
                <Text strong>Federal Student Loan</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>Loan #SL-2024-78392</Text>
              </div>
            </Space>
            <Statistic value={24680} precision={2} prefix="$" valueStyle={{ fontSize: 22 }} />
          </div>

          <div style={{ marginTop: 16 }}>
            {/* Repayment Progress */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Repayment Progress</Text>
                <Text strong style={{ fontSize: 12 }}>38% paid</Text>
              </div>
              <div style={{ height: 8, background: progressTrack, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: '38%', height: '100%', background: '#13c2c2', borderRadius: 4 }} />
              </div>
            </div>

            <Row gutter={[16, 8]}>
              <Col xs={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>Monthly Payment</Text>
                <br />
                <Text strong>$284.50</Text>
              </Col>
              <Col xs={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>Interest Rate</Text>
                <br />
                <Text strong>4.99% APR</Text>
              </Col>
              <Col xs={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>Next Payment</Text>
                <br />
                <Text strong>Apr 1, 2026</Text>
              </Col>
            </Row>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <Button size="small" type="primary" style={{ background: '#13c2c2', borderColor: '#13c2c2' }} onClick={() => setStudentLoanModal('payment')}>
                Make a Payment
              </Button>
              <Button size="small" onClick={() => setStudentLoanModal('repayment')}>View Repayment Plan</Button>
              <Button size="small" onClick={() => setStudentLoanModal('forgiveness')}>Explore Forgiveness Options</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Account Cards - variant controlled by enableRedesignedAccountCards boolean flag (A/B test) */}
      <Row gutter={[16, 16]}>
        {ACCOUNTS
          .filter(account => {
            if (account.type === 'mortgage' && !showMortgageAccount) return false;
            if (account.type === 'credit' && isStudent) return false;
            // Hide checking account for wealth management customers (they use premier accounts)
            const customerSegment = currentUser.properties.strings.customerSegment || '';
            if (account.type === 'checking' && customerSegment === 'financial-planning') return false;
            return true;
          })
          .map(account => {
            // Override balances and transactions for student personas
            const displayAccount = isStudent
              ? {
                  ...account,
                  ...(account.type === 'checking' ? {
                    balance: 5000,
                    available: 4900,
                    recentTransactions: account.recentTransactions.filter(
                      t => !t.description.toLowerCase().includes('payroll')
                    ),
                  } : {}),
                  ...(account.type === 'savings' ? { balance: 10000, interestEarned: 8.25 } : {}),
                }
              : account;
            return (
              <Col key={account.id} {...(useRedesignedCards ? { xs: 24 } : accountColSpan)}>
                {useRedesignedCards ? (
                  <AccountCardRedesigned account={displayAccount} />
                ) : (
                  <AccountCard account={displayAccount} compact={isCompact} onMortgageAction={setMortgageModal} />
                )}
              </Col>
            );
          })}
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
              icon={<CameraOutlined />}
              size={isCompact ? 'middle' : 'large'}
              block
              onClick={() => setDepositModalOpen(true)}
            >
              Deposit Check
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Smart Budget Insights - controlled by enableSmartBudgetInsights boolean flag (kill switch demo) */}
      {showBudgetInsights && !isStudent && !isMobileView && (
        <Card
          title={
            <Space>
              <BulbOutlined style={{ color: '#faad14' }} />
              <span>Smart Budget Insights</span>
              <Tag color="blue" style={{ fontSize: 11, marginLeft: 4 }}>AI-Powered</Tag>
            </Space>
          }
          size={isCompact ? 'small' : 'default'}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {[
              {
                icon: '🛒',
                text: 'Your grocery spending is 23% higher than last month — mostly from Whole Foods and Trader Joe\'s. Consider setting a weekly budget.',
                tag: 'Spending Alert',
                tagColor: 'orange',
              },
              {
                icon: '🔄',
                text: 'You have $340/mo in recurring subscriptions — 2 services you haven\'t used in over 60 days (Hulu, Adobe Creative Cloud).',
                tag: 'Optimization',
                tagColor: 'blue',
              },
              {
                icon: '🎯',
                text: 'At your current savings rate of $420/mo, you\'ll reach your $5,000 emergency fund goal by August 2026.',
                tag: 'On Track',
                tagColor: 'green',
              },
            ].map((insight, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 16px',
                  background: bgSubtle,
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 20, lineHeight: '24px' }}>{insight.icon}</span>
                <div style={{ flex: 1 }}>
                  <Text>{insight.text}</Text>
                </div>
                <Tag color={insight.tagColor} style={{ flexShrink: 0 }}>{insight.tag}</Tag>
              </div>
            ))}
            <Button type="link" style={{ padding: 0 }}>View All Insights →</Button>
          </Space>
        </Card>
      )}

      {/* Recent Activity + Spending Breakdown */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="Recent Activity"
            size={isCompact ? 'small' : 'default'}
            style={{ height: '100%' }}
            extra={
              <Space size="small">
                <Select
                  value={showAllTransactions ? 'all' : String(transactionCount ?? transactionCountDefault)}
                  onChange={(val) => {
                    if (val === 'all') {
                      setShowAllTransactions(true);
                    } else {
                      setShowAllTransactions(false);
                      setTransactionCount(Number(val));
                    }
                  }}
                  size="small"
                  style={{ width: 90 }}
                  options={[
                    { label: '5', value: '5' },
                    { label: '10', value: '10' },
                    { label: 'All', value: 'all' },
                  ]}
                />
              </Space>
            }
          >
            <Table
              dataSource={
                isStudent
                  ? TRANSACTIONS.filter(t => !t.description.toLowerCase().includes('payroll')).slice(0, effectiveCount)
                  : TRANSACTIONS.slice(0, effectiveCount)
              }
              columns={TRANSACTION_COLUMNS}
              rowKey="id"
              pagination={false}
              size={isCompact ? 'small' : 'middle'}
              scroll={{ x: 600 }}
            />
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text type="secondary">
                Showing <strong>{showAllTransactions ? TRANSACTIONS.length : effectiveCount}</strong> of {TRANSACTIONS.length} transactions
              </Text>
              {!showAllTransactions && (
                <Button type="link" size="small" style={{ padding: 0 }} onClick={() => setShowAllTransactions(true)}>
                  View All Transactions →
                </Button>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          {showCreditScore && !isStudent ? (
            <Card
              hoverable
              onClick={() => navigate('/rewards')}
              style={{
                cursor: 'pointer',
                height: '100%',
                border: `2px solid ${isDark ? '#389e0d' : '#52c41a'}`,
                background: isDark
                  ? 'linear-gradient(135deg, #0a2e0a 0%, #1a4a1a 100%)'
                  : 'linear-gradient(135deg, #f6ffed 0%, #e6fffb 100%)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '8px solid #52c41a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  background: isDark ? '#0a2e0a' : '#ffffff',
                  boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)',
                }}>
                  <Text strong style={{ fontSize: 42, lineHeight: 1, color: '#52c41a' }}>782</Text>
                  <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>Excellent</Text>
                </div>

                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Space size={8} style={{ justifyContent: 'center' }}>
                    <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                    <Text strong style={{ fontSize: 18 }}>Credit Score</Text>
                  </Space>
                  <Tag color="gold" style={{ fontSize: 10 }}>PREMIER</Tag>

                  <div style={{ marginTop: 12, padding: '12px 16px', background: isDark ? '#0a2e0a' : '#f6ffed', borderRadius: 8 }}>
                    <Text strong style={{ color: '#52c41a', fontSize: 16, display: 'block' }}>↑ +12 points</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>since last month</Text>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    style={{
                      marginTop: 16,
                      width: '100%',
                      background: '#52c41a',
                      borderColor: '#52c41a',
                      fontWeight: 600,
                    }}
                  >
                    View Full Details →
                  </Button>
                </Space>
              </div>
            </Card>
          ) : (
            <SpendingBreakdown transactions={TRANSACTIONS.slice(0, effectiveCount)} />
          )}
        </Col>
      </Row>

      {/* Recurring Subscriptions Tracker - controlled by showRecurringSubscriptions boolean flag */}
      {showRecurringSubscriptions && currentUser.properties.strings.customerSegment !== 'mortgage' && (
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {(() => {
            // Base subscriptions everyone gets (streaming services)
            const baseSubscriptions = [
              { service: 'Netflix Premium', amount: 22.99, category: 'Entertainment', nextCharge: 'May 12', icon: '🎬', originalPrice: null },
              { service: 'Spotify Family', amount: 16.99, category: 'Entertainment', nextCharge: 'May 8', icon: '🎵', originalPrice: null },
              { service: 'Hulu (No Ads)', amount: 17.99, category: 'Entertainment', nextCharge: 'May 10', icon: '📺', originalPrice: 14.99 },
            ];

            // Student-specific subscriptions
            const studentSubscriptions = [
              { service: 'Adobe Creative Cloud', amount: 54.99, category: 'Software', nextCharge: 'May 18', icon: '🎨', originalPrice: null },
              { service: 'Dropbox Plus', amount: 11.99, category: 'Technology', nextCharge: 'May 28', icon: '💾', originalPrice: null },
              { service: 'ChatGPT Plus', amount: 20.00, category: 'Technology', nextCharge: 'May 14', icon: '🤖', originalPrice: null },
              { service: 'Notion Pro', amount: 10.00, category: 'Productivity', nextCharge: 'May 20', icon: '📝', originalPrice: null },
            ];

            // Everyday person subscriptions
            const everydaySubscriptions = [
              { service: 'Amazon Prime', amount: 14.99, category: 'Shopping', nextCharge: 'May 15', icon: '📦', originalPrice: null },
              { service: 'LA Fitness', amount: 49.99, category: 'Health', nextCharge: 'May 1', icon: '💪', originalPrice: null },
              { service: 'HelloFresh Meal Kit', amount: 71.02, category: 'Groceries', nextCharge: 'May 7', icon: '🥗', originalPrice: null },
              { service: 'Apple iCloud Storage', amount: 9.99, category: 'Technology', nextCharge: 'May 6', icon: '☁️', originalPrice: null },
            ];

            // Wealth/premium subscriptions
            const wealthSubscriptions = [
              { service: 'WSJ Digital Access', amount: 39.99, category: 'News', nextCharge: 'May 18', icon: '📰', originalPrice: null },
              { service: 'The Economist', amount: 29.99, category: 'News', nextCharge: 'May 22', icon: '📊', originalPrice: null },
              { service: 'Bloomberg Terminal', amount: 199.00, category: 'Finance', nextCharge: 'May 5', icon: '💹', originalPrice: null },
              { service: 'NYT Digital Subscription', amount: 17.00, category: 'News', nextCharge: 'May 22', icon: '📰', originalPrice: 15.00 },
              { service: 'Peloton All-Access', amount: 44.00, category: 'Health', nextCharge: 'May 11', icon: '🚴', originalPrice: null },
            ];

            // Build subscription list based on user segment
            const customerSegment = currentUser.properties.strings.customerSegment || 'checking-savings';
            let subscriptions = [...baseSubscriptions];

            if (customerSegment === 'student') {
              subscriptions = [...subscriptions, ...studentSubscriptions];
            } else if (customerSegment === 'financial-planning') {
              subscriptions = [...subscriptions, ...wealthSubscriptions];
            } else {
              // checking-savings, mortgage, or default
              subscriptions = [...subscriptions, ...everydaySubscriptions];
            }

            const originalTotal = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
            const totalAmount = subscriptions.reduce((sum, sub) =>
              cancelledSubscriptions[sub.service] ? sum : sum + sub.amount, 0
            );
            const cancelledCount = Object.keys(cancelledSubscriptions).length;

            return (
            <Card
          title={
            <Space>
              <RiseOutlined style={{ color: '#722ed1' }} />
              <span>Recurring Subscriptions</span>
              <Tag color="purple" style={{ fontSize: 11, marginLeft: 4 }}>Track Spending</Tag>
              {cancelledCount > 0 && (
                <Tag color="green" style={{ fontSize: 11 }}>
                  {cancelledCount} Cancelled
                </Tag>
              )}
            </Space>
          }
          size={isCompact ? 'small' : 'default'}
          extra={
            <Text type="secondary">
              Total: <Text strong style={{ fontSize: 16, color: '#722ed1' }}>${totalAmount.toFixed(2)}/mo</Text>
              {cancelledCount > 0 && (
                <>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12, color: '#52c41a' }}>
                    Saving ${(originalTotal - totalAmount).toFixed(2)}/mo
                  </Text>
                </>
              )}
            </Text>
          }
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {subscriptions
            .sort((a, b) => {
              // Sort: price increases first (unreviewed), then active subs, then cancelled
              const aHasPriceChange = a.originalPrice && !reviewedPriceChanges.includes(a.service);
              const bHasPriceChange = b.originalPrice && !reviewedPriceChanges.includes(b.service);
              const aCancelled = !!cancelledSubscriptions[a.service];
              const bCancelled = !!cancelledSubscriptions[b.service];

              if (aHasPriceChange && !bHasPriceChange) return -1;
              if (!aHasPriceChange && bHasPriceChange) return 1;
              if (aCancelled && !bCancelled) return 1;
              if (!aCancelled && bCancelled) return -1;
              return 0;
            })
            .map((sub, i) => {
              const hasPriceChange = sub.originalPrice && sub.originalPrice !== sub.amount;
              const priceChangePercent = hasPriceChange ? Math.round(((sub.amount - sub.originalPrice) / sub.originalPrice) * 100) : 0;
              const isPriceChangeReviewed = reviewedPriceChanges.includes(sub.service);
              const isCancelled = cancelledSubscriptions[sub.service];
              const showPriceAlert = hasPriceChange && !isPriceChangeReviewed && !isCancelled;

              return (
                <div key={i}>
                  {showPriceAlert && (
                    <div
                      style={{
                        padding: '10px 14px',
                        background: isDark ? 'linear-gradient(135deg, #2d1b0f 0%, #3d2817 100%)' : 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)',
                        borderRadius: 8,
                        borderLeft: `3px solid #fa8c16`,
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                        <Space>
                          <ExclamationCircleOutlined style={{ color: '#fa8c16', fontSize: 16 }} />
                          <div>
                            <Text strong style={{ color: '#fa8c16' }}>Price Increase Detected</Text>
                            <br />
                            <Text style={{ fontSize: 12 }}>
                              {sub.service} increased from ${sub.originalPrice?.toFixed(2)} to ${sub.amount.toFixed(2)} (+{priceChangePercent}%)
                            </Text>
                          </div>
                        </Space>
                        <Button
                          size="small"
                          type="primary"
                          style={{ background: '#fa8c16', borderColor: '#fa8c16' }}
                          onClick={() => setSubscriptionModal('price-review')}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: isCancelled ? (isDark ? '#1f1f1f' : '#fafafa') : (showPriceAlert ? (isDark ? '#2d2520' : '#fffaf0') : bgSubtle),
                      borderRadius: 8,
                      borderLeft: `3px solid ${isCancelled ? '#8c8c8c' : (showPriceAlert ? '#fa8c16' : '#722ed1')}`,
                      opacity: isCancelled ? 0.6 : 1,
                    }}
                  >
                    <span style={{ fontSize: 24, lineHeight: '24px', filter: isCancelled ? 'grayscale(100%)' : 'none' }}>{sub.icon}</span>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ textDecoration: isCancelled ? 'line-through' : 'none' }}>
                        {sub.service}
                      </Text>
                      {isCancelled && (
                        <Tag color="red" style={{ marginLeft: 8, fontSize: 10 }}>CANCELLED</Tag>
                      )}
                      {hasPriceChange && !isCancelled && (
                        <Tag color="orange" style={{ marginLeft: 8, fontSize: 10 }}>
                          {isPriceChangeReviewed ? 'PRICE REVIEWED' : `+${priceChangePercent}%`}
                        </Tag>
                      )}
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {isCancelled ? `Cancelled on ${isCancelled}` : `${sub.category} • Next charge: ${sub.nextCharge}`}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Text strong style={{ fontSize: 16, color: isCancelled ? '#8c8c8c' : (showPriceAlert ? '#fa8c16' : '#722ed1'), textDecoration: isCancelled ? 'line-through' : 'none' }}>
                        ${sub.amount.toFixed(2)}
                      </Text>
                      {hasPriceChange && !isCancelled && (
                        <>
                          <br />
                          <Text type="secondary" style={{ fontSize: 10, textDecoration: 'line-through' }}>
                            was ${sub.originalPrice?.toFixed(2)}
                          </Text>
                        </>
                      )}
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>per month</Text>
                    </div>
                  </div>
                </div>
              );
            })}
            {!cancelledSubscriptions['Hulu (No Ads)'] && !cancelledSubscriptions['Adobe Creative Cloud'] && (
              <div
                style={{
                  marginTop: 8,
                  padding: '12px 16px',
                  background: isDark ? 'linear-gradient(135deg, #1a1027 0%, #2d1b4e 100%)' : 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%)',
                  borderRadius: 8,
                  borderLeft: `3px solid #faad14`,
                }}
              >
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Space>
                    <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 16 }} />
                    <Text strong style={{ color: '#faad14' }}>Savings Opportunity</Text>
                  </Space>
                </Space>
                <Text style={{ fontSize: 13, display: 'block', marginTop: 6 }}>
                  You haven't used Hulu or Adobe Creative Cloud in over 60 days. Canceling these could save you <Text strong style={{ color: '#52c41a' }}>$72.98/month</Text> ($875.76/year).
                </Text>
                <Button
                  type="link"
                  size="small"
                  style={{ padding: 0, marginTop: 4, color: '#722ed1' }}
                  onClick={() => setSubscriptionModal('unused')}
                >
                  Review Unused Subscriptions →
                </Button>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <Button
                size="small"
                type="primary"
                style={{ background: '#722ed1', borderColor: '#722ed1' }}
                onClick={() => setSubscriptionModal('limit')}
              >
                Set Spending Limit
              </Button>
              <Button
                size="small"
                onClick={() => {
                  message.success('Subscription data exported to subscriptions.csv');
                }}
              >
                Export to CSV
              </Button>
              <Button
                size="small"
                onClick={() => setSubscriptionModal('cancel')}
              >
                Cancel a Subscription
              </Button>
            </div>
          </Space>
            </Card>
            );
          })()}
        </Col>
        <Col xs={24} lg={8}>
          {/* Placeholder for additional widgets */}
        </Col>
      </Row>
      )}

      {/* Deposit Check Modal */}
      <Modal
        title="Mobile Check Deposit"
        open={depositModalOpen}
        onCancel={() => setDepositModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setDepositModalOpen(false)}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              message.success('Check submitted for deposit! Funds will be available within 1 business day.');
              setDepositModalOpen(false);
            }}
          >
            Submit Deposit
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Deposit to</Text>
            <div style={{ marginTop: 4, padding: '8px 12px', background: bgMuted, borderRadius: 4 }}>
              Horizon Checking (****4523)
            </div>
          </div>

          <div>
            <Text strong>Check Amount</Text>
            <div style={{ marginTop: 4 }}>
              <input
                type="text"
                placeholder="$0.00"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: `1px solid ${borderSubtle}`,
                  borderRadius: 4,
                  fontSize: 16,
                  background: isDark ? '#262626' : '#fff',
                  color: isDark ? '#fafafa' : '#000',
                }}
              />
            </div>
          </div>

          <div>
            <Text strong>Front of Check</Text>
            <Upload.Dragger
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => { message.info('Check front captured'); return false; }}
              style={{ marginTop: 4 }}
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Tap to take a photo or drag image here</p>
            </Upload.Dragger>
          </div>

          <div>
            <Text strong>Back of Check</Text>
            <Upload.Dragger
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => { message.info('Check back captured'); return false; }}
              style={{ marginTop: 4 }}
            >
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Tap to take a photo or drag image here</p>
            </Upload.Dragger>
          </div>
        </Space>
      </Modal>

      {/* Student Loan - Make a Payment Modal */}
      <Modal
        title="Make a Student Loan Payment"
        open={studentLoanModal === 'payment'}
        onCancel={() => setStudentLoanModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setStudentLoanModal(null)}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            style={{ background: '#13c2c2', borderColor: '#13c2c2' }}
            onClick={() => {
              message.success('Payment of $284.50 submitted to Federal Student Loan. Thank you!');
              setStudentLoanModal(null);
            }}
          >
            Submit Payment
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Pay from</Text>
            <div style={{ marginTop: 4, padding: '8px 12px', background: bgMuted, borderRadius: 4 }}>
              Horizon Checking (****4523) — $4,250.00
            </div>
          </div>
          <div>
            <Text strong>Pay to</Text>
            <div style={{ marginTop: 4, padding: '8px 12px', background: bgMuted, borderRadius: 4 }}>
              Federal Student Loan (SL-2024-78392) — $24,680.00 balance
            </div>
          </div>
          <div>
            <Text strong>Payment Amount</Text>
            <input
              type="text"
              defaultValue="$284.50"
              style={{ width: '100%', marginTop: 4, padding: '8px 12px', border: `1px solid ${borderSubtle}`, borderRadius: 4, fontSize: 16, background: isDark ? '#262626' : '#fff', color: isDark ? '#fafafa' : '#000' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>Minimum payment: $284.50 &bull; Due: Apr 1, 2026</Text>
          </div>
        </Space>
      </Modal>

      {/* Student Loan - Repayment Plan Modal */}
      <Modal
        title="Repayment Plan"
        open={studentLoanModal === 'repayment'}
        onCancel={() => setStudentLoanModal(null)}
        footer={<Button onClick={() => setStudentLoanModal(null)}>Close</Button>}
        width={520}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ padding: 12, background: bgMuted, borderRadius: 4 }}>
            <Text strong>Current Plan: Standard Repayment</Text>
            <br />
            <Text type="secondary">120 monthly payments of $284.50</Text>
          </div>
          <Table
            dataSource={[
              { key: '1', label: 'Original Balance', value: '$39,800.00' },
              { key: '2', label: 'Current Balance', value: '$24,680.00' },
              { key: '3', label: 'Amount Paid', value: '$15,120.00 (38%)' },
              { key: '4', label: 'Interest Rate', value: '4.99% APR' },
              { key: '5', label: 'Monthly Payment', value: '$284.50' },
              { key: '6', label: 'Payments Remaining', value: '87 of 120' },
              { key: '7', label: 'Estimated Payoff', value: 'June 2033' },
            ]}
            columns={[
              { title: '', dataIndex: 'label', key: 'label', render: (t: string) => <Text strong>{t}</Text> },
              { title: '', dataIndex: 'value', key: 'value' },
            ]}
            showHeader={false}
            pagination={false}
            size="small"
          />
        </Space>
      </Modal>

      {/* Student Loan - Forgiveness Options Modal */}
      <Modal
        title="Loan Forgiveness Options"
        open={studentLoanModal === 'forgiveness'}
        onCancel={() => setStudentLoanModal(null)}
        footer={<Button onClick={() => setStudentLoanModal(null)}>Close</Button>}
        width={520}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {[
            {
              title: 'Public Service Loan Forgiveness (PSLF)',
              desc: 'Forgiveness after 120 qualifying payments while working for a qualifying employer.',
              tag: 'You may qualify',
              tagColor: 'green',
            },
            {
              title: 'Income-Driven Repayment Forgiveness',
              desc: 'Remaining balance forgiven after 20-25 years of qualifying payments under an IDR plan.',
              tag: 'Available',
              tagColor: 'blue',
            },
            {
              title: 'Teacher Loan Forgiveness',
              desc: 'Up to $17,500 forgiven after 5 years of teaching at a qualifying school.',
              tag: 'Restricted',
              tagColor: 'orange',
            },
          ].map(opt => (
            <Card key={opt.title} size="small">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text strong>{opt.title}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 13 }}>{opt.desc}</Text>
                </div>
                <Tag color={opt.tagColor}>{opt.tag}</Tag>
              </div>
            </Card>
          ))}
          <Button type="primary" block style={{ background: '#13c2c2', borderColor: '#13c2c2' }}>
            Check My Eligibility
          </Button>
        </Space>
      </Modal>

      {/* Mortgage - Make Extra Payment Modal */}
      <Modal
        title="Make Extra Mortgage Payment"
        open={mortgageModal === 'payment'}
        onCancel={() => setMortgageModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setMortgageModal(null)}>Cancel</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              message.success('Extra payment of $500.00 submitted to Home Mortgage. This will be applied to your principal.');
              setMortgageModal(null);
            }}
          >
            Submit Payment
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Pay from</Text>
            <div style={{ marginTop: 4, padding: '8px 12px', background: bgMuted, borderRadius: 4 }}>
              Horizon Checking (****4523) — $4,250.00
            </div>
          </div>
          <div>
            <Text strong>Pay to</Text>
            <div style={{ marginTop: 4, padding: '8px 12px', background: bgMuted, borderRadius: 4 }}>
              Home Mortgage (****9012) — $287,432.00 balance
            </div>
          </div>
          <div>
            <Text strong>Extra Payment Amount</Text>
            <input
              type="text"
              defaultValue="$500.00"
              style={{ width: '100%', marginTop: 4, padding: '8px 12px', border: `1px solid ${borderSubtle}`, borderRadius: 4, fontSize: 16, background: isDark ? '#262626' : '#fff', color: isDark ? '#fafafa' : '#000' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Regular monthly payment of $1,892.00 is scheduled for Apr 1. This extra payment goes toward principal.
            </Text>
          </div>
        </Space>
      </Modal>

      {/* Mortgage - Amortization Schedule Modal */}
      <Modal
        title="Amortization Schedule"
        open={mortgageModal === 'amortization'}
        onCancel={() => setMortgageModal(null)}
        footer={<Button onClick={() => setMortgageModal(null)}>Close</Button>}
        width={560}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ padding: 12, background: bgMuted, borderRadius: 4 }}>
            <Text strong>30-Year Fixed Mortgage</Text>
            <br />
            <Text type="secondary">5.875% APR &bull; $1,892.00/mo &bull; Originated Sep 2022</Text>
          </div>
          <Table
            dataSource={[
              { key: '1', label: 'Original Loan Amount', value: '$325,000.00' },
              { key: '2', label: 'Current Balance', value: '$287,432.00' },
              { key: '3', label: 'Principal Paid', value: '$37,568.00 (11.6%)' },
              { key: '4', label: 'Interest Paid to Date', value: '$48,720.00' },
              { key: '5', label: 'Monthly Payment', value: '$1,892.00' },
              { key: '6', label: 'Payments Made', value: '42 of 360' },
              { key: '7', label: 'Estimated Payoff', value: 'September 2052' },
            ]}
            columns={[
              { title: '', dataIndex: 'label', key: 'label', render: (t: string) => <Text strong>{t}</Text> },
              { title: '', dataIndex: 'value', key: 'value' },
            ]}
            showHeader={false}
            pagination={false}
            size="small"
          />
        </Space>
      </Modal>

      {/* Mortgage - Refinance Options Modal */}
      <Modal
        title="Refinance Options"
        open={mortgageModal === 'refinance'}
        onCancel={() => setMortgageModal(null)}
        footer={<Button onClick={() => setMortgageModal(null)}>Close</Button>}
        width={520}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text type="secondary">Based on your current rate of 5.875% APR, here are available options:</Text>
          {[
            {
              title: '30-Year Fixed — 5.25% APR',
              desc: 'Lower your monthly payment by ~$124/mo. Estimated new payment: $1,768/mo.',
              tag: 'Save $124/mo',
              tagColor: 'green',
            },
            {
              title: '15-Year Fixed — 4.75% APR',
              desc: 'Pay off faster with higher monthly payments. Estimated new payment: $2,238/mo.',
              tag: 'Save $98K interest',
              tagColor: 'blue',
            },
            {
              title: 'Cash-Out Refinance — 5.50% APR',
              desc: 'Access up to $45,000 in home equity. Estimated new payment: $1,985/mo.',
              tag: '$45K available',
              tagColor: 'gold',
            },
          ].map(opt => (
            <Card key={opt.title} size="small" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text strong>{opt.title}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 13 }}>{opt.desc}</Text>
                </div>
                <Tag color={opt.tagColor}>{opt.tag}</Tag>
              </div>
            </Card>
          ))}
          <Button type="primary" block>
            Talk to a Mortgage Specialist
          </Button>
        </Space>
      </Modal>

      {/* Subscription - Review Unused Modal */}
      <Modal
        title="Review Unused Subscriptions"
        open={subscriptionModal === 'unused'}
        onCancel={() => setSubscriptionModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setSubscriptionModal(null)}>Close</Button>,
          <Button
            key="cancel-subs"
            type="primary"
            danger
            onClick={() => {
              const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              setCancelledSubscriptions(prev => ({
                ...prev,
                'Hulu (No Ads)': today,
                'Adobe Creative Cloud': today,
              }));
              message.success('Hulu and Adobe Creative Cloud subscriptions have been canceled. You\'ll save $72.98/month!');
              setSubscriptionModal(null);
            }}
          >
            Cancel Unused Subscriptions
          </Button>,
        ]}
        width={600}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="Potential Savings: $72.98/month ($875.76/year)"
            type="warning"
            showIcon
          />
          <Text>The following subscriptions haven't been used in over 60 days:</Text>

          <Card size="small">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                <Space>
                  <span style={{ fontSize: 20 }}>📺</span>
                  <div>
                    <Text strong>Hulu (No Ads)</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>Last used: March 2, 2026 (64 days ago)</Text>
                  </div>
                </Space>
                <Text strong style={{ color: '#faad14' }}>$17.99/mo</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f0f0f0' }}>
                <Space>
                  <span style={{ fontSize: 20 }}>🎨</span>
                  <div>
                    <Text strong>Adobe Creative Cloud</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>Last used: February 28, 2026 (67 days ago)</Text>
                  </div>
                </Space>
                <Text strong style={{ color: '#faad14' }}>$54.99/mo</Text>
              </div>
            </Space>
          </Card>

          <Text type="secondary" style={{ fontSize: 13 }}>
            💡 Tip: You can always resubscribe later if you need these services again.
          </Text>
        </Space>
      </Modal>

      {/* Subscription - Set Spending Limit Modal */}
      <Modal
        title="Set Monthly Subscription Limit"
        open={subscriptionModal === 'limit'}
        onCancel={() => setSubscriptionModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setSubscriptionModal(null)}>Cancel</Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => {
              message.success('Monthly subscription spending limit set to $300');
              setSubscriptionModal(null);
            }}
          >
            Save Limit
          </Button>,
        ]}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text>Current total: <Text strong style={{ fontSize: 18, color: '#722ed1' }}>$287.94/month</Text></Text>
          </div>

          <div>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Set spending limit:</Text>
            <Select
              defaultValue="300"
              style={{ width: '100%' }}
              size="large"
              options={[
                { label: '$200/month', value: '200' },
                { label: '$250/month', value: '250' },
                { label: '$300/month', value: '300' },
                { label: '$350/month', value: '350' },
                { label: '$400/month', value: '400' },
                { label: '$500/month', value: '500' },
                { label: 'No limit', value: 'none' },
              ]}
            />
          </div>

          <Alert
            message="You'll receive a notification when you're within $20 of your limit"
            type="info"
            showIcon
          />
        </Space>
      </Modal>

      {/* Subscription - Cancel a Subscription Modal */}
      <Modal
        title="Cancel a Subscription"
        open={subscriptionModal === 'cancel'}
        onCancel={() => setSubscriptionModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setSubscriptionModal(null)}>Close</Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Text>Select a subscription to cancel:</Text>

          <Select
            placeholder="Choose a subscription..."
            style={{ width: '100%' }}
            size="large"
            onChange={(value) => {
              Modal.confirm({
                title: 'Cancel Subscription?',
                content: `Are you sure you want to cancel ${value}? You'll lose access at the end of your current billing cycle.`,
                okText: 'Yes, Cancel',
                okType: 'danger',
                onOk: () => {
                  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  setCancelledSubscriptions(prev => ({
                    ...prev,
                    [value]: today,
                  }));
                  message.success(`${value} has been canceled`);
                  setSubscriptionModal(null);
                },
              });
            }}
            options={[
              { label: '🎬 Netflix Premium - $22.99/mo', value: 'Netflix Premium' },
              { label: '🎵 Spotify Family - $16.99/mo', value: 'Spotify Family' },
              { label: '📦 Amazon Prime - $14.99/mo', value: 'Amazon Prime' },
              { label: '☁️ Apple iCloud Storage - $9.99/mo', value: 'Apple iCloud Storage' },
              { label: '🎨 Adobe Creative Cloud - $54.99/mo', value: 'Adobe Creative Cloud' },
              { label: '💪 LA Fitness - $49.99/mo', value: 'LA Fitness' },
              { label: '📰 NYT Digital - $17.00/mo', value: 'NYT Digital' },
              { label: '📺 Hulu (No Ads) - $17.99/mo', value: 'Hulu' },
              { label: '💾 Dropbox Plus - $11.99/mo', value: 'Dropbox Plus' },
              { label: '🥗 HelloFresh - $71.02/mo', value: 'HelloFresh' },
            ]}
          />

          <Alert
            message="Cancellations take effect at the end of your current billing period"
            type="info"
            showIcon
          />
        </Space>
      </Modal>

      {/* Subscription - Price Change Review Modal */}
      <Modal
        title="Review Price Changes"
        open={subscriptionModal === 'price-review'}
        onCancel={() => setSubscriptionModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setSubscriptionModal(null)}>Close</Button>,
          <Button
            key="acknowledge"
            type="primary"
            onClick={() => {
              setReviewedPriceChanges(['Hulu (No Ads)', 'NYT Digital Subscription']);
              message.success('Price changes acknowledged');
              setSubscriptionModal(null);
            }}
          >
            Acknowledge Changes
          </Button>,
        ]}
        width={600}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="2 subscriptions have increased their prices"
            description="Review the changes below and decide whether to keep or cancel these subscriptions."
            type="warning"
            showIcon
          />

          <Card size="small" style={{ background: isDark ? '#1f1f1f' : '#fffaf0' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space>
                    <span style={{ fontSize: 20 }}>📺</span>
                    <Text strong>Hulu (No Ads)</Text>
                  </Space>
                  <Tag color="orange">+20%</Tag>
                </div>
                <Space split={<Text type="secondary">→</Text>} style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ textDecoration: 'line-through' }}>$14.99/month</Text>
                  <Text strong style={{ color: '#fa8c16', fontSize: 16 }}>$17.99/month</Text>
                </Space>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Price increased on April 28, 2026. Effective next billing cycle (May 10).
                  </Text>
                </div>
                <div style={{ marginTop: 12 }}>
                  <Button
                    size="small"
                    danger
                    onClick={() => {
                      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      setCancelledSubscriptions(prev => ({ ...prev, 'Hulu (No Ads)': today }));
                      message.success('Hulu subscription cancelled');
                      setSubscriptionModal(null);
                    }}
                  >
                    Cancel This Subscription
                  </Button>
                </div>
              </div>

              <div style={{ padding: '8px 0', borderTop: `1px solid ${borderSubtle}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space>
                    <span style={{ fontSize: 20 }}>📰</span>
                    <Text strong>NYT Digital Subscription</Text>
                  </Space>
                  <Tag color="orange">+13%</Tag>
                </div>
                <Space split={<Text type="secondary">→</Text>} style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ textDecoration: 'line-through' }}>$15.00/month</Text>
                  <Text strong style={{ color: '#fa8c16', fontSize: 16 }}>$17.00/month</Text>
                </Space>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Price increased on April 15, 2026. Effective next billing cycle (May 22).
                  </Text>
                </div>
                <div style={{ marginTop: 12 }}>
                  <Button
                    size="small"
                    danger
                    onClick={() => {
                      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      setCancelledSubscriptions(prev => ({ ...prev, 'NYT Digital Subscription': today }));
                      message.success('NYT Digital subscription cancelled');
                      setSubscriptionModal(null);
                    }}
                  >
                    Cancel This Subscription
                  </Button>
                </div>
              </div>
            </Space>
          </Card>

          <Text type="secondary" style={{ fontSize: 13 }}>
            💡 Annual impact: These price increases will cost you an additional $52.80/year combined.
          </Text>
        </Space>
      </Modal>
    </Space>
  );
}
