/**
 * PatientInsightsPanel Component
 *
 * Displays AI-driven patient risk scores, trending conditions,
 * and care gap alerts. Uses riskScoreThreshold to filter patients.
 *
 * FEATURE FLAG: showPatientInsights (boolean)
 * NUMBER FLAG: riskScoreThreshold (number) controls which patients are highlighted
 */

import { List, Progress, Space, Tag, Typography } from 'antd';
import { WarningOutlined, RiseOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface RiskPatient {
  name: string;
  riskScore: number;
  reason: string;
  trend: 'rising' | 'stable' | 'declining';
}

const RISK_PATIENTS: RiskPatient[] = [
  { name: 'Harold Jenkins', riskScore: 9, reason: 'Uncontrolled A1C + missed appointments', trend: 'rising' },
  { name: 'Dorothy Price', riskScore: 8, reason: 'Recent ER visit, CHF exacerbation', trend: 'rising' },
  { name: 'Frank Russo', riskScore: 7, reason: 'Non-adherent to statin therapy', trend: 'stable' },
  { name: 'Betty Simmons', riskScore: 6, reason: 'Overdue for annual wellness visit', trend: 'stable' },
  { name: 'Wayne Collins', riskScore: 5, reason: 'BMI > 35, pre-diabetic', trend: 'declining' },
  { name: 'Joyce Yamamoto', riskScore: 4, reason: 'Mild depression screening positive', trend: 'stable' },
];

function getRiskColor(score: number): string {
  if (score >= 8) return '#f5222d';
  if (score >= 6) return '#faad14';
  if (score >= 4) return '#1890ff';
  return '#52c41a';
}

function getTrendTag(trend: RiskPatient['trend']) {
  switch (trend) {
    case 'rising':
      return <Tag color="red" icon={<RiseOutlined />}>Rising</Tag>;
    case 'declining':
      return <Tag color="green">Improving</Tag>;
    default:
      return <Tag>Stable</Tag>;
  }
}

interface PatientInsightsPanelProps {
  riskScoreThreshold: number;
}

export function PatientInsightsPanel({ riskScoreThreshold }: PatientInsightsPanelProps) {
  const filteredPatients = RISK_PATIENTS.filter(p => p.riskScore >= riskScoreThreshold);

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* Threshold indicator */}
      <div style={{ background: '#fafafa', padding: 12, borderRadius: 6 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          Showing patients with risk score {riskScoreThreshold}+ ({filteredPatients.length} of {RISK_PATIENTS.length})
        </Text>
      </div>

      {/* Risk patient list */}
      <List
        size="small"
        dataSource={filteredPatients}
        locale={{ emptyText: 'No patients above current risk threshold' }}
        renderItem={(patient) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Space>
                  {patient.riskScore >= 8 && <WarningOutlined style={{ color: '#f5222d' }} />}
                  <Text strong>{patient.name}</Text>
                </Space>
                {getTrendTag(patient.trend)}
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>{patient.reason}</Text>
              <Progress
                percent={patient.riskScore * 10}
                size="small"
                strokeColor={getRiskColor(patient.riskScore)}
                format={() => `${patient.riskScore}/10`}
                style={{ marginTop: 4 }}
              />
            </div>
          </List.Item>
        )}
      />
    </Space>
  );
}
