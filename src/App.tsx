/**
 * Main Application - Generic Dashboard
 *
 * This is a GENERIC starting point for building custom applications.
 * Customize this dashboard for your specific use case (retail, fintech, healthcare, etc.)
 *
 * Under the hood, this uses feature flags to control different aspects of the UI,
 * demonstrating 3 common patterns:
 * 1. Boolean flag (showWelcomeBanner) - toggle UI visibility
 * 2. String flag (buttonVariant) - A/B test variants
 * 3. Number flag (itemsToDisplay) - configure numeric values
 *
 * 🎯 TO CUSTOMIZE:
 * - Replace generic content with your industry-specific content
 * - Add your own feature flags in src/lib/featureFlags.ts
 * - Add your components in src/components/
 * - Update theme in src/theme/
 *
 * 🤖 AI-FRIENDLY:
 * Tell an AI agent to transform this into your specific use case:
 * "Transform this dashboard into a [INDUSTRY] application with [FEATURES]"
 */

import { Alert, Button, Card, Col, Layout, List, Row, Space, Statistic, Typography } from 'antd';
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

/**
 * Sample data for demonstrating the number flag
 * In a real app, this would come from an API or database
 */
const SAMPLE_DATA = [
  'Sample Item 1 - Example data entry',
  'Sample Item 2 - Example data entry',
  'Sample Item 3 - Example data entry',
  'Sample Item 4 - Example data entry',
  'Sample Item 5 - Example data entry',
  'Sample Item 6 - Example data entry',
  'Sample Item 7 - Example data entry',
  'Sample Item 8 - Example data entry',
  'Sample Item 9 - Example data entry',
  'Sample Item 10 - Example data entry',
  'Sample Item 11 - Example data entry',
  'Sample Item 12 - Example data entry',
  'Sample Item 13 - Example data entry',
  'Sample Item 14 - Example data entry',
  'Sample Item 15 - Example data entry',
  'Sample Item 16 - Example data entry',
  'Sample Item 17 - Example data entry',
  'Sample Item 18 - Example data entry',
  'Sample Item 19 - Example data entry',
  'Sample Item 20 - Example data entry',
  'Sample Item 21 - Example data entry',
  'Sample Item 22 - Example data entry',
  'Sample Item 23 - Example data entry',
  'Sample Item 24 - Example data entry',
  'Sample Item 25 - Example data entry',
  'Sample Item 26 - Example data entry',
  'Sample Item 27 - Example data entry',
  'Sample Item 28 - Example data entry',
  'Sample Item 29 - Example data entry',
  'Sample Item 30 - Example data entry',
  'Sample Item 31 - Example data entry',
  'Sample Item 32 - Example data entry',
  'Sample Item 33 - Example data entry',
  'Sample Item 34 - Example data entry',
  'Sample Item 35 - Example data entry',
  'Sample Item 36 - Example data entry',
  'Sample Item 37 - Example data entry',
  'Sample Item 38 - Example data entry',
  'Sample Item 39 - Example data entry',
  'Sample Item 40 - Example data entry',
  'Sample Item 41 - Example data entry',
  'Sample Item 42 - Example data entry',
  'Sample Item 43 - Example data entry',
  'Sample Item 44 - Example data entry',
  'Sample Item 45 - Example data entry',
  'Sample Item 46 - Example data entry',
  'Sample Item 47 - Example data entry',
  'Sample Item 48 - Example data entry',
  'Sample Item 49 - Example data entry',
  'Sample Item 50 - Example data entry',
];

/**
 * App Component - Simple Dashboard
 *
 * This component demonstrates all three types of feature flags:
 * - Boolean: Controls visibility of the announcement banner
 * - String: Controls button styling variant
 * - Number: Controls how many items to display in the list
 */
