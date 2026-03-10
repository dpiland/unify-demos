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
  CoffeeOutlined,
  CrownOutlined,
  DownOutlined,
  GlobalOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  SettingOutlined,
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

/**
 * App Component - HiveAir Passenger Portal
 *
 * United-style navigation with top nav bar, secondary greeting bar,
 * and tabbed content pages (My HiveAir account, Book, My Trips).
 */
function App() {
  const currentUser = loadCurrentUser();
  const [activePage, setActivePage] = useState('my-hiveair');
  const [accountSection, setAccountSection] = useState('my-hiveair');

  // ============================================
  // BOOLEAN FLAGS
  // ============================================
  const enableSeatSelection = useFeatureFlag('enableSeatSelection');
  const enableLoungeAccess = useFeatureFlag('enableLoungeAccess');
  const enablePriorityBoarding = useFeatureFlag('enablePriorityBoarding');
  const showFlightAlerts = useFeatureFlag('showFlightAlerts');
  const enableMobileCheckin = useFeatureFlag('enableMobileCheckin');

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
          }}
        >
          <span style={{ cursor: 'pointer' }}>
            BeeMiles <DownOutlined style={{ fontSize: 10 }} />
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

      {/* Main Content */}
      <Col xs={24} md={18}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Flight Alerts */}
          {showFlightAlerts && (
            <Alert
              message="Flight Status Update"
              description="Flight HA 1234 to LAX: On-time departure at 3:45 PM from Gate B12. Boarding begins at 3:15 PM."
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
              closable
              style={{ borderLeft: '4px solid #806ff6' }}
            />
          )}

          {/* Account Details Card */}
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Account details</Title>}
          >
            <Row gutter={48}>
              {/* Tier Badge */}
              <Col>
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    background: '#0069ff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>
                    {currentTierInfo.label}
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 10 }}>Member</Text>
                </div>
              </Col>

              {/* Account Number */}
              <Col>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>Account</Text>
                <Text strong style={{ fontSize: 16 }}>
                  {userProperties.strings.userId || 'HAX00001'}
                </Text>
              </Col>

              {/* Miles */}
              <Col>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>Miles</Text>
                <Text strong style={{ fontSize: 24 }}>
                  {displayMiles.toLocaleString()}
                </Text>
                {loyaltyPointsMultiplier > 1 && (
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    {loyaltyPointsMultiplier}x Bonus!
                  </Tag>
                )}
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>Miles never expire</Text>
              </Col>
            </Row>
          </Card>

          {/* Premier Progress Card */}
          <Card
            title={
              <Space>
                <Title level={4} style={{ margin: 0 }}>Your BeeMiles progress</Title>
                <QuestionCircleOutlined style={{ color: '#999' }} />
              </Space>
            }
          >
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>Earned in 2026</Text>

            <Row gutter={[48, 16]}>
              <Col xs={12} md={6}>
                <Text type="secondary" style={{ fontSize: 13 }}>Premier qualifying flights (PQF)</Text>
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 20 }}>{userProperties.numbers.totalFlights || 0}</Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Text type="secondary" style={{ fontSize: 13 }}>Flight segment minimum</Text>
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 20 }}>
                    {Math.min(userProperties.numbers.totalFlights || 0, 4)} of 4
                  </Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Text type="secondary" style={{ fontSize: 13 }}>Premier qualifying points (PQP)</Text>
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 20 }}>
                    {Math.round((userProperties.numbers.averageSpend || 0) * (userProperties.numbers.totalFlights || 0) * 0.1).toLocaleString()}
                  </Text>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Lifetime flight miles <QuestionCircleOutlined style={{ color: '#999', fontSize: 12 }} />
                </Text>
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ fontSize: 20 }}>{displayMiles.toLocaleString()}</Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <Space>
              <Button type="link" style={{ padding: 0, color: '#0069ff' }}>See your benefits</Button>
              <Divider type="vertical" />
              <Button type="link" style={{ padding: 0, color: '#0069ff' }}>View BeeMiles status tracker</Button>
            </Space>
          </Card>

          {/* Upcoming Trips */}
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Upcoming trips</Title>}
          >
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              Manage or change your reservation by selecting any of your upcoming flights, or view all trips to access all of your current, past, or canceled reservations.
            </Text>

            {FLIGHT_DATA.length > 0 ? (
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {FLIGHT_DATA.slice(0, recentBookingsToShow).map((flight) => (
                  <div
                    key={flight.id}
                    style={{
                      border: '1px solid #e8e8e8',
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text strong>{flight.flightNumber}</Text>
                        <Text type="secondary" style={{ marginLeft: 12 }}>
                          {flight.departure.code} → {flight.arrival.code}
                        </Text>
                      </Col>
                      <Col>
                        <Tag color={flight.cabinClass === 'First Class' ? 'gold' : flight.cabinClass === 'Comfort+' ? 'blue' : 'default'}>
                          {flight.cabinClass}
                        </Tag>
                        <Text type="secondary" style={{ marginLeft: 8 }}>{flight.duration}</Text>
                      </Col>
                    </Row>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(flight.departure.time).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        {flight.departure.gate && ` • Gate ${flight.departure.gate}`}
                      </Text>
                    </div>
                  </div>
                ))}
              </Space>
            ) : (
              <Text strong>You have no upcoming trips</Text>
            )}

            <Divider />

            <Space>
              <Button type="link" style={{ padding: 0, color: '#0069ff' }}>View all trips</Button>
              <Divider type="vertical" />
              <Button type="link" style={{ padding: 0, color: '#0069ff' }}>Find a trip</Button>
              <Divider type="vertical" />
              <Button
                type="link"
                style={{ padding: 0, color: '#0069ff' }}
                onClick={() => setActivePage('book')}
              >
                Book a flight
              </Button>
            </Space>
          </Card>

          {/* Premium Services Row */}
          <Row gutter={[16, 16]}>
            {/* Lounge Access */}
            {enableLoungeAccess && userProperties.booleans.hasLoungeAccess && (
              <Col xs={24} md={12}>
                <Card title={<Space><CoffeeOutlined />Airport Lounge Access</Space>} size="small">
                  <LoungeAccessCard
                    homeAirport={userProperties.strings.homeAirport || 'JFK'}
                    membershipTier={userProperties.strings.membershipTier || 'standard'}
                  />
                </Card>
              </Col>
            )}

            {/* Priority Services */}
            {enablePriorityBoarding && userProperties.booleans.hasPriorityBoarding && (
              <Col xs={24} md={12}>
                <Card title={<Space><ThunderboltOutlined />Priority Services</Space>} size="small">
                  <PriorityServicesCard
                    boardingGroup="Group 1"
                    hasFastTrack={true}
                    hasBaggagePriority={true}
                  />
                </Card>
              </Col>
            )}
          </Row>

          {/* Upgrade Offers */}
          {!userProperties.booleans.isBusinessClass && (
            <Card title={<Space><ArrowUpOutlined />Upgrade Your Flight</Space>}>
              <UpgradeOfferCard
                style={upgradePromptStyle as 'subtle' | 'prominent' | 'modal'}
                currentClass={userProperties.strings.cabinClass || 'economy'}
                upgradePrice={149}
              />
            </Card>
          )}

          {/* Seat Selection */}
          {enableSeatSelection && (
            <Card title={<Space><CrownOutlined />Select Your Seat</Space>}>
              <SeatSelector
                cabinClass={userProperties.strings.cabinClass || 'economy'}
                isPremiumMember={userProperties.booleans.isPremiumMember || false}
              />
            </Card>
          )}

          {/* Mobile Check-In */}
          {enableMobileCheckin && !userProperties.booleans.hasCheckedIn && (
            <Card title={<Space><RocketOutlined />Mobile Check-In</Space>}>
              <MobileCheckinCard
                flightNumber={FLIGHT_DATA[0]?.flightNumber}
                departure={FLIGHT_DATA[0]?.departure}
                canCheckIn={true}
              />
            </Card>
          )}
        </Space>
      </Col>
    </Row>
  );

  // ============================================
  // RENDER: BOOK PAGE
  // ============================================
  const renderBookPage = () => (
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
    </Space>
  );

  // ============================================
  // RENDER: MY TRIPS PAGE
  // ============================================
  const renderTripsPage = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3}>Your Flights</Title>

      {/* Timeline Display Mode */}
      {flightDisplayMode === 'timeline' && (
        <FlightTimeline flights={FLIGHT_DATA.slice(0, recentBookingsToShow)} />
      )}

      {/* Card Display Mode */}
      {flightDisplayMode === 'card' && (
        <Row gutter={[16, 16]}>
          {FLIGHT_DATA.slice(0, recentBookingsToShow).map((flight) => (
            <Col xs={24} md={12} key={flight.id}>
              <FlightCard flight={flight} displayMode="card" />
            </Col>
          ))}
        </Row>
      )}

      {/* List Display Mode */}
      {flightDisplayMode === 'list' && (
        <div style={{ background: '#fff' }}>
          {FLIGHT_DATA.slice(0, recentBookingsToShow).map((flight) => (
            <FlightCard key={flight.id} flight={flight} displayMode="list" />
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Text type="secondary">
          Showing <strong>{Math.min(recentBookingsToShow, FLIGHT_DATA.length)}</strong> of{' '}
          {FLIGHT_DATA.length} upcoming flights
        </Text>
      </div>

      <Divider />

      <Title level={3}>Previous Flights</Title>

      {flightDisplayMode === 'timeline' && (
        <FlightTimeline flights={PAST_FLIGHTS} />
      )}
      {flightDisplayMode === 'card' && (
        <Row gutter={[16, 16]}>
          {PAST_FLIGHTS.map((flight) => (
            <Col xs={24} md={12} key={flight.id}>
              <FlightCard flight={flight} displayMode="card" />
            </Col>
          ))}
        </Row>
      )}
      {flightDisplayMode === 'list' && (
        <div style={{ background: '#fff' }}>
          {PAST_FLIGHTS.map((flight) => (
            <FlightCard key={flight.id} flight={flight} displayMode="list" />
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Text type="secondary">
          {PAST_FLIGHTS.length} completed flight{PAST_FLIGHTS.length !== 1 ? 's' : ''}
        </Text>
      </div>
    </Space>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ============================================ */}
      {/* PRIMARY NAV BAR - Dark navy, United-style */}
      {/* ============================================ */}
      <div
        style={{
          background: '#806ff6',
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
                else if (item.key === 'beemiles') setActivePage('my-hiveair');
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
          background: '#6b5ce7',
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
      {/* PAGE CONTENT */}
      {/* ============================================ */}
      <Content style={{ padding: '32px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Page Title */}
          {activePage === 'my-hiveair' && (
            <Title level={2} style={{ marginBottom: 24 }}>My HiveAir</Title>
          )}

          {/* Render active page */}
          {activePage === 'my-hiveair' && renderMyHiveAirPage()}
          {activePage === 'book' && renderBookPage()}
          {activePage === 'my-trips' && renderTripsPage()}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
