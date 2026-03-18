/**
 * SupportTierCard Component
 *
 * Displays support options and SLA information based on the planTier
 * string flag. Demonstrates how a string flag can drive UI content.
 *
 * PATTERN: String flag -> content switching
 * Reads planTier from useFeatureFlagString('planTier') in the parent
 * and receives it as a prop.
 */

import { Card, Space, Typography, Tag, Button } from 'antd';
import {
  CustomerServiceOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CrownOutlined,
  MessageOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface SupportTierCardProps {
  tier: string;
}

const TIER_CONFIG: Record<string, {
  label: string;
  color: string;
  sla: string;
  channels: { icon: React.ReactNode; label: string }[];
  description: string;
}> = {
  free: {
    label: 'Community',
    color: 'default',
    sla: 'No SLA',
    channels: [
      { icon: <MessageOutlined />, label: 'Community forums' },
    ],
    description: 'Access community forums and documentation. Upgrade for dedicated support.',
  },
  team: {
    label: 'Team',
    color: 'blue',
    sla: '8hr response time',
    channels: [
      { icon: <MailOutlined />, label: 'Email support' },
      { icon: <MessageOutlined />, label: 'Community forums' },
    ],
    description: 'Business hours support with email access and priority ticket handling.',
  },
  enterprise: {
    label: 'Enterprise',
    color: 'gold',
    sla: '1hr critical / 4hr standard',
    channels: [
      { icon: <PhoneOutlined />, label: 'Phone support (24/7)' },
      { icon: <MailOutlined />, label: 'Priority email' },
      { icon: <CrownOutlined />, label: 'Dedicated CSM' },
      { icon: <MessageOutlined />, label: 'Slack connect' },
    ],
    description: '24/7 premium support with a dedicated Customer Success Manager and guaranteed SLAs.',
  },
};

export function SupportTierCard({ tier }: SupportTierCardProps) {
  const config = TIER_CONFIG[tier] || TIER_CONFIG.free;

  return (
    <Card
      title={
        <Space>
          <CustomerServiceOutlined />
          <span>Support & SLA</span>
          <Tag color={config.color}>{config.label}</Tag>
        </Space>
      }
      extra={
        tier !== 'enterprise' ? (
          <Button type="link" size="small">
            Upgrade
          </Button>
        ) : null
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Text type="secondary">{config.description}</Text>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
            <Text strong>SLA:</Text>
            <Text>{config.sla}</Text>
          </div>
        </div>

        <div>
          <Title level={5} style={{ marginBottom: 8 }}>Support Channels</Title>
          {config.channels.map((channel, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
                color: '#595959',
              }}
            >
              {channel.icon}
              <Text>{channel.label}</Text>
            </div>
          ))}
        </div>
      </Space>
    </Card>
  );
}
