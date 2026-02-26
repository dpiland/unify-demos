/**
 * Main Application - Airline Passenger Portal
 *
 * A professional airline passenger booking portal that uses CloudBees Feature Management
 * to deliver personalized travel experiences based on passenger tier, booking class,
 * and loyalty status.
 *
 * FEATURE FLAGS IN USE:
 * - Boolean: enableSeatSelection, enableLoungeAccess, enablePriorityBoarding, showFlightAlerts, enableMobileCheckin
 * - String: dashboardLayout, flightDisplayMode, upgradePromptStyle
 * - Number: recentBookingsToShow, flightStatusRefreshInterval, loyaltyPointsMultiplier
 *
 * USER TARGETING:
 * - Economy passengers: Standard features + upgrade offers
 * - Business passengers: Lounge access + priority boarding
 * - Elite members: All premium features
 * - Staff: Employee-specific features
 */

import { Alert, Badge, Button, Card, Col, Layout, List, Row, Space, Statistic, Tabs, Tag, Typography } from 'antd';
import {
  ArrowUpOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  CrownOutlined,
  GlobalOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { useFeatureFlagContext } from './contexts/FeatureFlagContext';
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

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

/**
 * Flight Interface
 *
 * Represents a flight booking with all necessary information for the portal
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
 *
 * Realistic flight bookings for demonstrating the airline portal.
 * In a production app, this would come from a booking API.
 */
const FLIGHT_DATA: Flight[] = [
  {
    id: 'flight-001',
    flightNumber: 'SK 1234',
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
    cabinClass: 'Economy',
    bookingRef: 'ABC123',
    status: 'scheduled',
    upgradeable: true,
    duration: '5h 30m',
  },
  {
    id: 'flight-002',
    flightNumber: 'SK 5678',
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
    cabinClass: 'Business',
    bookingRef: 'DEF456',
    status: 'scheduled',
    upgradeable: false,
    duration: '4h 15m',
  },
  {
    id: 'flight-003',
    flightNumber: 'SK 9012',
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
    cabinClass: 'Economy Plus',
    bookingRef: 'GHI789',
    status: 'scheduled',
    upgradeable: true,
    duration: '6h 30m',
  },
  {
    id: 'flight-004',
    flightNumber: 'SK 3456',
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
    cabinClass: 'Economy',
    bookingRef: 'JKL012',
    status: 'scheduled',
    upgradeable: true,
    duration: '4h 30m',
  },
  {
    id: 'flight-005',
    flightNumber: 'SK 7890',
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
    cabinClass: 'Business',
    bookingRef: 'MNO345',
    status: 'scheduled',
    upgradeable: false,
    duration: '3h 45m',
  },
];

/**
 * Past Flight Data
 *
 * Completed flights for travel history.
 * Shows previous bookings with RDU destinations.
 */
const PAST_FLIGHTS: Flight[] = [
  {
    id: 'past-001',
    flightNumber: 'SK 2345',
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
    cabinClass: 'Economy',
    bookingRef: 'PQR678',
    status: 'completed',
    upgradeable: false,
    duration: '1h 45m',
  },
  {
    id: 'past-002',
    flightNumber: 'SK 6789',
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
    cabinClass: 'Business',
    bookingRef: 'STU901',
    status: 'completed',
    upgradeable: false,
    duration: '5h 15m',
  },
  {
    id: 'past-003',
    flightNumber: 'SK 4567',
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
    cabinClass: 'Economy',
    bookingRef: 'VWX234',
    status: 'completed',
    upgradeable: false,
    duration: '2h 45m',
  },
  {
    id: 'past-004',
    flightNumber: 'SK 8901',
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
    cabinClass: 'Economy Plus',
    bookingRef: 'YZA567',
    status: 'completed',
    upgradeable: false,
    duration: '2h 15m',
  },
];

/**
 * Legacy sample data - kept for reference
 * Remove this when all sections are converted to airline content
 */
const SAMPLE_DATA = [
  'Sample Item 1 - Example data entry',
  'Sample Item 2 - Example data entry',
  'Sample Item 3 - Example data entry',
  'Sample Item 4 - Example data entry',
  'Sample Item 5 - Example data entry',
  'Sample Item 6 - Example data entry',
  'Sample Item 7 - Example data entry',
  'Sample Item 8 - Example data entry',
  'Sample Item 9 - Example data entry',
  'Sample Item 10 - Example data entry',
  'Sample Item 11 - Example data entry',
  'Sample Item 12 - Example data entry',
  'Sample Item 13 - Example data entry',
  'Sample Item 14 - Example data entry',
  'Sample Item 15 - Example data entry',
  'Sample Item 16 - Example data entry',
  'Sample Item 17 - Example data entry',
  'Sample Item 18 - Example data entry',
  'Sample Item 19 - Example data entry',
  'Sample Item 20 - Example data entry',
  'Sample Item 21 - Example data entry',
  'Sample Item 22 - Example data entry',
  'Sample Item 23 - Example data entry',
  'Sample Item 24 - Example data entry',
  'Sample Item 25 - Example data entry',
  'Sample Item 26 - Example data entry',
  'Sample Item 27 - Example data entry',
  'Sample Item 28 - Example data entry',
  'Sample Item 29 - Example data entry',
  'Sample Item 30 - Example data entry',
  'Sample Item 31 - Example data entry',
  'Sample Item 32 - Example data entry',
  'Sample Item 33 - Example data entry',
  'Sample Item 34 - Example data entry',
  'Sample Item 35 - Example data entry',
  'Sample Item 36 - Example data entry',
  'Sample Item 37 - Example data entry',
  'Sample Item 38 - Example data entry',
  'Sample Item 39 - Example data entry',
  'Sample Item 40 - Example data entry',
  'Sample Item 41 - Example data entry',
  'Sample Item 42 - Example data entry',
  'Sample Item 43 - Example data entry',
  'Sample Item 44 - Example data entry',
  'Sample Item 45 - Example data entry',
  'Sample Item 46 - Example data entry',
  'Sample Item 47 - Example data entry',
  'Sample Item 48 - Example data entry',
  'Sample Item 49 - Example data entry',
  'Sample Item 50 - Example data entry',
];

/**
 * App Component - Airline Passenger Portal
 *
 * Main dashboard demonstrating all 11 feature flags:
 * - Boolean (5): Seat selection, lounge access, priority boarding, flight alerts, mobile check-in
 * - String (3): Dashboard layout, flight display mode, upgrade prompt style
 * - Number (3): Bookings to show, refresh interval, loyalty multiplier
 *
 * USER-AWARE FEATURES:
 * - Statistics display current user's data (miles, flights, tier)
 * - Conditional sections based on user properties (lounge, priority, upgrades)
 * - Feature flags combined with user targeting for sophisticated control
 */
function App() {
  // ============================================
  // USER CONTEXT
  // ============================================
  // Load current user for personalized experience
  const currentUser = loadCurrentUser();

  // ============================================
  // BOOLEAN FLAGS - Feature Toggles
  // ============================================
  const enableSeatSelection = useFeatureFlag('enableSeatSelection');
  const enableLoungeAccess = useFeatureFlag('enableLoungeAccess');
  const enablePriorityBoarding = useFeatureFlag('enablePriorityBoarding');
  const showFlightAlerts = useFeatureFlag('showFlightAlerts');
  const enableMobileCheckin = useFeatureFlag('enableMobileCheckin');

  // ============================================
  // STRING FLAGS - A/B Testing & Variants
  // ============================================
  const dashboardLayout = useFeatureFlagString('dashboardLayout');
  const flightDisplayMode = useFeatureFlagString('flightDisplayMode');
  const upgradePromptStyle = useFeatureFlagString('upgradePromptStyle');

  // ============================================
  // NUMBER FLAGS - Numeric Configuration
  // ============================================
  const recentBookingsToShow = useFeatureFlagNumber('recentBookingsToShow');
  const flightStatusRefreshInterval = useFeatureFlagNumber('flightStatusRefreshInterval');
  const loyaltyPointsMultiplier = useFeatureFlagNumber('loyaltyPointsMultiplier');

  // ============================================
  // USER PROPERTIES
  // ============================================
  // Extract user properties for easier access
  const userProperties = currentUser?.properties || {
    booleans: {},
    strings: {},
    numbers: {},
  };

  // Calculate display values with multipliers
  const baseMiles = userProperties.numbers.frequentFlyerMiles || 0;
  const displayMiles = Math.floor(baseMiles * loyaltyPointsMultiplier);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <RocketOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            SkyTravel Passenger Portal
          </Title>
        </Space>
      </Header>

      {/* Main Content Area */}
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* ============================================ */}
            {/* FLIGHT STATUS ALERTS */}
            {/* ============================================ */}
            {/*
              PATTERN: Boolean flag controls notification banner visibility
              USE CASE: Real-time flight updates, gate changes, delays
              FLAG: showFlightAlerts (boolean)
            */}
            {showFlightAlerts && (
              <Alert
                message="Flight Status Update"
                description="Flight SK 1234 to LAX: On-time departure at 3:45 PM from Gate B12. Boarding begins at 3:15 PM."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                closable
              />
            )}

            {/* ============================================ */}
            {/* PASSENGER STATISTICS */}
            {/* ============================================ */}
            {/*
              PATTERN: Display user-specific metrics from properties
              USE CASE: Personalized dashboard based on passenger profile
              DATA SOURCE: currentUser.properties.numbers
              FLAGS: loyaltyPointsMultiplier (number) affects miles display
            */}
            <Row gutter={16}>
              {/* Upcoming Flights */}
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Upcoming Flights"
                    value={userProperties.numbers.currentBookings || 1}
                    prefix={<RocketOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>

              {/* Loyalty Miles with Multiplier Bonus */}
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title={
                      <Space>
                        <span>Loyalty Miles</span>
                        {loyaltyPointsMultiplier > 1 && (
                          <Tag color="gold" style={{ marginLeft: 4 }}>
                            {loyaltyPointsMultiplier}x Bonus!
                          </Tag>
                        )}
                      </Space>
                    }
                    value={displayMiles}
                    precision={0}
                    prefix={<TrophyOutlined />}
                    suffix="miles"
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>

              {/* Member Status with Tier Badge */}
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Member Status"
                    value={userProperties.strings.membershipTier || 'Standard'}
                    prefix={<CrownOutlined />}
                    valueStyle={{
                      color:
                        userProperties.strings.membershipTier === 'platinum'
                          ? '#722ed1'
                          : userProperties.strings.membershipTier === 'employee'
                          ? '#52c41a'
                          : '#1890ff',
                      textTransform: 'capitalize',
                    }}
                  />
                </Card>
              </Col>

              {/* Lifetime Flights */}
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Lifetime Flights"
                    value={userProperties.numbers.totalFlights || 0}
                    prefix={<GlobalOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* ============================================ */}
            {/* MAIN NAVIGATION TABS */}
            {/* ============================================ */}
            {/*
              PATTERN: Minimal, friction-free tabbed interface (Jony Ive inspired)
              USE CASE: Separate booking flow from flight management
              TABS:
                - Book: Flight search, deals, and booking
                - Your Flights: Existing bookings and itinerary
            */}
            <Tabs
              defaultActiveKey="book"
              size="large"
              items={[
                {
                  key: 'book',
                  label: (
                    <Space>
                      <SearchOutlined />
                      <span>Book</span>
                    </Space>
                  ),
                  children: (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                      {/* Flight Search & Booking */}
                      <div>
                        <FlightBooking
                          userCabinClass={
                            currentUser?.properties.strings.cabinClass === 'business' ? 'business' : 'economy'
                          }
                          onBookFlight={(flight, cabinClass) => {
                            console.log('Booked flight:', flight.flightNumber, 'in', cabinClass);
                          }}
                        />
                      </div>

                      {/* Top Flight Deals */}
                      <div>
                        <FlightDealsWidget />
                      </div>
                    </Space>
                  ),
                },
                {
                  key: 'flights',
                  label: (
                    <Space>
                      <RocketOutlined />
                      <span>Your Flights</span>
                      <Tag color="blue" style={{ marginLeft: 4 }}>
                        {FLIGHT_DATA.length}
                      </Tag>
                    </Space>
                  ),
                  children: (
                    <div>
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

                      {/* Footer with count */}
                      <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Text type="secondary">
                          Showing <strong>{Math.min(recentBookingsToShow, FLIGHT_DATA.length)}</strong> of{' '}
                          {FLIGHT_DATA.length} upcoming flights
                        </Text>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'history',
                  label: (
                    <Space>
                      <HistoryOutlined />
                      <span>Previous Flights</span>
                      <Tag color="gray" style={{ marginLeft: 4 }}>
                        {PAST_FLIGHTS.length}
                      </Tag>
                    </Space>
                  ),
                  children: (
                    <div>
                      {/* Timeline Display Mode */}
                      {flightDisplayMode === 'timeline' && (
                        <FlightTimeline flights={PAST_FLIGHTS} />
                      )}

                      {/* Card Display Mode */}
                      {flightDisplayMode === 'card' && (
                        <Row gutter={[16, 16]}>
                          {PAST_FLIGHTS.map((flight) => (
                            <Col xs={24} md={12} key={flight.id}>
                              <FlightCard flight={flight} displayMode="card" />
                            </Col>
                          ))}
                        </Row>
                      )}

                      {/* List Display Mode */}
                      {flightDisplayMode === 'list' && (
                        <div style={{ background: '#fff' }}>
                          {PAST_FLIGHTS.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} displayMode="list" />
                          ))}
                        </div>
                      )}

                      {/* Footer with count */}
                      <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Text type="secondary">
                          {PAST_FLIGHTS.length} completed flight{PAST_FLIGHTS.length !== 1 ? 's' : ''}
                        </Text>
                      </div>
                    </div>
                  ),
                },
              ]}
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: '0 24px',
              }}
            />

            {/* ============================================ */}
            {/* FEATURE-FLAGGED SECTIONS */}
            {/* ============================================ */}
            {/* Two-column layout for desktop, single column for mobile */}
            <Row gutter={[16, 16]}>
              {/* LEFT COLUMN - Primary Actions */}
              <Col xs={24} lg={16}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* SEAT SELECTION */}
                  {/*
                    PATTERN: Boolean flag controls visibility
                    USE CASE: Interactive seat map for flight selection
                    FLAG: enableSeatSelection (boolean)
                    USER PROPERTY: isPremiumMember affects premium seat access
                  */}
                  {enableSeatSelection && (
                    <Card title={<Space><CrownOutlined />Select Your Seat</Space>}>
                      <SeatSelector
                        cabinClass={userProperties.strings.cabinClass || 'economy'}
                        isPremiumMember={userProperties.booleans.isPremiumMember || false}
                      />
                    </Card>
                  )}

                  {/* MOBILE CHECK-IN */}
                  {/*
                    PATTERN: Boolean flag controls visibility
                    USE CASE: Mobile check-in and boarding pass
                    FLAG: enableMobileCheckin (boolean)
                    USER PROPERTY: hasCheckedIn determines if already checked in
                  */}
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

              {/* RIGHT COLUMN - Premium Services & Offers */}
              <Col xs={24} lg={8}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* LOUNGE ACCESS */}
                  {/*
                    PATTERN: Double conditional (flag AND user property)
                    USE CASE: Show lounge info to eligible passengers
                    FLAG: enableLoungeAccess (boolean)
                    USER PROPERTY: hasLoungeAccess (business, elite, staff)
                  */}
                  {enableLoungeAccess && userProperties.booleans.hasLoungeAccess && (
                    <Card title={<Space><CoffeeOutlined />Airport Lounge Access</Space>}>
                      <LoungeAccessCard
                        homeAirport={userProperties.strings.homeAirport || 'JFK'}
                        membershipTier={userProperties.strings.membershipTier || 'standard'}
                      />
                    </Card>
                  )}

                  {/* PRIORITY SERVICES */}
                  {/*
                    PATTERN: Double conditional (flag AND user property)
                    USE CASE: Priority boarding and services for premium passengers
                    FLAG: enablePriorityBoarding (boolean)
                    USER PROPERTY: hasPriorityBoarding (business, elite)
                  */}
                  {enablePriorityBoarding && userProperties.booleans.hasPriorityBoarding && (
                    <Card title={<Space><ThunderboltOutlined />Priority Services</Space>}>
                      <PriorityServicesCard
                        boardingGroup="Group 1"
                        hasFastTrack={true}
                        hasBaggagePriority={true}
                      />
                    </Card>
                  )}

                  {/* UPGRADE OFFERS */}
                  {/*
                    PATTERN: String flag controls presentation style
                    USE CASE: A/B test upgrade offer conversion
                    FLAG: upgradePromptStyle (string: 'subtle', 'prominent', 'modal')
                    USER PROPERTY: Only show to non-business class passengers
                  */}
                  {!userProperties.booleans.isBusinessClass && (
                    <Card title={<Space><ArrowUpOutlined />Upgrade Your Flight</Space>}>
                      <UpgradeOfferCard
                        style={upgradePromptStyle as 'subtle' | 'prominent' | 'modal'}
                        currentClass={userProperties.strings.cabinClass || 'economy'}
                        upgradePrice={149}
                      />
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
