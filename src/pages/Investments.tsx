/**
 * Investments Page
 *
 * Two modes controlled by the showInvestmentPortfolio boolean flag:
 * - Flag OFF: Upsell/promotional card to open a brokerage account
 * - Flag ON: Full portfolio view with holdings, allocation, and market data
 */

import { Button, Card, Col, Progress, Row, Space, Statistic, Table, Typography } from 'antd';
import {
  FundOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useFeatureFlag } from '../hooks/useFeatureFlag';
import {
  INVESTMENT_HOLDINGS,
  INVESTMENT_COLUMNS,
  MARKET_INDICES,
} from '../data/mockData.tsx';

const { Title, Text, Paragraph } = Typography;

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
