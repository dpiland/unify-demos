/**
 * AuditHistoryPage — Audit log
 */

import { Card, Table, Tag, Typography, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AUDIT_DATA = [
  { key: '1', timestamp: '2026-03-17 14:32:10', user: 'sam.enterprise', action: 'Updated', resource: 'Pipeline: api-gateway/build', details: 'Modified build step configuration' },
  { key: '2', timestamp: '2026-03-17 14:15:44', user: 'jordan.team', action: 'Created', resource: 'Environment: staging-us-west', details: 'New staging environment' },
  { key: '3', timestamp: '2026-03-17 13:58:22', user: 'sam.enterprise', action: 'Deleted', resource: 'Secret: old-api-key', details: 'Removed deprecated secret' },
  { key: '4', timestamp: '2026-03-17 12:45:00', user: 'alex.free', action: 'Viewed', resource: 'Dashboard: Analytics', details: 'Accessed DORA metrics' },
  { key: '5', timestamp: '2026-03-17 11:30:15', user: 'jordan.team', action: 'Updated', resource: 'Flag: enableFeatureManagement', details: 'Changed targeting rules' },
  { key: '6', timestamp: '2026-03-17 10:12:33', user: 'sam.enterprise', action: 'Created', resource: 'Component: ml-inference', details: 'Registered new component' },
  { key: '7', timestamp: '2026-03-16 16:45:00', user: 'jordan.team', action: 'Updated', resource: 'Pipeline: user-service/deploy', details: 'Added approval gate' },
  { key: '8', timestamp: '2026-03-16 15:20:10', user: 'sam.enterprise', action: 'Created', resource: 'Integration: GitHub', details: 'Connected bigcorp/monorepo' },
];

const ACTION_COLORS: Record<string, string> = {
  Created: 'green',
  Updated: 'blue',
  Deleted: 'red',
  Viewed: 'default',
};

const columns = [
  { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', render: (text: string) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text> },
  { title: 'User', dataIndex: 'user', key: 'user', render: (text: string) => <Text code>{text}</Text> },
  { title: 'Action', dataIndex: 'action', key: 'action', render: (a: string) => <Tag color={ACTION_COLORS[a]}>{a}</Tag> },
  { title: 'Resource', dataIndex: 'resource', key: 'resource', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Details', dataIndex: 'details', key: 'details', render: (text: string) => <Text type="secondary">{text}</Text> },
];

export function AuditHistoryPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Audit History</Title>
      <Card
        title={<Space><FileSearchOutlined /><span>Activity Log</span></Space>}
        extra={<Text type="secondary">{AUDIT_DATA.length} events</Text>}
      >
        <Table dataSource={AUDIT_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
