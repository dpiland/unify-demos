/**
 * Main Application - MedConnect Provider Portal
 *
 * A professional healthcare provider dashboard that uses CloudBees Feature Management
 * to deliver role-based clinical features for physicians, nurses, and residents.
 *
 * FEATURE FLAGS IN USE:
 * - Boolean: enableTelemedicine, showPatientInsights, enableCarePlans, showClinicalAlerts, enablePrescriptions, enableAIClinicalSummary, enableNotificationCenter, enablePatientIntake, enablePatientMessaging
 * - String: clinicalWorkflow, patientChartView, appointmentViewMode, qualityDashboardView
 * - Number: patientsPerPage, maxConcurrentTelehealthSessions, riskScoreThreshold, notificationDisplayCount
 *
 * USER TARGETING:
 * - Primary care physicians: Full clinical toolset
 * - Specialists/Surgeons: Admin access + advanced features
 * - Nurse practitioners: Prescribing + telemedicine, no admin
 * - Residents: Restricted access (no prescribing, no telemedicine)
 */

import { useState } from 'react';
import { Alert, Card, Col, Layout, List, Row, Space, Statistic, Steps, Table, Tabs, Tag, Typography } from 'antd';
import {
  BarChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  MessageOutlined,
  RobotOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { loadCurrentUser } from './lib/users';
import { ClinicalAlertBanner } from './components/healthcare/ClinicalAlertBanner';
import { TelemedicinePanel } from './components/healthcare/TelemedicinePanel';
import { PatientInsightsPanel } from './components/healthcare/PatientInsightsPanel';
import { CarePlanCard } from './components/healthcare/CarePlanCard';
import { PrescriptionPanel } from './components/healthcare/PrescriptionPanel';
import { LabResultsCard } from './components/healthcare/LabResultsCard';
import { AIClinicalSummary } from './components/healthcare/AIClinicalSummary';
import { AppointmentList, type Appointment } from './components/healthcare/AppointmentList';
import { NotificationCenter } from './components/healthcare/NotificationCenter';
import { QualityMetricsDashboard } from './components/healthcare/QualityMetricsDashboard';
import { PatientIntakeFlow } from './components/healthcare/PatientIntakeFlow';
import { PatientMessagingInbox } from './components/healthcare/PatientMessagingInbox';
import { ShiftHandoffNotes } from './components/healthcare/ShiftHandoffNotes';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// ============================================
// DATA INTERFACES
// ============================================

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  mrn: string;
  condition: string;
  riskScore: number;
  lastVisit: string;
  nextAppointment: string;
  status: 'stable' | 'needs-attention' | 'critical' | 'discharged';
  insuranceType: string;
}

// ============================================
// SAMPLE DATA
// ============================================

