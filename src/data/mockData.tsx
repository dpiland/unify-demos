import { Badge, Tag, Typography } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const { Text } = Typography;

// ============================================
// Interfaces
// ============================================

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'mortgage';
  accountNumber: string;
  balance: number;
  available?: number;
  interestRate?: number;
  minimumPayment?: number;
  dueDate?: string;
  monthlyPayment?: number;
  interestEarned?: number;
  recentTransactions: Transaction[];
}

export interface InvestmentHolding {
  name: string;
  ticker: string;
  shares: number;
  price: number;
  change: number;
  value: number;
}

export interface Bill {
  name: string;
  dueDate: string;
  amount: number;
}

export interface Transfer {
  id: string;
  date: string;
  from: string;
  to: string;
  amount: number;
  type: 'instant' | 'standard';
  status: 'completed' | 'pending';
}

export interface MarketIndex {
  name: string;
  ticker: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface RewardCategory {
  name: string;
  rate: string;
  icon: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  cta: string;
}

// ============================================
// Transactions
// ============================================

export const TRANSACTIONS: Transaction[] = [
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

// ============================================
// Accounts
// ============================================

export const ACCOUNTS: Account[] = [
  {
    id: 'checking',
    name: 'Everyday Checking',
    type: 'checking',
    accountNumber: '****4523',
    balance: 12458.32,
    available: 12358.32,
    recentTransactions: TRANSACTIONS.slice(0, 4),
  },
  {
    id: 'savings',
    name: 'Way2Save Savings',
    type: 'savings',
    accountNumber: '****7891',
    balance: 34891.50,
    interestRate: 4.25,
    interestEarned: 18.42,
    recentTransactions: [
      { id: 'st1', date: '2026-03-14', description: 'Transfer from Checking', category: 'Transfer', amount: 500.00, status: 'completed' },
      { id: 'st2', date: '2026-03-07', description: 'Interest Payment', category: 'Income', amount: 12.38, status: 'completed' },
      { id: 'st3', date: '2026-02-28', description: 'Transfer from Checking', category: 'Transfer', amount: 500.00, status: 'completed' },
    ],
  },
  {
    id: 'credit',
    name: 'Active Cash Credit Card',
    type: 'credit',
    accountNumber: '****3456',
    balance: 2145.67,
    available: 7854.33,
    minimumPayment: 35.00,
    dueDate: 'Apr 15, 2026',
    recentTransactions: [
      { id: 'ct1', date: '2026-03-15', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, status: 'completed' },
      { id: 'ct2', date: '2026-03-14', description: 'Amazon.com', category: 'Shopping', amount: -124.67, status: 'completed' },
      { id: 'ct3', date: '2026-03-13', description: 'Starbucks', category: 'Dining', amount: -6.75, status: 'completed' },
    ],
  },
  {
    id: 'mortgage',
    name: 'Home Mortgage',
    type: 'mortgage',
    accountNumber: '****9012',
    balance: 287432.00,
    interestRate: 5.875,
    monthlyPayment: 1892.00,
    dueDate: 'Apr 1, 2026',
    recentTransactions: [
      { id: 'mt1', date: '2026-03-01', description: 'Mortgage Payment', category: 'Housing', amount: -1892.00, status: 'completed' },
      { id: 'mt2', date: '2026-02-01', description: 'Mortgage Payment', category: 'Housing', amount: -1892.00, status: 'completed' },
    ],
  },
];

// ============================================
// Investments
// ============================================

export const INVESTMENT_HOLDINGS: InvestmentHolding[] = [
  { name: 'Vanguard S&P 500 ETF', ticker: 'VOO', shares: 15, price: 487.32, change: 1.24, value: 7309.80 },
  { name: 'Apple Inc.', ticker: 'AAPL', shares: 25, price: 198.45, change: -0.67, value: 4961.25 },
  { name: 'iShares Core US Aggregate Bond', ticker: 'AGG', shares: 40, price: 98.12, change: 0.15, value: 3924.80 },
  { name: 'Microsoft Corp.', ticker: 'MSFT', shares: 10, price: 425.80, change: 2.13, value: 4258.00 },
  { name: 'Vanguard Total International', ticker: 'VXUS', shares: 30, price: 58.94, change: -0.42, value: 1768.20 },
];

export const MARKET_INDICES: MarketIndex[] = [
  { name: 'S&P 500', ticker: 'SPX', value: 5842.31, change: 24.67, changePercent: 0.42 },
  { name: 'Dow Jones', ticker: 'DJI', value: 43127.85, change: -89.42, changePercent: -0.21 },
  { name: 'Nasdaq', ticker: 'IXIC', value: 18492.64, change: 112.35, changePercent: 0.61 },
];

// ============================================
// Bills
// ============================================

export const UPCOMING_BILLS: Bill[] = [
  { name: 'Rent Payment', dueDate: 'Apr 1, 2026', amount: 1850.00 },
  { name: 'Auto Insurance', dueDate: 'Apr 5, 2026', amount: 156.00 },
  { name: 'Student Loan', dueDate: 'Apr 15, 2026', amount: 342.50 },
  { name: 'Phone Bill', dueDate: 'Apr 18, 2026', amount: 85.00 },
];

// ============================================
// Transfers
// ============================================

export const RECENT_TRANSFERS: Transfer[] = [
  { id: 'tr1', date: '2026-03-14', from: 'Everyday Checking', to: 'Way2Save Savings', amount: 500.00, type: 'standard', status: 'completed' },
  { id: 'tr2', date: '2026-03-10', from: 'Everyday Checking', to: 'Active Cash Credit Card', amount: 200.00, type: 'instant', status: 'completed' },
  { id: 'tr3', date: '2026-03-05', from: 'Way2Save Savings', to: 'Everyday Checking', amount: 1000.00, type: 'standard', status: 'completed' },
  { id: 'tr4', date: '2026-03-01', from: 'Everyday Checking', to: 'Way2Save Savings', amount: 500.00, type: 'standard', status: 'completed' },
  { id: 'tr5', date: '2026-02-25', from: 'Everyday Checking', to: 'Active Cash Credit Card', amount: 350.00, type: 'instant', status: 'completed' },
];

// ============================================
// Rewards
// ============================================

export const REWARDS_DATA = {
  points: 24750,
  cashbackEarned: 247.50,
  cashbackThisMonth: 42.18,
};

export const REWARD_CATEGORIES: RewardCategory[] = [
  { name: 'Dining', rate: '3%', icon: 'coffee' },
  { name: 'Groceries', rate: '3%', icon: 'shopping' },
  { name: 'Gas Stations', rate: '3%', icon: 'car' },
  { name: 'Streaming', rate: '3%', icon: 'play-circle' },
  { name: 'Everything Else', rate: '1.5%', icon: 'credit-card' },
];

export const OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Earn 5% on Travel',
    description: 'Book through our travel portal and earn 5% cash back on flights and hotels this summer.',
    cta: 'Learn More',
  },
  {
    id: 'o2',
    title: '$200 Savings Bonus',
    description: 'Open a new Way2Save account with $25,000+ and earn a $200 bonus after 90 days.',
    cta: 'Open Account',
  },
  {
    id: 'o3',
    title: 'Refinance & Save',
    description: 'Rates starting at 5.25% APR. Refinance your mortgage and save up to $250/month.',
    cta: 'Check Rates',
  },
];

export const REDEEM_OPTIONS = ['Statement Credit', 'Gift Cards', 'Travel', 'Merchandise'];

// ============================================
// Category Colors
// ============================================

export const CATEGORY_COLORS: Record<string, string> = {
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
// Table Column Definitions
// ============================================

export const TRANSACTION_COLUMNS = [
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

export const INVESTMENT_COLUMNS = [
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
