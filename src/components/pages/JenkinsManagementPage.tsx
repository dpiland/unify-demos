/**
 * JenkinsManagementPage — Jenkins controller management
 */

import { Card, Table, Tag, Typography, Space, Badge } from 'antd';

const { Title, Text } = Typography;

const JENKINS_DATA = [
  { key: '1', name: 'jenkins-prod-01', version: '2.462.1', status: 'Online', agents: 12, jobs: 84, uptime: '99.9%' },
  { key: '2', name: 'jenkins-staging-01', version: '2.462.1', status: 'Online', agents: 6, jobs: 52, uptime: '99.7%' },
  { key: '3', name: 'jenkins-dev-01', version: '2.460.3', status: 'Online', agents: 4, jobs: 38, uptime: '98.5%' },
  { key: '4', name: 'jenkins-perf-01', version: '2.462.1', status: 'Offline', agents: 0, jobs: 15, uptime: '—' },
  { key: '5', name: 'jenkins-eu-01', version: '2.462.1', status: 'Online', agents: 8, jobs: 61, uptime: '99.8%' },
];

const STATUS_MAP: Record<string, { color: string; status: 'success' | 'error' | 'default' }> = {
  Online: { color: 'green', status: 'success' },
  Offline: { color: 'red', status: 'error' },
};

const columns = [
  { title: 'Controller', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Version', dataIndex: 'version', key: 'version', render: (text: string) => <Text code>{text}</Text> },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => (
      <Space>
        <Badge status={STATUS_MAP[s]?.status || 'default'} />
        <Tag color={STATUS_MAP[s]?.color || 'default'}>{s}</Tag>
      </Space>
    ),
  },
  { title: 'Agents', dataIndex: 'agents', key: 'agents' },
  { title: 'Jobs', dataIndex: 'jobs', key: 'jobs' },
  { title: 'Uptime', dataIndex: 'uptime', key: 'uptime' },
];

export function JenkinsManagementPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Jenkins Management</Title>
      <Card
        title="Jenkins Controllers"
        extra={<Text type="secondary">{JENKINS_DATA.length} controllers</Text>}
      >
        <Table dataSource={JENKINS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
