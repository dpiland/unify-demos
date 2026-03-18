/**
 * SecurityPage — Flag-gated
 *
 * PATTERN: Boolean flag -> two-state page
 * When enableSecurity is ON: shows vulnerability dashboard
 * When OFF: shows FeaturePreview marketing page
 */

import { Card, Col, Row, Statistic, Table, Tag, Typography, Space } from 'antd';
import { SafetyCertificateOutlined, BugOutlined } from '@ant-design/icons';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { FeaturePreview } from '../FeaturePreview';

const { Title, Text } = Typography;

const VULN_DATA = [
  { key: '1', cve: 'CVE-2026-1234', severity: 'Critical', component: 'openssl 3.0.8', service: 'api-gateway', status: 'Open', found: '1 day ago' },
  { key: '2', cve: 'CVE-2026-5678', severity: 'High', component: 'log4j 2.17.0', service: 'user-service', status: 'In Progress', found: '3 days ago' },
  { key: '3', cve: 'CVE-2026-9012', severity: 'Medium', component: 'express 4.18.2', service: 'web-frontend', status: 'Open', found: '1 week ago' },
  { key: '4', cve: 'CVE-2026-3456', severity: 'Low', component: 'lodash 4.17.21', service: 'notification-svc', status: 'Resolved', found: '2 weeks ago' },
  { key: '5', cve: 'CVE-2026-7890', severity: 'High', component: 'jackson 2.14.1', service: 'payment-processor', status: 'In Progress', found: '2 days ago' },
  { key: '6', cve: 'CVE-2026-2345', severity: 'Medium', component: 'django 4.2.5', service: 'ml-inference', status: 'Open', found: '5 days ago' },
];

const SEVERITY_COLORS: Record<string, string> = {
  Critical: 'red',
  High: 'orange',
  Medium: 'gold',
  Low: 'blue',
};

const STATUS_COLORS: Record<string, string> = {
  Open: 'red',
  'In Progress': 'blue',
  Resolved: 'green',
};

const columns = [
  { title: 'CVE', dataIndex: 'cve', key: 'cve', render: (text: string) => <Text code>{text}</Text> },
  { title: 'Severity', dataIndex: 'severity', key: 'severity', render: (s: string) => <Tag color={SEVERITY_COLORS[s]}>{s}</Tag> },
  { title: 'Component', dataIndex: 'component', key: 'component' },
  { title: 'Service', dataIndex: 'service', key: 'service', render: (text: string) => <Text strong>{text}</Text> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={STATUS_COLORS[s]}>{s}</Tag> },
  { title: 'Found', dataIndex: 'found', key: 'found', render: (text: string) => <Text type="secondary">{text}</Text> },
];

function SecurityContent() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Security</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Critical" value={1} valueStyle={{ color: '#ff4d4f' }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="High" value={2} valueStyle={{ color: '#faad14' }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Medium" value={2} valueStyle={{ color: '#d4b106' }} /></Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card><Statistic title="Low" value={1} valueStyle={{ color: '#1890ff' }} /></Card>
        </Col>
      </Row>

      <Card
        title={<Space><BugOutlined /><span>Vulnerabilities</span></Space>}
        extra={<Text type="secondary">{VULN_DATA.length} findings</Text>}
      >
        <Table dataSource={VULN_DATA} columns={columns} pagination={false} size="small" />
      </Card>
    </Space>
  );
}

export function SecurityPage() {
  const isEnabled = useFeatureFlag('enableSecurity');

  return isEnabled ? (
    <SecurityContent />
  ) : (
    <FeaturePreview
      icon={<SafetyCertificateOutlined />}
      title="Security"
      subtitle="Shift security left in your pipeline"
      description="Integrate SAST and DAST scanning directly into your CI/CD workflows. Identify and remediate vulnerabilities before they reach production."
      features={[
        'Automated SAST and DAST scanning',
        'Vulnerability tracking and prioritization',
        'Compliance reporting and audit trails',
        'Integration with CI/CD pipelines',
        'Severity-based alerting and SLA tracking',
      ]}
      tier="Enterprise"
    />
  );
}
