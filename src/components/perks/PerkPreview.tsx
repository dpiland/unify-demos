/**
 * PerkPreview Component
 *
 * Horizontal strip showing Summit membership perks.
 * - Summit (VIP) members: green checkmarks — "You have this perk"
 * - Non-Summit members: lock icons — "Upgrade to unlock"
 *
 * Controlled by enablePerkPreview boolean flag.
 */

import { Typography, Button } from 'antd';
import {
  CheckCircleFilled,
  LockFilled,
  CrownOutlined,
  RocketOutlined,
  StarOutlined,
  GiftOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

interface Perk {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PERKS: Perk[] = [
  {
    icon: <RocketOutlined />,
    title: 'Free Shipping',
    description: 'Free standard shipping on every order, no minimum',
  },
  {
    icon: <StarOutlined />,
    title: 'Early Access',
    description: 'Shop new arrivals before they go live',
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Pro Pricing',
    description: 'Members-only pricing on select gear',
  },
  {
    icon: <GiftOutlined />,
    title: '2x Rewards',
    description: 'Earn double Peak Rewards points on every purchase',
  },
];

export interface PerkPreviewProps {
  isSummitMember: boolean;
}

export function PerkPreview({ isSummitMember }: PerkPreviewProps) {
  return (
    <div
      style={{
        background: isSummitMember
          ? 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)'
          : 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)',
        border: isSummitMember ? '1px solid #bbf7d0' : '1px solid #e7e5e4',
        borderRadius: 12,
        padding: '24px 32px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CrownOutlined style={{ fontSize: 20, color: isSummitMember ? '#16a34a' : '#a8a29e' }} />
          <Title level={4} style={{ margin: 0, color: isSummitMember ? '#15803d' : '#1c1917' }}>
            {isSummitMember ? 'Your Summit Perks' : 'Summit Member Perks'}
          </Title>
        </div>
        {!isSummitMember && (
          <Button
            type="primary"
            icon={<CrownOutlined />}
            style={{
              background: '#1a1a2e',
              borderColor: '#1a1a2e',
              fontWeight: 600,
            }}
            onClick={() => alert('Upgrade to Summit membership!')}
          >
            Unlock All Perks
          </Button>
        )}
      </div>

      {/* Perks Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {PERKS.map(perk => (
          <div
            key={perk.title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: 16,
              background: isSummitMember ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)',
              borderRadius: 8,
              border: isSummitMember ? '1px solid #dcfce7' : '1px solid #e7e5e4',
              opacity: isSummitMember ? 1 : 0.75,
            }}
          >
            {/* Status Icon */}
            <div style={{ flexShrink: 0, marginTop: 2 }}>
              {isSummitMember ? (
                <CheckCircleFilled style={{ fontSize: 20, color: '#16a34a' }} />
              ) : (
                <LockFilled style={{ fontSize: 20, color: '#a8a29e' }} />
              )}
            </div>

            {/* Perk Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, color: isSummitMember ? '#15803d' : '#78716c' }}>
                  {perk.icon}
                </span>
                <Text strong style={{ color: isSummitMember ? '#15803d' : '#1c1917' }}>
                  {perk.title}
                </Text>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {perk.description}
              </Text>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA for non-Summit */}
      {!isSummitMember && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Join Summit to unlock all perks — starting at $49/year
          </Text>
        </div>
      )}
    </div>
  );
}
