/**
 * PromoBanner Component
 *
 * Promotional banner with different color themes for A/B testing.
 * Displays marketing messages, sales, and free shipping offers.
 */

import { useState } from 'react';
import { Alert, Button, Space, Typography } from 'antd';
import { GiftOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface PromoBannerProps {
  theme: 'blue' | 'red' | 'gradient';
  freeShippingThreshold?: number;
  onDismiss?: () => void;
}

/**
 * PromoBanner Component
 *
 * PATTERN: String flag controls styling and appearance variants
 * USE CASE: A/B test which banner color scheme drives more clicks
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

  // ============================================
  // THEME: BLUE - Professional, Trustworthy
  // ============================================
  if (theme === 'blue') {
    return (
      <Alert
        message={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Space size={8}>
              <GiftOutlined style={{ fontSize: 20, color: '#1890ff' }} />
              <Text strong style={{ fontSize: 16 }}>
                Free Shipping on Orders Over ${freeShippingThreshold}!
              </Text>
            </Space>
            <Button type="primary" size="large">
              Shop Now
            </Button>
          </div>
        }
        type="info"
        banner
        closable
        onClose={handleDismiss}
        style={{ textAlign: 'center', padding: '12px 24px' }}
      />
    );
  }

  // ============================================
  // THEME: RED - Urgent, High-Energy
  // ============================================
  if (theme === 'red') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)',
          color: '#fff',
          padding: '16px 24px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
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
          ×
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space size={8}>
            <ThunderboltOutlined style={{ fontSize: 24 }} />
            <Text strong style={{ fontSize: 18, color: '#fff' }}>
              FLASH SALE: 30% OFF EVERYTHING!
            </Text>
            <ThunderboltOutlined style={{ fontSize: 24 }} />
          </Space>
          <Button type="default" size="large" style={{ background: '#fff', color: '#cf1322', borderColor: '#fff' }}>
            Shop Flash Sale
          </Button>
        </div>
        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', display: 'block', marginTop: 8 }}>
          Use code: FLASH30 at checkout. Limited time only!
        </Text>
      </div>
    );
  }

  // ============================================
  // THEME: GRADIENT - Modern, Premium
  // ============================================
  if (theme === 'gradient') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          color: '#fff',
          padding: '20px 24px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.3)',
            border: 'none',
            color: '#fff',
            fontSize: 18,
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Space size={12} align="center">
            <TrophyOutlined style={{ fontSize: 28 }} />
            <div style={{ textAlign: 'left' }}>
              <Text strong style={{ fontSize: 20, color: '#fff', display: 'block', lineHeight: 1.2 }}>
                VIP Members Get Exclusive Access
              </Text>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.95)', display: 'block' }}>
                Early access to new products + Free shipping on all orders
              </Text>
            </div>
          </Space>
          <Button
            type="default"
            size="large"
            style={{
              background: '#fff',
              color: '#667eea',
              borderColor: '#fff',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            Join VIP Program
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
