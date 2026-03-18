/**
 * HomePage — Welcome / Quickstart page
 *
 * Main landing page showing quickstart cards, next steps,
 * and a plan-tier-aware support card.
 */

import { Card, Col, Row, Typography, Space, Button } from 'antd';
import {
  ApiOutlined,
  BuildOutlined,
  ScanOutlined,
  CloudUploadOutlined,
  LinkOutlined,
  TeamOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { SupportTierCard } from '../SupportTierCard';

const { Title, Text, Paragraph } = Typography;

interface HomePageProps {
  planTier: string;
}

const QUICKSTARTS = [
  {
    icon: <ApiOutlined style={{ fontSize: 32, color: '#8c8c8c' }} />,
    title: 'Connect',
    description: 'Set up an integration connecting a GitHub repository.',
  },
  {
    icon: <BuildOutlined style={{ fontSize: 32, color: '#8c8c8c' }} />,
    title: 'Build',
    description: 'Get a step-by-step guide for your build setup.',
  },
  {
    icon: <ScanOutlined style={{ fontSize: 32, color: '#8c8c8c' }} />,
    title: 'Scan',
    description: 'Add a step to your workflow to perform a security scan.',
  },
  {
    icon: <CloudUploadOutlined style={{ fontSize: 32, color: '#8c8c8c' }} />,
    title: 'Publish',
    description: 'Add a step to publish your first image.',
  },
];

const NEXT_STEPS = [
  {
    icon: <LinkOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />,
    title: 'Connect a source code repository',
    description: 'Create an integration to connect your repository to CloudBees.',
    action: 'Create integration',
  },
  {
    icon: <TeamOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />,
    title: 'Invite a friend',
    description: 'Share the workflow magic and invite a teammate.',
    action: 'Invite users',
  },
  {
    icon: <RocketOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />,
    title: 'Upgrade to paid',
    description: 'For teams scaling up and branching out, our premium plan awaits.',
    action: 'Upgrade now',
  },
];

export function HomePage({ planTier }: HomePageProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={2} style={{ marginBottom: 4 }}>Welcome to Unify</Title>
        <Paragraph type="secondary">There's no place like $HOME.</Paragraph>
      </div>

      {/* Quickstarts */}
      <div>
        <Title level={4}>Quickstarts</Title>
        <Row gutter={[16, 16]}>
          {QUICKSTARTS.map((item) => (
            <Col xs={24} sm={12} lg={6} key={item.title}>
              <Card
                hoverable
                style={{ height: '100%' }}
              >
                <Space direction="vertical" size="small">
                  {item.icon}
                  <Title level={5} style={{ marginBottom: 0 }}>{item.title}</Title>
                  <Text type="secondary" style={{ fontSize: 13 }}>{item.description}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Next Steps */}
      <div>
        <Title level={4}>Next steps</Title>
        <Row gutter={[16, 16]}>
          {NEXT_STEPS.map((item) => (
            <Col xs={24} sm={8} key={item.title}>
              <Card style={{ height: '100%' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {item.icon}
                  <div>
                    <Title level={5} style={{ marginBottom: 4 }}>{item.title}</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>{item.description}</Text>
                  </div>
                  <Button type="primary" size="small">{item.action}</Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Support Tier */}
      <SupportTierCard tier={planTier} />
    </Space>
  );
}
