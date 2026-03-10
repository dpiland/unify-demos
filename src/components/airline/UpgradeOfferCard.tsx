/**
 * UpgradeOfferCard Component
 *
 * Delta cabin upgrade promotion with 3 style variants for A/B testing:
 * - 'subtle': Small banner at bottom
 * - 'prominent': Large card with benefits (default)
 * - 'modal': Full-screen modal with comparison (simplified for MVP)
 *
 * USAGE:
 * ```tsx
 * <UpgradeOfferCard
 *   style="prominent"
 *   currentClass="main-cabin"
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
 * USE CASE: Optimize HiveAir Comfort+ and First Class upgrade conversion rates
 * CONTROLLED BY: upgradePromptStyle string flag
 * TARGET: Only shown to Main Cabin passengers
 */
export function UpgradeOfferCard({
  style,
  currentClass = 'main-cabin',
  upgradePrice = 149,
}: UpgradeOfferCardProps) {
  // ============================================
  // SUBTLE VARIANT - Small Banner
  // ============================================
  if (style === 'subtle') {
    return (
      <div
        style={{
          backgroundColor: '#FEF1F2',
          border: '1px solid #FCA5A5',
          borderRadius: 6,
          padding: 12,
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <ArrowUpOutlined style={{ color: '#D1232B' }} />
            <Text strong style={{ fontSize: 13 }}>
              Upgrade to HiveAir Comfort+ from ${upgradePrice}
            </Text>
          </Space>
          <Button type="link" size="small" style={{ color: '#D1232B' }}>
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
          background: 'linear-gradient(135deg, #8fa6d6 0%, #001F3D 100%)',
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
              Fly HiveAir Comfort+ and enjoy premium features
            </Text>
          </div>

          <Divider style={{ borderColor: 'rgba(255,255,255,0.3)', margin: 0 }} />

          {/* Benefits comparison */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 8 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Current: {currentClass}</Text>
                <Text style={{ color: '#fff' }} strong>
                  → HiveAir Comfort+
                </Text>
              </div>

              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {[
                  'Priority Boarding',
                  'Extra Legroom (up to 3")',
                  'Premium Snacks & Beverages',
                  'HiveAir Lounge Access',
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
              style={{ backgroundColor: '#D1232B', borderColor: '#D1232B', color: '#fff' }}
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
            <CrownOutlined style={{ fontSize: 24, color: '#D1232B' }} />
            <Title level={4} style={{ margin: 0 }}>
              Upgrade to HiveAir Comfort+
            </Title>
          </Space>
          <Tag color="red" style={{ marginTop: 8 }}>
            Limited Availability
          </Tag>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* Benefits grid */}
        <div>
          <Text strong style={{ marginBottom: 12, display: 'block' }}>
            HiveAir Comfort+ Benefits:
          </Text>

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Priority boarding and baggage handling</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Up to 3 inches of extra legroom</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Premium snacks and complimentary beverages</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Dedicated overhead bin space</Text>
            </Space>
            <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text>Enhanced entertainment options</Text>
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
            <Title level={2} style={{ margin: 0, color: '#8fa6d6' }}>
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
          style={{ height: 48, backgroundColor: '#8fa6d6', borderColor: '#8fa6d6' }}
        >
          Upgrade My Flight
        </Button>

        {/* Footer */}
        <Paragraph type="secondary" style={{ fontSize: 11, textAlign: 'center', marginBottom: 0 }}>
          Subject to availability. Upgrade offer valid for this HiveAir flight only.
        </Paragraph>
      </Space>
    </div>
  );
}
