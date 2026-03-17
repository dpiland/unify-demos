/**
 * CarePlanCard Component
 *
 * Displays active care plans with goals, progress, and assigned tasks.
 *
 * FEATURE FLAG: enableCarePlans (boolean)
 */

import { List, Progress, Space, Tag, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CarePlan {
  id: string;
  patientName: string;
  diagnosis: string;
  goals: string[];
  progress: number;
  lastUpdated: string;
  status: 'on-track' | 'at-risk' | 'overdue';
}

const CARE_PLANS: CarePlan[] = [
  {
    id: 'cp-1',
    patientName: 'Harold Jenkins',
    diagnosis: 'Type 2 Diabetes',
    goals: ['A1C below 7.0', 'Daily glucose monitoring', 'Nutrition counseling'],
    progress: 45,
    lastUpdated: '2 days ago',
    status: 'at-risk',
  },
  {
    id: 'cp-2',
    patientName: 'Dorothy Price',
    diagnosis: 'Congestive Heart Failure',
    goals: ['Daily weight monitoring', 'Sodium restriction', 'Medication adherence'],
    progress: 70,
    lastUpdated: '1 day ago',
    status: 'on-track',
  },
  {
    id: 'cp-3',
    patientName: 'Frank Russo',
    diagnosis: 'Hyperlipidemia',
    goals: ['LDL below 100', 'Statin adherence', 'Exercise 150 min/week'],
    progress: 30,
    lastUpdated: '5 days ago',
    status: 'overdue',
  },
  {
    id: 'cp-4',
    patientName: 'Lisa Park',
    diagnosis: 'Post-Op Knee Replacement',
    goals: ['Physical therapy 3x/week', 'Pain management', 'ROM > 120 degrees'],
    progress: 85,
    lastUpdated: 'Today',
    status: 'on-track',
  },
];

function getStatusTag(status: CarePlan['status']) {
  switch (status) {
    case 'on-track':
      return <Tag color="green" icon={<CheckCircleOutlined />}>On Track</Tag>;
    case 'at-risk':
      return <Tag color="orange">At Risk</Tag>;
    case 'overdue':
      return <Tag color="red" icon={<ClockCircleOutlined />}>Overdue</Tag>;
  }
}

export function CarePlanCard() {
  return (
    <List
      size="small"
      dataSource={CARE_PLANS}
      renderItem={(plan) => (
        <List.Item>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <Text strong>{plan.patientName}</Text>
              {getStatusTag(plan.status)}
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>{plan.diagnosis}</Text>
            <Progress
              percent={plan.progress}
              size="small"
              status={plan.status === 'overdue' ? 'exception' : plan.progress === 100 ? 'success' : 'active'}
              style={{ marginTop: 4 }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>Updated {plan.lastUpdated}</Text>
          </div>
        </List.Item>
      )}
    />
  );
}
