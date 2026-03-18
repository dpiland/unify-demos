/**
 * AIInsightsPanel Component
 *
 * Displays AI-powered insights: churn predictions, upsell opportunities,
 * usage trends, and recommendations. All data is static/fake but presented
 * professionally.
 *
 * PATTERN: Boolean flag → conditional rendering
 * Visibility controlled by showAIInsights flag in the parent component.
 */

import { Card, Space, Typography, Alert } from 'antd';
import {
  ExperimentOutlined,
  WarningOutlined,
  RiseOutlined,
  BulbOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

const INSIGHTS = [
  {
    icon: <WarningOutlined style={{ color: '#faad14', fontSize: 20 }} />,
    title: 'Churn Risk Detected',
    description: '3 accounts showing declining usage over the past 30 days',
    type: 'warning' as const,
  },
  {
    icon: <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 20 }} />,
    title: 'Upsell Opportunities',
    description: '12 starter accounts approaching plan limits — candidates for upgrade',
    type: 'success' as const,
  },
  {
    icon: <RiseOutlined style={{ color: '#1890ff', fontSize: 20 }} />,
    title: 'Usage Trend',
    description: 'API usage up 23% month-over-month across all tiers',
    type: 'info' as const,
  },
  {
    icon: <BulbOutlined style={{ color: '#722ed1', fontSize: 20 }} />,
    title: 'Recommendation',
    description: 'Reach out to Acme Corp — usage dropped 40% this week',
    type: 'warning' as const,
  },
];

export function AIInsightsPanel() {
  return (
    <Card
      title={
        <Space>
          <ExperimentOutlined />
          <span>AI Insights</span>
        </Space>
      }
      extra={
        <Text
          type="secondary"
          style={{
            background: '#f0f5ff',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          Powered by ML
        </Text>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {INSIGHTS.map((insight, index) => (
          <Alert
            key={index}
            message={
              <Space>
                {insight.icon}
                <Title level={5} style={{ margin: 0 }}>{insight.title}</Title>
              </Space>
            }
            description={insight.description}
            type={insight.type}
            showIcon={false}
          />
        ))}
      </Space>
    </Card>
  );
}
