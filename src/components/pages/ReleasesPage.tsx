/**
 * ReleasesPage — Plan-gated (Team and Enterprise only)
 *
 * PATTERN: String flag (planTier) -> two-state page
 * When planTier is "team" or "enterprise": shows releases dashboard
 * When "free": shows FeaturePreview marketing page
 */

import { Card, Table, Tag, Typography, Space, Progress } from 'antd';
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { FeaturePreview } from '../FeaturePreview';

const { Title, Text } = Typography;

const RELEASES_DATA = [
  { key: '1', name: 'v2.14.0', status: 'Deployed', environment: 'production', components: 4, date: '2026-03-17', approver: 'sam.enterprise' },
  { key: '2', name: 'v2.14.1-rc.1', status: 'In Review', environment: 'staging', components: 2, date: '2026-03-17', approver: '—' },
  { key: '3', name: 'v2.13.5', status: 'Deployed', environment: 'production', components: 1, date: '2026-03-15', approver: 'jordan.team' },
  { key: '4', name: 'v2.13.4', status: 'Deployed', environment: 'production', components: 3, date: '2026-03-12', approver: 'sam.enterprise' },
  { key: '5', name: 'v2.13.3-hotfix', status: 'Rolled Back', environment: 'production', components: 1, date: '2026-03-10', approver: 'jordan.team' },
  { key: '6', name: 'v2.13.2', status: 'Deployed', environment: 'production', components: 5, date: '2026-03-08', approver: 'sam.enterprise' },
  { key: '7', name: 'v2.14.0-rc.2', status: 'Abandoned', environment: 'staging', components: 4, date: '2026-03-07', approver: '—' },
  { key: '8', name: 'v2.13.1', status: 'Deployed', environment: 'production', components: 2, date: '2026-03-05', approver: 'jordan.team' },
];

const STATUS_COLORS: Record<string, string> = {
  Deployed: 'green',
  'In Review': 'blue',
  'Rolled Back': 'red',
  Abandoned: 'default',
};

const columns = [
  { title: 'Release', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_COLORS[s]}>{s}</Tag> },
  { title: 'Environment', dataIndex: 'environment', key: 'environment', render: (text: string) => <Tag>{text}</Tag> },
  { title: 'Components', dataIndex: 'components', key: 'components' },
  { title: 'Date', dataIndex: 'date', key: 'date', render: (text: string) => <Text type="secondary">{text}</Text> },
  { title: 'Approved By', dataIndex: 'approver', key: 'approver', render: (text: string) => <Text code>{text}</Text> },
];

function ReleasesContent() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Releases</Title>

      <Card
        title={<Space><DeploymentUnitOutlined /><span>Release History</span></Space>}
        extra={<Text type="secondary">{RELEASES_DATA.length} releases</Text>}
      >
        <Table dataSource={RELEASES_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}

interface ReleasesPageProps {
  planTier: string;
}

export function ReleasesPage({ planTier }: ReleasesPageProps) {
  const hasAccess = planTier === 'team' || planTier === 'enterprise';

  return hasAccess ? (
    <ReleasesContent />
  ) : (
    <FeaturePreview
      icon={<DeploymentUnitOutlined />}
      title="Releases"
      subtitle="Orchestrate releases across environments"
      description="Coordinate multi-component releases with approval gates, rollback capabilities, and full audit trails across all your environments."
      features={[
        'Multi-component release orchestration',
        'Approval gates and sign-off workflows',
        'One-click rollback to any previous release',
        'Environment promotion pipelines',
        'Release notes and changelog generation',
      ]}
      tier="Team"
    />
  );
}
