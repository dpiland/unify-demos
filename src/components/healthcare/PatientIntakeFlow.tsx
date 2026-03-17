/**
 * PatientIntakeFlow Component
 *
 * Interactive multi-step patient check-in workflow.
 * Replaces paper forms with digital intake: Demographics > Insurance > Chief Complaint > Vitals > Complete.
 *
 * FEATURE FLAG: enablePatientIntake (boolean)
 */

import { useState } from 'react';
import { Alert, Button, Card, Descriptions, Space, Steps, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  FormOutlined,
  HeartOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const INTAKE_STEPS = [
  {
    title: 'Demographics',
    icon: <UserOutlined />,
    content: {
      items: [
        { label: 'Patient Name', children: 'Margaret Wilson' },
        { label: 'Date of Birth', children: '06/15/1967' },
        { label: 'Phone', children: '(555) 234-8901' },
        { label: 'Email', children: 'm.wilson@email.com' },
        { label: 'Address', children: '742 Oak Lane, Springfield, IL 62704' },
        { label: 'Emergency Contact', children: 'Thomas Wilson — (555) 234-8902' },
      ],
    },
  },
  {
    title: 'Insurance',
    icon: <SafetyCertificateOutlined />,
    content: {
      items: [
        { label: 'Primary Insurance', children: 'BlueCross BlueShield' },
        { label: 'Policy Number', children: 'BCB-4429871' },
        { label: 'Group Number', children: 'GRP-110056' },
        { label: 'Copay', children: '$25.00' },
        { label: 'Authorization', children: <Tag color="green">Pre-Authorized</Tag> },
        { label: 'Eligibility', children: <Tag color="green">Verified</Tag> },
      ],
    },
  },
  {
    title: 'Chief Complaint',
    icon: <FormOutlined />,
    content: {
      items: [
        { label: 'Reason for Visit', children: 'Follow-up: Hypertension management' },
        { label: 'Symptom Duration', children: 'Ongoing — managed for 3 years' },
        { label: 'Pain Level', children: '2/10 — mild headache occasionally' },
        { label: 'Current Medications', children: 'Lisinopril 10mg daily, Amlodipine 5mg daily' },
        { label: 'Allergies', children: <Tag color="orange">Sulfa drugs</Tag> },
        { label: 'Recent Changes', children: 'Patient reports occasional dizziness in the morning' },
      ],
    },
  },
  {
    title: 'Vitals',
    icon: <HeartOutlined />,
    content: {
      items: [
        { label: 'Blood Pressure', children: <Text strong style={{ color: '#f59e0b' }}>142/88 mmHg</Text> },
        { label: 'Heart Rate', children: '76 bpm' },
        { label: 'Temperature', children: '98.4 F' },
        { label: 'SpO2', children: '98%' },
        { label: 'Weight', children: '168 lbs (down 3 lbs from last visit)' },
        { label: 'BMI', children: '27.1' },
      ],
    },
  },
];

export function PatientIntakeFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  const handleReset = () => {
    setIsOpen(false);
    setCurrentStep(0);
    setCompleted(false);
  };

  if (!isOpen) {
    return (
      <div style={{
        padding: '12px 16px',
        background: '#ecfeff',
        border: '1px solid #a5f3fc',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <Space>
          <IdcardOutlined style={{ fontSize: 18, color: '#0891b2' }} />
          <div>
            <Text strong>Digital Patient Intake</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>Start a new patient check-in workflow</Text>
          </div>
        </Space>
        <Button type="primary" icon={<FormOutlined />} onClick={() => setIsOpen(true)}>
          Start Intake
        </Button>
      </div>
    );
  }

  if (completed) {
    return (
      <Card
        size="small"
        style={{ marginBottom: 16, border: '1px solid #b7eb8f' }}
      >
        <Alert
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          message="Patient Check-In Complete"
          description="Margaret Wilson has been checked in. Vitals recorded, insurance verified, and chief complaint documented."
          action={
            <Button size="small" onClick={handleReset}>
              New Intake
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <Card
      size="small"
      title={
        <Space>
          <IdcardOutlined style={{ color: '#0891b2' }} />
          <span>Patient Intake — Margaret Wilson</span>
          <Tag color="processing">In Progress</Tag>
        </Space>
      }
      extra={<Button size="small" onClick={handleReset}>Cancel</Button>}
      style={{ marginBottom: 16 }}
    >
      <Steps
        current={currentStep}
        size="small"
        items={INTAKE_STEPS.map((step) => ({
          title: step.title,
          icon: step.icon,
        }))}
        style={{ marginBottom: 20 }}
      />

      <Card
        size="small"
        style={{ background: '#fafafa', marginBottom: 16 }}
        title={
          <Space>
            {INTAKE_STEPS[currentStep].icon}
            <span>{INTAKE_STEPS[currentStep].title}</span>
          </Space>
        }
      >
        <Descriptions
          column={2}
          size="small"
          items={INTAKE_STEPS[currentStep].content.items.map((item, idx) => ({
            key: idx,
            label: item.label,
            children: item.children,
          }))}
        />
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Previous
        </Button>
        {currentStep < INTAKE_STEPS.length - 1 ? (
          <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </Button>
        ) : (
          <Button type="primary" icon={<CheckCircleOutlined />} onClick={handleComplete}>
            Complete Check-In
          </Button>
        )}
      </div>
    </Card>
  );
}
