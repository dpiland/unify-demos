/**
 * NotificationCenter Component
 *
 * Real-time clinical notification bell with popover dropdown.
 * Consolidates critical labs, appointment reminders, messages, and handoff alerts.
 *
 * FEATURE FLAG: enableNotificationCenter (boolean)
 * NUMBER FLAG: notificationDisplayCount controls how many items show
 */

import { Badge, Button, List, Popover, Space, Tag, Typography } from 'antd';
import {
  BellOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  MessageOutlined,
  SwapOutlined,
  WarningOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface Notification {
  id: string;
  type: 'critical-lab' | 'appointment' | 'message' | 'handoff' | 'prescription' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: 'n-1', type: 'critical-lab', title: 'Critical Lab Result', description: 'Harold Jenkins — Potassium 6.2 mEq/L (critical high)', time: '2 min ago', read: false },
  { id: 'n-2', type: 'message', title: 'Patient Message', description: 'Dorothy Price sent a message about medication side effects', time: '15 min ago', read: false },
  { id: 'n-3', type: 'appointment', title: 'Appointment Reminder', description: 'Margaret Wilson — Follow-up in 30 minutes (Room 204)', time: '28 min ago', read: false },
  { id: 'n-4', type: 'handoff', title: 'Shift Handoff Pending', description: 'Dr. Rivera completed night shift notes — 3 patients need review', time: '1 hour ago', read: true },
  { id: 'n-5', type: 'prescription', title: 'Refill Approved', description: 'Metformin 500mg refill for Robert Garcia — ready for signature', time: '1 hour ago', read: true },
  { id: 'n-6', type: 'critical-lab', title: 'Abnormal Result', description: 'Frank Russo — HbA1c 9.8% (above target range)', time: '2 hours ago', read: true },
  { id: 'n-7', type: 'system', title: 'Care Plan Overdue', description: 'Betty Simmons — Physical therapy milestone 3 days overdue', time: '3 hours ago', read: true },
  { id: 'n-8', type: 'appointment', title: 'Cancellation', description: 'Lisa Park cancelled 2:00 PM follow-up appointment', time: '4 hours ago', read: true },
];

function getNotificationIcon(type: Notification['type']) {
  switch (type) {
    case 'critical-lab': return <WarningOutlined style={{ color: '#ef4444' }} />;
    case 'appointment': return <CalendarOutlined style={{ color: '#0891b2' }} />;
    case 'message': return <MessageOutlined style={{ color: '#8b5cf6' }} />;
    case 'handoff': return <SwapOutlined style={{ color: '#f59e0b' }} />;
    case 'prescription': return <MedicineBoxOutlined style={{ color: '#10b981' }} />;
    case 'system': return <CheckCircleOutlined style={{ color: '#6b7280' }} />;
  }
}

function getTypeTag(type: Notification['type']) {
  switch (type) {
    case 'critical-lab': return <Tag color="red" style={{ fontSize: 10 }}>CRITICAL</Tag>;
    case 'appointment': return <Tag color="cyan" style={{ fontSize: 10 }}>SCHEDULE</Tag>;
    case 'message': return <Tag color="purple" style={{ fontSize: 10 }}>MESSAGE</Tag>;
    case 'handoff': return <Tag color="orange" style={{ fontSize: 10 }}>HANDOFF</Tag>;
    case 'prescription': return <Tag color="green" style={{ fontSize: 10 }}>RX</Tag>;
    case 'system': return <Tag style={{ fontSize: 10 }}>SYSTEM</Tag>;
  }
}

interface NotificationCenterProps {
  maxItems: number;
}

export function NotificationCenter({ maxItems }: NotificationCenterProps) {
  const visibleNotifications = NOTIFICATIONS.slice(0, maxItems);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  const content = (
    <div style={{ width: 380 }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text strong>Notifications</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>{unreadCount} unread</Text>
      </div>
      <List
        size="small"
        dataSource={visibleNotifications}
        style={{ maxHeight: 400, overflowY: 'auto' }}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: '10px 12px',
              background: item.read ? 'transparent' : '#f0fdfa',
              cursor: 'pointer',
            }}
          >
            <Space align="start" size="small" style={{ width: '100%' }}>
              <div style={{ marginTop: 2 }}>{getNotificationIcon(item.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong style={{ fontSize: 13 }}>{item.title}</Text>
                  {getTypeTag(item.type)}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>{item.description}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
              </div>
              {!item.read && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891b2', marginTop: 6 }} />
              )}
            </Space>
          </List.Item>
        )}
      />
      {NOTIFICATIONS.length > maxItems && (
        <div style={{ padding: '8px 12px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
          <Button type="link" size="small">View all {NOTIFICATIONS.length} notifications</Button>
        </div>
      )}
    </div>
  );

  return (
    <Popover content={content} trigger="click" placement="bottomRight" arrow={false}>
      <Badge count={unreadCount} size="small" offset={[-2, 2]}>
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 18, color: '#fff' }} />}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        />
      </Badge>
    </Popover>
  );
}
