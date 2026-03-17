/**
 * LabResultsCard Component
 *
 * Displays recent lab results with abnormal values highlighted.
 * Always visible — standard clinical content, not feature-flag gated.
 */

import { Table, Tag, Typography } from 'antd';

const { Text } = Typography;

interface LabResult {
  key: string;
  patient: string;
  test: string;
  value: string;
  reference: string;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
}

const LAB_RESULTS: LabResult[] = [
  { key: '1', patient: 'Thompson, M.', test: 'Potassium', value: '6.2 mEq/L', reference: '3.5-5.0', status: 'critical', date: 'Today' },
  { key: '2', patient: 'Jenkins, H.', test: 'HbA1c', value: '9.1%', reference: '<7.0%', status: 'abnormal', date: 'Today' },
  { key: '3', patient: 'Wilson, M.', test: 'Blood Pressure', value: '142/88', reference: '<130/80', status: 'abnormal', date: 'Today' },
  { key: '4', patient: 'Garcia, R.', test: 'Fasting Glucose', value: '95 mg/dL', reference: '70-100', status: 'normal', date: 'Yesterday' },
  { key: '5', patient: 'Price, D.', test: 'BNP', value: '450 pg/mL', reference: '<100', status: 'abnormal', date: 'Yesterday' },
  { key: '6', patient: 'Park, L.', test: 'CBC - WBC', value: '7.2 K/uL', reference: '4.5-11.0', status: 'normal', date: 'Yesterday' },
  { key: '7', patient: 'Russo, F.', test: 'LDL Cholesterol', value: '165 mg/dL', reference: '<100', status: 'abnormal', date: '2 days ago' },
  { key: '8', patient: 'Kim, D.', test: 'TSH', value: '2.4 mIU/L', reference: '0.4-4.0', status: 'normal', date: '2 days ago' },
];

function getStatusTag(status: LabResult['status']) {
  switch (status) {
    case 'critical':
      return <Tag color="red">Critical</Tag>;
    case 'abnormal':
      return <Tag color="orange">Abnormal</Tag>;
    default:
      return <Tag color="green">Normal</Tag>;
  }
}

const columns = [
  {
    title: 'Patient',
    dataIndex: 'patient',
    key: 'patient',
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: 'Test',
    dataIndex: 'test',
    key: 'test',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (text: string, record: LabResult) => (
      <Text style={{ color: record.status === 'critical' ? '#f5222d' : record.status === 'abnormal' ? '#faad14' : undefined, fontWeight: record.status !== 'normal' ? 600 : undefined }}>
        {text}
      </Text>
    ),
  },
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: string, record: LabResult) => getStatusTag(record.status),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
];

export function LabResultsCard() {
  return (
    <Table
      columns={columns}
      dataSource={LAB_RESULTS}
      pagination={false}
      size="small"
    />
  );
}
