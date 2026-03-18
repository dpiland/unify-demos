/**
 * RevenueBreakdown Component
 *
 * Displays MRR split by subscription tier with progress bars.
 * Always visible on the dashboard sidebar.
 */

import { Card, Progress, Typography, Space } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const REVENUE_DATA = [
  { tier: 'Enterprise', amount: 142000, percent: 57, color: '#faad14' },
  { tier: 'Professional', amount: 78500, percent: 32, color: '#1890ff' },
  { tier: 'Starter', amount: 28000, percent: 11, color: '#52c41a' },
];

export function RevenueBreakdown() {
  return (
    <Card
      title={
        <Space>
          <DollarOutlined />
          <span>Revenue Breakdown</span>
        </Space>
      }
      size="small"
    >
      <div style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          $248,500
        </Title>
        <Text type="secondary">Monthly Recurring Revenue</Text>
      </div>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {REVENUE_DATA.map((item) => (
          <div key={item.tier}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text>{item.tier}</Text>
              <Text strong>${item.amount.toLocaleString()}</Text>
            </div>
            <Progress
              percent={item.percent}
              strokeColor={item.color}
              showInfo={true}
              size="small"
            />
          </div>
        ))}
      </Space>
    </Card>
  );
}