const PATIENT_DATA: Patient[] = [
  { id: 'p-01', name: 'Harold Jenkins', age: 67, gender: 'M', mrn: 'MRN-100234', condition: 'Type 2 Diabetes', riskScore: 9, lastVisit: '2 days ago', nextAppointment: 'Mar 18', status: 'critical', insuranceType: 'Medicare' },
  { id: 'p-02', name: 'Dorothy Price', age: 74, gender: 'F', mrn: 'MRN-100456', condition: 'Congestive Heart Failure', riskScore: 8, lastVisit: 'Yesterday', nextAppointment: 'Mar 19', status: 'needs-attention', insuranceType: 'Medicare' },
  { id: 'p-03', name: 'Margaret Wilson', age: 58, gender: 'F', mrn: 'MRN-100789', condition: 'Hypertension', riskScore: 5, lastVisit: 'Today', nextAppointment: 'Apr 2', status: 'stable', insuranceType: 'BlueCross' },
  { id: 'p-04', name: 'Robert Garcia', age: 45, gender: 'M', mrn: 'MRN-101023', condition: 'Type 2 Diabetes', riskScore: 4, lastVisit: '1 week ago', nextAppointment: 'Mar 20', status: 'stable', insuranceType: 'Aetna' },
  { id: 'p-05', name: 'Frank Russo', age: 62, gender: 'M', mrn: 'MRN-101234', condition: 'Hyperlipidemia', riskScore: 7, lastVisit: '5 days ago', nextAppointment: 'Mar 22', status: 'needs-attention', insuranceType: 'UnitedHealth' },
  { id: 'p-06', name: 'Lisa Park', age: 51, gender: 'F', mrn: 'MRN-101456', condition: 'Post-Op Knee Replacement', riskScore: 3, lastVisit: 'Today', nextAppointment: 'Mar 23', status: 'stable', insuranceType: 'Cigna' },
  { id: 'p-07', name: 'Betty Simmons', age: 70, gender: 'F', mrn: 'MRN-101678', condition: 'Osteoarthritis', riskScore: 6, lastVisit: '3 days ago', nextAppointment: 'Mar 25', status: 'needs-attention', insuranceType: 'Medicare' },
  { id: 'p-08', name: 'David Kim', age: 39, gender: 'M', mrn: 'MRN-101890', condition: 'Hypothyroidism', riskScore: 2, lastVisit: '2 weeks ago', nextAppointment: 'Apr 5', status: 'stable', insuranceType: 'Aetna' },
  { id: 'p-09', name: 'Wayne Collins', age: 55, gender: 'M', mrn: 'MRN-102012', condition: 'Pre-Diabetes / Obesity', riskScore: 5, lastVisit: '1 week ago', nextAppointment: 'Mar 28', status: 'needs-attention', insuranceType: 'BlueCross' },
  { id: 'p-10', name: 'Joyce Yamamoto', age: 33, gender: 'F', mrn: 'MRN-102234', condition: 'Depression', riskScore: 4, lastVisit: '4 days ago', nextAppointment: 'Mar 30', status: 'stable', insuranceType: 'UnitedHealth' },
  { id: 'p-11', name: 'Michael Thompson', age: 48, gender: 'M', mrn: 'MRN-102456', condition: 'Chronic Kidney Disease', riskScore: 8, lastVisit: 'Today', nextAppointment: 'Mar 17', status: 'critical', insuranceType: 'Medicare' },
  { id: 'p-12', name: 'Susan Martinez', age: 61, gender: 'F', mrn: 'MRN-102678', condition: 'COPD', riskScore: 6, lastVisit: '3 days ago', nextAppointment: 'Mar 26', status: 'needs-attention', insuranceType: 'Cigna' },
  { id: 'p-13', name: 'James O\'Brien', age: 72, gender: 'M', mrn: 'MRN-102890', condition: 'Atrial Fibrillation', riskScore: 7, lastVisit: '1 week ago', nextAppointment: 'Mar 24', status: 'needs-attention', insuranceType: 'Medicare' },
  { id: 'p-14', name: 'Angela Foster', age: 28, gender: 'F', mrn: 'MRN-103012', condition: 'Asthma', riskScore: 2, lastVisit: '2 weeks ago', nextAppointment: 'Apr 10', status: 'stable', insuranceType: 'BlueCross' },
  { id: 'p-15', name: 'Richard Nguyen', age: 56, gender: 'M', mrn: 'MRN-103234', condition: 'Chronic Back Pain', riskScore: 3, lastVisit: '1 week ago', nextAppointment: 'Apr 1', status: 'stable', insuranceType: 'Aetna' },
];

