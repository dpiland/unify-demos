/**
 * FeaturePreview Component
 *
 * Marketing/upgrade page shown when a platform module is not available
 * on the user's current plan. Displays a rich preview with feature
 * highlights, an optional embedded click-through demo, and an upgrade CTA.
 *
 * Used by all 4 flag-gated pages (Feature Management, Applications,
 * Security, Smart Tests) when their boolean flag is OFF.
 */

import { Button, Card, Space, Typography } from 'antd';
import { CheckCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

const { Title, Text, Paragraph } = Typography;

interface FeaturePreviewProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tier?: string;
  demoUrl?: string;
}

export function FeaturePreview({
  icon,
  title,
  subtitle,
  description,
  features,
  tier = 'Team',
  demoUrl,
}: FeaturePreviewProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
      {/* Info Card */}
      <Card
        style={{
          maxWidth: 700,
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Hero Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: 36,
              color: '#1890ff',
            }}
          >
            {icon}
          </div>

          {/* Headline */}
          <div>
            <Title level={2} style={{ marginBottom: 4 }}>
              {title}
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {subtitle}
            </Text>
          </div>

          {/* Description */}
          <Paragraph style={{ fontSize: 15, color: '#595959', maxWidth: 480, margin: '0 auto' }}>
            {description}
          </Paragraph>

          {/* Feature List */}
          <div style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16, marginTop: 3 }} />
                <Text style={{ fontSize: 14 }}>{feature}</Text>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ paddingTop: 8 }}>
            <Button type="primary" size="large" style={{ minWidth: 200 }}>
              Upgrade to {tier}
            </Button>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Available on {tier} and above
              </Text>
            </div>
          </div>
        </Space>
      </Card>

      {/* Embedded Click-Through Demo */}
      {demoUrl && (
        <Card
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            width: '100%',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}
          title={
            <Space>
              <PlayCircleOutlined style={{ color: '#1890ff' }} />
              <span>Interactive Demo</span>
            </Space>
          }
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#f5f5f5',
            }}
          >
            <iframe
              src={demoUrl}
              title={`${title} interactive demo`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="fullscreen"
            />
          </div>
        </Card>
      )}
    </Space>
  );
}
