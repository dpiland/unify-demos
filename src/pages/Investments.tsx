/**
 * Investments Page
 *
 * Two modes controlled by the showInvestmentPortfolio boolean flag:
 * - Flag OFF: Upsell/promotional card to open a brokerage account
 * - Flag ON: Full portfolio view with holdings, allocation, and market data
 *
 * Additional sections controlled by flags:
 * - enableCryptoTrading: Show crypto trading panel with live prices
 * - enableInvestmentAdvisory: Show advisory panel with risk assessment
 */

import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Divider, Progress, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import {
  FundOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import {
  INVESTMENT_HOLDINGS,
  INVESTMENT_COLUMNS,
  MARKET_INDICES,
} from '../data/mockData.tsx';
import { theme as antdTheme } from 'antd';

const { Title, Text, Paragraph } = Typography;

// Crypto mock data
const CRYPTO_HOLDINGS = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67842.50, change24h: 2.34, holdings: 0.45, value: 30529.13 },
  { symbol: 'ETH', name: 'Ethereum', price: 3521.80, change24h: -1.12, holdings: 4.2, value: 14791.56 },
  { symbol: 'SOL', name: 'Solana', price: 142.65, change24h: 5.67, holdings: 25, value: 3566.25 },
  { symbol: 'ADA', name: 'Cardano', price: 0.62, change24h: -0.45, holdings: 5000, value: 3100.00 },
];

const CRYPTO_WATCHLIST = [
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.164, change24h: 3.21 },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.92, change24h: -2.08 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.45, change24h: 1.55 },
];

function UpsellView() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
      <Card style={{ maxWidth: 560, textAlign: 'center' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <FundOutlined style={{ fontSize: 64, color: '#1a3c5e' }} />
          <Title level={3}>Start Investing with Horizon Bank</Title>
          <Paragraph type="secondary" style={{ fontSize: 16 }}>
            Open a brokerage account and start building your portfolio.
            Invest in stocks, ETFs, bonds, and mutual funds all in one place.
          </Paragraph>
          <Space direction="vertical" size="small" style={{ textAlign: 'left', margin: '0 auto' }}>
            <Text><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />No account minimums</Text>
            <Text><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />$0 commissions on online trades</Text>
            <Text><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />Access to research and tools</Text>
            <Text><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />Manage alongside your bank accounts</Text>
          </Space>
          <Button type="primary" size="large">Open a Brokerage Account</Button>
        </Space>
      </Card>
    </div>
  );
}

