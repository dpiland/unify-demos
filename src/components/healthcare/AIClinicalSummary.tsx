/**
 * AIClinicalSummary Component
 *
 * The "wow" feature — AI-generated visit summaries, clinical notes,
 * and follow-up recommendations. This is the most visually dramatic
 * feature-flagged section and the strongest demo talking point.
 *
 * FEATURE FLAG: enableAIClinicalSummary (boolean)
 * DOUBLE-GATE: Also requires user property isAttending == true
 *
 * DEMO STORY: Provider burnout from documentation is the #1 industry
 * pain point. This feature shows how CloudBees enables careful rollout
 * of high-stakes AI features to senior physicians first.
 */

import { Button, Card, Collapse, Space, Steps, Tag, Typography } from 'antd';
import { RobotOutlined, CheckCircleOutlined, EditOutlined, FileTextOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface AISummary {
  patientName: string;
  visitDate: string;
  chiefComplaint: string;
  generatedNote: string;
  assessment: string;
  plan: string[];
  confidence: number;
  status: 'draft' | 'reviewed' | 'signed';
}

const AI_SUMMARIES: AISummary[] = [
  {
    patientName: 'Harold Jenkins',
    visitDate: 'Today, 8:00 AM',
    chiefComplaint: 'Diabetes follow-up, A1C elevated',
    generatedNote: 'Patient is a 67-year-old male presenting for diabetes management follow-up. Last A1C was 9.1% (up from 7.8% three months ago). Reports inconsistent medication adherence due to side effects from metformin. Denies polyuria, polydipsia, or visual changes. Weight stable at 198 lbs. Foot exam unremarkable.',
    assessment: 'Type 2 Diabetes Mellitus, poorly controlled. Non-adherence likely secondary to GI side effects.',
    plan: [
      'Switch metformin to extended-release formulation to reduce GI side effects',
      'Add GLP-1 receptor agonist (semaglutide 0.25mg weekly) for additional A1C reduction',
      'Repeat A1C in 3 months',
      'Refer to diabetes educator for nutrition counseling',
      'Follow-up in 6 weeks to assess tolerance of new regimen',
    ],
    confidence: 94,
    status: 'draft',
  },
  {
    patientName: 'Lisa Park',
    visitDate: 'Today, 9:00 AM',
    chiefComplaint: 'Post-operative knee replacement check',
    generatedNote: 'Patient is a 51-year-old female, 3 weeks post right total knee arthroplasty. Reports improving pain (4/10, down from 7/10 at last visit). ROM measured at 95 degrees flexion. Incision well-healed, no erythema or drainage. Attending PT 3x/week as prescribed.',
    assessment: 'Post-op TKA, recovering as expected. ROM improving but not yet at goal of 120 degrees.',
    plan: [
      'Continue current PT regimen, increase frequency to 4x/week',
      'Taper opioid to PRN only, transition to scheduled acetaminophen',
      'ROM goal: 110 degrees by 6-week mark',
      'Follow-up in 3 weeks with new X-ray',
    ],
    confidence: 97,
    status: 'reviewed',
  },
  {
    patientName: 'Michael Thompson',
    visitDate: 'Today, 8:30 AM',
    chiefComplaint: 'CKD follow-up, new lab results',
    generatedNote: 'Patient is a 48-year-old male with Stage 3b CKD (eGFR 38, down from 42 six months ago). Potassium elevated at 6.2 mEq/L (critical). BP 148/92. Currently on lisinopril 20mg, amlodipine 10mg. Reports compliance with low-sodium diet but admits to increased potassium-rich food intake.',
    assessment: 'CKD Stage 3b with progressive decline. Hyperkalemia requiring urgent intervention. Hypertension suboptimally controlled.',
    plan: [
      'URGENT: Sodium polystyrene sulfonate for acute hyperkalemia',
      'Reduce lisinopril to 10mg (contributing to hyperkalemia)',
      'Add sodium bicarbonate 650mg TID',
      'Strict dietary potassium restriction counseling',
      'Repeat BMP in 48 hours',
      'Nephrology referral for co-management',
    ],
    confidence: 91,
    status: 'draft',
  },
];

function getStatusTag(status: AISummary['status']) {
  switch (status) {
    case 'signed':
      return <Tag color="green" icon={<CheckCircleOutlined />}>Signed</Tag>;
    case 'reviewed':
      return <Tag color="blue" icon={<EditOutlined />}>Reviewed</Tag>;
    default:
      return <Tag color="orange" icon={<RobotOutlined />}>AI Draft</Tag>;
  }
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 95) return '#52c41a';
  if (confidence >= 90) return '#0891b2';
  return '#faad14';
}

export function AIClinicalSummary() {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {/* Feature header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #ecfeff 0%, #f0fdf4 100%)',
          border: '1px solid #a5f3fc',
          borderRadius: 8,
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Space>
          <ThunderboltOutlined style={{ fontSize: 20, color: '#0891b2' }} />
          <div>
            <Text strong>AI Documentation Assistant</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {AI_SUMMARIES.length} visit notes generated today — {AI_SUMMARIES.filter(s => s.status === 'draft').length} awaiting review
            </Text>
          </div>
        </Space>
        <Tag color="cyan">Beta</Tag>
      </div>

      {/* AI-generated summaries */}
      <Collapse
        accordion
        items={AI_SUMMARIES.map((summary, index) => ({
          key: String(index),
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingRight: 8 }}>
              <Space>
                <Text strong>{summary.patientName}</Text>
                <Text type="secondary">— {summary.chiefComplaint}</Text>
              </Space>
              <Space>
                <Tag style={{ color: getConfidenceColor(summary.confidence), borderColor: getConfidenceColor(summary.confidence) }}>
                  {summary.confidence}% confidence
                </Tag>
                {getStatusTag(summary.status)}
              </Space>
            </div>
          ),
          children: (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* Visit info */}
              <Text type="secondary">{summary.visitDate}</Text>

              {/* Generated note */}
              <div>
                <Text strong style={{ fontSize: 12, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Clinical Note
                </Text>
                <Paragraph style={{ background: '#fafafa', padding: 12, borderRadius: 6, marginTop: 4, marginBottom: 0 }}>
                  {summary.generatedNote}
                </Paragraph>
              </div>

              {/* Assessment */}
              <div>
                <Text strong style={{ fontSize: 12, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Assessment
                </Text>
                <Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                  {summary.assessment}
                </Paragraph>
              </div>

              {/* Plan */}
              <div>
                <Text strong style={{ fontSize: 12, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Plan
                </Text>
                <Steps
                  direction="vertical"
                  size="small"
                  current={-1}
                  style={{ marginTop: 8 }}
                  items={summary.plan.map((step) => ({
                    title: step,
                    status: 'wait' as const,
                  }))}
                />
              </div>

              {/* Actions */}
              <Space>
                <Button type="primary" icon={<CheckCircleOutlined />}>
                  Approve & Sign
                </Button>
                <Button icon={<EditOutlined />}>
                  Edit Note
                </Button>
              </Space>
            </Space>
          ),
        }))}
      />
    </Space>
  );
}
