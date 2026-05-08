/**
 * PromoBanner Component - Ridgeline Outfitters
 *
 * Nature-inspired promotional banner with three A/B test themes:
 * earth (forest/olive), alpine (deep navy), sunset (warm amber).
 */

import { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { GiftOutlined, SendOutlined, SyncOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface PromoBannerProps {
  theme: 'earth' | 'alpine' | 'sunset';
  freeShippingThreshold?: number;
  onDismiss?: () => void;
}

/**
 * PromoBanner Component
 *
 * PATTERN: String flag controls styling and appearance variants
 * USE CASE: A/B test which nature-inspired banner theme drives more clicks
 * INTEGRATION:
 * - theme from promoBannerTheme string flag
 * - freeShippingThreshold from freeShippingThreshold number flag
 */
export function PromoBanner({ theme, freeShippingThreshold = 50, onDismiss }: PromoBannerProps) {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!visible) {
    return null;
  }

  // Dismiss button shared across all themes
  const dismissButton = (
    <button
      onClick={handleDismiss}
      style={{
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        color: '#fff',
        fontSize: 18,
        cursor: 'pointer',
        width: 28,
        height: 28,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      x
    </button>
  );

  // ============================================
  // THEME: EARTH - Forest/olive tones
  // End-of-season sale messaging
  // ============================================
  if (theme === 'earth') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #3d5a3e 0%, #2d4a2e 100%)',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {dismissButton}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space size={8}>
            <GiftOutlined style={{ fontSize: 20 }} />
            <Text strong style={{ fontSize: 16, color: '#fff' }}>
              End of Season Sale &mdash; Up to 40% off select styles
            </Text>
          </Space>
          <Button
            size="large"
            style={{
              background: '#fff',
              color: '#2d4a2e',
              border: 'none',
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            Shop Sale
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // THEME: ALPINE - Deep navy/mountain
  // Free shipping + new arrivals messaging
  // ============================================
  if (theme === 'alpine') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a2744 0%, #0f1b33 100%)',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {dismissButton}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space size={8}>
            <SendOutlined style={{ fontSize: 20 }} />
            <Text strong style={{ fontSize: 16, color: '#fff' }}>
              Free Standard Shipping on Orders Over ${freeShippingThreshold}
            </Text>
          </Space>
          <Button
            size="large"
            style={{
              background: '#fff',
              color: '#1a2744',
              border: 'none',
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            Shop New Arrivals
          </Button>
        </div>
      </div>
    );
  }

  // ============================================
  // THEME: SUNSET - Warm amber tones
  // Worn Wear / trade-in messaging
  // ============================================
  if (theme === 'sunset') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #c17817 0%, #a85d10 50%, #8b4513 100%)',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {dismissButton}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space size={8}>
            <SyncOutlined style={{ fontSize: 20 }} />
            <div style={{ textAlign: 'left' }}>
              <Text strong style={{ fontSize: 16, color: '#fff', display: 'block', lineHeight: 1.3 }}>
                Worn Wear &mdash; Trade In Your Used Gear for Credit
              </Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
                Keep gear in play longer. Better for you, better for the planet.
              </Text>
            </div>
          </Space>
          <Button
            size="large"
            style={{
              background: '#fff',
              color: '#8b4513',
              border: 'none',
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              fontSize: 12,
            }}
          >
            Start Trading
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
