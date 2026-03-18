/**
 * ConfigurationsPage — Environment configurations
 */

import { Card, Table, Tag, Typography, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CONFIG_DATA = [
  { key: '1', name: 'Production', region: 'us-east-1', status: 'Active', services: 8, lastDeploy: '2 hours ago' },
  { key: '2', name: 'Staging', region: 'us-east-1', status: 'Active', services: 8, lastDeploy: '30 min ago' },
  { key: '3', name: 'Development', region: 'us-west-2', status: 'Active', services: 6, lastDeploy: '10 min ago' },
  { key: '4', name: 'QA', region: 'eu-west-1', status: 'Active', services: 5, lastDeploy: '1 day ago' },
  { key: '5', name: 'Performance', region: 'us-west-2', status: 'Inactive', services: 4, lastDeploy: '5 days ago' },
  { key: '6', name: 'DR', region: 'eu-central-1', status: 'Standby', services: 8, lastDeploy: '3 days ago' },
];

const STATUS_COLORS: Record<string, string> = {
  Active: 'green',
  Inactive: 'default',
  Standby: 'orange',
};

const columns = [
  { title: 'Environment', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Region', dataIndex: 'region', key: 'region', render: (text: string) => <Text code>{text}</Text> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_COLORS[s]}>{s}</Tag> },
  { title: 'Services', dataIndex: 'services', key: 'services' },
  { title: 'Last Deploy', dataIndex: 'lastDeploy', key: 'lastDeploy', render: (text: string) => <Text type="secondary">{text}</Text> },
];

export function ConfigurationsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Configurations</Title>
      <Card
        title={<Space><SettingOutlined /><span>Environments</span></Space>}
        extra={<Text type="secondary">{CONFIG_DATA.length} environments</Text>}
      >
        <Table dataSource={CONFIG_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}
