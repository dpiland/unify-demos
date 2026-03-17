/**
 * TelemedicinePanel Component
 *
 * Displays virtual visit capabilities including upcoming video appointments,
 * waiting room status, and quick-start options.
 *
 * FEATURE FLAG: enableTelemedicine (boolean)
 * DOUBLE-GATE: Also requires user property hasTelemedicineAccess == true
 */

import { Button, Card, List, Space, Tag, Typography } from 'antd';
import { VideoCameraOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface VirtualVisit {
  id: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'waiting' | 'scheduled' | 'in-progress';
}

const VIRTUAL_VISITS: VirtualVisit[] = [
  { id: 'tv-1', patientName: 'Margaret Wilson', time: '10:30 AM', reason: 'Follow-up: Hypertension', status: 'waiting' },
  { id: 'tv-2', patientName: 'Robert Garcia', time: '11:15 AM', reason: 'Medication Review', status: 'scheduled' },
  { id: 'tv-3', patientName: 'Lisa Park', time: '1:00 PM', reason: 'Post-Op Check', status: 'scheduled' },
  { id: 'tv-4', patientName: 'David Kim', time: '2:30 PM', reason: 'Lab Results Review', status: 'scheduled' },
];

function getStatusTag(status: VirtualVisit['status']) {
  switch (status) {
    case 'waiting':
      return <Tag color="orange">In Waiting Room</Tag>;
    case 'in-progress':
      return <Tag color="green">In Progress</Tag>;
    default:
      return <Tag color="blue">Scheduled</Tag>;
  }
}

interface TelemedicinePanelProps {
  maxConcurrentSessions: number;
}

export function TelemedicinePanel({ maxConcurrentSessions }: TelemedicinePanelProps) {
  const waitingCount = VIRTUAL_VISITS.filter(v => v.status === 'waiting').length;
  const activeCount = VIRTUAL_VISITS.filter(v => v.status === 'in-progress').length;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* Capacity & Waiting Room Status */}
      <div
        style={{
          background: waitingCount > 0 ? '#fff7e6' : '#f6ffed',
          border: `1px solid ${waitingCount > 0 ? '#ffd591' : '#b7eb8f'}`,
          borderRadius: 8,
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space>
          <VideoCameraOutlined style={{ fontSize: 20, color: '#0891b2' }} />
          <div>
            <Text strong>Virtual Waiting Room</Text>
            <br />
            <Text type="secondary">
              {waitingCount > 0
                ? `${waitingCount} patient${waitingCount > 1 ? 's' : ''} waiting`
                : 'No patients waiting'}
              {' — '}
              {activeCount}/{maxConcurrentSessions} session slots in use
            </Text>
          </div>
        </Space>
        {waitingCount > 0 && activeCount < maxConcurrentSessions && (
          <Button type="primary" icon={<VideoCameraOutlined />}>
            Start Next Visit
          </Button>
        )}
        {activeCount >= maxConcurrentSessions && (
          <Tag color="red">At Capacity</Tag>
        )}
      </div>

      {/* Upcoming Virtual Visits */}
      <List
        size="small"
        dataSource={VIRTUAL_VISITS}
        renderItem={(visit) => (
          <List.Item
            actions={[
              visit.status === 'waiting' ? (
                <Button type="primary" size="small" icon={<VideoCameraOutlined />}>
                  Join
                </Button>
              ) : (
                <Button size="small" disabled>
                  <ClockCircleOutlined /> {visit.time}
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<UserOutlined style={{ fontSize: 16, color: '#8c8c8c' }} />}
              title={visit.patientName}
              description={
                <Space>
                  <Text type="secondary">{visit.reason}</Text>
                  {getStatusTag(visit.status)}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Space>
  );
}