function App() {
  // ============================================
  // EXAMPLE 1: Boolean Flag
  // ============================================
  // Controls whether the announcement banner is visible
  // This could be a promotional banner, announcement, or any toggleable UI element
  const showBanner = useFeatureFlag('showWelcomeBanner');

  // ============================================
  // EXAMPLE 2: String Flag
  // ============================================
  // Controls the button styling variant (A/B testing example)
  // Variants: 'default' | 'primary' | 'success'
  const buttonVariant = useFeatureFlagString('buttonVariant');

  // ============================================
  // EXAMPLE 3: Number Flag
  // ============================================
  // Controls how many items to display in the list
  // Options: 5, 10, 20, 50
  const itemCount = useFeatureFlagNumber('itemsToDisplay');

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
          <DashboardOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            Dashboard
          </Title>
        </Space>
      </Header>

      {/* Main Content Area */}
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* EXAMPLE: Boolean flag controls whether banner is visible */}
            {/*
              PATTERN: Conditional rendering based on flag state
              USE CASE: Show/hide promotional banners, announcements, new features
            */}
            {showBanner && (
              <Alert
                message="Welcome to your dashboard!"
                description="This is an example announcement banner that can be toggled on or off dynamically. Perfect for promotions, updates, or important notices."
                type="info"
                showIcon
                closable
              />
            )}

            {/* Stats Cards Section */}
            <Row gutter={16}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Items"
                    value={SAMPLE_DATA.length}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Users"
                    value={1234}
                    prefix={<AppstoreOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Displayed"
                    value={itemCount}
                    suffix={`/ ${SAMPLE_DATA.length}`}
                    prefix={<UnorderedListOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Conversion Rate"
                    value={93.5}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* EXAMPLE: Number flag controls list length */}
            {/*
              PATTERN: Use flag value to slice/limit data
              USE CASE: Configure page sizes, limits, batch sizes
            */}
            <Card
              title={
                <Space>
                  <UnorderedListOutlined />
                  <span>Recent Activity</span>
                </Space>
              }
            >
              <List
                dataSource={SAMPLE_DATA.slice(0, itemCount)}
                renderItem={(item, index) => (
                  <List.Item>
                    <Text>
                      {index + 1}. {item}
                    </Text>
                  </List.Item>
                )}
                bordered
                size="small"
                style={{ background: '#fff', marginBottom: 16 }}
              />
              <Text type="secondary">
                Showing <strong>{itemCount}</strong> of {SAMPLE_DATA.length} items
              </Text>
            </Card>

            {/* EXAMPLE: String flag controls button variant */}
            {/*
              PATTERN: Use flag value to determine component props/styling
              USE CASE: A/B test different UI variants, layouts, themes
            */}
            <Card title="Quick Actions">
              <Space size="middle" wrap>
                <Button
                  type={
                    buttonVariant === 'primary'
                      ? 'primary'
                      : buttonVariant === 'success'
                      ? 'primary'
                      : 'default'
                  }
                  size="large"
                  style={
                    buttonVariant === 'success'
                      ? { background: '#52c41a', borderColor: '#52c41a' }
                      : {}
                  }
                >
                  Primary Action
                </Button>
                <Button size="large">Secondary Action</Button>
                <Button size="large">View Details</Button>
              </Space>
              <Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0 }}>
                Current button style: <strong>{buttonVariant}</strong>
              </Paragraph>
            </Card>

            {/* Additional Dashboard Content */}
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Card title="Summary" style={{ height: '100%' }}>
                  <Paragraph>
                    This is a generic dashboard template that you can customize for your specific
                    use case. Replace this content with charts, tables, or any other components
                    relevant to your application.
                  </Paragraph>
                  <Paragraph>
                    The interface adapts dynamically based on configuration, making it easy to test
                    different layouts and features with your users.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Getting Started" style={{ height: '100%' }}>
                  <ul style={{ marginLeft: 20 }}>
                    <li>
                      <Text>Customize the UI in </Text>
                      <code>src/App.tsx</code>
                    </li>
                    <li>
                      <Text>Add your components in </Text>
                      <code>src/components/</code>
                    </li>
                    <li>
                      <Text>Update styling in </Text>
                      <code>src/theme/</code>
                    </li>
                    <li>
                      <Text>Configure features in </Text>
                      <code>src/lib/featureFlags.ts</code>
                    </li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
