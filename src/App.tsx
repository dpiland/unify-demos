/**
 * Main Application - HiveAir Passenger Portal
 *
 * A professional airline passenger portal styled after United Airlines' navigation.
 * Uses CloudBees Feature Management for personalized travel experiences.
 *
 * FEATURE FLAGS IN USE:
 * - Boolean: enableSeatSelection, enableLoungeAccess, enablePriorityBoarding, showFlightAlerts, enableMobileCheckin
 * - String: dashboardLayout, flightDisplayMode, upgradePromptStyle
 * - Number: recentBookingsToShow, flightStatusRefreshInterval, loyaltyPointsMultiplier
 */

import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import {
  ArrowUpOutlined,
  CalendarOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  CrownOutlined,
  DownOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  GlobalOutlined,
  HomeOutlined,
  InboxOutlined,
  SafetyOutlined,
  StarOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { loadCurrentUser } from './lib/users';
import { FlightCard } from './components/airline/FlightCard';
import { FlightTimeline } from './components/airline/FlightTimeline';
import { FlightBooking } from './components/airline/FlightBooking';
import { SeatSelector } from './components/airline/SeatSelector';
import { LoungeAccessCard } from './components/airline/LoungeAccessCard';
import { PriorityServicesCard } from './components/airline/PriorityServicesCard';
import { MobileCheckinCard } from './components/airline/MobileCheckinCard';
import { UpgradeOfferCard } from './components/airline/UpgradeOfferCard';
import { FlightDealsWidget } from './components/airline/FlightDealsWidget';
import './App.css';

const { Content } = Layout;
const { Title, Text } = Typography;

/**
 * Flight Interface
 */
interface Flight {
  id: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    city: string;
    time: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    code: string;
    city: string;
    time: string;
    gate?: string;
  };
  cabinClass: string;
  bookingRef: string;
  status: 'scheduled' | 'boarding' | 'delayed' | 'departed' | 'completed';
  upgradeable: boolean;
  duration: string;
}

/**
 * Sample Flight Data
 */
const FLIGHT_DATA: Flight[] = [
  {
    id: 'flight-001',
    flightNumber: 'HA1234',
    departure: {
      airport: 'John F. Kennedy International',
      code: 'JFK',
      city: 'New York',
      time: '2026-03-02T15:45:00',
      gate: 'B12',
    },
    arrival: {
      airport: 'Los Angeles International',
      code: 'LAX',
      city: 'Los Angeles',
      time: '2026-03-02T19:15:00',
      gate: 'D8',
    },
    cabinClass: 'Main Cabin',
    bookingRef: 'ABC123',
    status: 'scheduled',
    upgradeable: true,
    duration: '5h 30m',
  },
  {
    id: 'flight-002',
    flightNumber: 'HA5678',
    departure: {
      airport: 'San Francisco International',
      code: 'SFO',
      city: 'San Francisco',
      time: '2026-03-08T09:30:00',
      gate: 'A5',
    },
    arrival: {
      airport: 'Chicago O\'Hare International',
      code: 'ORD',
      city: 'Chicago',
      time: '2026-03-08T15:45:00',
      gate: 'C14',
    },
    cabinClass: 'First Class',
    bookingRef: 'DEF456',
    status: 'scheduled',
    upgradeable: false,
    duration: '4h 15m',
  },
  {
    id: 'flight-003',
    flightNumber: 'HA9012',
    departure: {
      airport: 'Miami International',
      code: 'MIA',
      city: 'Miami',
      time: '2026-03-15T11:00:00',
      gate: 'E22',
    },
    arrival: {
      airport: 'Seattle-Tacoma International',
      code: 'SEA',
      city: 'Seattle',
      time: '2026-03-15T14:30:00',
      gate: 'N7',
    },
    cabinClass: 'Comfort+',
    bookingRef: 'GHI789',
    status: 'scheduled',
    upgradeable: true,
    duration: '6h 30m',
  },
  {
    id: 'flight-004',
    flightNumber: 'HA3456',
    departure: {
      airport: 'Boston Logan International',
      code: 'BOS',
      city: 'Boston',
      time: '2026-03-22T07:15:00',
      gate: 'B8',
    },
    arrival: {
      airport: 'Denver International',
      code: 'DEN',
      city: 'Denver',
      time: '2026-03-22T10:45:00',
      gate: 'A12',
    },
    cabinClass: 'Main Cabin',
    bookingRef: 'JKL012',
    status: 'scheduled',
    upgradeable: true,
    duration: '4h 30m',
  },
  {
    id: 'flight-005',
    flightNumber: 'HA7890',
    departure: {
      airport: 'Dallas/Fort Worth International',
      code: 'DFW',
      city: 'Dallas',
      time: '2026-03-28T16:20:00',
      gate: 'D15',
    },
    arrival: {
      airport: 'LaGuardia Airport',
      code: 'LGA',
      city: 'New York',
      time: '2026-03-28T21:05:00',
      gate: 'B4',
    },
    cabinClass: 'First Class',
    bookingRef: 'MNO345',
    status: 'scheduled',
    upgradeable: false,
    duration: '3h 45m',
  },
];

/**
 * Past Flight Data
 */
const PAST_FLIGHTS: Flight[] = [
  {
    id: 'past-001',
    flightNumber: 'HA2345',
    departure: {
      airport: 'Raleigh-Durham International',
      code: 'RDU',
      city: 'Raleigh-Durham',
      time: '2026-02-10T08:30:00',
      gate: 'C5',
    },
    arrival: {
      airport: 'John F. Kennedy International',
      code: 'JFK',
      city: 'New York',
      time: '2026-02-10T10:15:00',
      gate: 'B22',
    },
    cabinClass: 'Main Cabin',
    bookingRef: 'PQR678',
    status: 'completed',
    upgradeable: false,
    duration: '1h 45m',
  },
  {
    id: 'past-002',
    flightNumber: 'HA6789',
    departure: {
      airport: 'Los Angeles International',
      code: 'LAX',
      city: 'Los Angeles',
      time: '2026-02-05T14:20:00',
      gate: 'D12',
    },
    arrival: {
      airport: 'Raleigh-Durham International',
      code: 'RDU',
      city: 'Raleigh-Durham',
      time: '2026-02-05T22:35:00',
      gate: 'A8',
    },
    cabinClass: 'First Class',
    bookingRef: 'STU901',
    status: 'completed',
    upgradeable: false,
    duration: '5h 15m',
  },
  {
    id: 'past-003',
    flightNumber: 'HA4567',
    departure: {
      airport: 'Raleigh-Durham International',
      code: 'RDU',
      city: 'Raleigh-Durham',
      time: '2026-01-28T11:45:00',
      gate: 'B3',
    },
    arrival: {
      airport: 'Miami International',
      code: 'MIA',
      city: 'Miami',
      time: '2026-01-28T14:30:00',
      gate: 'E15',
    },
    cabinClass: 'Main Cabin',
    bookingRef: 'VWX234',
    status: 'completed',
    upgradeable: false,
    duration: '2h 45m',
  },
  {
    id: 'past-004',
    flightNumber: 'HA8901',
    departure: {
      airport: 'Chicago O\'Hare International',
      code: 'ORD',
      city: 'Chicago',
      time: '2026-01-15T16:00:00',
      gate: 'C9',
    },
    arrival: {
      airport: 'Raleigh-Durham International',
      code: 'RDU',
      city: 'Raleigh-Durham',
      time: '2026-01-15T19:15:00',
      gate: 'A12',
    },
    cabinClass: 'Comfort+',
    bookingRef: 'YZA567',
    status: 'completed',
    upgradeable: false,
    duration: '2h 15m',
  },
];

const CANCELLED_FLIGHTS: Flight[] = [
  {
    id: 'cancel-001',
    flightNumber: 'HA3210',
    departure: {
      airport: 'Raleigh-Durham International',
      code: 'RDU',
      city: 'Raleigh-Durham',
      time: '2026-02-20T07:00:00',
      gate: 'B8',
    },
    arrival: {
      airport: 'Denver International',
      code: 'DEN',
      city: 'Denver',
      time: '2026-02-20T09:30:00',
      gate: 'A5',
    },
    cabinClass: 'Main Cabin',
    bookingRef: 'CXL101',
    status: 'cancelled',
    upgradeable: false,
    duration: '3h 30m',
  },
];

/**
 * App Component - HiveAir Passenger Portal
 *
 * United-style navigation with top nav bar, secondary greeting bar,
 * and tabbed content pages (My HiveAir account, Book, My Trips).
 */
