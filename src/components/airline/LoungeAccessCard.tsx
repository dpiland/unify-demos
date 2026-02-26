/**
 * LoungeAccessCard Component
 *
 * Displays airport lounge information, hours, and amenities for eligible passengers.
 * Shows lounge-specific details based on passenger's home airport.
 *
 * USAGE:
 * ```tsx
 * <LoungeAccessCard
 *   homeAirport="JFK"
 *   membershipTier="platinum"
 * />
 * ```
 */

import { Card, Space, Tag, Typography, Divider } from 'antd';
import {
  CoffeeOutlined,
  WifiOutlined,
  LaptopOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

interface LoungeAccessCardProps {
  homeAirport: string;
  membershipTier: string;
}

/**
 * Get lounge information by airport code
 */
function getLoungeInfo(airport: string) {
  const lounges: Record<string, { name: string; terminal: string; gate: string }> = {
    JFK: { name: 'SkyTravel Premium Lounge', terminal: 'Terminal 4', gate: 'Near Gate B12' },
    LAX: { name: 'SkyTravel Elite Club', terminal: 'Terminal 6', gate: 'Near Gate 60' },
    SFO: { name: 'SkyTravel Executive Lounge', terminal: 'Terminal 2', gate: 'Near Gate D8' },
    ORD: { name: 'SkyTravel Business Center', terminal: 'Terminal 1', gate: 'Near Gate C14' },
  };

  return lounges[airport] || {
    name: 'SkyTravel Lounge',
    terminal: 'Main Terminal',
    gate: 'Check airport map',
  };
}

/**
 * LoungeAccessCard Component
 *
 * PATTERN: Conditional display based on user properties
 * USE CASE: Show premium amenities to eligible passengers
 * CONTROLLED BY: enableLoungeAccess boolean flag AND hasLoungeAccess user property
 */
export function LoungeAccessCard({ homeAirport, membershipTier }: LoungeAccessCardProps) {
  const lounge = getLoungeInfo(homeAirport);

  return (
    <div>
      {/* Lounge name and location */}
      <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>
          {lounge.name}
        </Title>
        <Space size="small">
          <EnvironmentOutlined style={{ color: '#1890ff' }} />
          <Text type="secondary">
            {homeAirport} Airport • {lounge.terminal}
          </Text>
        </Space>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {lounge.gate}
        </Text>
      </Space>

      {/* Membership tier badge */}
      <div style={{ marginBottom: 16 }}>
        <Tag
          color={
            membershipTier === 'platinum'
              ? 'purple'
              : membershipTier === 'employee'
              ? 'green'
              : 'blue'
          }
          style={{ textTransform: 'capitalize' }}
        >
          {membershipTier} Access
        </Tag>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      {/* Operating hours */}
      <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: 16 }}>
        <Space>
          <ClockCircleOutlined style={{ color: '#52c41a' }} />
          <Text strong>Hours</Text>
        </Space>
        <Text type="secondary" style={{ fontSize: 13, paddingLeft: 22 }}>
          Daily: 5:00 AM - 11:00 PM
        </Text>
      </Space>

      <Divider style={{ margin: '16px 0' }} />

      {/* Amenities */}
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ marginBottom: 8, display: 'block' }}>
          Amenities
        </Text>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space>
            <WifiOutlined style={{ color: '#1890ff', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Complimentary High-Speed WiFi</Text>
          </Space>
          <Space>
            <CoffeeOutlined style={{ color: '#1890ff', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Premium Food & Beverages</Text>
          </Space>
          <Space>
            <LaptopOutlined style={{ color: '#1890ff', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Business Workstations</Text>
          </Space>
          <Space>
            <ShoppingOutlined style={{ color: '#1890ff', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Shower Facilities</Text>
          </Space>
        </Space>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      {/* Digital pass */}
      <div
        style={{
          backgroundColor: '#f0f2f5',
          padding: 16,
          borderRadius: 8,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="small" align="center">
          <QrcodeOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <Text strong>Digital Lounge Pass</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Show this at lounge entrance
          </Text>
        </Space>
      </div>

      {/* Footer info */}
      <Paragraph type="secondary" style={{ fontSize: 11, marginTop: 16, marginBottom: 0 }}>
        Lounge access is included with your {membershipTier} membership. Guest passes available at
        lounge reception.
      </Paragraph>
    </div>
  );
}