function CryptoTradingPanel() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const totalCryptoValue = CRYPTO_HOLDINGS.reduce((sum, c) => sum + c.value, 0);

  const cryptoColumns = [
    {
      title: 'Asset',
      key: 'asset',
      render: (_: unknown, record: typeof CRYPTO_HOLDINGS[0]) => (
        <Space>
          <Text strong>{record.symbol}</Text>
          <Text type="secondary">{record.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as const,
      render: (price: number) => `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    {
      title: '24h Change',
      dataIndex: 'change24h',
      key: 'change24h',
      align: 'right' as const,
      render: (change: number) => (
        <Text style={{ color: change >= 0 ? '#52c41a' : '#f5222d' }}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </Text>
      ),
    },
    {
      title: 'Holdings',
      dataIndex: 'holdings',
      key: 'holdings',
      align: 'right' as const,
      render: (h: number, record: typeof CRYPTO_HOLDINGS[0]) => `${h} ${record.symbol}`,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'right' as const,
      render: (v: number) => <Text strong>${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: () => (
        <Space size="small">
          <Button size="small" type="primary">Buy</Button>
          <Button size="small">Sell</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Space>
          <ThunderboltOutlined style={{ color: '#faad14' }} />
          <span>Crypto Trading</span>
          <Tag color="orange">Beta</Tag>
        </Space>
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <Statistic
              title="Crypto Portfolio"
              value={totalCryptoValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <Statistic
              title="24h Change"
              value={2.18}
              precision={2}
              suffix="%"
              prefix="+"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <Statistic title="Assets Held" value={4} suffix="coins" />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={CRYPTO_HOLDINGS}
        columns={cryptoColumns}
        rowKey="symbol"
        pagination={false}
        size="small"
        scroll={{ x: 600 }}
      />

      <Divider style={{ fontSize: 13 }}>Watchlist</Divider>
      <Row gutter={[12, 12]}>
        {CRYPTO_WATCHLIST.map(coin => (
          <Col xs={24} sm={8} key={coin.symbol}>
            <Card size="small">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <Text strong>{coin.symbol}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{coin.name}</Text>
                </Space>
                <div style={{ textAlign: 'right' }}>
                  <div>${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <Text style={{ color: coin.change24h >= 0 ? '#52c41a' : '#f5222d', fontSize: 12 }}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

function InvestmentAdvisoryPanel() {
  const { token } = antdTheme.useToken();
  const isDark = token.colorBgContainer !== '#ffffff';
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <Card
      title={
        <Space>
          <SafetyCertificateOutlined style={{ color: '#1a3c5e' }} />
          <span>Investment Advisory</span>
          <Tag color="blue">Premier</Tag>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {/* Risk Assessment */}
        <Col xs={24} md={8}>
          <Card size="small" title="Your Risk Profile" style={{ height: '100%', background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Progress
                type="dashboard"
                percent={65}
                format={() => (
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 600 }}>65</div>
                    <div style={{ fontSize: 11, color: token.colorTextSecondary }}>Moderate</div>
                  </div>
                )}
                strokeColor="#1a3c5e"
                size={120}
              />
            </div>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Time Horizon</Text>
                <Text>15+ years</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Risk Tolerance</Text>
                <Text>Moderate-High</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Last Updated</Text>
                <Text>Mar 2026</Text>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Recommendations */}
        <Col xs={24} md={10}>
          <Card size="small" title="Recommendations" style={{ height: '100%', background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Badge status="warning" />
                <Text strong style={{ marginLeft: 8 }}>Rebalance Portfolio</Text>
                <Paragraph type="secondary" style={{ margin: '4px 0 0 22px', fontSize: 13 }}>
                  Your stock allocation is 7% above target. Consider moving $8,200 to bonds to reduce risk.
                </Paragraph>
              </div>
              <div>
                <Badge status="success" />
                <Text strong style={{ marginLeft: 8 }}>Max Out IRA Contribution</Text>
                <Paragraph type="secondary" style={{ margin: '4px 0 0 22px', fontSize: 13 }}>
                  You've contributed $4,500 of your $7,000 annual limit. Consider adding $2,500 before year end.
                </Paragraph>
              </div>
              <div>
                <Badge status="processing" />
                <Text strong style={{ marginLeft: 8 }}>Tax-Loss Harvesting Opportunity</Text>
                <Paragraph type="secondary" style={{ margin: '4px 0 0 22px', fontSize: 13 }}>
                  AGG is down 2.3%. Selling and buying a similar bond fund could save ~$180 in taxes.
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Advisor CTA */}
        <Col xs={24} md={6}>
          <Card size="small" style={{ height: '100%', textAlign: 'center', background: isDark ? '#1f1f1f' : '#fafafa' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%', paddingTop: 8 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#1a3c5e',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: 24,
                }}
              >
                <StarOutlined />
              </div>
              <div>
                <Text strong>Sarah Mitchell, CFP</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>Your Financial Advisor</Text>
              </div>
              {showSchedule ? (
                <Alert
                  message="Appointment Requested"
                  description="Sarah will reach out within 24 hours to confirm your consultation."
                  type="success"
                  showIcon
                  style={{ textAlign: 'left' }}
                />
              ) : (
                <Button
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={() => setShowSchedule(true)}
                  block
                >
                  Schedule Call
                </Button>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

function PortfolioView() {
  const totalValue = INVESTMENT_HOLDINGS.reduce((sum, h) => sum + h.value, 0);
  const totalChange = INVESTMENT_HOLDINGS.reduce(
    (sum, h) => sum + h.value * (h.change / 100),
    0
  );

  // Simple allocation: stocks vs bonds
  const bondTickers = ['AGG'];
  const bondValue = INVESTMENT_HOLDINGS
    .filter(h => bondTickers.includes(h.ticker))
    .reduce((sum, h) => sum + h.value, 0);
  const stockValue = totalValue - bondValue;
  const stockPercent = Math.round((stockValue / totalValue) * 100);

  // Feature flags for additional sections
  const enableCryptoTrading = useFeatureFlag('enableCryptoTrading');
  const enableInvestmentAdvisory = useFeatureFlag('enableInvestmentAdvisory');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Portfolio Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Portfolio Value"
              value={totalValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#1a3c5e' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Today's Change"
              value={Math.abs(totalChange)}
              precision={2}
              prefix={totalChange >= 0 ? '+$' : '-$'}
              valueStyle={{ color: totalChange >= 0 ? '#52c41a' : '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <div style={{ marginBottom: 8 }}>
              <Text type="secondary">Allocation</Text>
            </div>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Stocks</Text>
                <Text strong>{stockPercent}%</Text>
              </div>
              <Progress percent={stockPercent} showInfo={false} strokeColor="#1a3c5e" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Bonds</Text>
                <Text strong>{100 - stockPercent}%</Text>
              </div>
              <Progress percent={100 - stockPercent} showInfo={false} strokeColor="#52c41a" />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Investment Advisory - controlled by enableInvestmentAdvisory boolean flag */}
      {enableInvestmentAdvisory && <InvestmentAdvisoryPanel />}

      {/* Holdings Table */}
      <Card title="Holdings">
        <Table
          dataSource={INVESTMENT_HOLDINGS}
          columns={INVESTMENT_COLUMNS}
          rowKey="ticker"
          pagination={false}
          scroll={{ x: 500 }}
        />
      </Card>

      {/* Crypto Trading - controlled by enableCryptoTrading boolean flag */}
      {enableCryptoTrading && window.innerWidth >= 768 && <CryptoTradingPanel />}

      {/* Market Summary */}
      <Card title="Market Summary">
        <Row gutter={[16, 16]}>
          {MARKET_INDICES.map(index => (
            <Col xs={24} sm={8} key={index.ticker}>
              <Card size="small">
                <Statistic
                  title={index.name}
                  value={index.value}
                  precision={2}
                  valueStyle={{ fontSize: 18 }}
                />
                <Space style={{ marginTop: 4 }}>
                  {index.change >= 0 ? (
                    <RiseOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <FallOutlined style={{ color: '#f5222d' }} />
                  )}
                  <Text style={{ color: index.change >= 0 ? '#52c41a' : '#f5222d' }}>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
}

export function Investments() {
  const showInvestmentPortfolio = useFeatureFlag('showInvestmentPortfolio');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{ marginBottom: 0 }}>Investments</Title>

      {showInvestmentPortfolio ? <PortfolioView /> : <UpsellView />}
    </Space>
  );
}