function App() {
  const currentUser = loadCurrentUser();
  const [activePage, setActivePage] = useState('my-hiveair');
  const [bookSubPage, setBookSubPage] = useState<'flights' | 'hotels' | 'cars'>('flights');
  const [travelInfoSubPage, setTravelInfoSubPage] = useState<'baggage' | 'travel-req' | 'airport-maps'>('baggage');
  const [helpSubPage, setHelpSubPage] = useState<'faq' | 'contact' | 'feedback'>('faq');
  const [tripsTab, setTripsTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [accountSection, setAccountSection] = useState('my-hiveair');

  // ============================================
  // BOOLEAN FLAGS
  // ============================================
  const enableSeatSelection = useFeatureFlag('enableSeatSelection');
  const enableLoungeAccess = useFeatureFlag('enableLoungeAccess');
  const enablePriorityBoarding = useFeatureFlag('enablePriorityBoarding');
  const showFlightAlerts = useFeatureFlag('showFlightAlerts');
  const enableMobileCheckin = useFeatureFlag('enableMobileCheckin');
  const enableStPatricksDay = useFeatureFlag('enableStPatricksDay');
  const enableMemorialDay = useFeatureFlag('enableMemorialDay');

  // ============================================
  // SEASONAL THEME COLORS
  // Priority: St. Patrick's Day > Memorial Day > Default
  // When a holiday flag is enabled, all brand colors swap to festive theme
  // ============================================
  const theme = {
    navBg: enableStPatricksDay ? '#1a7a3d' : enableMemorialDay ? '#1B2A4A' : '#806ff6',
    navSecondaryBg: enableStPatricksDay ? '#15662f' : enableMemorialDay ? '#162240' : '#6b5ce7',
    accent: enableStPatricksDay ? '#2ea043' : enableMemorialDay ? '#B22234' : '#806ff6',
    accentLight: enableStPatricksDay ? '#3cb371' : enableMemorialDay ? '#3C5A99' : '#8fa6d6',
    gold: enableStPatricksDay ? '#FFD700' : enableMemorialDay ? '#FFFFFF' : '#DAA520',
    heroBg: enableStPatricksDay
      ? 'linear-gradient(135deg, #1a7a3d 0%, #0d5c2a 100%)'
      : enableMemorialDay
        ? 'linear-gradient(135deg, #1B2A4A 0%, #0D1B2A 100%)'
        : 'linear-gradient(135deg, #806ff6 0%, #5a4cbf 100%)',
  };

  // ============================================
  // STRING FLAGS
  // ============================================
  const flightDisplayMode = useFeatureFlagString('flightDisplayMode');
  const upgradePromptStyle = useFeatureFlagString('upgradePromptStyle');

  // ============================================
  // NUMBER FLAGS
  // ============================================
  const recentBookingsToShow = useFeatureFlagNumber('recentBookingsToShow');
  const loyaltyPointsMultiplier = useFeatureFlagNumber('loyaltyPointsMultiplier');

  // ============================================
  // USER PROPERTIES
  // ============================================
  const userProperties = currentUser?.properties || {
    booleans: {},
    strings: {},
    numbers: {},
  };

  const baseMiles = userProperties.numbers.frequentFlyerMiles || 0;
  const displayMiles = Math.floor(baseMiles * loyaltyPointsMultiplier);
  const membershipTier = userProperties.strings.membershipTier || 'basic';
  const userName = currentUser?.name?.split(' ')[0] || 'Guest';

  // Tier display info
  const tierInfo: Record<string, { label: string; color: string; nextTier: string; milesNeeded: number }> = {
    basic: { label: 'General Member', color: '#666', nextTier: 'Silver', milesNeeded: 25000 },
    silver: { label: 'Silver', color: '#A0A0A0', nextTier: 'Gold', milesNeeded: 50000 },
    gold: { label: 'Gold', color: '#DAA520', nextTier: 'Diamond', milesNeeded: 75000 },
    diamond: { label: 'Diamond', color: '#9B59B6', nextTier: 'Diamond', milesNeeded: 200000 },
    'hiveair-employee': { label: 'Employee', color: '#52c41a', nextTier: 'N/A', milesNeeded: 0 },
  };
  const currentTierInfo = tierInfo[membershipTier] || tierInfo.basic;

  // ============================================
  // NAV MENU ITEMS
  // ============================================
  const navItems = [
    {
      key: 'book',
      label: (
        <Dropdown
          menu={{
            items: [
              { key: 'flights', label: 'Flights' },
              { key: 'hotels', label: 'Hotels' },
              { key: 'cars', label: 'Car rentals' },
            ],
            onClick: ({ key }) => {
              setActivePage('book');
              setBookSubPage(key as 'flights' | 'hotels' | 'cars');
            },
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            Book <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
    {
      key: 'my-trips',
      label: (
        <Dropdown
          menu={{
            items: [
              { key: 'upcoming', label: 'Upcoming trips' },
              { key: 'past', label: 'Past trips' },
              { key: 'cancelled', label: 'Cancelled trips' },
            ],
            onClick: ({ key }) => {
              setActivePage('my-trips');
              setTripsTab(key as 'upcoming' | 'past' | 'cancelled');
            },
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            My trips <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
    {
      key: 'travel-info',
      label: (
        <Dropdown
          menu={{
            items: [
              { key: 'baggage', label: 'Baggage' },
              { key: 'travel-req', label: 'Travel requirements' },
              { key: 'airport-maps', label: 'Airport maps' },
            ],
            onClick: ({ key }) => {
              setActivePage('travel-info');
              setTravelInfoSubPage(key as 'baggage' | 'travel-req' | 'airport-maps');
            },
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            Travel info <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
    {
      key: 'beemiles',
      label: (
        <Dropdown
          menu={{
            items: [
              { key: 'overview', label: 'Overview' },
              { key: 'earn', label: 'Earn miles' },
              { key: 'use', label: 'Use miles' },
              { key: 'status', label: 'Status' },
            ],
            onClick: ({ key }) => {
              setActivePage('my-hiveair');
              if (key === 'overview') setAccountSection('beemiles-rewards');
              else if (key === 'earn') setAccountSection('beemiles-rewards');
              else if (key === 'use') setAccountSection('wallet');
              else if (key === 'status') setAccountSection('beemiles-rewards');
            },
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            BeeMiles <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
    {
      key: 'deals',
      label: (
        <span style={{ cursor: 'pointer' }}>Deals</span>
      ),
    },
    {
      key: 'help',
      label: (
        <Dropdown
          menu={{
            items: [
              { key: 'faq', label: 'FAQs' },
              { key: 'contact', label: 'Contact us' },
              { key: 'feedback', label: 'Feedback' },
            ],
            onClick: ({ key }) => {
              setActivePage('help');
              setHelpSubPage(key as 'faq' | 'contact' | 'feedback');
            },
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            Help <DownOutlined style={{ fontSize: 10 }} />
          </span>
        </Dropdown>
      ),
    },
  ];

  // ============================================
  // LEFT SIDEBAR MENU FOR MY HIVEAIR
  // ============================================
  const sidebarItems = [
    { key: 'my-hiveair', icon: <UserOutlined />, label: 'My HiveAir' },
    { key: 'beemiles-rewards', icon: <TrophyOutlined />, label: 'BeeMiles' },
    { key: 'trips', icon: <RocketOutlined />, label: 'Trips' },
    { key: 'wallet', icon: <WalletOutlined />, label: 'Wallet' },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  // ============================================
  // RENDER: MY HIVEAIR ACCOUNT PAGE
  // ============================================
  const renderMyHiveAirPage = () => (
    <Row gutter={32}>
      {/* Left Sidebar */}
      <Col xs={24} md={6}>
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 4 }}>Hello, {userName}</Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[accountSection]}
          onClick={(e) => setAccountSection(e.key)}
          items={sidebarItems}
          style={{
            border: 'none',
            background: 'transparent',
          }}
        />

        {/* App promo card */}
        <Card
          size="small"
          style={{
            marginTop: 24,
            background: '#f5f5f5',
            border: 'none',
            overflow: 'hidden',
          }}
          styles={{ body: { padding: 0 } }}
        >
          <img
            src="/hiveair-app-promo.svg"
            alt="HiveAir Mobile App"
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '4px 4px 0 0',
            }}
          />
          <div style={{ padding: 12 }}>
            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
              The HiveAir app is your all-in-one travel partner
            </Text>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
              Download the app to easily manage your trip while reducing touchpoints.
            </Text>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Button
                block
                size="small"
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  height: 36,
                  borderRadius: 6,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                App Store
              </Button>
              <Button
                block
                size="small"
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  height: 36,
                  borderRadius: 6,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.04c-.32-.17-.58-.47-.68-.86L7.12 12 2.5 1.82c.1-.39.36-.69.68-.86L14.98 12 3.18 23.04zm.82.88L15.58 13l2.75 2.4L5.15 23.96c-.44.24-.87.2-1.15-.04zM15.58 11L4 .08C4.28-.16 4.71-.2 5.15.04l13.18 8.56L15.58 11zm3.7-1.86l3.64 2.36c.5.33.5.87 0 1.2l-3.64 2.36L16.4 12l2.88-2.86z"/></svg>
                Google Play
              </Button>
            </Space>
          </div>
        </Card>
      </Col>

      {/* Main Content - switches based on sidebar selection */}
      <Col xs={24} md={18}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>

          {/* ---- MY HIVEAIR (Overview) ---- */}
          {accountSection === 'my-hiveair' && (
            <>
              {/* Flight Alerts */}
              {showFlightAlerts && (
                <Alert
                  message="Flight Status Update"
                  description="Flight HA 1234 to LAX: On-time departure at 3:45 PM from Gate B12. Boarding begins at 3:15 PM."
                  type="info"
                  showIcon
                  icon={<InfoCircleOutlined />}
                  closable
                  style={{ borderLeft: `4px solid ${theme.accent}` }}
                />
              )}

              {/* Account Details Card */}
              <Card title={<Title level={4} style={{ margin: 0 }}>Account details</Title>}>
                <Row gutter={48}>
                  <Col>
                    <div
                      style={{
                        width: 100, height: 100, borderRadius: 8, background: theme.accentLight,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>{currentTierInfo.label}</Text>
                      <Text style={{ color: '#fff', fontSize: 10 }}>Member</Text>
                    </div>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>Account</Text>
                    <Text strong style={{ fontSize: 16 }}>{userProperties.strings.userId || 'HAX00001'}</Text>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>Miles</Text>
                    <Text strong style={{ fontSize: 24 }}>{displayMiles.toLocaleString()}</Text>
                    {loyaltyPointsMultiplier > 1 && (
                      <Tag color="red" style={{ marginLeft: 8 }}>{loyaltyPointsMultiplier}x Bonus!</Tag>
                    )}
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>Miles never expire</Text>
                  </Col>
                </Row>
              </Card>

              {/* Upcoming Trips Summary */}
              <Card title={<Title level={4} style={{ margin: 0 }}>Upcoming trips</Title>}>
                {FLIGHT_DATA.length > 0 ? (
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {FLIGHT_DATA.slice(0, 2).map((flight) => (
                      <div key={flight.id} style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Text strong>{flight.flightNumber}</Text>
                            <Text type="secondary" style={{ marginLeft: 12 }}>{flight.departure.code} → {flight.arrival.code}</Text>
                          </Col>
                          <Col>
                            <Tag color={flight.cabinClass === 'First Class' ? 'gold' : flight.cabinClass === 'Comfort+' ? 'blue' : 'default'}>{flight.cabinClass}</Tag>
                            <Text type="secondary" style={{ marginLeft: 8 }}>{flight.duration}</Text>
                          </Col>
                        </Row>
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(flight.departure.time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            {flight.departure.gate && ` • Gate ${flight.departure.gate}`}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary">You have no upcoming trips</Text>
                )}
                <Divider />
                <Space>
                  <Button type="link" style={{ padding: 0, color: theme.accentLight }} onClick={() => { setActivePage('my-trips'); setTripsTab('upcoming'); }}>View all trips</Button>
                  <Divider type="vertical" />
                  <Button type="link" style={{ padding: 0, color: theme.accentLight }} onClick={() => { setActivePage('book'); setBookSubPage('flights'); }}>Book a flight</Button>
                </Space>
              </Card>

              {/* Quick Actions */}
              <Row gutter={[16, 16]}>
                {enableMobileCheckin && !userProperties.booleans.hasCheckedIn && (
                  <Col xs={24} md={12}>
                    <Card title={<Space><RocketOutlined />Mobile Check-In</Space>} size="small">
                      <MobileCheckinCard flightNumber={FLIGHT_DATA[0]?.flightNumber} departure={FLIGHT_DATA[0]?.departure} canCheckIn={true} />
                    </Card>
                  </Col>
                )}
                {!userProperties.booleans.isBusinessClass && (
                  <Col xs={24} md={12}>
                    <Card title={<Space><ArrowUpOutlined />Upgrade Available</Space>} size="small">
                      <UpgradeOfferCard
                        style={upgradePromptStyle as 'subtle' | 'prominent' | 'modal'}
                        currentClass={userProperties.strings.cabinClass || 'economy'}
                        upgradePrice={149}
                      />
                    </Card>
                  </Col>
                )}
              </Row>
            </>
          )}

          {/* ---- BEEMILES REWARDS ---- */}
          {accountSection === 'beemiles-rewards' && (
            <>
              <Card title={<Title level={4} style={{ margin: 0 }}>Your BeeMiles progress</Title>}>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>Earned in 2026</Text>
                <Row gutter={[48, 16]}>
                  <Col xs={12} md={6}>
                    <Text type="secondary" style={{ fontSize: 13 }}>Premier qualifying flights (PQF)</Text>
                    <div style={{ textAlign: 'right' }}><Text strong style={{ fontSize: 20 }}>{userProperties.numbers.totalFlights || 0}</Text></div>
                  </Col>
                  <Col xs={12} md={6}>
                    <Text type="secondary" style={{ fontSize: 13 }}>Flight segment minimum</Text>
                    <div style={{ textAlign: 'right' }}><Text strong style={{ fontSize: 20 }}>{Math.min(userProperties.numbers.totalFlights || 0, 4)} of 4</Text></div>
                  </Col>
                  <Col xs={12} md={6}>
                    <Text type="secondary" style={{ fontSize: 13 }}>Premier qualifying points (PQP)</Text>
                    <div style={{ textAlign: 'right' }}><Text strong style={{ fontSize: 20 }}>{Math.round((userProperties.numbers.averageSpend || 0) * (userProperties.numbers.totalFlights || 0) * 0.1).toLocaleString()}</Text></div>
                  </Col>
                  <Col xs={12} md={6}>
                    <Text type="secondary" style={{ fontSize: 13 }}>Lifetime flight miles</Text>
                    <div style={{ textAlign: 'right' }}><Text strong style={{ fontSize: 20 }}>{displayMiles.toLocaleString()}</Text></div>
                  </Col>
                </Row>
                <Divider />
                <Button type="link" style={{ padding: 0, color: theme.accentLight }} onClick={() => setAccountSection('my-hiveair')}>See your benefits</Button>
              </Card>

              {/* Tier Progress */}
              <Card title={<Title level={4} style={{ margin: 0 }}>Tier Status</Title>}>
                <Row gutter={[24, 16]} align="middle">
                  <Col>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: theme.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrophyOutlined style={{ fontSize: 32, color: '#fff' }} />
                    </div>
                  </Col>
                  <Col flex="auto">
                    <Title level={4} style={{ margin: 0 }}>{currentTierInfo.label} Member</Title>
                    <Text type="secondary">Next tier: {currentTierInfo.nextTier}</Text>
                    <Progress percent={Math.min(100, Math.round((displayMiles / currentTierInfo.milesNeeded) * 100))} strokeColor={theme.accent} style={{ maxWidth: 400, marginTop: 8 }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>{displayMiles.toLocaleString()} / {currentTierInfo.milesNeeded.toLocaleString()} miles</Text>
                  </Col>
                </Row>
              </Card>

              {/* Ways to Earn */}
              <Card title={<Title level={4} style={{ margin: 0 }}>Ways to Earn Miles</Title>}>
                <Row gutter={[16, 16]}>
                  {[
                    { title: 'Fly HiveAir', desc: 'Earn 5 miles per dollar on HiveAir flights', miles: '5x miles', icon: <RocketOutlined style={{ fontSize: 24, color: theme.accent }} /> },
                    { title: 'HiveAir Credit Card', desc: 'Earn 2x miles on everyday purchases', miles: '2x miles', icon: <WalletOutlined style={{ fontSize: 24, color: theme.accent }} /> },
                    { title: 'Partner Hotels', desc: 'Earn up to 5x miles on hotel stays', miles: 'Up to 5x', icon: <HomeOutlined style={{ fontSize: 24, color: theme.accent }} /> },
                    { title: 'Car Rentals', desc: 'Earn 3x miles on rental cars', miles: '3x miles', icon: <CarOutlined style={{ fontSize: 24, color: theme.accent }} /> },
                  ].map((item) => (
                    <Col xs={24} sm={12} key={item.title}>
                      <Card size="small" hoverable>
                        <Space>
                          {item.icon}
                          <div>
                            <Text strong>{item.title}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>{item.desc}</Text>
                            <br />
                            <Tag color="purple" style={{ marginTop: 4 }}>{item.miles}</Tag>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>

              {loyaltyPointsMultiplier > 1 && (
                <Alert
                  type="success"
                  showIcon
                  message={`${loyaltyPointsMultiplier}x BeeMiles Bonus Active!`}
                  description="Earn bonus miles on all qualifying purchases during this promotional period."
                  style={{ borderRadius: 8 }}
                />
              )}
            </>
          )}

          {/* ---- TRIPS ---- */}
          {accountSection === 'trips' && (
            <>
              <Card title={<Title level={4} style={{ margin: 0 }}>Upcoming Trips</Title>}>
                {FLIGHT_DATA.length > 0 ? (
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {FLIGHT_DATA.slice(0, recentBookingsToShow).map((flight) => (
                      <div key={flight.id} style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                        <Row justify="space-between" align="middle">
                          <Col>
                            <Text strong>{flight.flightNumber}</Text>
                            <Text type="secondary" style={{ marginLeft: 12 }}>{flight.departure.code} → {flight.arrival.code}</Text>
                          </Col>
                          <Col>
                            <Tag color={flight.cabinClass === 'First Class' ? 'gold' : flight.cabinClass === 'Comfort+' ? 'blue' : 'default'}>{flight.cabinClass}</Tag>
                            <Text type="secondary" style={{ marginLeft: 8 }}>{flight.duration}</Text>
                          </Col>
                        </Row>
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(flight.departure.time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            {flight.departure.gate && ` • Gate ${flight.departure.gate}`}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary">No upcoming trips</Text>
                )}
                <Divider />
                <Button type="link" style={{ padding: 0, color: theme.accentLight }} onClick={() => { setActivePage('my-trips'); }}>View full trips page</Button>
              </Card>

              {/* Premium Services */}
              <Row gutter={[16, 16]}>
                {enableLoungeAccess && userProperties.booleans.hasLoungeAccess && (
                  <Col xs={24} md={12}>
                    <Card title={<Space><CoffeeOutlined />Airport Lounge Access</Space>} size="small">
                      <LoungeAccessCard homeAirport={userProperties.strings.homeAirport || 'JFK'} membershipTier={userProperties.strings.membershipTier || 'standard'} />
                    </Card>
                  </Col>
                )}
                {enablePriorityBoarding && userProperties.booleans.hasPriorityBoarding && (
                  <Col xs={24} md={12}>
                    <Card title={<Space><ThunderboltOutlined />Priority Services</Space>} size="small">
                      <PriorityServicesCard boardingGroup="Group 1" hasFastTrack={true} hasBaggagePriority={true} />
                    </Card>
                  </Col>
                )}
              </Row>

              {enableSeatSelection && (
                <Card title={<Space><CrownOutlined />Select Your Seat</Space>}>
                  <SeatSelector cabinClass={userProperties.strings.cabinClass || 'economy'} isPremiumMember={userProperties.booleans.isPremiumMember || false} />
                </Card>
              )}
            </>
          )}

          {/* ---- WALLET ---- */}
          {accountSection === 'wallet' && (
            <>
              <Card title={<Title level={4} style={{ margin: 0 }}>Payment Methods</Title>}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {hasCreditCard ? (
                    <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16, background: 'linear-gradient(135deg, #f9f9ff, #f0ebff)' }}>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Text strong>HiveAir BeeMiles® Visa Elite</Text>
                          <br />
                          <Text type="secondary">•••• •••• •••• 0210</Text>
                        </Col>
                        <Col><Tag color="purple">Primary</Tag></Col>
                      </Row>
                    </div>
                  ) : (
                    <Alert type="info" showIcon message="No credit card on file" description="Add a payment method to speed up future bookings." style={{ borderRadius: 8 }} />
                  )}
                  <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text strong>BeeMiles Balance</Text>
                        <br />
                        <Text style={{ fontSize: 20, fontWeight: 600 }}>{displayMiles.toLocaleString()} miles</Text>
                      </Col>
                      <Col><Button type="link" style={{ color: theme.accentLight }}>Use Miles</Button></Col>
                    </Row>
                  </div>
                </Space>
                <Divider />
                <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Add Payment Method</Button>
              </Card>

              <Card title={<Title level={4} style={{ margin: 0 }}>Travel Credits & Vouchers</Title>}>
                <Text type="secondary">You have no active travel credits or vouchers.</Text>
              </Card>

              {creditCardPromo}
            </>
          )}

          {/* ---- PROFILE ---- */}
          {accountSection === 'profile' && (
            <>
              <Card title={<Title level={4} style={{ margin: 0 }}>Personal Information</Title>}>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Full Name</Text>
                    <Text strong style={{ fontSize: 16 }}>{userName}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Email</Text>
                    <Text strong style={{ fontSize: 16 }}>{currentUser?.email || 'N/A'}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Home Airport</Text>
                    <Text strong style={{ fontSize: 16 }}>{userProperties.strings.homeAirport || 'Not set'}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Member Since</Text>
                    <Text strong style={{ fontSize: 16 }}>{userProperties.numbers.membershipYears > 0 ? `${userProperties.numbers.membershipYears} year${userProperties.numbers.membershipYears !== 1 ? 's' : ''}` : 'New member'}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>BeeMiles Number</Text>
                    <Text strong style={{ fontSize: 16 }}>{userProperties.strings.userId || 'N/A'}</Text>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Region</Text>
                    <Text strong style={{ fontSize: 16 }}>{userProperties.strings.region || 'N/A'}</Text>
                  </Col>
                </Row>
                <Divider />
                <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Edit Profile</Button>
              </Card>

              <Card title={<Title level={4} style={{ margin: 0 }}>Travel Preferences</Title>}>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={8}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Preferred Cabin</Text>
                    <Text strong>{userProperties.strings.cabinClass || 'Economy'}</Text>
                  </Col>
                  <Col xs={24} md={8}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Seat Preference</Text>
                    <Text strong>Window</Text>
                  </Col>
                  <Col xs={24} md={8}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Meal Preference</Text>
                    <Text strong>No preference</Text>
                  </Col>
                </Row>
                <Divider />
                <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Update Preferences</Button>
              </Card>

              <Card title={<Title level={4} style={{ margin: 0 }}>Emergency Contact</Title>}>
                <Text type="secondary">No emergency contact on file.</Text>
                <div style={{ marginTop: 12 }}>
                  <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Add Emergency Contact</Button>
                </div>
              </Card>
            </>
          )}

          {/* ---- SETTINGS ---- */}
          {accountSection === 'settings' && (
            <>
              <Card title={<Title level={4} style={{ margin: 0 }}>Notification Preferences</Title>}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {[
                    { label: 'Flight status updates', desc: 'Gate changes, delays, and boarding alerts', enabled: true },
                    { label: 'BeeMiles promotions', desc: 'Bonus miles offers and tier updates', enabled: true },
                    { label: 'Deal alerts', desc: 'Price drops and flash sales on your saved routes', enabled: false },
                    { label: 'Partner offers', desc: 'Hotel, car rental, and shopping partner deals', enabled: false },
                  ].map((pref) => (
                    <div key={pref.label} style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Text strong>{pref.label}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>{pref.desc}</Text>
                        </Col>
                        <Col>
                          <Tag color={pref.enabled ? 'green' : 'default'}>{pref.enabled ? 'On' : 'Off'}</Tag>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Space>
                <Divider />
                <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Save Preferences</Button>
              </Card>

              <Card title={<Title level={4} style={{ margin: 0 }}>Security</Title>}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                    <Row justify="space-between" align="middle">
                      <Col><Text strong>Password</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>Last changed 3 months ago</Text></Col>
                      <Col><Button type="link" style={{ color: theme.accentLight }}>Change</Button></Col>
                    </Row>
                  </div>
                  <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                    <Row justify="space-between" align="middle">
                      <Col><Text strong>Two-factor authentication</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>Add an extra layer of security</Text></Col>
                      <Col><Tag color="red">Off</Tag></Col>
                    </Row>
                  </div>
                  <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, padding: 16 }}>
                    <Row justify="space-between" align="middle">
                      <Col><Text strong>Trusted devices</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>2 devices registered</Text></Col>
                      <Col><Button type="link" style={{ color: theme.accentLight }}>Manage</Button></Col>
                    </Row>
                  </div>
                </Space>
              </Card>

              <Card title={<Title level={4} style={{ margin: 0 }}>Communication Preferences</Title>}>
                <Row gutter={[16, 16]}>
                  {['Email', 'SMS', 'Push Notifications', 'Mail'].map((ch) => (
                    <Col xs={12} md={6} key={ch}>
                      <Card size="small" style={{ textAlign: 'center' }}>
                        <Text strong style={{ display: 'block' }}>{ch}</Text>
                        <Tag color="green" style={{ marginTop: 4 }}>Enabled</Tag>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </>
          )}

        </Space>
      </Col>
    </Row>
  );

  // ============================================
  // CREDIT CARD PROMO (shared across book pages)
  //
  // FEATURE FLAG: showCreditCardPromo (Boolean)
  // CUSTOM PROPERTY: hasCreditCard (Boolean)
  //
  // Non-cardholders → Sign-up promo (20% off award travel)
  // Existing cardholders → Referral bonus (earn 100k miles)
  //
  // IN CLOUDBEES UI:
  // - Flag controls overall visibility of the promo module
  // - hasCreditCard property determines which variant to show
  // ============================================
  const showCreditCardPromo = useFeatureFlag('showCreditCardPromo');
  const hasCreditCard = currentUser?.properties.booleans.hasCreditCard ?? false;

  const creditCardPromo = showCreditCardPromo ? (
    <Card
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1f3c 0%, #1a2744 50%, #0a1628 100%)',
        border: 'none',
      }}
    >
      <Row gutter={[32, 24]} align="middle">
        <Col xs={24} md={10}>
          <img
            src="/hiveair-credit-card.svg"
            alt="HiveAir BeeMiles Rewards Visa Elite Card"
            style={{
              width: '100%',
              maxWidth: 420,
              display: 'block',
              margin: '0 auto',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
            }}
          />
        </Col>
        <Col xs={24} md={14}>
          {hasCreditCard ? (
            /* ---- REFERRAL BONUS (existing cardholders) ---- */
            <Space direction="vertical" size="middle">
              <Tag color="#DAA520" style={{ fontWeight: 600, fontSize: 12 }}>Card Member Exclusive</Tag>
              <Title level={3} style={{ color: '#DAA520', margin: 0, letterSpacing: 0.5 }}>
                Earn 100,000 Bonus Miles
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7 }}>
                Refer a friend to sign up for any HiveAir BeeMiles® credit card and earn
                100,000 bonus BeeMiles when they're approved. There's no limit to how many
                friends you can refer — the more you share, the more you earn.
              </Text>
              <Button
                size="large"
                style={{
                  background: '#DAA520',
                  borderColor: '#DAA520',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Refer a Friend &rarr;
              </Button>
            </Space>
          ) : (
            /* ---- SIGN-UP PROMO (non-cardholders) ---- */
            <Space direction="vertical" size="middle">
              <Title level={3} style={{ color: '#DAA520', margin: 0, letterSpacing: 0.5 }}>
                Unlock 20% Off Award Travel
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7 }}>
                HiveAir BeeMiles® Gold, Platinum, and Reserve Amex Card Members save 20% when booking
                Award Travel with Miles on HiveAir-operated flights. Not applicable to partner-operated
                flights or to taxes and fees. Terms apply.
              </Text>
              <Button
                size="large"
                style={{
                  background: '#DAA520',
                  borderColor: '#DAA520',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Apply Now &rarr;
              </Button>
            </Space>
          )}
        </Col>
      </Row>
    </Card>
  ) : null;

  // ============================================
  // RENDER: BOOK FLIGHTS PAGE
  // ============================================
  const renderFlightsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <FlightBooking
        userCabinClass={
          currentUser?.properties.strings.cabinClass === 'business' ? 'business' : 'economy'
        }
        onBookFlight={(flight, cabinClass) => {
          console.log('Booked flight:', flight.flightNumber, 'in', cabinClass);
        }}
      />
      <FlightDealsWidget />
      {creditCardPromo}
    </Space>
  );

  // ============================================
  // SAMPLE HOTEL DATA
  // ============================================
  const HOTELS = [
    { id: 'h1', name: 'The Grand Meridian', city: 'Miami', price: 189, rating: 4.8, reviews: 1243, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop', amenities: ['Pool', 'Spa', 'Beach Access'] },
    { id: 'h2', name: 'Skyline Tower Hotel', city: 'Los Angeles', price: 245, rating: 4.6, reviews: 892, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop', amenities: ['Rooftop Bar', 'Gym', 'Restaurant'] },
    { id: 'h3', name: 'Mountain View Lodge', city: 'Denver', price: 159, rating: 4.7, reviews: 674, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop', amenities: ['Fireplace', 'Ski Access', 'Spa'] },
    { id: 'h4', name: 'Harbor Bay Resort', city: 'San Francisco', price: 279, rating: 4.9, reviews: 1567, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop', amenities: ['Ocean View', 'Pool', 'Fine Dining'] },
    { id: 'h5', name: 'The Metropolitan', city: 'New York', price: 329, rating: 4.5, reviews: 2103, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop', amenities: ['Concierge', 'Gym', 'Spa'] },
    { id: 'h6', name: 'Sunset Palm Hotel', city: 'Orlando', price: 139, rating: 4.4, reviews: 1890, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop', amenities: ['Pool', 'Kids Club', 'Shuttle'] },
  ];

  // ============================================
  // RENDER: BOOK HOTELS PAGE
  // ============================================
  const renderHotelsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Search Bar */}
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={6}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Destination</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Where are you going?</div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Check-in</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <CalendarOutlined style={{ marginRight: 6 }} />Mar 15
              </div>
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Check-out</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <CalendarOutlined style={{ marginRight: 6 }} />Mar 22
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Guests</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>2 Adults, 1 Room</div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <Button type="primary" size="large" block style={{ background: theme.accentLight, borderColor: theme.accentLight, height: 48 }}>
              <SearchOutlined /> Search Hotels
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Featured Hotels */}
      <div>
        <Space align="center" style={{ marginBottom: 16 }}>
          <Title level={3} style={{ margin: 0 }}>
            <HomeOutlined style={{ marginRight: 8 }} />Featured Hotels
          </Title>
          <Tag color="blue">Earn BeeMiles</Tag>
        </Space>
        <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
          Book hotels and earn up to 5x BeeMiles on every stay
        </Text>

        <Row gutter={[16, 16]}>
          {HOTELS.map((hotel) => (
            <Col xs={24} sm={12} lg={8} key={hotel.id}>
              <Card
                hoverable
                style={{ height: '100%', borderRadius: 12, overflow: 'hidden' }}
                styles={{ body: { padding: 0 } }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Tag
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 600,
                    }}
                  >
                    <StarOutlined style={{ color: '#DAA520' }} /> {hotel.rating}
                  </Tag>
                </div>
                <div style={{ padding: 16 }}>
                  <Title level={5} style={{ margin: 0, marginBottom: 4 }}>{hotel.name}</Title>
                  <Text type="secondary">
                    <EnvironmentOutlined style={{ marginRight: 4 }} />{hotel.city}
                  </Text>
                  <div style={{ marginTop: 8, marginBottom: 12 }}>
                    {hotel.amenities.map((a) => (
                      <Tag key={a} style={{ fontSize: 11, marginBottom: 4 }}>{a}</Tag>
                    ))}
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text type="secondary" style={{ fontSize: 12 }}>From</Text>
                      <Title level={4} style={{ margin: 0, color: '#52c41a' }}>${hotel.price}<Text type="secondary" style={{ fontSize: 12 }}>/night</Text></Title>
                    </Col>
                    <Col>
                      <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>View Deal</Button>
                    </Col>
                  </Row>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {hotel.reviews.toLocaleString()} reviews
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {creditCardPromo}
    </Space>
  );

  // ============================================
  // SAMPLE CAR RENTAL DATA
  // ============================================
  const CAR_RENTALS = [
    { id: 'c1', name: 'Economy Sedan', provider: 'HiveAir Cars', price: 35, perDay: true, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=250&fit=crop', features: ['4 Seats', 'Automatic', 'A/C'], category: 'Economy' },
    { id: 'c2', name: 'Midsize SUV', provider: 'HiveAir Cars', price: 55, perDay: true, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop', features: ['5 Seats', 'Automatic', 'GPS'], category: 'SUV' },
    { id: 'c3', name: 'Premium Sedan', provider: 'HiveAir Cars', price: 75, perDay: true, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop', features: ['5 Seats', 'Leather', 'Bluetooth'], category: 'Premium' },
    { id: 'c4', name: 'Full-Size Van', provider: 'HiveAir Cars', price: 89, perDay: true, image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&h=250&fit=crop', features: ['7 Seats', 'Automatic', 'Cargo Space'], category: 'Van' },
    { id: 'c5', name: 'Luxury Convertible', provider: 'HiveAir Premium', price: 149, perDay: true, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop', features: ['2 Seats', 'Convertible', 'Sport'], category: 'Luxury' },
    { id: 'c6', name: 'Compact Hatchback', provider: 'HiveAir Cars', price: 29, perDay: true, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop', features: ['4 Seats', 'Automatic', 'Fuel Efficient'], category: 'Economy' },
  ];

  // ============================================
  // RENDER: BOOK CAR RENTALS PAGE
  // ============================================
  const renderCarsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Search Bar */}
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={6}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Pick-up Location</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <EnvironmentOutlined style={{ marginRight: 6 }} />Airport or city
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Pick-up Date</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <CalendarOutlined style={{ marginRight: 6 }} />Mar 15
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Drop-off Date</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <CalendarOutlined style={{ marginRight: 6 }} />Mar 22
              </div>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Driver Age</Text>
              <div style={{ fontSize: 16, fontWeight: 600 }}>25+</div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <Button type="primary" size="large" block style={{ background: theme.accentLight, borderColor: theme.accentLight, height: 48 }}>
              <SearchOutlined /> Search Cars
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Available Cars */}
      <div>
        <Space align="center" style={{ marginBottom: 16 }}>
          <Title level={3} style={{ margin: 0 }}>
            <CarOutlined style={{ marginRight: 8 }} />Available Vehicles
          </Title>
          <Tag color="blue">Earn BeeMiles</Tag>
        </Space>
        <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
          Rent a car and earn up to 3x BeeMiles per dollar spent
        </Text>

        <Row gutter={[16, 16]}>
          {CAR_RENTALS.map((car) => (
            <Col xs={24} sm={12} lg={8} key={car.id}>
              <Card
                hoverable
                style={{ height: '100%', borderRadius: 12, overflow: 'hidden' }}
                styles={{ body: { padding: 0 } }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Tag
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: theme.accent,
                      color: '#fff',
                      border: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {car.category}
                  </Tag>
                </div>
                <div style={{ padding: 16 }}>
                  <Title level={5} style={{ margin: 0, marginBottom: 4 }}>{car.name}</Title>
                  <Text type="secondary">{car.provider}</Text>
                  <div style={{ marginTop: 8, marginBottom: 12 }}>
                    {car.features.map((f) => (
                      <Tag key={f} style={{ fontSize: 11, marginBottom: 4 }}>{f}</Tag>
                    ))}
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text type="secondary" style={{ fontSize: 12 }}>From</Text>
                      <Title level={4} style={{ margin: 0, color: '#52c41a' }}>${car.price}<Text type="secondary" style={{ fontSize: 12 }}>/day</Text></Title>
                    </Col>
                    <Col>
                      <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }}>Reserve</Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {creditCardPromo}
    </Space>
  );

  // ============================================
  // RENDER: BOOK PAGE (routes to sub-pages)
  // ============================================
  const renderBookPage = () => {
    switch (bookSubPage) {
      case 'hotels': return renderHotelsPage();
      case 'cars': return renderCarsPage();
      default: return renderFlightsPage();
    }
  };

  // ============================================
  // RENDER: BAGGAGE PAGE
  // ============================================
  const renderBaggagePage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Baggage Information</Title>

      {/* Carry-on & Personal Item */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><InboxOutlined style={{ marginRight: 8 }} />Carry-on & Personal Item</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          All HiveAir passengers may bring one carry-on bag and one personal item at no additional charge.
        </Text>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: '#f9f9ff', border: '1px solid #e8e0ff' }}>
              <Title level={5} style={{ margin: 0 }}>Carry-on Bag</Title>
              <Text type="secondary">Max: 22" x 14" x 9" (56 x 36 x 23 cm)</Text>
              <br />
              <Text type="secondary">Must fit in the overhead bin</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color="green">Included Free</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: '#f9f9ff', border: '1px solid #e8e0ff' }}>
              <Title level={5} style={{ margin: 0 }}>Personal Item</Title>
              <Text type="secondary">Max: 17" x 13" x 8" (43 x 33 x 20 cm)</Text>
              <br />
              <Text type="secondary">Must fit under the seat in front of you</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color="green">Included Free</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Checked Bags */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><InboxOutlined style={{ marginRight: 8 }} />Checked Bag Fees</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          Fees apply per person, each way. BeeMiles members may receive complimentary checked bags based on status.
        </Text>
        <Table
          pagination={false}
          dataSource={[
            { key: '1', bag: 'First checked bag', domestic: '$35', international: '$0' },
            { key: '2', bag: 'Second checked bag', domestic: '$45', international: '$0' },
            { key: '3', bag: 'Third+ checked bag', domestic: '$150', international: '$200' },
            { key: '4', bag: 'Overweight (51-70 lbs)', domestic: '$100', international: '$100' },
            { key: '5', bag: 'Oversized (63-80 in)', domestic: '$200', international: '$200' },
          ]}
          columns={[
            { title: 'Bag', dataIndex: 'bag', key: 'bag' },
            { title: 'Domestic', dataIndex: 'domestic', key: 'domestic' },
            { title: 'International', dataIndex: 'international', key: 'international' },
          ]}
          style={{ borderRadius: 8 }}
        />
      </Card>

      {/* BeeMiles Baggage Benefits */}
      <Card style={{ borderRadius: 12, background: 'linear-gradient(135deg, #f9f9ff 0%, #f0ebff 100%)' }}>
        <Title level={4}><TrophyOutlined style={{ marginRight: 8, color: theme.accent }} />BeeMiles Baggage Benefits</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center', height: '100%' }}>
              <Tag color="default" style={{ marginBottom: 8 }}>Silver</Tag>
              <div><Text strong>1 Free Checked Bag</Text></div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center', height: '100%' }}>
              <Tag color="gold" style={{ marginBottom: 8 }}>Gold</Tag>
              <div><Text strong>2 Free Checked Bags</Text></div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center', height: '100%' }}>
              <Tag color="purple" style={{ marginBottom: 8 }}>Diamond</Tag>
              <div><Text strong>3 Free Checked Bags</Text></div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ textAlign: 'center', height: '100%' }}>
              <Tag color="blue" style={{ marginBottom: 8 }}>HiveAir Visa</Tag>
              <div><Text strong>1 Free Checked Bag</Text></div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Special Items */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}>Special Items</Title>
        <Row gutter={[16, 16]}>
          {[
            { item: 'Strollers & Car Seats', fee: 'Free', note: 'Gate-checked at no charge' },
            { item: 'Sporting Equipment', fee: 'Standard bag fees', note: 'Golf clubs, skis, surfboards' },
            { item: 'Musical Instruments', fee: 'Carry-on or ticketed seat', note: 'Small instruments may be carried on' },
            { item: 'Pets in Cabin', fee: '$125 each way', note: 'Carrier must fit under seat' },
          ].map((s) => (
            <Col xs={24} sm={12} key={s.item}>
              <Card size="small">
                <Text strong>{s.item}</Text>
                <br />
                <Tag color="blue" style={{ marginTop: 4 }}>{s.fee}</Tag>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{s.note}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );

  // ============================================
  // RENDER: TRAVEL REQUIREMENTS PAGE
  // ============================================
  const renderTravelRequirementsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Travel Requirements</Title>

      {/* COVID & Health */}
      <Alert
        type="info"
        showIcon
        icon={<SafetyOutlined />}
        message="Health & Safety Update"
        description="Most COVID-19 travel restrictions have been lifted. Some destinations may still require documentation. Check your specific route before traveling."
        style={{ borderRadius: 12 }}
      />

      {/* ID Requirements */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><SafetyOutlined style={{ marginRight: 8 }} />Identification Requirements</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: '100%' }}>
              <Title level={5}>Domestic Travel (U.S.)</Title>
              <Space direction="vertical" size="small">
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Valid government-issued photo ID</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>REAL ID or enhanced driver's license</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>U.S. passport or passport card</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Military ID (active duty)</Text></div>
              </Space>
              <Alert
                type="warning"
                showIcon
                style={{ marginTop: 12 }}
                message="REAL ID required starting May 2025 for domestic flights"
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: '100%' }}>
              <Title level={5}>International Travel</Title>
              <Space direction="vertical" size="small">
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Valid passport (6+ months validity)</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Visa (if required by destination)</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Return or onward travel proof</Text></div>
                <div><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /><Text>Health documentation (if applicable)</Text></div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Check-in Deadlines */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><CalendarOutlined style={{ marginRight: 8 }} />Check-in & Gate Deadlines</Title>
        <Table
          pagination={false}
          dataSource={[
            { key: '1', type: 'Online check-in opens', domestic: '24 hours before', international: '24 hours before' },
            { key: '2', type: 'Airport check-in deadline', domestic: '45 min before departure', international: '60 min before departure' },
            { key: '3', type: 'Bag drop deadline', domestic: '45 min before departure', international: '60 min before departure' },
            { key: '4', type: 'Boarding gate deadline', domestic: '15 min before departure', international: '20 min before departure' },
          ]}
          columns={[
            { title: '', dataIndex: 'type', key: 'type' },
            { title: 'Domestic', dataIndex: 'domestic', key: 'domestic' },
            { title: 'International', dataIndex: 'international', key: 'international' },
          ]}
          style={{ borderRadius: 8 }}
        />
      </Card>

      {/* Restricted Items */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><ExclamationCircleOutlined style={{ marginRight: 8 }} />Prohibited & Restricted Items</Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#fff1f0', border: '1px solid #ffa39e', height: '100%' }}>
              <Title level={5} style={{ color: '#cf1322' }}>Never Allowed</Title>
              <Text type="secondary">Firearms, explosives, flammable liquids, hazardous chemicals</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#fffbe6', border: '1px solid #ffe58f', height: '100%' }}>
              <Title level={5} style={{ color: '#d48806' }}>Checked Bags Only</Title>
              <Text type="secondary">Sharp objects, tools, sporting goods, large liquids (3.4oz+)</Text>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ background: '#f6ffed', border: '1px solid #b7eb8f', height: '100%' }}>
              <Title level={5} style={{ color: '#389e0d' }}>Carry-on OK</Title>
              <Text type="secondary">Liquids under 3.4oz in quart bag, electronics, medications</Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Traveling with Children */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><UserOutlined style={{ marginRight: 8 }} />Traveling with Children</Title>
        <Row gutter={[16, 16]}>
          {[
            { age: 'Under 2', policy: 'Lap infant (free domestic, reduced intl fare) or purchase a seat' },
            { age: 'Ages 2-4', policy: 'Must have own seat with valid ticket' },
            { age: 'Ages 5-14', policy: 'Unaccompanied minor service available ($150 each way)' },
            { age: 'Ages 15-17', policy: 'May travel alone without unaccompanied minor service' },
          ].map((c) => (
            <Col xs={24} sm={12} key={c.age}>
              <Card size="small">
                <Tag color="blue">{c.age}</Tag>
                <Text style={{ display: 'block', marginTop: 8 }}>{c.policy}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );

  // ============================================
  // RENDER: AIRPORT MAPS PAGE
  // ============================================
  const HIVEAIR_HUBS = [
    { code: 'ATL', name: 'Atlanta', full: 'Hartsfield-Jackson Atlanta International', terminals: 7, gates: 192, lounges: 3, status: 'Primary Hub' },
    { code: 'JFK', name: 'New York-JFK', full: 'John F. Kennedy International', terminals: 6, gates: 128, lounges: 2, status: 'Major Hub' },
    { code: 'LAX', name: 'Los Angeles', full: 'Los Angeles International', terminals: 9, gates: 146, lounges: 2, status: 'Major Hub' },
    { code: 'MSP', name: 'Minneapolis', full: 'Minneapolis-St. Paul International', terminals: 2, gates: 117, lounges: 2, status: 'Hub' },
    { code: 'DTW', name: 'Detroit', full: 'Detroit Metropolitan Wayne County', terminals: 2, gates: 129, lounges: 1, status: 'Hub' },
    { code: 'SLC', name: 'Salt Lake City', full: 'Salt Lake City International', terminals: 1, gates: 97, lounges: 1, status: 'Hub' },
    { code: 'SEA', name: 'Seattle', full: 'Seattle-Tacoma International', terminals: 4, gates: 80, lounges: 1, status: 'Focus City' },
    { code: 'BOS', name: 'Boston', full: 'Boston Logan International', terminals: 4, gates: 102, lounges: 1, status: 'Focus City' },
  ];

  const renderAirportMapsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Airport Maps & Information</Title>

      <Text type="secondary" style={{ fontSize: 15 }}>
        Find terminal maps, HiveAir Lounge locations, and gate information at our major hubs and focus cities.
      </Text>

      {/* Hub Airports Grid */}
      <Row gutter={[16, 16]}>
        {HIVEAIR_HUBS.map((hub) => (
          <Col xs={24} sm={12} lg={6} key={hub.code}>
            <Card
              hoverable
              style={{ height: '100%', borderRadius: 12 }}
            >
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: theme.accent,
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {hub.code}
                </div>
                <Title level={5} style={{ margin: 0 }}>{hub.name}</Title>
                <Text type="secondary" style={{ fontSize: 11 }}>{hub.full}</Text>
              </div>
              <Tag
                color={hub.status === 'Primary Hub' ? 'purple' : hub.status === 'Major Hub' ? 'blue' : 'default'}
                style={{ display: 'block', textAlign: 'center', marginBottom: 12 }}
              >
                {hub.status}
              </Tag>
              <Row gutter={8}>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <Statistic title="Terminals" value={hub.terminals} valueStyle={{ fontSize: 18 }} />
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <Statistic title="Gates" value={hub.gates} valueStyle={{ fontSize: 18 }} />
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <Statistic title="Lounges" value={hub.lounges} valueStyle={{ fontSize: 18 }} />
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <Button type="link" block style={{ color: theme.accentLight }}>
                View Terminal Map
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Airport Services */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><ShopOutlined style={{ marginRight: 8 }} />Airport Services</Title>
        <Row gutter={[16, 16]}>
          {[
            { title: 'HiveAir Lounge', desc: 'Complimentary food, drinks, Wi-Fi, and shower suites for eligible members', icon: <CoffeeOutlined style={{ fontSize: 24, color: theme.accent }} /> },
            { title: 'HiveAir Priority', desc: 'Priority check-in, security, and boarding for BeeMiles Gold and Diamond members', icon: <ThunderboltOutlined style={{ fontSize: 24, color: theme.accent }} /> },
            { title: 'Wheelchair Assistance', desc: 'Complimentary wheelchair service available upon request at all HiveAir airports', icon: <SafetyOutlined style={{ fontSize: 24, color: theme.accent }} /> },
            { title: 'Lost & Found', desc: 'Report lost items online or visit the baggage service office at your arrival airport', icon: <SearchOutlined style={{ fontSize: 24, color: theme.accent }} /> },
          ].map((svc) => (
            <Col xs={24} sm={12} key={svc.title}>
              <Card size="small" style={{ height: '100%' }}>
                <Space align="start">
                  <div style={{ marginTop: 4 }}>{svc.icon}</div>
                  <div>
                    <Text strong style={{ fontSize: 14 }}>{svc.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{svc.desc}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );

  // ============================================
  // RENDER: TRAVEL INFO PAGE (routes to sub-pages)
  // ============================================
  const renderTravelInfoPage = () => {
    switch (travelInfoSubPage) {
      case 'travel-req': return renderTravelRequirementsPage();
      case 'airport-maps': return renderAirportMapsPage();
      default: return renderBaggagePage();
    }
  };

  // ============================================
  // RENDER: DEALS PAGE
  // ============================================
  const renderDealsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Deals & Offers</Title>

      {/* Hero Promo */}
      <Card
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          background: theme.heroBg,
          border: 'none',
        }}
      >
        <Row gutter={[32, 24]} align="middle">
          <Col xs={24} md={16}>
            <Tag color="#DAA520" style={{ marginBottom: 8, fontWeight: 600 }}>Limited Time</Tag>
            <Title level={2} style={{ color: '#fff', margin: 0, marginBottom: 8 }}>
              Fly for Less This Spring
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16 }}>
              Save up to 40% on select domestic routes. Book by March 31 for travel through June 30.
            </Text>
            <div style={{ marginTop: 16 }}>
              <Button size="large" style={{ background: theme.gold, borderColor: theme.gold, color: '#fff', fontWeight: 600 }} onClick={() => { setActivePage('book'); setBookSubPage('flights'); }}>
                View Spring Deals
              </Button>
            </div>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, lineHeight: 1 }}>
              <Text style={{ color: '#DAA520', fontWeight: 700, fontSize: 72 }}>40%</Text>
              <br />
              <Text style={{ color: '#fff', fontSize: 20 }}>OFF SELECT FLIGHTS</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Deal Categories */}
      <Row gutter={[16, 16]}>
        {[
          { title: 'Flight Deals', desc: 'Low fares on domestic & international routes', tag: 'Up to 40% off', color: theme.accent, icon: <RocketOutlined style={{ fontSize: 28, color: theme.accent }} />, onClick: () => { setActivePage('book'); setBookSubPage('flights'); } },
          { title: 'Hotel Packages', desc: 'Bundle flights + hotels for extra savings', tag: 'Save $200+', color: '#52c41a', icon: <HomeOutlined style={{ fontSize: 28, color: '#52c41a' }} />, onClick: () => { setActivePage('book'); setBookSubPage('hotels'); } },
          { title: 'Car + Flight', desc: 'Add a car rental to your trip and save', tag: 'From $25/day', color: '#1890ff', icon: <CarOutlined style={{ fontSize: 28, color: '#1890ff' }} />, onClick: () => { setActivePage('book'); setBookSubPage('cars'); } },
          { title: 'BeeMiles Offers', desc: 'Bonus miles on select bookings this month', tag: '3x Miles', color: '#DAA520', icon: <TrophyOutlined style={{ fontSize: 28, color: '#DAA520' }} />, onClick: () => { setActivePage('my-hiveair'); setAccountSection('beemiles-rewards'); } },
        ].map((cat) => (
          <Col xs={24} sm={12} md={6} key={cat.title}>
            <Card hoverable style={{ height: '100%', borderRadius: 12, textAlign: 'center' }} onClick={cat.onClick}>
              <div style={{ marginBottom: 12 }}>{cat.icon}</div>
              <Title level={5} style={{ margin: 0 }}>{cat.title}</Title>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4, marginBottom: 8 }}>{cat.desc}</Text>
              <Tag color={cat.color} style={{ fontWeight: 600 }}>{cat.tag}</Tag>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Featured Deals */}
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}><ThunderboltOutlined style={{ marginRight: 8 }} />Flash Deals</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>These deals expire in 48 hours — grab them while they last!</Text>
        <Table
          pagination={false}
          dataSource={[
            { key: '1', route: 'JFK → MIA', depart: 'Mar 20', return: 'Mar 27', price: '$89', savings: 'Save $160', seats: '4 left' },
            { key: '2', route: 'ORD → LAX', depart: 'Mar 22', return: 'Mar 29', price: '$129', savings: 'Save $170', seats: '7 left' },
            { key: '3', route: 'BOS → DEN', depart: 'Apr 3', return: 'Apr 10', price: '$149', savings: 'Save $180', seats: '2 left' },
            { key: '4', route: 'DFW → SFO', depart: 'Apr 5', return: 'Apr 12', price: '$119', savings: 'Save $160', seats: '9 left' },
            { key: '5', route: 'ATL → SEA', depart: 'Apr 8', return: 'Apr 15', price: '$159', savings: 'Save $140', seats: '5 left' },
            { key: '6', route: 'MSP → JFK', depart: 'Apr 12', return: 'Apr 19', price: '$99', savings: 'Save $190', seats: '3 left' },
          ]}
          columns={[
            { title: 'Route', dataIndex: 'route', key: 'route', render: (text: string) => <Text strong>{text}</Text> },
            { title: 'Depart', dataIndex: 'depart', key: 'depart' },
            { title: 'Return', dataIndex: 'return', key: 'return' },
            { title: 'Price', dataIndex: 'price', key: 'price', render: (text: string) => <Text strong style={{ color: '#52c41a', fontSize: 16 }}>{text}</Text> },
            { title: 'Savings', dataIndex: 'savings', key: 'savings', render: (text: string) => <Tag color="green">{text}</Tag> },
            { title: 'Availability', dataIndex: 'seats', key: 'seats', render: (text: string) => <Tag color="red">{text}</Tag> },
            { title: '', key: 'action', render: () => <Button type="primary" size="small" style={{ background: theme.accentLight, borderColor: theme.accentLight }} onClick={() => { setActivePage('book'); setBookSubPage('flights'); }}>Book Now</Button> },
          ]}
        />
      </Card>

      {creditCardPromo}
    </Space>
  );

  // ============================================
  // RENDER: HELP - FAQ PAGE
  // ============================================
  const renderFaqPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {[
        {
          category: 'Booking & Reservations',
          questions: [
            { q: 'How do I change or cancel my flight?', a: 'You can change or cancel your flight through My Trips, the HiveAir app, or by contacting our reservations team. Changes may be subject to fare differences. Most tickets include free cancellation within 24 hours of booking.' },
            { q: 'Can I hold a reservation without paying?', a: 'Yes, HiveAir offers a 24-hour hold option on most fares. You can also use our Price Lock feature to hold a fare for up to 7 days for a small fee.' },
            { q: 'How do I add a lap infant to my booking?', a: 'Infants under 2 can travel on your lap for free on domestic flights. Call our reservations team or visit a ticket counter to add a lap infant to your booking.' },
          ],
        },
        {
          category: 'BeeMiles Rewards',
          questions: [
            { q: 'How do I earn BeeMiles?', a: 'Earn miles by flying HiveAir, using the HiveAir Visa card, shopping with partners, and booking hotels or car rentals through HiveAir. BeeMiles members earn 5 miles per dollar on HiveAir flights.' },
            { q: 'Do my miles expire?', a: 'BeeMiles do not expire as long as your account remains active. Keep your account active by earning or redeeming miles at least once every 24 months.' },
            { q: 'How do I redeem miles for a flight?', a: 'Search for flights on hiveair.com or the app and select "Pay with Miles" at checkout. Award flights start at just 10,000 miles each way for domestic travel.' },
          ],
        },
        {
          category: 'Baggage & Check-in',
          questions: [
            { q: 'What is the baggage allowance?', a: 'All passengers get one free carry-on and one personal item. Checked bag fees start at $35 for the first bag on domestic flights. BeeMiles Silver and above receive complimentary checked bags.' },
            { q: 'When does online check-in open?', a: 'Online check-in opens 24 hours before your scheduled departure. We recommend checking in early to select or confirm your seat assignment.' },
            { q: 'What if my bag is lost or delayed?', a: 'Report your missing bag at the baggage service office at your arrival airport or online through My Trips. HiveAir will deliver your bag to your address once located and provide compensation for reasonable expenses.' },
          ],
        },
      ].map((section) => (
        <Card key={section.category} style={{ borderRadius: 12 }}>
          <Title level={4}>{section.category}</Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {section.questions.map((item) => (
              <Card key={item.q} size="small" style={{ background: '#fafafa' }}>
                <Text strong style={{ fontSize: 14 }}>{item.q}</Text>
                <Text type="secondary" style={{ display: 'block', marginTop: 8, lineHeight: 1.7 }}>{item.a}</Text>
              </Card>
            ))}
          </Space>
        </Card>
      ))}
    </Space>
  );

  // ============================================
  // RENDER: HELP - CONTACT PAGE
  // ============================================
  const renderContactPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        {[
          { title: 'Call Us', detail: '1-800-HIVEAIR (1-800-448-3247)', sub: 'Available 24/7', icon: <QuestionCircleOutlined style={{ fontSize: 28, color: theme.accent }} /> },
          { title: 'Chat With Us', detail: 'Live chat in the HiveAir app', sub: 'Avg response: 2 min', icon: <InfoCircleOutlined style={{ fontSize: 28, color: theme.accent }} /> },
          { title: 'Email Us', detail: 'support@hiveair.com', sub: 'Response within 24 hours', icon: <GlobalOutlined style={{ fontSize: 28, color: theme.accent }} /> },
          { title: 'Social Media', detail: '@HiveAir on Twitter/X', sub: 'DMs open for support', icon: <UserOutlined style={{ fontSize: 28, color: theme.accent }} /> },
        ].map((ch) => (
          <Col xs={24} sm={12} md={6} key={ch.title}>
            <Card style={{ height: '100%', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ marginBottom: 12 }}>{ch.icon}</div>
              <Title level={5} style={{ margin: 0 }}>{ch.title}</Title>
              <Text strong style={{ display: 'block', marginTop: 8 }}>{ch.detail}</Text>
              <Text type="secondary" style={{ fontSize: 12 }}>{ch.sub}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Title level={4}>Special Assistance Numbers</Title>
        <Table
          pagination={false}
          dataSource={[
            { key: '1', service: 'Disability & Special Needs', phone: '1-800-BEE-EASY', hours: '24/7' },
            { key: '2', service: 'Group Travel (10+)', phone: '1-800-BEE-GRUP', hours: 'Mon-Fri 8am-8pm ET' },
            { key: '3', service: 'Cargo & Freight', phone: '1-800-BEE-CRGO', hours: 'Mon-Fri 7am-7pm ET' },
            { key: '4', service: 'Refunds', phone: '1-800-BEE-RFND', hours: 'Mon-Sat 8am-10pm ET' },
            { key: '5', service: 'Lost & Found', phone: '1-800-BEE-LOST', hours: '24/7' },
          ]}
          columns={[
            { title: 'Service', dataIndex: 'service', key: 'service' },
            { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (text: string) => <Text strong>{text}</Text> },
            { title: 'Hours', dataIndex: 'hours', key: 'hours' },
          ]}
        />
      </Card>
    </Space>
  );

  // ============================================
  // RENDER: HELP - FEEDBACK PAGE
  // ============================================
  const renderFeedbackPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}>We Value Your Feedback</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          Help us improve the HiveAir experience. Select a category and share your thoughts.
        </Text>
        <Row gutter={[16, 16]}>
          {[
            { title: 'Compliment', desc: 'Share a positive experience with our team', color: '#52c41a', icon: <StarOutlined /> },
            { title: 'Suggestion', desc: 'Ideas to improve our service', color: '#1890ff', icon: <InfoCircleOutlined /> },
            { title: 'Complaint', desc: 'Report an issue with your experience', color: '#f5222d', icon: <ExclamationCircleOutlined /> },
            { title: 'Refund Request', desc: 'Request a refund or compensation', color: '#DAA520', icon: <WalletOutlined /> },
          ].map((fb) => (
            <Col xs={24} sm={12} key={fb.title}>
              <Card
                hoverable
                style={{ borderRadius: 12, borderLeft: `4px solid ${fb.color}` }}
              >
                <Space>
                  <div style={{ color: fb.color, fontSize: 20 }}>{fb.icon}</div>
                  <div>
                    <Text strong>{fb.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{fb.desc}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card style={{ borderRadius: 12, background: '#f9f9ff', border: '1px solid #e8e0ff' }}>
        <Title level={5}>Recent Improvements Based on Your Feedback</Title>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {[
            'Added free Wi-Fi on all domestic flights',
            'Extended check-in window to 24 hours',
            'Introduced mobile boarding passes at all airports',
            'Expanded HiveAir Lounge hours to 5am-11pm',
            'Added more vegetarian and vegan meal options',
          ].map((item) => (
            <div key={item}>
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
              <Text>{item}</Text>
            </div>
          ))}
        </Space>
      </Card>
    </Space>
  );

  // ============================================
  // RENDER: HELP PAGE (routes to sub-pages)
  // ============================================
  const renderHelpPage = () => {
    switch (helpSubPage) {
      case 'contact': return renderContactPage();
      case 'feedback': return renderFeedbackPage();
      default: return renderFaqPage();
    }
  };

  // ============================================
  // RENDER: MY TRIPS PAGE
  // ============================================
  const renderFlightList = (flights: Flight[], emptyMessage: string) => {
    if (flights.length === 0) {
      return (
        <Card style={{ borderRadius: 12, textAlign: 'center', padding: 40 }}>
          <RocketOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
          <Title level={4} type="secondary" style={{ margin: 0 }}>{emptyMessage}</Title>
          <Text type="secondary">Check back later or book a new trip!</Text>
          <div style={{ marginTop: 16 }}>
            <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }} onClick={() => { setActivePage('book'); setBookSubPage('flights'); }}>
              Book a Flight
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <>
        {flightDisplayMode === 'timeline' && <FlightTimeline flights={flights} />}
        {flightDisplayMode === 'card' && (
          <Row gutter={[16, 16]}>
            {flights.map((flight) => (
              <Col xs={24} md={12} key={flight.id}>
                <FlightCard flight={flight} displayMode="card" />
              </Col>
            ))}
          </Row>
        )}
        {flightDisplayMode === 'list' && (
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} displayMode="list" />
            ))}
          </div>
        )}
      </>
    );
  };

  const renderTripsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}>My Trips</Title>
        <Button type="primary" style={{ background: theme.accentLight, borderColor: theme.accentLight }} onClick={() => { setActivePage('book'); setBookSubPage('flights'); }}>
          Book New Trip
        </Button>
      </div>

      {/* Tab Selector */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #f0f0f0' }}>
        {[
          { key: 'upcoming' as const, label: 'Upcoming', count: FLIGHT_DATA.length },
          { key: 'past' as const, label: 'Past', count: PAST_FLIGHTS.length },
          { key: 'cancelled' as const, label: 'Cancelled', count: CANCELLED_FLIGHTS.length },
        ].map((tab) => (
          <div
            key={tab.key}
            onClick={() => setTripsTab(tab.key)}
            style={{
              padding: '12px 24px',
              cursor: 'pointer',
              fontWeight: tripsTab === tab.key ? 600 : 400,
              color: tripsTab === tab.key ? theme.accent : '#8c8c8c',
              borderBottom: tripsTab === tab.key ? `3px solid ${theme.accent}` : '3px solid transparent',
              marginBottom: -2,
              transition: 'all 0.2s',
            }}
          >
            {tab.label} <Tag style={{ marginLeft: 4 }}>{tab.count}</Tag>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {tripsTab === 'upcoming' && (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {FLIGHT_DATA.length > 0 && (
            <Alert
              type="info"
              showIcon
              message={`You have ${FLIGHT_DATA.length} upcoming trip${FLIGHT_DATA.length !== 1 ? 's' : ''}`}
              description="Check in online up to 24 hours before departure. Mobile boarding passes are available in the HiveAir app."
              style={{ borderRadius: 8 }}
            />
          )}
          {renderFlightList(FLIGHT_DATA.slice(0, recentBookingsToShow), 'No upcoming trips')}
          {FLIGHT_DATA.length > recentBookingsToShow && (
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">
                Showing {Math.min(recentBookingsToShow, FLIGHT_DATA.length)} of {FLIGHT_DATA.length} trips
              </Text>
            </div>
          )}
        </Space>
      )}

      {tripsTab === 'past' && (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {renderFlightList(PAST_FLIGHTS, 'No past trips')}
          {PAST_FLIGHTS.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">{PAST_FLIGHTS.length} completed trip{PAST_FLIGHTS.length !== 1 ? 's' : ''}</Text>
            </div>
          )}
        </Space>
      )}

      {tripsTab === 'cancelled' && (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {renderFlightList(CANCELLED_FLIGHTS, 'No cancelled trips')}
          {CANCELLED_FLIGHTS.length > 0 && (
            <Card style={{ borderRadius: 12, background: '#fffbe6', border: '1px solid #ffe58f' }}>
              <Text>
                <ExclamationCircleOutlined style={{ color: '#d48806', marginRight: 8 }} />
                Cancelled flights may be eligible for a refund or travel credit. Visit <Button type="link" style={{ padding: 0, color: theme.accent }} onClick={() => { setActivePage('help'); setHelpSubPage('contact'); }}>Help &amp; Contact</Button> for assistance.
              </Text>
            </Card>
          )}
        </Space>
      )}
    </Space>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ============================================ */}
      {/* PRIMARY NAV BAR - Dark navy, United-style */}
      {/* ============================================ */}
      <div
        style={{
          background: theme.navBg,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          height: 56,
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo + Nav Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Logo */}
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            onClick={() => setActivePage('my-hiveair')}
          >
            <img
              src="/hiveair-logo.svg"
              alt="HiveAir"
              style={{ width: 36, height: 36 }}
            />
            <Text strong style={{ color: '#fff', fontSize: 18, letterSpacing: -0.5 }}>
              HiveAir
            </Text>
          </div>

          {/* Nav Menu Items */}
          {navItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                if (item.key === 'book') setActivePage('book');
                else if (item.key === 'my-trips') setActivePage('my-trips');
                else if (item.key === 'travel-info') setActivePage('travel-info');
                else if (item.key === 'beemiles') setActivePage('my-hiveair');
                else if (item.key === 'deals') setActivePage('deals');
                else if (item.key === 'help') setActivePage('help');
              }}
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 14,
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Right: Search + User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SearchOutlined style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }} />
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#1890ff',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SECONDARY BAR - Greeting + Miles */}
      {/* ============================================ */}
      <div
        style={{
          background: theme.navSecondaryBg,
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        <TrophyOutlined style={{ color: '#FFD700', fontSize: 14 }} />
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13 }}>
          Hi, {userName} | {displayMiles.toLocaleString()} miles
        </Text>
      </div>

      {/* ============================================ */}
      {/* ST. PATRICK'S DAY BANNER (conditional) */}
      {/* ============================================ */}
      {enableStPatricksDay && (
        <>
          <style>{`
            /* Override Ant Design primary colors for St. Patrick's Day */
            .ant-menu-inline .ant-menu-item-selected {
              background-color: #2ea043 !important;
            }
            .ant-btn-primary {
              background-color: #3cb371 !important;
              border-color: #3cb371 !important;
            }
            .ant-btn-primary:hover {
              background-color: #2ea043 !important;
              border-color: #2ea043 !important;
            }
            .ant-btn-link {
              color: #2ea043 !important;
            }
            .ant-progress-bg {
              background-color: #2ea043 !important;
            }
            .ant-tag-processing {
              color: #2ea043 !important;
              border-color: #2ea043 !important;
            }
            /* Green tint on cards */
            .ant-card:hover {
              border-color: #3cb371 !important;
            }
            .st-patricks-banner {
              background: linear-gradient(90deg, #1a7a3d 0%, #2ea043 40%, #3cb371 70%, #2ea043 100%);
              padding: 10px 24px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .st-patricks-banner::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: repeating-linear-gradient(
                120deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 80px
              );
            }
            @keyframes shamrock-float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(5deg); }
            }
            .shamrock {
              display: inline-block;
              animation: shamrock-float 2s ease-in-out infinite;
            }
            .shamrock:nth-child(2) { animation-delay: 0.3s; }
            .shamrock:nth-child(3) { animation-delay: 0.6s; }
            @keyframes fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 0.7; }
              100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
            .shamrock-bg {
              position: fixed;
              top: -20px;
              font-size: 20px;
              color: #2ea043;
              opacity: 0.15;
              z-index: 0;
              pointer-events: none;
              animation: fall linear infinite;
            }
          `}</style>
          {/* Falling shamrock decorations */}
          {[5, 15, 25, 40, 55, 65, 75, 88, 95].map((left, i) => (
            <div
              key={`shamrock-${i}`}
              className="shamrock-bg"
              style={{
                left: `${left}%`,
                animationDuration: `${8 + (i * 2)}s`,
                animationDelay: `${i * 1.5}s`,
                fontSize: `${16 + (i % 3) * 8}px`,
              }}
            >
              &#9752;
            </div>
          ))}
          <div className="st-patricks-banner">
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 600, position: 'relative', zIndex: 1 }}>
              <span className="shamrock">&#9752;</span>
              {' '}Happy St. Patrick&apos;s Day! Earn <span style={{ color: '#FFD700' }}>3x BeeMiles</span> on all flights booked today{' '}
              <span className="shamrock">&#9752;</span>
              {' '}
              <Button
                size="small"
                style={{ background: '#FFD700', borderColor: '#FFD700', color: '#1a1a1a', fontWeight: 600, marginLeft: 8 }}
                onClick={() => { setActivePage('deals'); }}
              >
                View Lucky Deals
              </Button>
            </Text>
          </div>
        </>
      )}

      {/* ============================================ */}
      {/* MEMORIAL DAY BANNER (conditional) */}
      {/* FEATURE FLAG: enableMemorialDay (Boolean) */}
      {/* Patriotic theme with 50% military discount promo */}
      {/* ============================================ */}
      {enableMemorialDay && !enableStPatricksDay && (
        <>
          <style>{`
            /* Override Ant Design primary colors for Memorial Day */
            .ant-menu-inline .ant-menu-item-selected {
              background-color: #1B2A4A !important;
              color: #fff !important;
            }
            .ant-menu-inline .ant-menu-item-selected .anticon {
              color: #fff !important;
            }
            .ant-btn-primary {
              background-color: #B22234 !important;
              border-color: #B22234 !important;
            }
            .ant-btn-primary:hover {
              background-color: #8B1A29 !important;
              border-color: #8B1A29 !important;
            }
            /* Patriotic tint on cards */
            .ant-card:hover {
              border-color: #3C5A99 !important;
            }
            .memorial-day-banner {
              background: linear-gradient(90deg, #1B2A4A 0%, #2C3E6B 30%, #B22234 50%, #2C3E6B 70%, #1B2A4A 100%);
              padding: 12px 24px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .memorial-day-banner::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background: repeating-linear-gradient(
                120deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 80px
              );
            }
            @keyframes star-pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.15); opacity: 0.8; }
            }
            .memorial-star {
              display: inline-block;
              animation: star-pulse 2s ease-in-out infinite;
            }
            .memorial-star:nth-child(2) { animation-delay: 0.4s; }
            .memorial-star:nth-child(3) { animation-delay: 0.8s; }
            @keyframes star-fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 0.5; }
              100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
            .star-bg {
              position: fixed;
              top: -20px;
              color: #3C5A99;
              opacity: 0.1;
              z-index: 0;
              pointer-events: none;
              animation: star-fall linear infinite;
            }
          `}</style>
          {/* Falling star decorations */}
          {[8, 18, 30, 42, 55, 68, 78, 90].map((left, i) => (
            <div
              key={`star-${i}`}
              className="star-bg"
              style={{
                left: `${left}%`,
                animationDuration: `${10 + (i * 2)}s`,
                animationDelay: `${i * 1.8}s`,
                fontSize: `${14 + (i % 3) * 6}px`,
              }}
            >
              &#9733;
            </div>
          ))}
          <div className="memorial-day-banner">
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 600, position: 'relative', zIndex: 1 }}>
              <span className="memorial-star" style={{ color: '#FFD700' }}>&#9733;</span>
              {' '}Honoring Our Heroes — <span style={{ color: '#FFD700' }}>50% off</span> for all service members and their families. Use code <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>HONOR50</span>{' '}
              <span className="memorial-star" style={{ color: '#FFD700' }}>&#9733;</span>
              {' '}
              <Button
                size="small"
                style={{ background: '#FFD700', borderColor: '#FFD700', color: '#1a1a1a', fontWeight: 600, marginLeft: 8 }}
                onClick={() => { setActivePage('deals'); }}
              >
                Book Now
              </Button>
            </Text>
          </div>
        </>
      )}

      {/* ============================================ */}
      {/* PAGE CONTENT */}
      {/* ============================================ */}
      <Content style={{ padding: '32px 24px', background: enableStPatricksDay ? '#f0f9f0' : enableMemorialDay ? '#f5f8ff' : '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Page Title */}
          {activePage === 'my-hiveair' && (
            <Title level={2} style={{ marginBottom: 24 }}>My HiveAir</Title>
          )}

          {/* Render active page */}
          {activePage === 'my-hiveair' && renderMyHiveAirPage()}
          {activePage === 'book' && renderBookPage()}
          {activePage === 'travel-info' && renderTravelInfoPage()}
          {activePage === 'deals' && renderDealsPage()}
          {activePage === 'help' && renderHelpPage()}
          {activePage === 'my-trips' && renderTripsPage()}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
