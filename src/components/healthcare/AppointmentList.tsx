/**
 * AppointmentList Component
 *
 * Displays upcoming appointments in three view modes:
 * calendar (mini grid), list (chronological), or timeline (color-coded).
 *
 * FEATURE FLAG: appointmentViewMode (string: 'calendar' | 'list' | 'timeline')
 */

import { Badge, Calendar, Card, Col, List, Row, Space, Tag, Timeline, Typography } from 'antd';
import { ClockCircleOutlined, UserOutlined, VideoCameraOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

export interface Appointment {
  id: string;
  patientName: string;
  patientMrn: string;
  type: 'in-person' | 'telehealth' | 'follow-up';
  time: string;
  duration: string;
  reason: string;
  status: 'confirmed' | 'checked-in' | 'in-progress' | 'completed';
}

function getTypeIcon(type: Appointment['type']) {
  switch (type) {
    case 'telehealth':
      return <VideoCameraOutlined style={{ color: '#0891b2' }} />;
    case 'follow-up':
      return <ClockCircleOutlined style={{ color: '#faad14' }} />;
    default:
      return <UserOutlined style={{ color: '#52c41a' }} />;
  }
}

function getTypeTag(type: Appointment['type']) {
  switch (type) {
    case 'telehealth':
      return <Tag color="cyan">Telehealth</Tag>;
    case 'follow-up':
      return <Tag color="orange">Follow-Up</Tag>;
    default:
      return <Tag color="green">In-Person</Tag>;
  }
}

function getStatusTag(status: Appointment['status']) {
  switch (status) {
    case 'checked-in':
      return <Tag color="blue">Checked In</Tag>;
    case 'in-progress':
      return <Tag color="green">In Progress</Tag>;
    case 'completed':
      return <Tag>Completed</Tag>;
    default:
      return <Tag color="default">Confirmed</Tag>;
  }
}

function getTimelineColor(type: Appointment['type']): string {
  switch (type) {
    case 'telehealth': return '#0891b2';
    case 'follow-up': return '#faad14';
    default: return '#52c41a';
  }
}

interface AppointmentListProps {
  appointments: Appointment[];
  viewMode: string;
}

function ListView({ appointments }: { appointments: Appointment[] }) {
  return (
    <List
      dataSource={appointments}
      renderItem={(apt) => (
        <List.Item>
          <List.Item.Meta
            avatar={getTypeIcon(apt.type)}
            title={
              <Space>
                <Text strong>{apt.time}</Text>
                <Text>{apt.patientName}</Text>
                {getTypeTag(apt.type)}
                {getStatusTag(apt.status)}
              </Space>
            }
            description={
              <Space>
                <Text type="secondary">{apt.reason}</Text>
                <Text type="secondary">({apt.duration})</Text>
                <Text type="secondary">MRN: {apt.patientMrn}</Text>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
}

function TimelineView({ appointments }: { appointments: Appointment[] }) {
  return (
    <Timeline
      items={appointments.map((apt) => ({
        color: getTimelineColor(apt.type),
        children: (
          <div>
            <Space>
              <Text strong>{apt.time}</Text>
              <Text>{apt.patientName}</Text>
              {getTypeTag(apt.type)}
            </Space>
            <br />
            <Text type="secondary">{apt.reason} — {apt.duration}</Text>
          </div>
        ),
      }))}
    />
  );
}

function CalendarView({ appointments }: { appointments: Appointment[] }) {
  const today = dayjs();
  const todayCount = appointments.length;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* Today's summary */}
      <Card size="small" style={{ background: '#ecfeff' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Text strong style={{ fontSize: 24 }}>{todayCount}</Text>
            <br />
            <Text type="secondary">Total Today</Text>
          </Col>
          <Col span={8}>
            <Text strong style={{ fontSize: 24 }}>{appointments.filter(a => a.type === 'telehealth').length}</Text>
            <br />
            <Text type="secondary">Telehealth</Text>
          </Col>
          <Col span={8}>
            <Text strong style={{ fontSize: 24 }}>{appointments.filter(a => a.type === 'in-person').length}</Text>
            <br />
            <Text type="secondary">In-Person</Text>
          </Col>
        </Row>
      </Card>

      {/* Compact list below */}
      {appointments.map((apt) => (
        <div key={apt.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
          {getTypeIcon(apt.type)}
          <Text strong style={{ minWidth: 65 }}>{apt.time}</Text>
          <Text>{apt.patientName}</Text>
          <Text type="secondary">— {apt.reason}</Text>
        </div>
      ))}
    </Space>
  );
}

export function AppointmentList({ appointments, viewMode }: AppointmentListProps) {
  switch (viewMode) {
    case 'timeline':
      return <TimelineView appointments={appointments} />;
    case 'calendar':
      return <CalendarView appointments={appointments} />;
    case 'list':
    default:
      return <ListView appointments={appointments} />;
  }
}
