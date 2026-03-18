/**
 * NovaCRM — SaaS Platform Dashboard
 *
 * Admin dashboard for a fictitious SaaS software provider.
 * Showcases subscription management, revenue metrics, customer health,
 * and AI-powered insights.
 *
 * Feature flags control three key aspects:
 * 1. Boolean flag (showAIInsights) — toggle AI insights panel
 * 2. Boolean flag (enableEnterpriseDashboard) — gate enterprise analytics
 * 3. Number flag (recentEventsToShow) — control activity table row count
 */

import { Button, Card, Col, Layout, Row, Space, Statistic, Typography } from 'antd';
import {
  CloudOutlined,
  DollarOutlined,
  TeamOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  PlusOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  BookOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { SubscriptionActivityTable } from './components/SubscriptionActivityTable';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { RevenueBreakdown } from './components/RevenueBreakdown';
import { EnterpriseDashboardCard } from './components/EnterpriseDashboardCard';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  // Boolean flag — controls visibility of the AI insights panel
  const showAIInsights = useFeatureFlag('showAIInsights');

  // Boolean flag — gates enterprise-tier analytics features
  const enableEnterprise = useFeatureFlag('enableEnterpriseDashboard');

  // Number flag — controls how many subscription events appear in the table
  const eventsToShow = useFeatureFlagNumber('recentEventsToShow');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
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
          <CloudOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            NovaCRM
          </Title>
        </Space>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Stats Row */}
            <Row gutter={16}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Monthly Recurring Revenue"
                    value={248500}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                  />
                  <div style={{ marginTop: 8 }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                    <span style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>
                      12.5% from last month
                    </span>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Subscriptions"
                    value={1247}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                    <span style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>
                      38 new this month
                    </span>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Customer Health Score"
                    value={87}
                    suffix="/ 100"
                    prefix={<HeartOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: '#8c8c8c', fontSize: 12 }}>
                      3 accounts at risk
                    </span>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Open Support Tickets"
                    value={23}
                    prefix={<CustomerServiceOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: '#8c8c8c', fontSize: 12 }}>
                      Avg. resolution: 4.2 hrs
                    </span>
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Main Content — Two Column Layout */}
            <Row gutter={24}>
              {/* Left Column — Activity & AI Insights */}
              <Col xs={24} lg={16}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/*
                    NUMBER FLAG: recentEventsToShow
                    Controls how many rows appear in the subscription activity table.
                    Default is 10; options are 5, 10, 25, 50.
                  */}
                  <SubscriptionActivityTable itemCount={eventsToShow} />

                  {/*
                    BOOLEAN FLAG: showAIInsights
                    Toggles visibility of the AI-powered insights panel.
                    When enabled, shows churn predictions, upsell opportunities, and trends.
                  */}
                  {showAIInsights && <AIInsightsPanel />}
                </Space>
              </Col>

              {/* Right Column — Revenue & Enterprise */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <RevenueBreakdown />

                  {/*
                    BOOLEAN FLAG: enableEnterpriseDashboard
                    Gates enterprise-tier analytics features.
                    When off, shows an upgrade prompt with locked state.
                    When on, shows LTV, churn rate, expansion revenue, and cohort data.
                  */}
                  <EnterpriseDashboardCard isEnabled={enableEnterprise} />
                </Space>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Card title="Quick Actions">
              <Space size="middle" wrap>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                  Add Customer
                </Button>
                <Button icon={<FileTextOutlined />} size="large">
                  Generate Report
                </Button>
                <Button icon={<CreditCardOutlined />} size="large">
                  Billing Overview
                </Button>
                <Button icon={<BookOutlined />} size="large">
                  API Documentation
                </Button>
              </Space>
            </Card>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
