/**
 * Transfer & Pay Page
 *
 * Tabs: Transfer Between Accounts, Pay Bills, Send with Zelle, Scheduled Payments.
 *
 * Feature flags used:
 * - enableInstantTransfers (boolean): shows/hides instant transfer speed option
 * - dailyTransferLimit (number): controls max daily transfer amount
 * - enableBillPayScheduler (boolean): shows/hides Scheduled Payments tab
 */

import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
  message,
  theme as antdTheme,
} from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SendOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagNumber } from '../hooks/useFeatureFlag';
import { ACCOUNTS, RECENT_TRANSFERS, UPCOMING_BILLS } from '../data/mockData.tsx';

const { Title, Text } = Typography;

function TransferTab() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const [fromAccount, setFromAccount] = useState<string | undefined>();
  const enableInstantTransfers = useFeatureFlag('enableInstantTransfers');
  // Number flag: controls max daily transfer amount (business rule demo)
  const dailyTransferLimit = useFeatureFlagNumber('dailyTransferLimit');

  const handleTransfer = () => {
    message.success('Transfer submitted successfully!');
  };

  const transferColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date', width: 120 },
    { title: 'From', dataIndex: 'from', key: 'from' },
    { title: 'To', dataIndex: 'to', key: 'to' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right' as const,
      render: (amount: number) => <Text strong>${amount.toFixed(2)}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 110,
      render: (type: string) =>
        type === 'instant' ? (
          <Tag icon={<ThunderboltOutlined />} color="success">Instant</Tag>
        ) : (
          <Tag icon={<ClockCircleOutlined />} color="default">Standard</Tag>
        ),
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="Transfer Between Accounts">
          <Form layout="vertical" onFinish={handleTransfer}>
            <Form.Item label="From" required>
              <Select
                placeholder="Select account"
                value={fromAccount}
                onChange={setFromAccount}
                options={ACCOUNTS.filter(a => a.type !== 'mortgage').map(a => ({
                  value: a.id,
                  label: `${a.name} (${a.accountNumber}) - $${a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                }))}
              />
            </Form.Item>

            <Form.Item label="To" required>
              <Select
                placeholder="Select account"
                options={ACCOUNTS.filter(a => a.id !== fromAccount && a.type !== 'mortgage').map(a => ({
                  value: a.id,
                  label: `${a.name} (${a.accountNumber})`,
                }))}
              />
            </Form.Item>

            <Form.Item label="Amount" required>
              <InputNumber
                prefix="$"
                style={{ width: '100%' }}
                min={0.01}
                max={dailyTransferLimit}
                placeholder="0.00"
                precision={2}
              />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                Daily transfer limit: <Text strong style={{ fontSize: 12 }}>${dailyTransferLimit.toLocaleString()}</Text>
              </Text>
            </Form.Item>

            <Form.Item label="Transfer Speed">
              <Radio.Group defaultValue="standard">
                <Space direction="vertical">
                  <Radio value="standard">
                    <Space>
                      <ClockCircleOutlined />
                      <span>Standard (1-3 business days)</span>
                    </Space>
                  </Radio>
                  {/* Boolean flag: only show instant option when enabled */}
                  {enableInstantTransfers && (
                    <Radio value="instant">
                      <Space>
                        <ThunderboltOutlined style={{ color: '#52c41a' }} />
                        <span>Instant - funds arrive in seconds</span>
                      </Space>
                    </Radio>
                  )}
                </Space>
              </Radio.Group>
            </Form.Item>

            {enableInstantTransfers && (
              <Alert
                message={
                  <span style={isDark ? { color: '#b7eb8f' } : undefined}>
                    Instant transfers are available for this account
                  </span>
                }
                type="success"
                showIcon
                icon={<ThunderboltOutlined />}
                style={{
                  marginBottom: 16,
                  ...(isDark ? { background: '#162312', border: '1px solid #274916' } : {}),
                }}
              />
            )}

            <Button type="primary" htmlType="submit" icon={<SendOutlined />} size="large" block>
              Submit Transfer
            </Button>
          </Form>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card title="Recent Transfers">
          <Table
            dataSource={RECENT_TRANSFERS}
            columns={transferColumns}
            rowKey="id"
            pagination={false}
            size="small"
            scroll={{ x: 500 }}
          />
        </Card>
      </Col>
    </Row>
  );
}

function PayBillsTab() {
  const handlePay = (billName: string) => {
    message.success(`Payment submitted for ${billName}`);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Card title="Upcoming Bills">
          <List
            dataSource={UPCOMING_BILLS}
            renderItem={(bill) => (
              <List.Item
                actions={[
                  <Button type="primary" size="small" onClick={() => handlePay(bill.name)}>
                    Pay Now
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<FileTextOutlined style={{ fontSize: 24, color: '#1a3c5e' }} />}
                  title={bill.name}
                  description={`Due ${bill.dueDate}`}
                />
                <Text strong style={{ color: '#f5222d' }}>${bill.amount.toFixed(2)}</Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card title="Add a Payee">
          <Form layout="vertical">
            <Form.Item label="Payee Name">
              <Input placeholder="e.g. Electric Company" />
            </Form.Item>
            <Form.Item label="Account Number">
              <Input placeholder="Payee account number" />
            </Form.Item>
            <Button type="primary" block>Add Payee</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

function ZelleTab() {
  const handleSend = () => {
    message.success('Money sent successfully!');
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="Send Money with Zelle">
          <Form layout="vertical" onFinish={handleSend}>
            <Form.Item label="Recipient Email or Phone" required>
              <Input placeholder="email@example.com or (555) 555-5555" />
            </Form.Item>
            <Form.Item label="Amount" required>
              <InputNumber prefix="$" style={{ width: '100%' }} min={0.01} placeholder="0.00" precision={2} />
            </Form.Item>
            <Form.Item label="Memo (optional)">
              <Input placeholder="What's this for?" />
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} size="large" block>
              Send Money
            </Button>
          </Form>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Recent Zelle Activity">
          <List
            dataSource={[
              { id: 'z1', description: 'Sent to Alex M.', amount: -45.00, date: '2026-03-12' },
              { id: 'z2', description: 'Received from Mom', amount: 100.00, date: '2026-03-04' },
              { id: 'z3', description: 'Sent to Sarah K.', amount: -25.00, date: '2026-02-28' },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.description}
                  description={item.date}
                />
                <Text strong style={{ color: item.amount >= 0 ? '#52c41a' : '#f5222d' }}>
                  {item.amount >= 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                </Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
}

// ============================================
// Scheduled Payments Tab (controlled by enableBillPayScheduler flag)
// ============================================

interface ScheduledPayment {
  id: string;
  payee: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  nextDate: string;
  fromAccount: string;
  active: boolean;
}

const INITIAL_SCHEDULED: ScheduledPayment[] = [
  { id: 'sp1', payee: 'Rent Payment', amount: 1850.00, frequency: 'monthly', nextDate: 'Apr 1, 2026', fromAccount: 'Horizon Checking', active: true },
  { id: 'sp2', payee: 'Auto Insurance', amount: 156.00, frequency: 'monthly', nextDate: 'Apr 5, 2026', fromAccount: 'Horizon Checking', active: true },
  { id: 'sp3', payee: 'Student Loan', amount: 342.50, frequency: 'monthly', nextDate: 'Apr 15, 2026', fromAccount: 'Horizon Checking', active: true },
  { id: 'sp4', payee: 'Horizon Savings Transfer', amount: 500.00, frequency: 'biweekly', nextDate: 'Mar 28, 2026', fromAccount: 'Horizon Checking', active: true },
  { id: 'sp5', payee: 'Gym Membership', amount: 24.99, frequency: 'monthly', nextDate: 'Apr 6, 2026', fromAccount: 'Horizon Cash Rewards Card', active: false },
];

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  biweekly: 'Every 2 Weeks',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

function ScheduledPaymentsTab() {
  const [scheduled, setScheduled] = useState(INITIAL_SCHEDULED);
  const [showForm, setShowForm] = useState(false);

  const activeCount = scheduled.filter(s => s.active).length;
  const monthlyTotal = scheduled
    .filter(s => s.active)
    .reduce((sum, s) => {
      const multiplier = s.frequency === 'weekly' ? 4.33 : s.frequency === 'biweekly' ? 2.17 : s.frequency === 'quarterly' ? 0.33 : 1;
      return sum + s.amount * multiplier;
    }, 0);

  const toggleActive = (id: string) => {
    setScheduled(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const removeScheduled = (id: string) => {
    setScheduled(prev => prev.filter(s => s.id !== id));
  };

  const handleAddPayment = () => {
    message.success('Scheduled payment created successfully!');
    setShowForm(false);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Card
          title={
            <Space>
              <CalendarOutlined />
              <span>Scheduled Payments</span>
              <Tag color="blue">{activeCount} active</Tag>
            </Space>
          }
          extra={
            <Button type="primary" icon={<PlusOutlined />} size="small" onClick={() => setShowForm(true)}>
              New Schedule
            </Button>
          }
        >
          <List
            dataSource={scheduled}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    size="small"
                    icon={item.active ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    onClick={() => toggleActive(item.id)}
                  >
                    {item.active ? 'Pause' : 'Resume'}
                  </Button>,
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeScheduled(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    item.active
                      ? <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                      : <PauseCircleOutlined style={{ fontSize: 24, color: '#d9d9d9' }} />
                  }
                  title={
                    <Space>
                      <Text strong style={{ opacity: item.active ? 1 : 0.5 }}>{item.payee}</Text>
                      <Tag>{FREQUENCY_LABELS[item.frequency]}</Tag>
                      {!item.active && <Tag color="default">Paused</Tag>}
                    </Space>
                  }
                  description={
                    <Text type="secondary">
                      Next: {item.nextDate} &middot; From: {item.fromAccount}
                    </Text>
                  }
                />
                <Text strong style={{ fontSize: 16, opacity: item.active ? 1 : 0.5 }}>
                  ${item.amount.toFixed(2)}
                </Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Card size="small">
            <Statistic
              title="Est. Monthly Outflow"
              value={monthlyTotal}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>

          {showForm ? (
            <Card title="New Scheduled Payment" size="small" extra={<Button type="text" size="small" onClick={() => setShowForm(false)}>Cancel</Button>}>
              <Form layout="vertical" onFinish={handleAddPayment}>
                <Form.Item label="Payee" required>
                  <Input placeholder="e.g. Rent, Insurance" />
                </Form.Item>
                <Form.Item label="Amount" required>
                  <InputNumber prefix="$" style={{ width: '100%' }} min={0.01} placeholder="0.00" precision={2} />
                </Form.Item>
                <Form.Item label="From Account" required>
                  <Select
                    placeholder="Select account"
                    options={ACCOUNTS.filter(a => a.type !== 'mortgage').map(a => ({
                      value: a.id,
                      label: `${a.name} (${a.accountNumber})`,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Frequency" required>
                  <Select
                    placeholder="Select frequency"
                    options={[
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'biweekly', label: 'Every 2 Weeks' },
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'quarterly', label: 'Quarterly' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Start Date" required>
                  <Input type="date" />
                </Form.Item>
                <Button type="primary" htmlType="submit" icon={<CalendarOutlined />} block>
                  Create Schedule
                </Button>
              </Form>
            </Card>
          ) : (
            <Card size="small" style={{ textAlign: 'center' }}>
              <Space direction="vertical">
                <CalendarOutlined style={{ fontSize: 32, color: '#1677ff' }} />
                <Text type="secondary">Automate your recurring payments and never miss a due date.</Text>
              </Space>
            </Card>
          )}
        </Space>
      </Col>
    </Row>
  );
}

export function TransferPay() {
  // Boolean flag: show/hide Scheduled Payments tab
  const enableScheduler = useFeatureFlag('enableBillPayScheduler');

  const tabItems = [
    { key: 'transfer', label: 'Transfer', children: <TransferTab /> },
    { key: 'bills', label: 'Pay Bills', children: <PayBillsTab /> },
    { key: 'zelle', label: 'Send with Zelle', children: <ZelleTab /> },
    ...(enableScheduler
      ? [{ key: 'scheduled', label: 'Scheduled Payments', children: <ScheduledPaymentsTab /> }]
      : []),
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ marginBottom: 0 }}>Transfer & Pay</Title>
      <Tabs defaultActiveKey="transfer" items={tabItems} />
    </Space>
  );
}
