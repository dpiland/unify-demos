/**
 * UpgradeOfferCard Component
 *
 * Cabin upgrade promotion with 3 style variants for A/B testing:
 * - 'subtle': Small banner at bottom
 * - 'prominent': Large card with benefits (default)
 * - 'modal': Full-screen modal with comparison (simplified for MVP)
 *
 * USAGE:
 * ```tsx
 * <UpgradeOfferCard
 *   style="prominent"
 *   currentClass="economy"
 *   upgradePrice={149}
 * />
 * ```
 */

import { Button, Space, Tag, Typography, Divider } from 'antd';
import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

interface UpgradeOfferCardProps {
  style: 'subtle' | 'prominent' | 'modal';
  currentClass?: string;
  upgradePrice?: number;
}

/**
 * UpgradeOfferCard Component
 *
 * PATTERN: A/B testing with 3 presentation variants
 * USE CASE: Optimize cabin upgrade conversion rates
 * CONTROLLED BY: upgradePromptStyle string flag
 * TARGET: Only shown to non-business class passengers
 */
export function UpgradeOfferCard({
  style,
  currentClass = 'economy',
  upgradePrice = 149,
}: UpgradeOfferCardProps) {
  // ============================================
  // SUBTLE VARIANT - Small Banner
  // ============================================
  if (style === 'subtle') {
    return (
      <div
        style={{
          backgroundColor: '#fff7e6',
          border: '1px solid #ffd591',
          borderRadius: 6,
          padding: 12,
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <ArrowUpOutlined style={{ color: '#faad14' }} />
            <Text strong style={{ fontSize: 13 }}>
              Upgrade to Business Class from ${upgradePrice}
            </Text>
          </Space>
          <Button type="link" size="small">
            Learn More
          </Button>
        </Space>
      </div>
    );
  }

  // ============================================
  // MODAL VARIANT - Simplified as Large Card
  // ============================================
  // Note: For MVP, showing as prominent card. In production, would use Ant Design Modal
  if (style === 'modal') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 12,
          padding: 24,
          color: '#fff',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <CrownOutlined style={{ fontSize: 48, marginBottom: 12, display: 'block' }} />
            <Title level={3} style={{ color: '#fff', margin: 0 }}>
              Upgrade Your Experience
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15 }}>
              Fly business class and enjoy premium comfort
            </Text>
          </div>

          <Divider style={{ borderColor: 'rgba(255,255,255,0.3)', margin: 0 }} />

          {/* Benefits comparison */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 8 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Current: {currentClass}</Text>
                <Text style={{ color: '#fff' }} strong>
                  → Business Class
                </Text>
              </div>

              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {[
                  'Priority Boarding',
                  'Extra Legroom',
                  'Premium Meals',
                  'Lounge Access',
                  'Priority Baggage',
                ].map((benefit) => (
                  <Space key={benefit}>
                    <CheckCircleOutlined style={{ color: '#95de64' }} />
                    <Text style={{ color: '#fff', fontSize: 13 }}>{benefit}</Text>
                  </Space>
                ))}
              </Space>
            </Space>
          </div>

          {/* Price and CTA */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 12 }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                Starting from
              </Text>
              <br />
              <Text strong style={{ color: '#fff', fontSize: 32 }}>
                ${upgradePrice}
              </Text>
            </div>

            <Button
              type="primary"
              size="large"
              block
              icon={<ThunderboltOutlined />}
              style={{ backgroundColor: '#fff', borderColor: '#fff', color: '#667eea' }}
            >
              Upgrade Now
            </Button>
          </div>
        </Space>
      </div>
    );
  }

  // ============================================
  // PROMINENT VARIANT - Default Large Card
  // ============================================
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Header */}
        <div>
          <Space>
            <CrownOutlined style={{ fontSize: 24, color: '#faad14' }} />
            <Title level={4} style={{ margin: 0 }}>
              Upgrade to Business Class
            </Title>
          </Space>
          <Tag color="gold" style={{ marginTop: 8 }}>
            Limited Availability
          </Tag>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* Benefits grid */}
        <div>
          <Text strong style={{ marginBottom: 12, display: 'block' }}>
            Premium Benefits Included:
          </Text>

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Priority boarding and baggage handling</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Spacious seats with extra legroom</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Premium meal service and beverages</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Complimentary airport lounge access</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Enhanced entertainment system</Text>
            </Space>
          </Space>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* Pricing */}
        <div
          style={{
            backgroundColor: '#f0f2f5',
            padding: 16,
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <Space direction="vertical" size="small" align="center">
            <Text type="secondary">Upgrade from {currentClass} for only</Text>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              ${upgradePrice}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              per passenger • one-time fee
            </Text>
          </Space>
        </div>

        {/* CTA Button */}
        <Button
          type="primary"
          size="large"
          block
          icon={<ArrowUpOutlined />}
          style={{ height: 48 }}
        >
          Upgrade My Flight
        </Button>

        {/* Footer */}
        <Paragraph type="secondary" style={{ fontSize: 11, textAlign: 'center', marginBottom: 0 }}>
          Subject to availability. Upgrade offer valid for this flight only.
        </Paragraph>
      </Space>
    </div>
  );
}
