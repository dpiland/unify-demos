/**
 * MobileCheckinCard Component
 *
 * Mobile check-in interface with digital boarding pass generation.
 * Allows passengers to check in online 24 hours before departure.
 *
 * USAGE:
 * ```tsx
 * <MobileCheckinCard
 *   flightNumber="SK 1234"
 *   departure={{ code: 'JFK', time: '2026-03-02T15:45:00' }}
 *   canCheckIn={true}
 *   onCheckIn={() => console.log('Checked in')}
 * />
 * ```
 */

import { useState } from 'react';
import { Button, Space, Typography, Divider, message } from 'antd';
import {
  CheckCircleOutlined,
  QrcodeOutlined,
  MobileOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface MobileCheckinCardProps {
  flightNumber?: string;
  departure?: {
    code: string;
    time: string;
  };
  canCheckIn?: boolean;
  onCheckIn?: () => void;
}

/**
 * MobileCheckinCard Component
 *
 * PATTERN: Interactive check-in flow with state management
 * USE CASE: Mobile check-in and boarding pass generation
 * CONTROLLED BY: enableMobileCheckin boolean flag
 */
export function MobileCheckinCard({
  flightNumber = 'SK 1234',
  departure = { code: 'JFK', time: '2026-03-02T15:45:00' },
  canCheckIn = true,
  onCheckIn,
}: MobileCheckinCardProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Format departure time
  const formatTime = (isoTime: string) => {
    const date = new Date(isoTime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Handle check-in
  const handleCheckIn = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsCheckedIn(true);
    setIsLoading(false);
    message.success('Successfully checked in! Boarding pass generated.');
    onCheckIn?.();
  };

  // If not checked in yet
  if (!isCheckedIn) {
    return (
      <div>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* Flight info */}
          <div>
            <Text strong style={{ fontSize: 16 }}>
              {flightNumber}
            </Text>
            <br />
            <Space size="small">
              <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
              <Text type="secondary">{formatTime(departure.time)}</Text>
            </Space>
          </div>

          <Divider style={{ margin: 0 }} />

          {/* Check-in status */}
          {canCheckIn ? (
            <div>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
                  <Text strong style={{ color: '#52c41a' }}>
                    Check-in Available
                  </Text>
                </Space>
                <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 0 }}>
                  Save time at the airport by checking in now. You'll receive your digital boarding
                  pass instantly.
                </Paragraph>
              </Space>
            </div>
          ) : (
            <div>
              <Space>
                <ClockCircleOutlined style={{ color: '#faad14', fontSize: 16 }} />
                <Text type="secondary">Check-in opens 24 hours before departure</Text>
              </Space>
            </div>
          )}

          {/* Check-in button */}
          <Button
            type="primary"
            size="large"
            block
            icon={<MobileOutlined />}
            onClick={handleCheckIn}
            loading={isLoading}
            disabled={!canCheckIn}
          >
            {canCheckIn ? 'Check In Now' : 'Check-in Not Available Yet'}
          </Button>

          {/* Benefits list */}
          {canCheckIn && (
            <div style={{ backgroundColor: '#f0f2f5', padding: 12, borderRadius: 6 }}>
              <Text strong style={{ fontSize: 12 }}>
                Mobile Check-in Benefits:
              </Text>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 12 }}>
                <li>Skip the check-in counter</li>
                <li>Select or change your seat</li>
                <li>Get your boarding pass instantly</li>
                <li>Faster security screening</li>
              </ul>
            </div>
          )}
        </Space>
      </div>
    );
  }

  // If checked in - show boarding pass
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Success message */}
        <div style={{ textAlign: 'center' }}>
          <CheckCircleOutlined
            style={{ fontSize: 48, color: '#52c41a', marginBottom: 8, display: 'block' }}
          />
          <Text strong style={{ fontSize: 16 }}>
            Check-in Successful!
          </Text>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* Boarding pass */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #d9d9d9',
            borderRadius: 8,
            padding: 16,
            textAlign: 'center',
          }}
        >
          <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ fontSize: 18 }}>
                {flightNumber}
              </Text>
              <br />
              <Text type="secondary">Departing from {departure.code}</Text>
            </div>

            {/* Mock QR Code */}
            <QrcodeOutlined style={{ fontSize: 120, color: '#262626' }} />

            <div style={{ width: '100%' }}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Boarding Time:</Text>
                  <Text strong>3:15 PM</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Gate:</Text>
                  <Text strong>B12</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Seat:</Text>
                  <Text strong>14A</Text>
                </div>
              </Space>
            </div>
          </Space>
        </div>

        {/* Action buttons */}
        <Space style={{ width: '100%' }}>
          <Button block icon={<MobileOutlined />}>
            Add to Wallet
          </Button>
          <Button block>Email Boarding Pass</Button>
        </Space>

        {/* Footer */}
        <Paragraph type="secondary" style={{ fontSize: 11, textAlign: 'center', marginBottom: 0 }}>
          Please arrive at the gate at least 30 minutes before departure
        </Paragraph>
      </Space>
    </div>
  );
}
