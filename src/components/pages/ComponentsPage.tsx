/**
 * ComponentsPage — Software components/services registry
 */

import { Card, Table, Tag, Typography, Space } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const COMPONENTS_DATA = [
  { key: '1', name: 'api-gateway', language: 'Go', lastBuild: 'Passed', branch: 'main', updated: '2 hours ago' },
  { key: '2', name: 'user-service', language: 'Java', lastBuild: 'Passed', branch: 'main', updated: '3 hours ago' },
  { key: '3', name: 'web-frontend', language: 'TypeScript', lastBuild: 'Failed', branch: 'feature/auth', updated: '1 hour ago' },
  { key: '4', name: 'payment-processor', language: 'Python', lastBuild: 'Passed', branch: 'main', updated: '5 hours ago' },
  { key: '5', name: 'notification-svc', language: 'Node.js', lastBuild: 'Running', branch: 'develop', updated: '30 min ago' },
  { key: '6', name: 'data-pipeline', language: 'Scala', lastBuild: 'Passed', branch: 'main', updated: '1 day ago' },
  { key: '7', name: 'ml-inference', language: 'Python', lastBuild: 'Passed', branch: 'main', updated: '6 hours ago' },
  { key: '8', name: 'config-service', language: 'Go', lastBuild: 'Passed', branch: 'main', updated: '2 days ago' },
];

const STATUS_COLORS: Record<string, string> = {
  Passed: 'green',
  Failed: 'red',
  Running: 'blue',
};

const columns = [
  { title: 'Component', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Language', dataIndex: 'language', key: 'language' },
  { title: 'Last Build', dataIndex: 'lastBuild', key: 'lastBuild', render: (status: string) => <Tag color={STATUS_COLORS[status]}>{status}</Tag> },
  { title: 'Branch', dataIndex: 'branch', key: 'branch', render: (text: string) => <Text code>{text}</Text> },
  { title: 'Updated', dataIndex: 'updated', key: 'updated', render: (text: string) => <Text type="secondary">{text}</Text> },
];

export function ComponentsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Components</Title>
      <Card
        title={<Space><AppstoreOutlined /><span>Software Components</span></Space>}
        extra={<Text type="secondary">{COMPONENTS_DATA.length} components</Text>}
      >
        <Table dataSource={COMPONENTS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