const APPOINTMENT_DATA: Appointment[] = [
  { id: 'apt-1', patientName: 'Harold Jenkins', patientMrn: 'MRN-100234', type: 'in-person', time: '8:00 AM', duration: '30 min', reason: 'Diabetes Management', status: 'completed' },
  { id: 'apt-2', patientName: 'Michael Thompson', patientMrn: 'MRN-102456', type: 'in-person', time: '8:30 AM', duration: '30 min', reason: 'CKD Follow-Up', status: 'completed' },
  { id: 'apt-3', patientName: 'Lisa Park', patientMrn: 'MRN-101456', type: 'follow-up', time: '9:00 AM', duration: '20 min', reason: 'Post-Op Check', status: 'in-progress' },
  { id: 'apt-4', patientName: 'Margaret Wilson', patientMrn: 'MRN-100789', type: 'telehealth', time: '10:30 AM', duration: '20 min', reason: 'BP Follow-Up', status: 'confirmed' },
  { id: 'apt-5', patientName: 'Robert Garcia', patientMrn: 'MRN-101023', type: 'telehealth', time: '11:15 AM', duration: '15 min', reason: 'Medication Review', status: 'confirmed' },
  { id: 'apt-6', patientName: 'Dorothy Price', patientMrn: 'MRN-100456', type: 'in-person', time: '1:00 PM', duration: '30 min', reason: 'CHF Management', status: 'confirmed' },
  { id: 'apt-7', patientName: 'Frank Russo', patientMrn: 'MRN-101234', type: 'follow-up', time: '1:45 PM', duration: '20 min', reason: 'Lipid Panel Review', status: 'confirmed' },
  { id: 'apt-8', patientName: 'David Kim', patientMrn: 'MRN-101890', type: 'telehealth', time: '2:30 PM', duration: '15 min', reason: 'Lab Results Review', status: 'confirmed' },
  { id: 'apt-9', patientName: 'Betty Simmons', patientMrn: 'MRN-101678', type: 'in-person', time: '3:00 PM', duration: '30 min', reason: 'Joint Pain Assessment', status: 'confirmed' },
  { id: 'apt-10', patientName: 'Wayne Collins', patientMrn: 'MRN-102012', type: 'follow-up', time: '3:45 PM', duration: '20 min', reason: 'Weight Management', status: 'confirmed' },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getStatusTag(status: Patient['status']) {
  switch (status) {
    case 'critical':
      return <Tag color="red">Critical</Tag>;
    case 'needs-attention':
      return <Tag color="orange">Needs Attention</Tag>;
    case 'discharged':
      return <Tag>Discharged</Tag>;
    default:
      return <Tag color="green">Stable</Tag>;
  }
}

function getRiskColor(score: number): string {
  if (score >= 8) return '#f5222d';
  if (score >= 6) return '#faad14';
  if (score >= 4) return '#0891b2';
  return '#52c41a';
}

// ============================================
// PATIENT VIEW COMPONENTS
// ============================================

/**
 * Table View — Detailed sortable columns
 * PATTERN: Default patientChartView mode
 */
function PatientTableView({ patients }: { patients: Patient[] }) {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
    { title: 'MRN', dataIndex: 'mrn', key: 'mrn', render: (text: string) => <Text type="secondary">{text}</Text> },
    { title: 'Age/Sex', key: 'demo', render: (_: unknown, r: Patient) => `${r.age}${r.gender}` },
    { title: 'Condition', dataIndex: 'condition', key: 'condition' },
    { title: 'Risk', dataIndex: 'riskScore', key: 'risk', render: (score: number) => <Tag color={getRiskColor(score)}>{score}/10</Tag> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (_: string, r: Patient) => getStatusTag(r.status) },
    { title: 'Next Appt', dataIndex: 'nextAppointment', key: 'next', render: (text: string) => <Text type="secondary">{text}</Text> },
  ];

  return <Table columns={columns} dataSource={patients} rowKey="id" pagination={false} size="small" />;
}

/**
 * Card View — Visual cards with patient summary
 * PATTERN: patientChartView === 'card'
 */
