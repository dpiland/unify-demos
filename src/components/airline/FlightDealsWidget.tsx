/**
 * FlightDealsWidget Component
 *
 * Displays top flight deals for spontaneous travelers.
 * Shows destination cards with images, pricing, and quick booking.
 *
 * USAGE:
 * ```tsx
 * <FlightDealsWidget />
 * ```
 */

import { Card, Row, Col, Typography, Button, Space, Tag } from 'antd';
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface FlightDeal {
  id: string;
  destination: string;
  destinationCode: string;
  origin: string;
  originCode: string;
  price: number;
  originalPrice?: number;
  savings?: number;
  imageUrl: string; // Unsplash image URL
  description: string;
  dates: string;
  tag?: string;
}

/**
 * Top flight deals for spontaneous travelers
 */
const FLIGHT_DEALS: FlightDeal[] = [
  {
    id: 'deal-001',
    destination: 'Miami',
    destinationCode: 'MIA',
    origin: 'New York',
    originCode: 'JFK',
    price: 89,
    originalPrice: 249,
    savings: 160,
    imageUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=400&h=250&fit=crop',
    description: 'Beaches, nightlife & art deco',
    dates: 'Mar 15 - Mar 22',
    tag: 'Hot Deal',
  },
  {
    id: 'deal-002',
    destination: 'Los Angeles',
    destinationCode: 'LAX',
    origin: 'Chicago',
    originCode: 'ORD',
    price: 129,
    originalPrice: 299,
    savings: 170,
    imageUrl: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=400&h=250&fit=crop',
    description: 'Hollywood & sunny beaches',
    dates: 'Mar 10 - Mar 17',
    tag: 'Popular',
  },
  {
    id: 'deal-003',
    destination: 'Denver',
    destinationCode: 'DEN',
    origin: 'Boston',
    originCode: 'BOS',
    price: 149,
    originalPrice: 329,
    savings: 180,
    imageUrl: 'https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=400&h=250&fit=crop',
    description: 'Mountain adventures await',
    dates: 'Mar 20 - Mar 27',
  },
  {
    id: 'deal-004',
    destination: 'San Francisco',
    destinationCode: 'SFO',
    origin: 'Dallas',
    originCode: 'DFW',
    price: 119,
    originalPrice: 279,
    savings: 160,
    imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=400&h=250&fit=crop',
    description: 'Golden Gate & tech culture',
    dates: 'Mar 12 - Mar 19',
    tag: 'Limited',
  },
];

export function FlightDealsWidget() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Space align="center" style={{ marginBottom: 8 }}>
          <Title level={3} style={{ margin: 0 }}>
            ✈️ Top Flight Deals
          </Title>
          <Tag color="red">Limited Time</Tag>
        </Space>
        <Text type="secondary">
          Spontaneous getaway? Grab these deals before they're gone!
        </Text>
      </div>

      {/* Deals Grid */}
      <Row gutter={[16, 16]}>
        {FLIGHT_DEALS.map((deal) => (
          <Col xs={24} sm={12} lg={6} key={deal.id}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderRadius: 12,
                overflow: 'hidden',
              }}
              bodyStyle={{ padding: 0 }}
            >
              {/* City Image Header */}
              <div
                style={{
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={deal.imageUrl}
                  alt={deal.destination}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Overlay gradient for better text readability */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
                  }}
                />
                {deal.tag && (
                  <Tag
                    color="red"
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    {deal.tag}
                  </Tag>
                )}
              </div>

              {/* Deal Content */}
              <div style={{ padding: 20 }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {/* Destination */}
                  <div>
                    <Space align="center" style={{ marginBottom: 4 }}>
                      <EnvironmentOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                      <Title level={4} style={{ margin: 0 }}>
                        {deal.destination}
                      </Title>
                    </Space>
                  </div>

                  {/* Route */}
                  <div
                    style={{
                      background: '#f0f2f5',
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  >
                    <Space size="small">
                      <Text strong>{deal.originCode}</Text>
                      <ArrowRightOutlined style={{ fontSize: 10 }} />
                      <Text strong>{deal.destinationCode}</Text>
                    </Space>
                  </div>

                  {/* Dates */}
                  <Space size="small">
                    <CalendarOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {deal.dates}
                    </Text>
                  </Space>

                  {/* Pricing */}
                  <div>
                    <Space align="baseline" size={8}>
                      <Title level={2} style={{ margin: 0, color: '#52c41a' }}>
                        ${deal.price}
                      </Title>
                      {deal.originalPrice && (
                        <Text
                          delete
                          type="secondary"
                          style={{ fontSize: 14 }}
                        >
                          ${deal.originalPrice}
                        </Text>
                      )}
                    </Space>
                    {deal.savings && (
                      <Text strong style={{ fontSize: 12, color: '#52c41a' }}>
                        Save ${deal.savings}
                      </Text>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<ArrowRightOutlined />}
                  >
                    View Deal
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Footer CTA */}
      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: '#f0f2f5',
          borderRadius: 8,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="small">
          <Text strong style={{ fontSize: 15 }}>
            Can't find what you're looking for?
          </Text>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Explore all destinations and create your own adventure
          </Text>
          <Button type="default" size="large">
            Browse All Destinations
          </Button>
        </Space>
      </div>
    </div>
  );
}
