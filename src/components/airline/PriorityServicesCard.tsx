/**
 * PriorityServicesCard Component
 *
 * Displays priority boarding, fast-track security, and baggage services
 * for business class and elite frequent flyer passengers.
 *
 * USAGE:
 * ```tsx
 * <PriorityServicesCard
 *   boardingGroup="Group 1"
 *   hasFastTrack={true}
 *   hasBaggagePriority={true}
 * />
 * ```
 */

import { Space, Tag, Typography, Badge } from 'antd';
import {
  CheckCircleOutlined,
  ThunderboltOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

interface PriorityServicesCardProps {
  boardingGroup?: string;
  hasFastTrack?: boolean;
  hasBaggagePriority?: boolean;
}

/**
 * PriorityServicesCard Component
 *
 * PATTERN: Display premium service benefits
 * USE CASE: Show priority services for eligible passengers
 * CONTROLLED BY: enablePriorityBoarding boolean flag AND hasPriorityBoarding user property
 */
export function PriorityServicesCard({
  boardingGroup = 'Group 1',
  hasFastTrack = true,
  hasBaggagePriority = true,
}: PriorityServicesCardProps) {
  return (
    <div>
      {/* Boarding Group - Prominent Display */}
      <div
        style={{
          backgroundColor: '#e6f7ff',
          border: '2px solid #1890ff',
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        <Space direction="vertical" size="small" align="center">
          <TeamOutlined style={{ fontSize: 32, color: '#1890ff' }} />
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {boardingGroup}
          </Title>
          <Text type="secondary">Priority Boarding</Text>
        </Space>
      </div>

      {/* Priority Services List */}
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Fast-Track Security */}
        {hasFastTrack && (
          <div>
            <Space align="start">
              <Badge
                count={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />}
                style={{ backgroundColor: 'transparent' }}
              />
              <div>
                <Space>
                  <ThunderboltOutlined style={{ color: '#faad14' }} />
                  <Text strong>Fast-Track Security</Text>
                </Space>
                <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                  Skip the regular security line with expedited TSA screening
                </Paragraph>
              </div>
            </Space>
          </div>
        )}

        {/* Priority Boarding */}
        <div>
          <Space align="start">
            <Badge
              count={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />}
              style={{ backgroundColor: 'transparent' }}
            />
            <div>
              <Space>
                <TeamOutlined style={{ color: '#1890ff' }} />
                <Text strong>Early Boarding</Text>
              </Space>
              <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                Board before general passengers to secure overhead bin space
              </Paragraph>
            </div>
          </Space>
        </div>

        {/* Priority Baggage */}
        {hasBaggagePriority && (
          <div>
            <Space align="start">
              <Badge
                count={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />}
                style={{ backgroundColor: 'transparent' }}
              />
              <div>
                <Space>
                  <ShoppingOutlined style={{ color: '#722ed1' }} />
                  <Text strong>Priority Baggage Handling</Text>
                </Space>
                <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                  Your checked bags will be among the first on the carousel
                </Paragraph>
              </div>
            </Space>
          </div>
        )}

        {/* Dedicated Check-in */}
        <div>
          <Space align="start">
            <Badge
              count={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />}
              style={{ backgroundColor: 'transparent' }}
            />
            <div>
              <Text strong>Dedicated Check-in Counters</Text>
              <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                Access to priority check-in desks with shorter wait times
              </Paragraph>
            </div>
          </Space>
        </div>
      </Space>

      {/* Info Banner */}
      <div
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: 6,
        }}
      >
        <Space>
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
          <Text style={{ fontSize: 12, color: '#52c41a' }}>
            All priority services are active for your upcoming flights
          </Text>
        </Space>
      </div>

      {/* Footer */}
      <Paragraph type="secondary" style={{ fontSize: 11, marginTop: 12, marginBottom: 0 }}>
        Priority services are included with your ticket. Look for priority lanes marked with blue
        signs.
      </Paragraph>
    </div>
  );
}
