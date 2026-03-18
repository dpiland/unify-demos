/**
 * RunsPage — Pipeline runs list
 */

import { Card, Table, Tag, Typography, Space } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const RUNS_DATA = [
  { key: '1', pipeline: 'api-gateway / build', status: 'Passed', duration: '2m 34s', trigger: 'Push to main', started: '10 min ago' },
  { key: '2', pipeline: 'web-frontend / build', status: 'Failed', duration: '1m 12s', trigger: 'PR #142', started: '25 min ago' },
  { key: '3', pipeline: 'user-service / deploy', status: 'Running', duration: '—', trigger: 'Manual', started: '2 min ago' },
  { key: '4', pipeline: 'payment-processor / test', status: 'Passed', duration: '4m 56s', trigger: 'Push to main', started: '1 hour ago' },
  { key: '5', pipeline: 'notification-svc / build', status: 'Passed', duration: '1m 45s', trigger: 'Push to develop', started: '2 hours ago' },
  { key: '6', pipeline: 'data-pipeline / deploy', status: 'Passed', duration: '3m 22s', trigger: 'Schedule', started: '3 hours ago' },
  { key: '7', pipeline: 'ml-inference / build', status: 'Failed', duration: '5m 10s', trigger: 'PR #138', started: '4 hours ago' },
  { key: '8', pipeline: 'config-service / test', status: 'Passed', duration: '0m 48s', trigger: 'Push to main', started: '5 hours ago' },
  { key: '9', pipeline: 'api-gateway / deploy', status: 'Passed', duration: '2m 10s', trigger: 'Manual', started: '6 hours ago' },
  { key: '10', pipeline: 'web-frontend / test', status: 'Passed', duration: '3m 05s', trigger: 'PR #140', started: '7 hours ago' },
];

const STATUS_COLORS: Record<string, string> = {
  Passed: 'green',
  Failed: 'red',
  Running: 'blue',
};

const columns = [
  { title: 'Pipeline', dataIndex: 'pipeline', key: 'pipeline', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_COLORS[s]}>{s}</Tag> },
  { title: 'Duration', dataIndex: 'duration', key: 'duration' },
  { title: 'Trigger', dataIndex: 'trigger', key: 'trigger', render: (text: string) => <Text type="secondary">{text}</Text> },
  { title: 'Started', dataIndex: 'started', key: 'started', render: (text: string) => <Text type="secondary">{text}</Text> },
];

export function RunsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Runs</Title>
      <Card
        title={<Space><PlayCircleOutlined /><span>Pipeline Runs</span></Space>}
        extra={<Text type="secondary">{RUNS_DATA.length} recent runs</Text>}
      >
        <Table dataSource={RUNS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
