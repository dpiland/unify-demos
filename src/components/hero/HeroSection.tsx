/**
 * HeroSection Component
 *
 * Full-bleed hero image with overlaid text and CTA.
 * Inspired by Patagonia's large nature photography hero sections.
 * Not flag-controlled -- always visible as the main storefront hero.
 */

import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

export function HeroSection() {
  return (
    <div
      style={{
        position: 'relative',
        height: 500,
        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=800&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: 'relative',
          padding: '48px',
          maxWidth: 600,
        }}
      >
        <Title
          level={1}
          style={{
            color: '#fff',
            marginBottom: 8,
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            lineHeight: 1.1,
          }}
        >
          Built for the Mountains
        </Title>
        <Text
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 18,
            display: 'block',
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          Gear tested in the harshest conditions on earth.
          Made to last and designed to be repaired.
        </Text>
        <Button
          size="large"
          style={{
            background: '#fff',
            color: '#1a1a2e',
            border: 'none',
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: 'uppercase',
            fontSize: 13,
            height: 44,
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          Shop New Arrivals
        </Button>
      </div>
    </div>
  );
}
