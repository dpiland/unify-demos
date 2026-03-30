/**
 * FlashSaleBanner Component
 *
 * Time-limited flash sale banner with live countdown and personalized discount.
 * Tiered discounts: 40% Summit (VIP), 25% Trailtest (Beta), 10% Dayhiker (Basic), 5% Explorer (New).
 * Controlled by enableFlashSale boolean flag.
 */

import { useState, useEffect } from 'react';
import { ThunderboltOutlined } from '@ant-design/icons';

const FLASH_SALE_DURATION = 2 * 60 * 60; // 2 hours in seconds

const TIER_LABELS: Record<string, string> = {
  vip: 'Summit',
  beta: 'Trailtest',
  basic: 'Dayhiker',
  new: 'Explorer',
};

export interface FlashSaleBannerProps {
  discountPercent: number;
  membershipTier: string;
}

export function FlashSaleBanner({ discountPercent, membershipTier }: FlashSaleBannerProps) {
  const [timeRemaining, setTimeRemaining] = useState(FLASH_SALE_DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const tierLabel = TIER_LABELS[membershipTier] || 'Member';

  if (timeRemaining <= 0) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #b91c1c 0%, #d97706 50%, #b91c1c 100%)',
        color: '#fff',
        padding: '16px 24px',
        textAlign: 'center',
        borderBottom: '2px solid #fbbf24',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <ThunderboltOutlined style={{ fontSize: 22, color: '#fbbf24' }} />
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
          Flash Sale
        </span>
        <span
          style={{
            background: '#fbbf24',
            color: '#1a1a1a',
            padding: '4px 14px',
            borderRadius: 4,
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          {discountPercent}% OFF
        </span>
        <span style={{ fontSize: 14, opacity: 0.95 }}>
          {tierLabel} Exclusive
        </span>
        <div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            background: 'rgba(0,0,0,0.3)',
            padding: '6px 14px',
            borderRadius: 6,
            fontFamily: 'monospace',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
