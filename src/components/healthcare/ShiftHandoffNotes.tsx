/**
 * ShiftHandoffNotes Component
 *
 * Timeline of clinical handoff notes from shift transitions.
 * Shows what the previous shift left for the current provider.
 *
 * Visible when clinicalWorkflow !== 'standard' (streamlined/guided modes)
 */

import { Button, Card, Space, Tag, Timeline, Typography } from 'antd';
import {
  ClockCircleOutlined,
  SwapOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface HandoffNote {
  id: string;
  provider: string;
  time: string;
  patient: string;
  note: string;
  urgency: 'routine' | 'important' | 'urgent';
}

const HANDOFF_NOTES: HandoffNote[] = [
  {
    id: 'h-1',
    provider: 'Dr. Rivera',
    time: '7:00 AM',
    patient: 'Harold Jenkins',
    note: 'Potassium 6.2 — repeat labs ordered for 8:00 AM. If still elevated, consult nephrology. Patient is aware and NPO.',
    urgency: 'urgent',
  },
  {
    id: 'h-2',
    provider: 'Dr. Rivera',
    time: '7:00 AM',
    patient: 'Dorothy Price',
    note: 'New onset SOB overnight. Chest X-ray ordered — results pending. O2 sat stable at 95% on 2L NC. Cardiology aware.',
    urgency: 'important',
  },
  {
    id: 'h-3',
    provider: 'NP Thompson',
    time: '7:15 AM',
    patient: 'Betty Simmons',
    note: 'PT session went well yesterday. Pain well-controlled on current regimen. Discharge planning meeting scheduled for 10 AM.',
    urgency: 'routine',
  },
  {
    id: 'h-4',
    provider: 'Dr. Rivera',
    time: '7:00 AM',
    patient: 'Wayne Collins',
    note: 'Blood glucose trending up overnight (180-220). Endocrine consult recommended. Patient compliant with diet.',
    urgency: 'important',
  },
];

function getUrgencyColor(urgency: HandoffNote['urgency']) {
  switch (urgency) {
    case 'urgent': return 'red';
    case 'important': return 'orange';
    default: return 'blue';
  }
}

function getTimelineDotColor(urgency: HandoffNote['urgency']) {
  switch (urgency) {
    case 'urgent': return '#ef4444';
    case 'important': return '#f59e0b';
    default: return '#0891b2';
  }
}

export function ShiftHandoffNotes() {
  return (
    <Card
      size="small"
      title={
        <Space>
          <SwapOutlined style={{ color: '#f59e0b' }} />
          <span>Shift Handoff Notes</span>
          <Tag color="orange" style={{ fontSize: 10 }}>Night → Day</Tag>
        </Space>
      }
      extra={
        <Button type="primary" size="small" icon={<SwapOutlined />}>
          Start New Handoff
        </Button>
      }
      style={{ marginTop: 16 }}
    >
      <Timeline
        items={HANDOFF_NOTES.map((note) => ({
          color: getTimelineDotColor(note.urgency),
          dot: note.urgency === 'urgent' ? <WarningOutlined style={{ color: '#ef4444' }} /> : undefined,
          children: (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Space size={4}>
                  <Text strong style={{ fontSize: 13 }}>{note.patient}</Text>
                  <Tag color={getUrgencyColor(note.urgency)} style={{ fontSize: 10 }}>
                    {note.urgency.toUpperCase()}
                  </Tag>
                </Space>
                <Space size={4}>
                  <ClockCircleOutlined style={{ color: '#8c8c8c', fontSize: 11 }} />
                  <Text type="secondary" style={{ fontSize: 11 }}>{note.provider} — {note.time}</Text>
                </Space>
              </div>
              <Text style={{ fontSize: 13 }}>{note.note}</Text>
            </div>
          ),
        }))}
      />
    </Card>
  );
}