function PatientCardView({ patients }: { patients: Patient[] }) {
  return (
    <Row gutter={[16, 16]}>
      {patients.map((patient) => (
        <Col xs={24} sm={12} lg={8} key={patient.id}>
          <Card size="small" hoverable>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong>{patient.name}</Text>
                {getStatusTag(patient.status)}
              </div>
              <Text type="secondary">{patient.condition}</Text>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">{patient.age}{patient.gender} — {patient.mrn}</Text>
                <Tag color={getRiskColor(patient.riskScore)}>Risk: {patient.riskScore}/10</Tag>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>Next: {patient.nextAppointment}</Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

/**
 * Compact View — Minimal single-line entries
 * PATTERN: patientChartView === 'compact'
 */
function PatientCompactView({ patients }: { patients: Patient[] }) {
  return (
    <List
      size="small"
      dataSource={patients}
      renderItem={(patient) => (
        <List.Item>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <Text strong>{patient.name}</Text>
              <Text type="secondary">{patient.mrn}</Text>
              <Text type="secondary">{patient.condition}</Text>
            </Space>
            <Space>
              <Tag color={getRiskColor(patient.riskScore)}>{patient.riskScore}</Tag>
              {getStatusTag(patient.status)}
            </Space>
          </Space>
        </List.Item>
      )}
    />
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

function App() {
  // ============================================
  // USER CONTEXT
  // ============================================
  const currentUser = loadCurrentUser();

  // ============================================
  // BOOLEAN FLAGS - Feature Toggles
  // ============================================
  const enableTelemedicine = useFeatureFlag('enableTelemedicine');
  const showPatientInsights = useFeatureFlag('showPatientInsights');
  const enableCarePlans = useFeatureFlag('enableCarePlans');
  const showClinicalAlerts = useFeatureFlag('showClinicalAlerts');
  const enablePrescriptions = useFeatureFlag('enablePrescriptions');
  const enableAIClinicalSummary = useFeatureFlag('enableAIClinicalSummary');
  const enableNotificationCenter = useFeatureFlag('enableNotificationCenter');
  const enablePatientIntake = useFeatureFlag('enablePatientIntake');
  const enablePatientMessaging = useFeatureFlag('enablePatientMessaging');

  // ============================================
  // STRING FLAGS - A/B Testing & Variants
  // ============================================
  const clinicalWorkflow = useFeatureFlagString('clinicalWorkflow');
  const patientChartView = useFeatureFlagString('patientChartView');
  const appointmentViewMode = useFeatureFlagString('appointmentViewMode');
  const qualityDashboardView = useFeatureFlagString('qualityDashboardView');

  // ============================================
  // NUMBER FLAGS - Numeric Configuration
  // ============================================
  const patientsPerPage = useFeatureFlagNumber('patientsPerPage');
  const maxConcurrentTelehealthSessions = useFeatureFlagNumber('maxConcurrentTelehealthSessions');
  const riskScoreThreshold = useFeatureFlagNumber('riskScoreThreshold');
  const notificationDisplayCount = useFeatureFlagNumber('notificationDisplayCount');

  // ============================================
  // USER PROPERTIES
  // ============================================
  const userProperties = currentUser?.properties || {
    booleans: {},
    strings: {},
    numbers: {},
  };

  // Active tab state — stat cards can switch tabs
  const [activeTab, setActiveTab] = useState('patients');

  // Slice patient data based on patientsPerPage number flag
  const visiblePatients = PATIENT_DATA.slice(0, patientsPerPage);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        style={{
          background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 50%, #22d3ee 100%)',
          padding: '0 32px',
          height: 72,
          lineHeight: 'normal',
          boxShadow: '0 2px 12px rgba(8, 145, 178, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: 'none',
        }}
      >
        <Space size="middle">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <MedicineBoxOutlined style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <div>
            <Title level={4} style={{ margin: 0, color: '#fff', fontWeight: 600, letterSpacing: '-0.02em' }}>
              MedConnect
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 1 }}>
              Provider Portal
            </Text>
          </div>
        </Space>
        {/* Notification bell — right side of header */}
        {enableNotificationCenter && (
          <NotificationCenter maxItems={notificationDisplayCount} />
        )}
      </Header>

      {/* Main Content Area */}
      <Content style={{ padding: '28px 24px', background: '#f5f7fa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* ============================================ */}
            {/* CLINICAL ALERTS */}
            {/* ============================================ */}
            {/*
              PATTERN: Boolean flag controls clinical alert banner visibility
              USE CASE: Critical lab results, overdue follow-ups, drug interactions
              FLAG: showClinicalAlerts (boolean)
              NOTE: Safety-critical — default is ON
            */}
            {showClinicalAlerts && <ClinicalAlertBanner />}

            {/* ============================================ */}
            {/* CLINICAL WORKFLOW INDICATOR */}
            {/* ============================================ */}
            {/*
              PATTERN: String flag changes the entire workflow experience
              USE CASE: A/B test which documentation workflow reduces burnout
              FLAG: clinicalWorkflow (string: 'standard' | 'streamlined' | 'guided')
              DEMO STORY: "Which workflow reduces documentation time?" — a C-suite decision
            */}
            {clinicalWorkflow !== 'standard' && (
              <Alert
                message={
                  clinicalWorkflow === 'streamlined'
                    ? 'Streamlined Workflow Active'
                    : 'Guided Workflow Active'
                }
                description={
                  clinicalWorkflow === 'streamlined'
                    ? 'Smart defaults enabled — fields auto-populate from patient history. Click any value to override.'
                    : 'Step-by-step guided documentation — follow the checklist to complete each encounter efficiently.'
                }
                type="info"
                showIcon
                icon={<ThunderboltOutlined />}
                closable
                banner
              />
            )}

            {/* ============================================ */}
            {/* PROVIDER STATISTICS */}
            {/* ============================================ */}
            {/*
              PATTERN: Display user-specific metrics from properties
              USE CASE: Personalized dashboard based on provider profile
              DATA SOURCE: currentUser.properties.numbers
            */}
            <Row gutter={[16, 16]}>
              {[
                { key: 'patients', title: 'Total Patients', value: userProperties.numbers.patientPanelSize || 0, icon: <TeamOutlined />, color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
                { key: 'schedule', title: "Today's Appointments", value: userProperties.numbers.appointmentsPerDay || 0, icon: <CalendarOutlined />, color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
                { key: 'patients', title: 'Active Care Plans', value: userProperties.numbers.activeCarePlans || 0, icon: <FileTextOutlined />, color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                { key: 'labs', title: 'Pending Results', value: 7, icon: <ExperimentOutlined />, color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
              ].map((stat, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                  <Card
                    className="stat-card"
                    hoverable
                    onClick={() => setActiveTab(stat.key)}
                    style={{ cursor: 'pointer', borderLeft: `3px solid ${stat.color}`, borderRadius: 10 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: stat.bg,
                          border: `1px solid ${stat.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 22,
                          color: stat.color,
                          flexShrink: 0,
                        }}
                      >
                        {stat.icon}
                      </div>
                      <div>
                        <Text type="secondary" style={{ fontSize: 13 }}>{stat.title}</Text>
                        <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, lineHeight: 1.2 }}>
                          {stat.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* ============================================ */}
            {/* GUIDED WORKFLOW STEPS */}
            {/* ============================================ */}
            {/*
              PATTERN: String flag adds entirely new UI sections
              USE CASE: Guided workflow shows a step-by-step encounter checklist
              FLAG: clinicalWorkflow === 'guided'
              DEMO STORY: New residents and onboarding providers get structure
            */}
            {clinicalWorkflow === 'guided' && (
              <Card size="small" title={<Space><CheckCircleOutlined />Encounter Checklist</Space>}>
                <Steps
                  current={2}
                  size="small"
                  items={[
                    { title: 'Review Chart', description: 'Patient history loaded' },
                    { title: 'Chief Complaint', description: 'Documented' },
                    { title: 'Examination', description: 'In progress' },
                    { title: 'Assessment', description: 'Pending' },
                    { title: 'Plan & Orders', description: 'Pending' },
                    { title: 'Sign Note', description: 'Pending' },
                  ]}
                />
              </Card>
            )}

            {/* ============================================ */}
            {/* MAIN NAVIGATION TABS */}
            {/* ============================================ */}
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              size="large"
              items={[
                {
                  key: 'patients',
                  label: (
                    <Space>
                      <TeamOutlined />
                      <span>Patients</span>
                      <Tag color="blue" style={{ marginLeft: 4 }}>
                        {PATIENT_DATA.length}
                      </Tag>
                    </Space>
                  ),
                  children: (
                    <div>
                      {/* Patient Intake Flow — gated by enablePatientIntake flag */}
                      {enablePatientIntake && <PatientIntakeFlow />}

                      {/*
                        PATTERN: String flag switches patient list display mode
                        FLAG: patientChartView (string: 'table' | 'card' | 'compact')
                        NUMBER FLAG: patientsPerPage controls how many patients to show
                      */}
                      {patientChartView === 'table' && <PatientTableView patients={visiblePatients} />}
                      {patientChartView === 'card' && <PatientCardView patients={visiblePatients} />}
                      {patientChartView === 'compact' && <PatientCompactView patients={visiblePatients} />}

                      {/* Footer with count — controlled by patientsPerPage number flag */}
                      <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Text type="secondary">
                          Showing <strong>{Math.min(patientsPerPage, PATIENT_DATA.length)}</strong> of{' '}
                          {PATIENT_DATA.length} patients
                        </Text>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'schedule',
                  label: (
                    <Space>
                      <CalendarOutlined />
                      <span>Schedule</span>
                      <Tag color="blue" style={{ marginLeft: 4 }}>
                        {APPOINTMENT_DATA.length}
                      </Tag>
                    </Space>
                  ),
                  children: (
                    <div>
                      {/*
                        PATTERN: String flag switches appointment view mode
                        FLAG: appointmentViewMode (string: 'calendar' | 'list' | 'timeline')
                      */}
                      <AppointmentList
                        appointments={APPOINTMENT_DATA}
                        viewMode={appointmentViewMode}
                      />

                      {/* Shift Handoff Notes — visible in streamlined/guided workflow modes */}
                      {clinicalWorkflow !== 'standard' && <ShiftHandoffNotes />}
                    </div>
                  ),
                },
                {
                  key: 'labs',
                  label: (
                    <Space>
                      <ExperimentOutlined />
                      <span>Lab Results</span>
                    </Space>
                  ),
                  children: (
                    <div>
                      {/* Always visible — standard clinical content */}
                      <LabResultsCard />
                    </div>
                  ),
                },
                {
                  key: 'quality',
                  label: (
                    <Space>
                      <BarChartOutlined />
                      <span>Quality</span>
                    </Space>
                  ),
                  children: (
                    <div>
                      {/*
                        PATTERN: String flag switches quality dashboard view mode
                        FLAG: qualityDashboardView (string: 'scorecard' | 'detailed' | 'compact')
                      */}
                      <QualityMetricsDashboard viewMode={qualityDashboardView} />
                    </div>
                  ),
                },
                // Messages tab — conditionally included based on flag + user property
                ...(enablePatientMessaging && !userProperties.booleans.isResident ? [{
                  key: 'messages',
                  label: (
                    <Space>
                      <MessageOutlined />
                      <span>Messages</span>
                      <Tag color="blue" style={{ marginLeft: 4 }}>2</Tag>
                    </Space>
                  ),
                  children: (
                    <div>
                      <PatientMessagingInbox />
                    </div>
                  ),
                }] : []),
              ]}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '8px 24px 0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            />

            {/* ============================================ */}
            {/* FEATURE-FLAGGED SECTIONS */}
            {/* ============================================ */}
            <Row gutter={[16, 16]}>
              {/* LEFT COLUMN - Primary Clinical Tools */}
              <Col xs={24} lg={16}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* TELEMEDICINE */}
                  {/*
                    PATTERN: Double conditional (flag AND user property)
                    USE CASE: Virtual visit capabilities for authorized providers
                    FLAG: enableTelemedicine (boolean)
                    USER PROPERTY: hasTelemedicineAccess (physicians, NPs — not residents)
                  */}
                  {enableTelemedicine && userProperties.booleans.hasTelemedicineAccess && (
                    <Card
                      className="feature-card"
                      title={<Space><VideoCameraOutlined style={{ color: '#0891b2' }} />Telemedicine</Space>}
                      style={{ borderRadius: 12 }}
                    >
                      <TelemedicinePanel maxConcurrentSessions={maxConcurrentTelehealthSessions} />
                    </Card>
                  )}

                  {/* AI CLINICAL SUMMARY */}
                  {/*
                    PATTERN: Double conditional (flag AND user property)
                    USE CASE: AI-generated visit notes — the "wow" demo feature
                    FLAG: enableAIClinicalSummary (boolean)
                    USER PROPERTY: isAttending (senior physicians only — not residents)
                    DEMO STORY: High-stakes AI feature with careful role-based rollout
                  */}
                  {enableAIClinicalSummary && userProperties.booleans.isAttending && (
                    <Card
                      className="feature-card"
                      title={<Space><RobotOutlined style={{ color: '#7c3aed' }} />AI Clinical Summary <Tag color="purple" style={{ marginLeft: 4, fontWeight: 500 }}>AI</Tag></Space>}
                      style={{ borderRadius: 12 }}
                    >
                      <AIClinicalSummary />
                    </Card>
                  )}

                  {/* PRESCRIPTIONS */}
                  {/*
                    PATTERN: Double conditional (flag AND user property)
                    USE CASE: Electronic prescribing for authorized prescribers
                    FLAG: enablePrescriptions (boolean)
                    USER PROPERTY: canPrescribe (physicians, NPs — not residents)
                  */}
                  {enablePrescriptions && userProperties.booleans.canPrescribe && (
                    <Card
                      className="feature-card"
                      title={<Space><MedicineBoxOutlined style={{ color: '#059669' }} />Prescriptions</Space>}
                      style={{ borderRadius: 12 }}
                    >
                      <PrescriptionPanel />
                    </Card>
                  )}
                </Space>
              </Col>

              {/* RIGHT COLUMN - Insights & Care Plans */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* PATIENT INSIGHTS */}
                  {/*
                    PATTERN: Boolean flag + number flag combo
                    USE CASE: AI-driven risk scores filtered by threshold
                    FLAG: showPatientInsights (boolean)
                    NUMBER FLAG: riskScoreThreshold controls which patients appear
                  */}
                  {showPatientInsights && (
                    <Card
                      className="feature-card"
                      title={<Space><HeartOutlined style={{ color: '#dc2626' }} />Patient Insights</Space>}
                      style={{ borderRadius: 12 }}
                    >
                      <PatientInsightsPanel riskScoreThreshold={riskScoreThreshold} />
                    </Card>
                  )}

                  {/* CARE PLANS */}
                  {/*
                    PATTERN: Boolean flag controls visibility
                    USE CASE: Care plan management for treatment tracking
                    FLAG: enableCarePlans (boolean)
                  */}
                  {enableCarePlans && (
                    <Card
                      className="feature-card"
                      title={<Space><FileTextOutlined style={{ color: '#d97706' }} />Active Care Plans</Space>}
                      style={{ borderRadius: 12 }}
                    >
                      <CarePlanCard />
                    </Card>
                  )}
                </Space>
              </Col>
            </Row>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
