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

import { useState } from 'react';
import { Alert, Button, Card, Col, Modal, Row, Space, Statistic, Table, Typography, Upload, message } from 'antd';
import {
  BankOutlined,
  CameraOutlined,
  CreditCardOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  InboxOutlined,
  SendOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from '../hooks/useFeatureFlag';
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
                <Button size="small" type="primary">Make Extra Payment</Button>
                <Button size="small">View Amortization</Button>
                <Button size="small">Refinance Options</Button>
              </div>
            )}
          </div>
        )}
      </Space>
    </Card>
  );
}

export function AccountSummary({ currentUser }: AccountSummaryProps) {
  const navigate = useNavigate();
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [fraudDismissed, setFraudDismissed] = useState(false);

  // Boolean flag: show fraud detection alerts
  const showFraudAlerts = useFeatureFlag('showFraudAlerts');

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

      {/* Fraud Alert - controlled by showFraudAlerts boolean flag */}
      {showFraudAlerts && !fraudDismissed && (
        <Alert
          type="error"
          showIcon
          icon={<ExclamationCircleOutlined />}
          message={
            <Text strong>Suspicious Activity Detected</Text>
          }
          description={
            <div>
              <Text>
                We noticed an unusual transaction on your Active Cash Credit Card:
              </Text>
              <div style={{
                margin: '12px 0',
                padding: 12,
                background: '#fff1f0',
                borderRadius: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <Text strong>Electronics Plus - Miami, FL</Text>
                  <br />
                  <Text type="secondary">March 16, 2026 at 2:47 AM</Text>
                </div>
                <Text strong style={{ color: '#f5222d', fontSize: 18 }}>$1,247.99</Text>
              </div>
              <Space>
                <Button type="primary" danger size="small" onClick={() => {
                  message.success('Transaction reported as fraud. Your card has been locked. A new card will be mailed to you.');
                  setFraudDismissed(true);
                }}>
                  This wasn't me — Lock Card
                </Button>
                <Button size="small" onClick={() => {
                  message.info('Thank you for confirming. No further action needed.');
                  setFraudDismissed(true);
                }}>
                  Yes, this was me
                </Button>
              </Space>
            </div>
          }
          closable
          onClose={() => setFraudDismissed(true)}
          style={{ border: '1px solid #ffa39e' }}
        />
      )}

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
            <div style={{ marginTop: 4, padding: '8px 12px', background: '#f5f5f5', borderRadius: 4 }}>
              Everyday Checking (****4523)
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
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  fontSize: 16,
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
    </Space>
  );
}
