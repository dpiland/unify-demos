/**
 * FlightCard Component
 *
 * Core reusable component for displaying flight information.
 * Supports three display modes: timeline, card, and list.
 *
 * USAGE:
 * ```tsx
 * <FlightCard flight={flightData} displayMode="card" />
 * ```
 */

import { Badge, Card, Space, Tag, Typography } from 'antd';
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

/**
 * Flight Interface (copied from App.tsx for type safety)
 */
interface Flight {
  id: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    city: string;
    time: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    code: string;
    city: string;
    time: string;
    gate?: string;
  };
  cabinClass: string;
  bookingRef: string;
  status: 'scheduled' | 'boarding' | 'delayed' | 'departed' | 'completed';
  upgradeable: boolean;
  duration: string;
}

interface FlightCardProps {
  flight: Flight;
  displayMode: 'timeline' | 'card' | 'list';
}

/**
 * Format time string for display
 */
function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Format date string for display
 */
function formatDate(isoTime: string): string {
  const date = new Date(isoTime);
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
}

/**
 * Get status color for badge/tag
 */
function getStatusColor(status: Flight['status']): string {
  switch (status) {
    case 'scheduled':
      return 'blue';
    case 'boarding':
      return 'green';
    case 'delayed':
      return 'red';
    case 'departed':
      return 'default';
    default:
      return 'default';
  }
}

/**
 * Get status display text
 */
function getStatusText(status: Flight['status']): string {
  switch (status) {
    case 'scheduled':
      return 'On Time';
    case 'boarding':
      return 'Now Boarding';
    case 'delayed':
      return 'Delayed';
    case 'departed':
      return 'Departed';
    default:
      return status;
  }
}

export function FlightCard({ flight, displayMode }: FlightCardProps) {
  // ============================================
  // CARD MODE - Detailed Flight Card
  // ============================================
  if (displayMode === 'card') {
    return (
      <Card
        size="small"
        title={
          <Space>
            <Text strong style={{ fontSize: 16 }}>
              {flight.flightNumber}
            </Text>
            <Tag color={getStatusColor(flight.status)}>{getStatusText(flight.status)}</Tag>
          </Space>
        }
        extra={<Text type="secondary">{flight.bookingRef}</Text>}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* Route */}
          <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {flight.departure.code}
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {flight.departure.city}
              </Text>
            </div>

            <div style={{ textAlign: 'center' }}>
              <ArrowRightOutlined style={{ fontSize: 20, color: '#1890ff' }} />
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {flight.duration}
                </Text>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <Title level={4} style={{ margin: 0 }}>
                {flight.arrival.code}
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {flight.arrival.city}
              </Text>
            </div>
          </Space>

          {/* Times */}
          <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div>
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              <Text strong>{formatTime(flight.departure.time)}</Text>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {formatDate(flight.departure.time)}
                </Text>
              </div>
              {flight.departure.gate && (
                <div>
                  <EnvironmentOutlined style={{ marginRight: 4, fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Gate {flight.departure.gate}
                  </Text>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              <Text strong>{formatTime(flight.arrival.time)}</Text>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {formatDate(flight.arrival.time)}
                </Text>
              </div>
              {flight.arrival.gate && (
                <div>
                  <EnvironmentOutlined style={{ marginRight: 4, fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Gate {flight.arrival.gate}
                  </Text>
                </div>
              )}
            </div>
          </Space>

          {/* Class & Upgrade */}
          <Space>
            <Tag color="blue">{flight.cabinClass}</Tag>
            {flight.upgradeable && <Tag color="gold">Upgrade Available</Tag>}
          </Space>
        </Space>
      </Card>
    );
  }

  // ============================================
  // LIST MODE - Compact List Item
  // ============================================
  if (displayMode === 'list') {
    return (
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space size="large">
          <div>
            <Text strong>{flight.flightNumber}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {flight.bookingRef}
            </Text>
          </div>

          <div>
            <Text strong>
              {flight.departure.code} → {flight.arrival.code}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatTime(flight.departure.time)} - {formatTime(flight.arrival.time)}
            </Text>
          </div>

          <div>
            <Tag color="blue">{flight.cabinClass}</Tag>
          </div>
        </Space>

        <Space>
          <Tag color={getStatusColor(flight.status)}>{getStatusText(flight.status)}</Tag>
          {flight.upgradeable && <Tag color="gold">Upgrade Available</Tag>}
        </Space>
      </div>
    );
  }

  // ============================================
  // TIMELINE MODE - Minimal Display for Timeline
  // ============================================
  return (
    <div>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Space>
          <Text strong style={{ fontSize: 16 }}>
            {flight.flightNumber}
          </Text>
          <Tag color={getStatusColor(flight.status)} style={{ marginLeft: 8 }}>
            {getStatusText(flight.status)}
          </Tag>
        </Space>

        <Space size="large">
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {flight.departure.code}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatTime(flight.departure.time)}
            </Text>
          </div>

          <ArrowRightOutlined style={{ fontSize: 16, color: '#1890ff' }} />

          <div>
            <Title level={5} style={{ margin: 0 }}>
              {flight.arrival.code}
            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {formatTime(flight.arrival.time)}
            </Text>
          </div>
        </Space>

        <Space>
          <Tag color="blue">{flight.cabinClass}</Tag>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {flight.duration}
          </Text>
          {flight.upgradeable && (
            <Tag color="gold" style={{ fontSize: 11 }}>
              Upgrade Available
            </Tag>
          )}
        </Space>

        <Text type="secondary" style={{ fontSize: 12 }}>
          Booking Ref: {flight.bookingRef}
        </Text>
      </Space>
    </div>
  );
}
