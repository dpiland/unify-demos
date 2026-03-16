/**
 * Horizon Bank - Consumer Banking Dashboard
 *
 * A consumer banking application showcasing feature flags in a real-world context.
 * Four feature flags control key aspects of the UI:
 *
 * 1. enableInstantTransfers (boolean) - toggles instant vs standard transfer capability
 * 2. showInvestmentPortfolio (boolean) - shows/hides investment holdings section
 * 3. dashboardLayout (string) - A/B tests classic/modern/compact layouts
 * 4. recentTransactionsToShow (number) - controls transaction table row count
 */

import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Layout,
  List,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import {
  BankOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
  FundOutlined,
  RiseOutlined,
  FallOutlined,
  SendOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// ============================================
// Sample Data
// ============================================

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
}

const TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2026-03-16', description: 'Whole Foods Market', category: 'Groceries', amount: -87.43, status: 'completed' },
  { id: 't2', date: '2026-03-16', description: 'Direct Deposit - Payroll', category: 'Income', amount: 3245.00, status: 'completed' },
  { id: 't3', date: '2026-03-15', description: 'Shell Gas Station', category: 'Transportation', amount: -52.18, status: 'completed' },
  { id: 't4', date: '2026-03-15', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, status: 'completed' },
  { id: 't5', date: '2026-03-14', description: 'Transfer to Savings', category: 'Transfer', amount: -500.00, status: 'completed' },
  { id: 't6', date: '2026-03-14', description: 'Amazon.com', category: 'Shopping', amount: -124.67, status: 'completed' },
  { id: 't7', date: '2026-03-13', description: 'Starbucks', category: 'Dining', amount: -6.75, status: 'completed' },
  { id: 't8', date: '2026-03-13', description: 'Electric Company', category: 'Utilities', amount: -142.30, status: 'pending' },
  { id: 't9', date: '2026-03-12', description: 'Venmo - From Alex', category: 'Income', amount: 45.00, status: 'completed' },
  { id: 't10', date: '2026-03-12', description: 'Target', category: 'Shopping', amount: -67.89, status: 'completed' },
  { id: 't11', date: '2026-03-11', description: 'Chipotle Mexican Grill', category: 'Dining', amount: -12.45, status: 'completed' },
  { id: 't12', date: '2026-03-11', description: 'Spotify Premium', category: 'Entertainment', amount: -10.99, status: 'completed' },
  { id: 't13', date: '2026-03-10', description: 'CVS Pharmacy', category: 'Health', amount: -23.47, status: 'completed' },
  { id: 't14', date: '2026-03-10', description: 'Uber', category: 'Transportation', amount: -18.50, status: 'completed' },
  { id: 't15', date: '2026-03-09', description: 'Costco Wholesale', category: 'Groceries', amount: -215.63, status: 'completed' },
  { id: 't16', date: '2026-03-09', description: 'ATM Withdrawal', category: 'Cash', amount: -200.00, status: 'completed' },
  { id: 't17', date: '2026-03-08', description: 'Home Depot', category: 'Shopping', amount: -89.34, status: 'completed' },
  { id: 't18', date: '2026-03-08', description: 'Water & Sewer Utility', category: 'Utilities', amount: -65.00, status: 'completed' },
  { id: 't19', date: '2026-03-07', description: 'Trader Joe\'s', category: 'Groceries', amount: -54.21, status: 'completed' },
  { id: 't20', date: '2026-03-07', description: 'Interest Payment', category: 'Income', amount: 12.38, status: 'completed' },
  { id: 't21', date: '2026-03-06', description: 'Planet Fitness', category: 'Health', amount: -24.99, status: 'completed' },
  { id: 't22', date: '2026-03-06', description: 'Olive Garden', category: 'Dining', amount: -48.72, status: 'completed' },
  { id: 't23', date: '2026-03-05', description: 'Apple.com', category: 'Shopping', amount: -199.00, status: 'completed' },
  { id: 't24', date: '2026-03-05', description: 'Comcast Internet', category: 'Utilities', amount: -79.99, status: 'completed' },
  { id: 't25', date: '2026-03-04', description: 'Zelle - From Mom', category: 'Income', amount: 100.00, status: 'completed' },
  { id: 't26', date: '2026-03-04', description: 'Walgreens', category: 'Health', amount: -15.67, status: 'completed' },
  { id: 't27', date: '2026-03-03', description: 'BP Gas Station', category: 'Transportation', amount: -48.90, status: 'completed' },
  { id: 't28', date: '2026-03-03', description: 'Panera Bread', category: 'Dining', amount: -14.23, status: 'completed' },
  { id: 't29', date: '2026-03-02', description: 'Direct Deposit - Payroll', category: 'Income', amount: 3245.00, status: 'completed' },
  { id: 't30', date: '2026-03-02', description: 'Rent Payment', category: 'Housing', amount: -1850.00, status: 'completed' },
];

