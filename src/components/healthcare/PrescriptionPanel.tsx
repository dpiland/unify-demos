/**
 * PrescriptionPanel Component
 *
 * Shows pending refill requests, recent prescriptions, and alerts.
 *
 * FEATURE FLAG: enablePrescriptions (boolean)
 * DOUBLE-GATE: Also requires user property canPrescribe == true
 */

import { Badge, Button, List, Space, Tag, Typography } from 'antd';
import { MedicineBoxOutlined, WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface PrescriptionRequest {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  type: 'refill' | 'new' | 'change';
  urgency: 'routine' | 'urgent';
  hasInteraction: boolean;
}

const PRESCRIPTION_REQUESTS: PrescriptionRequest[] = [
  { id: 'rx-1', patientName: 'Margaret Wilson', medication: 'Lisinopril', dosage: '20mg daily', type: 'refill', urgency: 'routine', hasInteraction: false },
  { id: 'rx-2', patientName: 'Robert Garcia', medication: 'Metformin', dosage: '1000mg BID', type: 'refill', urgency: 'routine', hasInteraction: false },
  { id: 'rx-3', patientName: 'Harold Jenkins', medication: 'Warfarin', dosage: '5mg daily', type: 'change', urgency: 'urgent', hasInteraction: true },
  { id: 'rx-4', patientName: 'Betty Simmons', medication: 'Atorvastatin', dosage: '40mg daily', type: 'new', urgency: 'routine', hasInteraction: false },
  { id: 'rx-5', patientName: 'Frank Russo', medication: 'Amlodipine', dosage: '10mg daily', type: 'refill', urgency: 'routine', hasInteraction: false },
];

function getTypeTag(type: PrescriptionRequest['type']) {
  switch (type) {
    case 'refill':
      return <Tag color="blue">Refill</Tag>;
    case 'new':
      return <Tag color="green">New Rx</Tag>;
    case 'change':
      return <Tag color="orange">Change</Tag>;
  }
}

export function PrescriptionPanel() {
  const urgentCount = PRESCRIPTION_REQUESTS.filter(r => r.urgency === 'urgent').length;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text type="secondary">{PRESCRIPTION_REQUESTS.length} pending requests</Text>
        {urgentCount > 0 && (
          <Badge count={urgentCount} style={{ backgroundColor: '#f5222d' }}>
            <Tag color="red">Urgent</Tag>
          </Badge>
        )}
      </div>

      {/* Request list */}
      <List
        size="small"
        dataSource={PRESCRIPTION_REQUESTS}
        renderItem={(request) => (
          <List.Item
            actions={[
              <Button type="primary" size="small">
                Review
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                request.hasInteraction ? (
                  <WarningOutlined style={{ color: '#f5222d', fontSize: 16 }} />
                ) : (
                  <MedicineBoxOutlined style={{ color: '#0891b2', fontSize: 16 }} />
                )
              }
              title={
                <Space>
                  <Text>{request.patientName}</Text>
                  {getTypeTag(request.type)}
                  {request.hasInteraction && <Tag color="red">Interaction Alert</Tag>}
                </Space>
              }
              description={`${request.medication} ${request.dosage}`}
            />
          </List.Item>
        )}
      />
    </Space>
  );
}
