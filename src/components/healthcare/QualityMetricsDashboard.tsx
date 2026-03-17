/**
 * QualityMetricsDashboard Component
 *
 * Analytics dashboard with quality measures, population health breakdown,
 * and provider performance. Uses only Ant Design Progress + Statistic — no charting library.
 *
 * FEATURE FLAG: qualityDashboardView (string) — 'scorecard' | 'detailed' | 'compact'
 */

import { Card, Col, Divider, Progress, Row, Space, Statistic, Tag, Typography } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

// Quality measure data
const QUALITY_MEASURES = [
  { label: 'Readmission Rate', value: 4.2, target: 5.0, unit: '%', color: '#10b981', trend: 'down', trendValue: '0.8%' },
  { label: 'Patient Satisfaction', value: 92, target: 90, unit: '%', color: '#0891b2', trend: 'up', trendValue: '3%' },
  { label: 'Avg Wait Time', value: 12, target: 15, unit: 'min', color: '#f59e0b', trend: 'down', trendValue: '2 min' },
  { label: 'Infection Rate', value: 0.8, target: 1.0, unit: '%', color: '#8b5cf6', trend: 'down', trendValue: '0.3%' },
];

// Population health data
const POPULATION_HEALTH = [
  { condition: 'Type 2 Diabetes', count: 186, total: 600, color: '#ef4444' },
  { condition: 'Hypertension', count: 234, total: 600, color: '#f59e0b' },
  { condition: 'Heart Failure', count: 78, total: 600, color: '#8b5cf6' },
  { condition: 'COPD', count: 45, total: 600, color: '#0891b2' },
  { condition: 'Obesity (BMI > 30)', count: 162, total: 600, color: '#10b981' },
];

// Provider performance
const PROVIDER_STATS = [
  { label: 'Encounters This Month', value: 342, suffix: '', prefix: '' },
  { label: 'Avg Documentation Time', value: 8.5, suffix: ' min', prefix: '' },
  { label: 'Care Gaps Closed', value: 87, suffix: '%', prefix: '' },
  { label: 'On-Time Rate', value: 94, suffix: '%', prefix: '' },
];

