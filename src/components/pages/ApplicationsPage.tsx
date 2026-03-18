/**
 * ApplicationsPage — Flag-gated
 *
 * PATTERN: Boolean flag -> two-state page
 * When enableApplications is ON: shows application registry
 * When OFF: shows FeaturePreview marketing page
 */

import { Card, Table, Tag, Typography, Space, Progress } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { FeaturePreview } from '../FeaturePreview';

const { Title, Text } = Typography;

const APPS_DATA = [
  { key: '1', name: 'E-Commerce Platform', environments: ['prod', 'staging', 'dev'], deployments: 142, health: 98, lastDeploy: '2 hours ago' },
  { key: '2', name: 'Mobile API', environments: ['prod', 'staging'], deployments: 89, health: 95, lastDeploy: '4 hours ago' },
  { key: '3', name: 'Admin Dashboard', environments: ['prod', 'staging', 'dev'], deployments: 67, health: 100, lastDeploy: '1 day ago' },
  { key: '4', name: 'Data Processing Pipeline', environments: ['prod'], deployments: 34, health: 87, lastDeploy: '6 hours ago' },
  { key: '5', name: 'Auth Service', environments: ['prod', 'staging', 'dev', 'qa'], deployments: 203, health: 99, lastDeploy: '30 min ago' },
  { key: '6', name: 'Notification Service', environments: ['prod', 'staging'], deployments: 56, health: 92, lastDeploy: '12 hours ago' },
];

const ENV_COLORS: Record<string, string> = {
  prod: 'red',
  staging: 'orange',
  dev: 'blue',
  qa: 'purple',
};

const columns = [
  { title: 'Application', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  {
    title: 'Environments', dataIndex: 'environments', key: 'environments',
    render: (envs: string[]) => envs.map(e => <Tag key={e} color={ENV_COLORS[e]}>{e}</Tag>),
  },
  { title: 'Deployments', dataIndex: 'deployments', key: 'deployments' },
  {
    title: 'Health', dataIndex: 'health', key: 'health',
    render: (h: number) => <Progress percent={h} size="small" status={h >= 95 ? 'success' : h >= 80 ? 'normal' : 'exception'} />,
  },
  { title: 'Last Deploy', dataIndex: 'lastDeploy', key: 'lastDeploy', render: (text: string) => <Text type="secondary">{text}</Text> },
];

function ApplicationsContent() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Applications</Title>
      <Card
        title={<Space><AppstoreAddOutlined /><span>Application Registry</span></Space>}
        extra={<Text type="secondary">{APPS_DATA.length} applications</Text>}
      >
        <Table dataSource={APPS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}

export function ApplicationsPage() {
  const isEnabled = useFeatureFlag('enableApplications');

  return isEnabled ? (
    <ApplicationsContent />
  ) : (
    <FeaturePreview
      icon={<AppstoreAddOutlined />}
      title="Applications"
      subtitle="Manage your entire application portfolio"
      description="Track deployments, monitor application health, and manage environments from a unified registry across your organization."
      features={[
        'Centralized application registry',
        'Multi-environment deployment tracking',
        'Application health monitoring',
        'Deployment history and rollback',
        'Environment promotion workflows',
      ]}
      tier="Team"
    />
  );
}
