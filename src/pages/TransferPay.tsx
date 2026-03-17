/**
 * Transfer & Pay Page
 *
 * Three tabs: Transfer Between Accounts, Pay Bills, Send with Zelle.
 *
 * Feature flags used:
 * - enableInstantTransfers (boolean): shows/hides instant transfer speed option
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
  Table,
  Tabs,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  SendOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import { ACCOUNTS, RECENT_TRANSFERS, UPCOMING_BILLS } from '../data/mockData.tsx';

const { Title, Text } = Typography;

function TransferTab() {
  const [fromAccount, setFromAccount] = useState<string | undefined>();
  const enableInstantTransfers = useFeatureFlag('enableInstantTransfers');

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
                placeholder="0.00"
                precision={2}
              />
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
                message="Instant transfers are available for this account"
                type="success"
                showIcon
                icon={<ThunderboltOutlined />}
                style={{ marginBottom: 16 }}
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

export function TransferPay() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ marginBottom: 0 }}>Transfer & Pay</Title>

      <Tabs
        defaultActiveKey="transfer"
        items={[
          { key: 'transfer', label: 'Transfer', children: <TransferTab /> },
          { key: 'bills', label: 'Pay Bills', children: <PayBillsTab /> },
          { key: 'zelle', label: 'Send with Zelle', children: <ZelleTab /> },
        ]}
      />
    </Space>
  );
}
