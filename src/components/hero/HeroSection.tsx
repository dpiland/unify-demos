/**
 * HeroSection Component
 *
 * Full-bleed hero image with overlaid text and CTA.
 * When enablePersonalizedHero is on and user is VIP,
 * shows a personalized hero with their name and activity imagery.
 */

import { Button, Typography, Tag } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export interface HeroSectionProps {
  personalized?: boolean;
  userName?: string;
  membershipTier?: string;
}

export function HeroSection({ personalized = false, userName, membershipTier }: HeroSectionProps) {
  const isSummit = membershipTier === 'vip';
  const firstName = userName?.replace(/\s*\(.*\)/, '').split(' ')[0] || 'Explorer';

  // VIP personalized hero
  if (personalized && isSummit) {
    return (
      <div
        style={{
          position: 'relative',
          height: 520,
          backgroundImage: 'url(https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
          }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: 'relative',
            padding: '48px',
            maxWidth: 700,
          }}
        >
          <Tag
            icon={<CrownOutlined />}
            color="gold"
            style={{
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 16,
              padding: '4px 12px',
              border: 'none',
            }}
          >
            SUMMIT MEMBER
          </Tag>
          <Title
            level={1}
            style={{
              color: '#fff',
              marginBottom: 8,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: 0.5,
              lineHeight: 1.1,
            }}
          >
            Welcome back, {firstName}.
          </Title>
          <Text
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 18,
              display: 'block',
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            Your next adventure starts here.
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 15,
              display: 'block',
              marginBottom: 28,
              lineHeight: 1.5,
            }}
          >
            New alpine gear just dropped — curated for Summit members like you.
          </Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button
              size="large"
              style={{
                background: '#fbbf24',
                color: '#1a1a2e',
                border: 'none',
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontSize: 13,
                height: 46,
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              Shop Early Access
            </Button>
            <Button
              size="large"
              style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                fontSize: 13,
                height: 46,
                paddingLeft: 28,
                paddingRight: 28,
              }}
            >
              Your Rewards
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default hero (all users / non-personalized)
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
