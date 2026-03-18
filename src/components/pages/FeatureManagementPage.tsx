/**
 * FeatureManagementPage — Flag-gated
 *
 * PATTERN: Boolean flag -> two-state page
 * When enableFeatureManagement is ON: shows feature flags table
 * When OFF: shows FeaturePreview marketing page
 */

import { Card, Table, Tag, Typography, Space, Switch } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { FeaturePreview } from '../FeaturePreview';

const { Title, Text } = Typography;

const FLAGS_DATA = [
  { key: '1', name: 'dark-mode', type: 'Boolean', status: 'Enabled', targeting: '100% of users', updated: '1 day ago' },
  { key: '2', name: 'new-checkout-flow', type: 'Boolean', status: 'Disabled', targeting: 'Beta testers only', updated: '3 hours ago' },
  { key: '3', name: 'pricing-page-variant', type: 'String', status: 'Enabled', targeting: 'A/B: 50/50 split', updated: '2 days ago' },
  { key: '4', name: 'max-api-results', type: 'Number', status: 'Enabled', targeting: 'Enterprise: 100, Free: 25', updated: '1 week ago' },
  { key: '5', name: 'enable-ai-assistant', type: 'Boolean', status: 'Enabled', targeting: 'Enterprise only', updated: '5 hours ago' },
  { key: '6', name: 'search-algorithm', type: 'String', status: 'Enabled', targeting: 'Region: US=v2, EU=v1', updated: '4 days ago' },
  { key: '7', name: 'rate-limit-threshold', type: 'Number', status: 'Enabled', targeting: 'Premium: 1000, Free: 100', updated: '1 day ago' },
  { key: '8', name: 'maintenance-banner', type: 'Boolean', status: 'Disabled', targeting: 'All users', updated: '2 weeks ago' },
];

const TYPE_COLORS: Record<string, string> = {
  Boolean: 'blue',
  String: 'purple',
  Number: 'orange',
};

const columns = [
  { title: 'Flag Name', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Type', dataIndex: 'type', key: 'type', render: (t: string) => <Tag color={TYPE_COLORS[t]}>{t}</Tag> },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => <Switch size="small" checked={s === 'Enabled'} />,
  },
  { title: 'Targeting', dataIndex: 'targeting', key: 'targeting', render: (text: string) => <Text type="secondary">{text}</Text> },
  { title: 'Updated', dataIndex: 'updated', key: 'updated', render: (text: string) => <Text type="secondary">{text}</Text> },
];

function FeatureManagementContent() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Feature Management</Title>
      <Card
        title={<Space><FlagOutlined /><span>Feature Flags</span></Space>}
        extra={<Text type="secondary">{FLAGS_DATA.length} flags</Text>}
      >
        <Table dataSource={FLAGS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}

export function FeatureManagementPage() {
  const isEnabled = useFeatureFlag('enableFeatureManagement');

  return isEnabled ? (
    <FeatureManagementContent />
  ) : (
    <FeaturePreview
      icon={<FlagOutlined />}
      title="Feature Management"
      subtitle="Ship features with confidence"
      description="Control feature rollouts, run experiments, and manage configurations across all your applications from a single control plane."
      features={[
        'Boolean, string, and number feature flags',
        'Percentage-based gradual rollouts',
        'User targeting and audience segmentation',
        'Real-time flag updates without deployments',
        'Experiment tracking and A/B testing',
      ]}
      tier="Team"
      demoUrl="https://cloudbees.navattic.com/0gh02s0"
    />
  );
}