function ScorecardView() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Quality Measures — circular progress rings */}
      <Row gutter={[16, 16]}>
        {QUALITY_MEASURES.map((measure) => {
          const percent = measure.unit === '%'
            ? (measure.value / 100) * 100
            : Math.min((measure.target / measure.value) * 100, 100);
          const meetsTarget = measure.label === 'Patient Satisfaction' || measure.label === 'Care Gaps Closed'
            ? measure.value >= measure.target
            : measure.value <= measure.target;

          return (
            <Col xs={12} sm={6} key={measure.label}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <Progress
                  type="dashboard"
                  percent={Math.round(percent)}
                  strokeColor={meetsTarget ? measure.color : '#ef4444'}
                  format={() => (
                    <span style={{ fontSize: 18, fontWeight: 600 }}>
                      {measure.value}{measure.unit === '%' ? '%' : ''}
                    </span>
                  )}
                  size={100}
                />
                <div style={{ marginTop: 8 }}>
                  <Text strong style={{ fontSize: 13 }}>{measure.label}</Text>
                  <br />
                  <Space size={4}>
                    <Text type="secondary" style={{ fontSize: 11 }}>Target: {measure.target}{measure.unit}</Text>
                    <Tag
                      color={measure.trend === 'down' && measure.label !== 'Patient Satisfaction' ? 'green' : measure.trend === 'up' && measure.label === 'Patient Satisfaction' ? 'green' : 'red'}
                      style={{ fontSize: 10, lineHeight: '16px' }}
                    >
                      {measure.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />} {measure.trendValue}
                    </Tag>
                  </Space>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Provider Quick Stats */}
      <Card size="small" title={<Space><TeamOutlined style={{ color: '#0891b2' }} /> Provider Performance</Space>}>
        <Row gutter={[16, 16]}>
          {PROVIDER_STATS.map((stat) => (
            <Col xs={12} sm={6} key={stat.label}>
              <Statistic
                title={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ fontSize: 22, fontWeight: 600, color: '#0e7490' }}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
}

function DetailedView() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Quality Measures with full detail */}
      <Card size="small" title={<Space><CheckCircleOutlined style={{ color: '#10b981' }} /> Quality Measures (CMS Compliance)</Space>}>
        <Row gutter={[16, 16]}>
          {QUALITY_MEASURES.map((measure) => {
            const percent = measure.unit === '%'
              ? (measure.value / 100) * 100
              : Math.min((measure.target / measure.value) * 100, 100);
            const meetsTarget = measure.label === 'Patient Satisfaction'
              ? measure.value >= measure.target
              : measure.value <= measure.target;

            return (
              <Col xs={12} sm={6} key={measure.label}>
                <div style={{ textAlign: 'center' }}>
                  <Progress
                    type="circle"
                    percent={Math.round(percent)}
                    strokeColor={meetsTarget ? measure.color : '#ef4444'}
                    format={() => `${measure.value}${measure.unit}`}
                    size={90}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong style={{ fontSize: 13 }}>{measure.label}</Text>
                    <br />
                    <Tag color={meetsTarget ? 'green' : 'red'} style={{ fontSize: 10 }}>
                      {meetsTarget ? 'Meeting Target' : 'Below Target'}
                    </Tag>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* Population Health */}
      <Card size="small" title={<Space><HeartOutlined style={{ color: '#ef4444' }} /> Population Health Breakdown</Space>}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {POPULATION_HEALTH.map((item) => (
            <div key={item.condition}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 13 }}>{item.condition}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{item.count} / {item.total} patients ({Math.round((item.count / item.total) * 100)}%)</Text>
              </div>
              <Progress
                percent={Math.round((item.count / item.total) * 100)}
                strokeColor={item.color}
                showInfo={false}
                size="small"
              />
            </div>
          ))}
        </Space>
      </Card>

      {/* Provider Performance */}
      <Card size="small" title={<Space><TeamOutlined style={{ color: '#0891b2' }} /> Provider Performance</Space>}>
        <Row gutter={[16, 16]}>
          {PROVIDER_STATS.map((stat) => (
            <Col xs={12} sm={6} key={stat.label}>
              <Statistic
                title={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ fontSize: 22, fontWeight: 600, color: '#0e7490' }}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
}

function CompactView() {
  return (
    <Card size="small">
      <Row gutter={[24, 12]} align="middle">
        {QUALITY_MEASURES.map((measure) => {
          const meetsTarget = measure.label === 'Patient Satisfaction'
            ? measure.value >= measure.target
            : measure.value <= measure.target;

          return (
            <Col xs={12} sm={6} key={measure.label}>
              <Space direction="vertical" size={2}>
                <Text type="secondary" style={{ fontSize: 11 }}>{measure.label}</Text>
                <Space size={8} align="center">
                  <Text strong style={{ fontSize: 20, color: meetsTarget ? '#10b981' : '#ef4444' }}>
                    {measure.value}{measure.unit}
                  </Text>
                  <Tag
                    color={meetsTarget ? 'green' : 'red'}
                    style={{ fontSize: 10, lineHeight: '16px' }}
                  >
                    {measure.trend === 'down' ? <ArrowDownOutlined /> : <ArrowUpOutlined />} {measure.trendValue}
                  </Tag>
                </Space>
              </Space>
            </Col>
          );
        })}
      </Row>
      <Divider style={{ margin: '12px 0' }} />
      <Row gutter={[24, 8]}>
        {PROVIDER_STATS.map((stat) => (
          <Col xs={12} sm={6} key={stat.label}>
            <Text type="secondary" style={{ fontSize: 11 }}>{stat.label}</Text>
            <br />
            <Text strong style={{ fontSize: 16 }}>{stat.value}{stat.suffix}</Text>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

interface QualityMetricsDashboardProps {
  viewMode: string;
}

export function QualityMetricsDashboard({ viewMode }: QualityMetricsDashboardProps) {
  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Title level={5} style={{ margin: 0 }}>Quality Metrics</Title>
          <Tag color="cyan">{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</Tag>
        </Space>
        <Space>
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <Text type="secondary" style={{ fontSize: 12 }}>Updated 5 min ago</Text>
        </Space>
      </div>

      {viewMode === 'detailed' ? <DetailedView /> :
       viewMode === 'compact' ? <CompactView /> :
       <ScorecardView />}
    </div>
  );
}
