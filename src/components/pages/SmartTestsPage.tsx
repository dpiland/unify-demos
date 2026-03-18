/**
 * SmartTestsPage — Flag-gated
 *
 * PATTERN: Boolean flag -> two-state page
 * When enableSmartTests is ON: shows test intelligence dashboard
 * When OFF: shows FeaturePreview marketing page
 */

import { Card, Col, Row, Statistic, Table, Tag, Typography, Space } from 'antd';
import { ExperimentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { FeaturePreview } from '../FeaturePreview';

const { Title, Text } = Typography;

const TESTS_DATA = [
  { key: '1', suite: 'api-gateway/integration', total: 342, selected: 87, skipped: 255, timeSaved: '12m 30s', status: 'Passed' },
  { key: '2', suite: 'user-service/unit', total: 1204, selected: 312, skipped: 892, timeSaved: '8m 45s', status: 'Passed' },
  { key: '3', suite: 'web-frontend/e2e', total: 89, selected: 34, skipped: 55, timeSaved: '22m 10s', status: 'Failed' },
  { key: '4', suite: 'payment-processor/unit', total: 567, selected: 145, skipped: 422, timeSaved: '5m 20s', status: 'Passed' },
  { key: '5', suite: 'notification-svc/integration', total: 156, selected: 42, skipped: 114, timeSaved: '7m 15s', status: 'Passed' },
  { key: '6', suite: 'data-pipeline/regression', total: 234, selected: 98, skipped: 136, timeSaved: '15m 40s', status: 'Flaky' },
];

const STATUS_COLORS: Record<string, string> = {
  Passed: 'green',
  Failed: 'red',
  Flaky: 'orange',
};

const columns = [
  { title: 'Test Suite', dataIndex: 'suite', key: 'suite', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Total Tests', dataIndex: 'total', key: 'total' },
  { title: 'Selected', dataIndex: 'selected', key: 'selected', render: (n: number) => <Text style={{ color: '#1890ff' }}>{n}</Text> },
  { title: 'Skipped', dataIndex: 'skipped', key: 'skipped', render: (n: number) => <Text type="secondary">{n}</Text> },
  { title: 'Time Saved', dataIndex: 'timeSaved', key: 'timeSaved', render: (text: string) => <Text style={{ color: '#52c41a' }}>{text}</Text> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_COLORS[s]}>{s}</Tag> },
];

function SmartTestsContent() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Smart Tests</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Tests Analyzed" value={2592} prefix={<ExperimentOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Tests Selected" value={718} valueStyle={{ color: '#1890ff' }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Time Saved" value="71m 40s" valueStyle={{ color: '#52c41a' }} prefix={<ThunderboltOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Selection Rate" value={27.7} suffix="%" /></Card>
        </Col>
      </Row>

      <Card
        title={<Space><ExperimentOutlined /><span>Test Intelligence</span></Space>}
        extra={<Text type="secondary">{TESTS_DATA.length} suites</Text>}
      >
        <Table dataSource={TESTS_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}

export function SmartTestsPage() {
  const isEnabled = useFeatureFlag('enableSmartTests');

  return isEnabled ? (
    <SmartTestsContent />
  ) : (
    <FeaturePreview
      icon={<ExperimentOutlined />}
      title="Smart Tests"
      subtitle="Run only the tests that matter"
      description="ML-powered test intelligence that analyzes code changes to select only the relevant tests, dramatically reducing CI time without sacrificing quality."
      features={[
        'AI-powered test selection based on code changes',
        'Flaky test detection and quarantine',
        'Test impact analysis and coverage insights',
        'Up to 80% reduction in test execution time',
        'Historical test analytics and trends',
      ]}
      tier="Enterprise"
    />
  );
}
