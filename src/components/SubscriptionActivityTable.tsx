/**
 * SubscriptionActivityTable Component
 *
 * Displays recent subscription events (signups, upgrades, downgrades,
 * cancellations, renewals). The number of visible rows is controlled
 * by the recentEventsToShow number flag.
 *
 * PATTERN: Number flag → data slicing
 * The parent passes `itemCount` from useFeatureFlagNumber('recentEventsToShow')
 * and this component slices the data accordingly.
 */

import { Card, Table, Tag, Typography, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface SubscriptionEvent {
  key: string;
  customer: string;
  eventType: 'New Signup' | 'Upgrade' | 'Downgrade' | 'Cancellation' | 'Renewal';
  plan: string;
  date: string;
  mrrImpact: number;
}

const EVENT_TAG_COLORS: Record<string, string> = {
  'New Signup': 'green',
  Upgrade: 'blue',
  Downgrade: 'orange',
  Cancellation: 'red',
  Renewal: 'cyan',
};

const ALL_EVENTS: SubscriptionEvent[] = [
  { key: '1', customer: 'Acme Corp', eventType: 'Upgrade', plan: 'Enterprise', date: '2026-03-17', mrrImpact: 2400 },
  { key: '2', customer: 'TechStart Inc', eventType: 'New Signup', plan: 'Starter', date: '2026-03-17', mrrImpact: 299 },
  { key: '3', customer: 'Global Logistics', eventType: 'Renewal', plan: 'Professional', date: '2026-03-16', mrrImpact: 0 },
  { key: '4', customer: 'CloudNine Studios', eventType: 'Upgrade', plan: 'Professional', date: '2026-03-16', mrrImpact: 450 },
  { key: '5', customer: 'DataDriven LLC', eventType: 'Cancellation', plan: 'Starter', date: '2026-03-16', mrrImpact: -299 },
  { key: '6', customer: 'FinServ Partners', eventType: 'New Signup', plan: 'Enterprise', date: '2026-03-15', mrrImpact: 4999 },
  { key: '7', customer: 'RetailMax', eventType: 'Downgrade', plan: 'Starter', date: '2026-03-15', mrrImpact: -450 },
  { key: '8', customer: 'HealthFirst', eventType: 'Renewal', plan: 'Enterprise', date: '2026-03-15', mrrImpact: 0 },
  { key: '9', customer: 'EduPlatform', eventType: 'Upgrade', plan: 'Professional', date: '2026-03-14', mrrImpact: 450 },
  { key: '10', customer: 'GreenEnergy Co', eventType: 'New Signup', plan: 'Professional', date: '2026-03-14', mrrImpact: 799 },
  { key: '11', customer: 'MediaWorks', eventType: 'Cancellation', plan: 'Professional', date: '2026-03-14', mrrImpact: -799 },
  { key: '12', customer: 'BuildRight', eventType: 'Renewal', plan: 'Starter', date: '2026-03-13', mrrImpact: 0 },
  { key: '13', customer: 'AI Dynamics', eventType: 'Upgrade', plan: 'Enterprise', date: '2026-03-13', mrrImpact: 3200 },
  { key: '14', customer: 'FreshFoods Inc', eventType: 'New Signup', plan: 'Starter', date: '2026-03-13', mrrImpact: 299 },
  { key: '15', customer: 'CyberShield', eventType: 'Renewal', plan: 'Enterprise', date: '2026-03-12', mrrImpact: 0 },
  { key: '16', customer: 'TravelHub', eventType: 'Downgrade', plan: 'Starter', date: '2026-03-12', mrrImpact: -500 },
  { key: '17', customer: 'SmartHome Labs', eventType: 'New Signup', plan: 'Professional', date: '2026-03-12', mrrImpact: 799 },
  { key: '18', customer: 'LegalEase', eventType: 'Upgrade', plan: 'Professional', date: '2026-03-11', mrrImpact: 500 },
  { key: '19', customer: 'SportsTech', eventType: 'Cancellation', plan: 'Starter', date: '2026-03-11', mrrImpact: -299 },
  { key: '20', customer: 'NanoMaterials', eventType: 'Renewal', plan: 'Professional', date: '2026-03-11', mrrImpact: 0 },
  { key: '21', customer: 'PetCare Plus', eventType: 'New Signup', plan: 'Starter', date: '2026-03-10', mrrImpact: 299 },
  { key: '22', customer: 'AutoDrive Systems', eventType: 'Upgrade', plan: 'Enterprise', date: '2026-03-10', mrrImpact: 4200 },
  { key: '23', customer: 'FashionForward', eventType: 'Downgrade', plan: 'Starter', date: '2026-03-10', mrrImpact: -500 },
  { key: '24', customer: 'BioGenesis', eventType: 'Renewal', plan: 'Enterprise', date: '2026-03-09', mrrImpact: 0 },
  { key: '25', customer: 'UrbanPlanning Co', eventType: 'New Signup', plan: 'Professional', date: '2026-03-09', mrrImpact: 799 },
  { key: '26', customer: 'SolarWind Energy', eventType: 'Upgrade', plan: 'Professional', date: '2026-03-09', mrrImpact: 500 },
  { key: '27', customer: 'DevOps Central', eventType: 'Cancellation', plan: 'Professional', date: '2026-03-08', mrrImpact: -799 },
  { key: '28', customer: 'CloudKitchen', eventType: 'New Signup', plan: 'Starter', date: '2026-03-08', mrrImpact: 299 },
  { key: '29', customer: 'QuantumLeap', eventType: 'Renewal', plan: 'Enterprise', date: '2026-03-08', mrrImpact: 0 },
  { key: '30', customer: 'CreativeMinds', eventType: 'Upgrade', plan: 'Enterprise', date: '2026-03-07', mrrImpact: 3200 },
];

const columns = [
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: 'Event',
    dataIndex: 'eventType',
    key: 'eventType',
    render: (type: string) => (
      <Tag color={EVENT_TAG_COLORS[type]}>{type}</Tag>
    ),
  },
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'MRR Impact',
    dataIndex: 'mrrImpact',
    key: 'mrrImpact',
    render: (value: number) => {
      if (value === 0) return <Text type="secondary">-</Text>;
      const color = value > 0 ? '#52c41a' : '#ff4d4f';
      const prefix = value > 0 ? '+' : '';
      return <Text style={{ color }}>{prefix}${Math.abs(value).toLocaleString()}</Text>;
    },
  },
];

interface SubscriptionActivityTableProps {
  itemCount: number;
}

export function SubscriptionActivityTable({ itemCount }: SubscriptionActivityTableProps) {
  const visibleEvents = ALL_EVENTS.slice(0, itemCount);

  return (
    <Card
      title={
        <Space>
          <UnorderedListOutlined />
          <span>Subscription Activity</span>
        </Space>
      }
      extra={<Text type="secondary">Showing {visibleEvents.length} of {ALL_EVENTS.length} events</Text>}
    >
      <Table
        dataSource={visibleEvents}
        columns={columns}
        pagination={false}
        size="small"
      />
    </Card>
  );
}
