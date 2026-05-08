/**
 * LoyaltyCard Component - Ridgeline Outfitters
 *
 * Displays Peak Rewards loyalty points, tier status, progress to next reward,
 * and available rewards. Earth-tone gradient styling.
 */

import { Card, Progress, Space, Tag, Typography, Button } from 'antd';
import { TrophyOutlined, GiftOutlined, StarFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

export interface LoyaltyCardProps {
  points: number;
  tierName: string;
  onViewRewards?: () => void;
}

/**
 * LoyaltyCard Component
 *
 * PATTERN: Conditional rendering based on showLoyaltyProgram boolean flag
 * USE CASE: Soft launch Peak Rewards to Pro members first
 * INTEGRATION: Shown when showLoyaltyProgram flag is true
 */
export function LoyaltyCard({ points, tierName, onViewRewards }: LoyaltyCardProps) {
  const tiers = [
    { name: 'Basic', minPoints: 0, color: '#8c8780' },
    { name: 'Silver', minPoints: 500, color: '#94a3b8' },
    { name: 'Gold', minPoints: 1000, color: '#b8860b' },
    { name: 'Platinum', minPoints: 2000, color: '#2d4a2e' },
    { name: 'VIP', minPoints: 5000, color: '#1a2744' },
  ];

  const currentTierIndex = tiers.findIndex(
    t => t.name.toLowerCase() === tierName.toLowerCase()
  );
  const currentTier = currentTierIndex >= 0 ? tiers[currentTierIndex] : tiers[0];
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

  const progressPercent = nextTier
    ? Math.min(
        ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100,
        100
      )
    : 100;
  const pointsNeeded = nextTier ? nextTier.minPoints - points : 0;

  const availableRewards = [
    { id: '1', name: 'Free Standard Shipping', pointCost: 100 },
    { id: '2', name: '15% Off Next Order', pointCost: 250 },
    { id: '3', name: '$25 Gear Credit', pointCost: 500 },
  ];

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #1a2744 0%, #2d4a2e 100%)',
        color: '#fff',
        border: 'none',
      }}
      styles={{ body: { padding: 20 } }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <Space direction="vertical" size={4}>
            <Space size={8}>
              <TrophyOutlined style={{ fontSize: 20 }} />
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                Peak Rewards
              </Title>
            </Space>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13 }}>
              Member since {new Date().getFullYear() - 2}
            </Text>
          </Space>

          <Tag
            icon={<StarFilled />}
            color={currentTier.color}
            style={{
              fontSize: 14,
              padding: '4px 12px',
              fontWeight: 600,
              border: 'none',
            }}
          >
            {currentTier.name.toUpperCase()}
          </Tag>
        </div>

        {/* Points Display */}
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, display: 'block' }}>
                Trail Credits
              </Text>
              <Title level={2} style={{ margin: 0, color: '#fff', lineHeight: 1.2 }}>
                {points.toLocaleString()}
              </Title>
            </div>

            {nextTier && (
              <div style={{ textAlign: 'right' }}>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, display: 'block' }}>
                  Next: {nextTier.name}
                </Text>
                <Text strong style={{ color: '#fff', fontSize: 14 }}>
                  {pointsNeeded} pts away
                </Text>
              </div>
            )}
          </div>

          {nextTier && (
            <div>
              <Progress
                percent={progressPercent}
                strokeColor="#fff"
                trailColor="rgba(255,255,255,0.2)"
                showInfo={false}
                size="small"
              />
            </div>
          )}
        </div>

        {/* Available Rewards */}
        <div style={{ marginBottom: 12 }}>
          <Space size={8} style={{ marginBottom: 12 }}>
            <GiftOutlined style={{ fontSize: 16 }} />
            <Text strong style={{ color: '#fff', fontSize: 14 }}>
              Available Rewards
            </Text>
          </Space>

          <Space wrap size={8}>
            {availableRewards.map(reward => {
              const canRedeem = points >= reward.pointCost;
              return (
                <div
                  key={reward.id}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    opacity: canRedeem ? 1 : 0.6,
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    {reward.name}
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>
                    {reward.pointCost} pts
                  </Text>
                </div>
              );
            })}
          </Space>
        </div>

        {/* View All Button */}
        <Button
          type="default"
          size="large"
          block
          onClick={onViewRewards}
          style={{
            background: '#fff',
            color: '#1a2744',
            borderColor: '#fff',
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          View All Rewards
        </Button>
      </div>
    </Card>
  );
}
