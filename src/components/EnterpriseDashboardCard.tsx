/**
 * EnterpriseDashboardCard Component
 *
 * Shows enterprise-tier analytics when enabled, or an upgrade prompt
 * when disabled. Demonstrates the premium feature gate pattern.
 *
 * PATTERN: Boolean flag → two-state component
 * The parent passes `isEnabled` from useFeatureFlag('enableEnterpriseDashboard').
 */

import { Card, Statistic, Row, Col, Typography, Space, Button } from 'antd';
import {
  CrownOutlined,
  LockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;

interface EnterpriseDashboardCardProps {
  isEnabled: boolean;
}

function EnabledState() {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="Avg. LTV"
            value={4250}
            prefix="$"
            valueStyle={{ fontSize: 20 }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Churn Rate"
            value={2.1}
            suffix="%"
            valueStyle={{ fontSize: 20, color: '#52c41a' }}
            prefix={<ArrowDownOutlined />}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="Expansion Rev."
            value={15}
            suffix="%"
            valueStyle={{ fontSize: 20, color: '#52c41a' }}
            prefix={<ArrowUpOutlined />}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="NPS Score"
            value={72}
            valueStyle={{ fontSize: 20 }}
          />
        </Col>
      </Row>
      <div
        style={{
          background: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: 6,
          padding: 12,
        }}
      >
        <Text type="secondary" style={{ fontSize: 12 }}>
          90-day cohort retention: <Text strong>94.2%</Text> — up 1.8% from last quarter
        </Text>
      </div>
    </Space>
  );
}

function DisabledState() {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <LockOutlined style={{ fontSize: 40, color: '#d9d9d9', marginBottom: 16 }} />
      <Title level={5} type="secondary">
        Advanced Analytics
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 16 }}>
        Unlock cohort analysis, LTV projections, churn prediction, and more with an Enterprise plan.
      </Paragraph>
      <Button type="primary" disabled>
        Contact Sales
      </Button>
    </div>
  );
}

export function EnterpriseDashboardCard({ isEnabled }: EnterpriseDashboardCardProps) {
  return (
    <Card
      title={
        <Space>
          <CrownOutlined style={{ color: isEnabled ? '#faad14' : '#d9d9d9' }} />
          <span>Enterprise Analytics</span>
        </Space>
      }
      size="small"
      style={isEnabled ? {} : { opacity: 0.85 }}
    >
      {isEnabled ? <EnabledState /> : <DisabledState />}
    </Card>
  );
}