interface InvestmentHolding {
  name: string;
  ticker: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

const INVESTMENT_HOLDINGS: InvestmentHolding[] = [
  { name: 'Vanguard S&P 500 ETF', ticker: 'VOO', shares: 15, price: 487.32, change: 1.24, value: 7309.80 },
  { name: 'Apple Inc.', ticker: 'AAPL', shares: 25, price: 198.45, change: -0.67, value: 4961.25 },
  { name: 'iShares Core US Aggregate Bond', ticker: 'AGG', shares: 40, price: 98.12, change: 0.15, value: 3924.80 },
  { name: 'Microsoft Corp.', ticker: 'MSFT', shares: 10, price: 425.80, change: 2.13, value: 4258.00 },
  { name: 'Vanguard Total International', ticker: 'VXUS', shares: 30, price: 58.94, change: -0.42, value: 1768.20 },
];

interface Bill {
  name: string;
  dueDate: string;
  amount: number;
}

const UPCOMING_BILLS: Bill[] = [
  { name: 'Rent Payment', dueDate: 'Apr 1, 2026', amount: 1850.00 },
  { name: 'Auto Insurance', dueDate: 'Apr 5, 2026', amount: 156.00 },
  { name: 'Student Loan', dueDate: 'Apr 15, 2026', amount: 342.50 },
  { name: 'Phone Bill', dueDate: 'Apr 18, 2026', amount: 85.00 },
];

// ============================================
// Category colors for transaction tags
// ============================================

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: 'green',
  Income: 'gold',
  Transportation: 'blue',
  Entertainment: 'purple',
  Transfer: 'cyan',
  Shopping: 'magenta',
  Dining: 'orange',
  Utilities: 'volcano',
  Health: 'lime',
  Cash: 'default',
  Housing: 'red',
};

// ============================================
// Table column definitions
// ============================================

const TRANSACTION_COLUMNS = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 120,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 140,
    render: (category: string) => (
      <Tag color={CATEGORY_COLORS[category] || 'default'}>{category}</Tag>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 130,
    align: 'right' as const,
    render: (amount: number) => (
      <Text strong style={{ color: amount >= 0 ? '#52c41a' : '#f5222d' }}>
        {amount >= 0 ? '+' : ''}${Math.abs(amount).toFixed(2)}
      </Text>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 110,
    render: (status: string) => {
      const statusConfig: Record<string, { color: string; text: string }> = {
        completed: { color: 'green', text: 'Completed' },
        pending: { color: 'orange', text: 'Pending' },
        processing: { color: 'blue', text: 'Processing' },
      };
      const config = statusConfig[status] || statusConfig.completed;
      return <Badge color={config.color} text={config.text} />;
    },
  },
];

