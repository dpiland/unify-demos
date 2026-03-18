/**
 * AnalyticsPage — DORA metrics dashboard
 */

import { Card, Col, Row, Statistic, Typography, Space } from 'antd';
import {
  RocketOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ToolOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export function AnalyticsPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Analytics</Title>

      {/* DORA Metrics */}
      <Card title={<Space><BarChartOutlined /><span>DORA Metrics</span></Space>}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Deployment Frequency"
                value={12.4}
                suffix="/ day"
                prefix={<RocketOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <div style={{ marginTop: 8 }}>
                <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                <Text style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>18% from last week</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Lead Time for Changes"
                value={4.2}
                suffix="hours"
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <div style={{ marginTop: 8 }}>
                <ArrowDownOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                <Text style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>12% improvement</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Change Failure Rate"
                value={3.2}
                suffix="%"
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <div style={{ marginTop: 8 }}>
                <ArrowDownOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                <Text style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>Down from 4.8%</Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Mean Time to Recovery"
                value={28}
                suffix="min"
                prefix={<ToolOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
              <div style={{ marginTop: 8 }}>
                <ArrowDownOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                <Text style={{ color: '#52c41a', fontSize: 12, marginLeft: 4 }}>From 45 min</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Additional Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Pipeline Health" style={{ height: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Total Pipelines" value={47} />
              </Col>
              <Col span={12}>
                <Statistic title="Success Rate" value={94.6} suffix="%" valueStyle={{ color: '#52c41a' }} />
              </Col>
              <Col span={12}>
                <Statistic title="Avg. Duration" value="3m 24s" />
              </Col>
              <Col span={12}>
                <Statistic title="Runs Today" value={156} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Team Velocity" style={{ height: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="PRs Merged / Week" value={38} />
              </Col>
              <Col span={12}>
                <Statistic title="Avg. Review Time" value="2.1 hrs" />
              </Col>
              <Col span={12}>
                <Statistic title="Active Contributors" value={24} />
              </Col>
              <Col span={12}>
                <Statistic title="Code Coverage" value={82.3} suffix="%" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