const INVESTMENT_COLUMNS = [
  {
    title: 'Holding',
    key: 'holding',
    render: (_: unknown, record: InvestmentHolding) => (
      <div>
        <Text strong>{record.name}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>{record.ticker}</Text>
      </div>
    ),
  },
  {
    title: 'Shares',
    dataIndex: 'shares',
    key: 'shares',
    width: 80,
    align: 'right' as const,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 100,
    align: 'right' as const,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: 'Change',
    dataIndex: 'change',
    key: 'change',
    width: 100,
    align: 'right' as const,
    render: (change: number) => (
      <Text style={{ color: change >= 0 ? '#52c41a' : '#f5222d' }}>
        {change >= 0 ? <RiseOutlined /> : <FallOutlined />}{' '}
        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
      </Text>
    ),
  },
  {
    title: 'Market Value',
    dataIndex: 'value',
    key: 'value',
    width: 130,
    align: 'right' as const,
    render: (value: number) => <Text strong>${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>,
  },
];

// ============================================
// App Component
// ============================================

function App() {
  // Boolean flag: toggle instant transfer capability
  const enableInstantTransfers = useFeatureFlag('enableInstantTransfers');

  // Boolean flag: show/hide investment portfolio section
  const showInvestmentPortfolio = useFeatureFlag('showInvestmentPortfolio');

  // String flag: A/B test dashboard layout (classic | modern | compact)
  const dashboardLayout = useFeatureFlagString('dashboardLayout');

  // Number flag: control how many transactions to display
  const transactionCount = useFeatureFlagNumber('recentTransactionsToShow');

  const isCompact = dashboardLayout === 'compact';
  const isModern = dashboardLayout === 'modern';

  // Layout-responsive column spans for stat cards
  const statCol = isCompact
    ? { xs: 12, sm: 6 }
    : isModern
    ? { xs: 24, sm: 12 }
    : { xs: 24, sm: 12, lg: 6 };

  const totalPortfolioValue = INVESTMENT_HOLDINGS.reduce((sum, h) => sum + h.value, 0);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <BankOutlined style={{ fontSize: 28, color: '#1a3c5e' }} />
          <Title level={3} style={{ margin: 0, color: '#1a3c5e' }}>
            Horizon Bank
          </Title>
        </Space>
      </Header>

      <Content style={{ padding: isCompact ? '16px' : '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size={isCompact ? 'middle' : 'large'} style={{ width: '100%' }}>

            {/* Account Balance Stats */}
            <Row gutter={isCompact ? [8, 8] : [16, 16]}>
              <Col {...statCol}>
                <Card size={isCompact ? 'small' : 'default'}>
                  <Statistic
                    title="Checking Account"
                    value={12458.32}
                    precision={2}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#1a3c5e' }}
                  />
                </Card>
              </Col>
              <Col {...statCol}>
                <Card size={isCompact ? 'small' : 'default'}>
                  <Statistic
                    title="Savings Account"
                    value={34891.50}
                    precision={2}
                    prefix={<WalletOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col {...statCol}>
                <Card size={isCompact ? 'small' : 'default'}>
                  <Statistic
                    title="Credit Card Balance"
                    value={2145.67}
                    precision={2}
                    prefix={<CreditCardOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col {...statCol}>
                <Card size={isCompact ? 'small' : 'default'}>
                  <Statistic
                    title="Monthly Spending"
                    value={3247.89}
                    precision={2}
                    prefix={<FallOutlined />}
                    valueStyle={{ color: '#f5222d' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Main Content: Transactions + Sidebar */}
            <Row gutter={isCompact ? [8, 8] : [16, 16]}>
              {/* Recent Transactions */}
              <Col xs={24} lg={isModern ? 24 : 16}>
                <Card
                  title={
                    <Space>
                      <SwapOutlined />
                      <span>Recent Transactions</span>
                    </Space>
                  }
                  size={isCompact ? 'small' : 'default'}
                >
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
              </Col>

              {/* Sidebar: Quick Actions + Upcoming Bills */}
              <Col xs={24} lg={isModern ? 24 : 8}>
                <Space direction="vertical" size={isCompact ? 'small' : 'middle'} style={{ width: '100%' }}>
                  {/* Quick Actions */}
                  <Card
                    title={
                      <Space>
                        <SendOutlined />
                        <span>Quick Actions</span>
                      </Space>
                    }
                    size={isCompact ? 'small' : 'default'}
                  >
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      {/* Boolean flag: instant transfers changes button style and label */}
                      {enableInstantTransfers ? (
                        <>
                          <Button
                            type="primary"
                            icon={<ThunderboltOutlined />}
                            size={isCompact ? 'middle' : 'large'}
                            block
                            style={{ background: '#52c41a', borderColor: '#52c41a' }}
                          >
                            Instant Transfer
                          </Button>
                          <Alert
                            message="Instant transfers enabled - funds arrive in seconds"
                            type="success"
                            showIcon
                            style={{ fontSize: 12 }}
                          />
                        </>
                      ) : (
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          size={isCompact ? 'middle' : 'large'}
                          block
                        >
                          Transfer Money
                        </Button>
                      )}

                      <Button
                        icon={<FileTextOutlined />}
                        size={isCompact ? 'middle' : 'large'}
                        block
                      >
                        Pay Bills
                      </Button>
                      <Button
                        icon={<CreditCardOutlined />}
                        size={isCompact ? 'middle' : 'large'}
                        block
                      >
                        Deposit Check
                      </Button>
                    </Space>
                  </Card>

                  {/* Upcoming Bills */}
                  <Card
                    title={
                      <Space>
                        <FileTextOutlined />
                        <span>Upcoming Bills</span>
                      </Space>
                    }
                    size={isCompact ? 'small' : 'default'}
                  >
                    <List
                      dataSource={UPCOMING_BILLS}
                      renderItem={(bill) => (
                        <List.Item
                          style={{ padding: '8px 0' }}
                          extra={
                            <Text strong style={{ color: '#f5222d' }}>
                              ${bill.amount.toFixed(2)}
                            </Text>
                          }
                        >
                          <List.Item.Meta
                            title={bill.name}
                            description={`Due ${bill.dueDate}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Space>
              </Col>
            </Row>

            {/* Boolean flag: conditionally render investment portfolio section */}
            {showInvestmentPortfolio && (
              <Card
                title={
                  <Space>
                    <FundOutlined />
                    <span>Investment Portfolio</span>
                  </Space>
                }
                extra={
                  <Statistic
                    value={totalPortfolioValue}
                    precision={2}
                    prefix="$"
                    valueStyle={{ fontSize: 16, color: '#52c41a' }}
                  />
                }
                size={isCompact ? 'small' : 'default'}
              >
                <Table
                  dataSource={INVESTMENT_HOLDINGS}
                  columns={INVESTMENT_COLUMNS}
                  rowKey="ticker"
                  pagination={false}
                  size={isCompact ? 'small' : 'middle'}
                  scroll={{ x: 500 }}
                />
              </Card>
            )}

          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
