/**
 * FlightBooking Component
 *
 * Complete flight search and booking interface with Trip Summary view.
 * When a flight is selected, transitions to a Delta-style Trip Summary
 * showing flight details, upgrade offers, seat selection, and pricing.
 *
 * FLOW:
 * 1. Search for flights
 * 2. Select a flight + cabin class
 * 3. Trip Summary view (similar to Delta's checkout flow)
 * 4. Continue to Review & Pay
 */

import { useState } from 'react';
import { Button, Card, Col, DatePicker, Divider, Form, InputNumber, Radio, Row, Select, Space, Steps, Tag, Typography, message } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  EnvironmentOutlined,
  RetweetOutlined,
  SearchOutlined,
  SwapOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCart } from '../../contexts/CartContext';
import { SeatSelector } from './SeatSelector';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

/**
 * Flight search result interface
 */
interface SearchResult {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    code: string;
    city: string;
    time: string;
  };
  arrival: {
    airport: string;
    code: string;
    city: string;
    time: string;
  };
  duration: string;
  price: {
    economy: number;
    business: number;
  };
  availableSeats: {
    economy: number;
    business: number;
  };
  stops: number;
}

interface FlightBookingProps {
  onBookFlight?: (flight: SearchResult, cabinClass: string) => void;
  userCabinClass?: 'economy' | 'business';
}

/**
 * Popular airports for demo
 */
const AIRPORTS = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco International' },
  { code: 'ORD', city: 'Chicago', name: "O'Hare International" },
  { code: 'DFW', city: 'Dallas', name: 'Dallas/Fort Worth International' },
  { code: 'MIA', city: 'Miami', name: 'Miami International' },
  { code: 'SEA', city: 'Seattle', name: 'Seattle-Tacoma International' },
  { code: 'BOS', city: 'Boston', name: 'Boston Logan International' },
  { code: 'DEN', city: 'Denver', name: 'Denver International' },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson Atlanta International' },
  { code: 'RDU', city: 'Raleigh-Durham', name: 'Raleigh-Durham International' },
  { code: 'OGG', city: 'Maui', name: 'Kahului Airport' },
  { code: 'HNL', city: 'Honolulu', name: 'Daniel K. Inouye International' },
];

/**
 * Generate mock search results
 */
function generateSearchResults(origin: string, destination: string, date: string): SearchResult[] {
  const flights: SearchResult[] = [
    {
      id: 'search-001',
      flightNumber: 'HA2001',
      airline: 'HiveAir',
      departure: {
        airport: AIRPORTS.find(a => a.code === origin)?.name || 'Airport',
        code: origin,
        city: AIRPORTS.find(a => a.code === origin)?.city || 'City',
        time: `${date}T08:00:00`,
      },
      arrival: {
        airport: AIRPORTS.find(a => a.code === destination)?.name || 'Airport',
        code: destination,
        city: AIRPORTS.find(a => a.code === destination)?.city || 'City',
        time: `${date}T11:30:00`,
      },
      duration: '3h 30m',
      price: { economy: 249, business: 849 },
      availableSeats: { economy: 45, business: 12 },
      stops: 0,
    },
    {
      id: 'search-002',
      flightNumber: 'HA2002',
      airline: 'HiveAir',
      departure: {
        airport: AIRPORTS.find(a => a.code === origin)?.name || 'Airport',
        code: origin,
        city: AIRPORTS.find(a => a.code === origin)?.city || 'City',
        time: `${date}T13:15:00`,
      },
      arrival: {
        airport: AIRPORTS.find(a => a.code === destination)?.name || 'Airport',
        code: destination,
        city: AIRPORTS.find(a => a.code === destination)?.city || 'City',
        time: `${date}T16:45:00`,
      },
      duration: '3h 30m',
      price: { economy: 199, business: 749 },
      availableSeats: { economy: 38, business: 8 },
      stops: 0,
    },
    {
      id: 'search-003',
      flightNumber: 'HA2003',
      airline: 'HiveAir',
      departure: {
        airport: AIRPORTS.find(a => a.code === origin)?.name || 'Airport',
        code: origin,
        city: AIRPORTS.find(a => a.code === origin)?.city || 'City',
        time: `${date}T18:30:00`,
      },
      arrival: {
        airport: AIRPORTS.find(a => a.code === destination)?.name || 'Airport',
        code: destination,
        city: AIRPORTS.find(a => a.code === destination)?.city || 'City',
        time: `${date}T22:00:00`,
      },
      duration: '3h 30m',
      price: { economy: 279, business: 899 },
      availableSeats: { economy: 52, business: 16 },
      stops: 0,
    },
  ];

  return flights;
}

/**
 * Format time for display
 */
function formatTime(isoTime: string): string {
  const date = new Date(isoTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes}${ampm}`;
}

/**
 * Format date for display
 */
function formatDate(isoTime: string): string {
  const date = new Date(isoTime);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

/**
 * FlightBooking Component
 */
export function FlightBooking({ onBookFlight, userCabinClass = 'economy' }: FlightBookingProps) {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [returnResults, setReturnResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const { addItem } = useCart();

  // Trip Summary state
  const [selectedFlight, setSelectedFlight] = useState<SearchResult | null>(null);
  const [selectedCabin, setSelectedCabin] = useState<'economy' | 'business'>('economy');
  const [passengers, setPassengers] = useState(1);
  const [showSeatSelector, setShowSeatSelector] = useState(false);

  // Handle flight search
  const handleSearch = async (values: any) => {
    setIsSearching(true);
    setHasSearched(false);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const outboundFlights = generateSearchResults(
      values.origin,
      values.destination,
      values.departureDate.format('YYYY-MM-DD')
    );

    setSearchResults(outboundFlights);
    setPassengers(values.passengers || 1);

    if (values.tripType === 'roundTrip' && values.returnDate) {
      const returnFlights = generateSearchResults(
        values.destination,
        values.origin,
        values.returnDate.format('YYYY-MM-DD')
      );
      setReturnResults(returnFlights);
    } else {
      setReturnResults([]);
    }

    setIsSearching(false);
    setHasSearched(true);

    const flightCount = values.tripType === 'roundTrip' ? outboundFlights.length * 2 : outboundFlights.length;
    message.success(`Found ${flightCount} flight${flightCount > 1 ? 's' : ''}`);
  };

  // Handle flight selection - transition to Trip Summary
  const handleSelectFlight = (flight: SearchResult, cabinClass: 'economy' | 'business') => {
    setSelectedFlight(flight);
    setSelectedCabin(cabinClass);
  };

  // Handle "Continue to Review & Pay" from Trip Summary
  const handleContinueToPayment = () => {
    if (!selectedFlight) return;

    const price = selectedCabin === 'economy' ? selectedFlight.price.economy : selectedFlight.price.business;

    addItem({
      id: selectedFlight.id,
      flightNumber: selectedFlight.flightNumber,
      origin: selectedFlight.departure.city,
      originCode: selectedFlight.departure.code,
      destination: selectedFlight.arrival.city,
      destinationCode: selectedFlight.arrival.code,
      departureTime: selectedFlight.departure.time,
      arrivalTime: selectedFlight.arrival.time,
      duration: selectedFlight.duration,
      cabinClass: selectedCabin,
      price,
      passengers,
    });

    message.success(`${selectedFlight.flightNumber} added to your itinerary!`);
    onBookFlight?.(selectedFlight, selectedCabin);

    // Reset to search
    setSelectedFlight(null);
  };

  // Handle "Start Over"
  const handleStartOver = () => {
    setSelectedFlight(null);
  };

  // Swap origin and destination
  const handleSwap = () => {
    const origin = form.getFieldValue('origin');
    const destination = form.getFieldValue('destination');
    form.setFieldsValue({
      origin: destination,
      destination: origin,
    });
  };

  // ============================================
  // TRIP SUMMARY VIEW
  // ============================================
  if (selectedFlight) {
    const basePrice = selectedCabin === 'economy' ? selectedFlight.price.economy : selectedFlight.price.business;
    const flightTotal = basePrice * passengers;
    const taxesAndFees = Math.round(flightTotal * 0.08 * 100) / 100;
    const amountDue = flightTotal + taxesAndFees;
    const upgradePrice = 150;
    const seatsLeft = selectedCabin === 'economy' ? selectedFlight.availableSeats.economy : selectedFlight.availableSeats.business;
    const cabinLabel = selectedCabin === 'economy' ? 'Main Classic' : 'HiveAir One';

    return (
      <div>
        {/* Progress Stepper */}
        <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
          <Steps
            current={1}
            size="small"
            items={[
              {
                title: <Button type="link" onClick={handleStartOver} style={{ padding: 0, color: '#8fa6d6' }}>Start Over</Button>,
              },
              {
                title: <Text strong>Trip Summary</Text>,
              },
              {
                title: 'Review & Pay',
              },
              {
                title: 'Confirmation',
              },
            ]}
          />
        </div>

        {/* Title */}
        <Title level={2} style={{ marginBottom: 24, color: '#1a1a2e' }}>
          Trip Summary
        </Title>

        <Row gutter={24}>
          {/* LEFT COLUMN - Flight Details */}
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>

              {/* Flight Itinerary Card */}
              <Card
                styles={{ body: { padding: 0 } }}
                style={{ overflow: 'hidden' }}
              >
                {/* Flight Header Bar */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space size="large">
                        <div>
                          <Tag color="blue" style={{ marginBottom: 4 }}>
                            {tripType === 'roundTrip' ? 'Round Trip' : 'One Way'}
                          </Tag>
                          <div>
                            <Text type="secondary" style={{ fontSize: 13 }}>
                              {selectedFlight.flightNumber}
                            </Text>
                          </div>
                        </div>

                        {/* Route */}
                        <div>
                          <Title level={4} style={{ margin: 0, letterSpacing: 1 }}>
                            {selectedFlight.departure.code} &middot; {selectedFlight.arrival.code}
                          </Title>
                        </div>

                        {/* Date & Time */}
                        <div>
                          <Text strong>{formatDate(selectedFlight.departure.time)}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 13 }}>
                            {formatTime(selectedFlight.departure.time)} - {formatTime(selectedFlight.arrival.time)}
                          </Text>
                        </div>

                        {/* Duration & Class */}
                        <div>
                          <Text type="secondary" style={{ fontSize: 13 }}>
                            {selectedFlight.stops === 0 ? 'Nonstop' : `${selectedFlight.stops} stop`}, {selectedFlight.duration}
                          </Text>
                          <br />
                          <Text strong style={{ fontSize: 13 }}>{cabinLabel}</Text>
                        </div>
                      </Space>
                    </Col>

                    <Col>
                      <Button type="link" onClick={handleStartOver} style={{ color: '#0056b3', padding: 0 }}>
                        Change Flight
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* Changeable / Nonrefundable label */}
                <div style={{ padding: '8px 24px', borderBottom: '1px solid #f0f0f0' }}>
                  <Button type="link" style={{ padding: 0, color: '#0056b3', fontSize: 13 }}>
                    Changeable / Nonrefundable
                  </Button>
                </div>
              </Card>

              {/* Upgrade Offer - Main Extra */}
              {selectedCabin === 'economy' && (
                <Card
                  styles={{ body: { padding: 0 } }}
                  style={{ overflow: 'hidden' }}
                >
                  <Row>
                    {/* Image Side */}
                    <Col xs={0} md={8}>
                      <div
                        style={{
                          height: '100%',
                          minHeight: 200,
                          background: 'linear-gradient(135deg, #2c3e6b 0%, #1a2744 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CrownOutlined style={{ fontSize: 64, color: 'rgba(255,255,255,0.3)' }} />
                      </div>
                    </Col>

                    {/* Content Side */}
                    <Col xs={24} md={16}>
                      <div style={{ padding: 24 }}>
                        <Title level={4} style={{ marginBottom: 16 }}>
                          Main <strong>Extra</strong>
                        </Title>

                        <Space direction="vertical" size={8} style={{ marginBottom: 20 }}>
                          <Space>
                            <CheckCircleOutlined style={{ color: '#8fa6d6' }} />
                            <Text style={{ fontSize: 14 }}>Fully refundable and free same-day flight changes</Text>
                          </Space>
                          <Space>
                            <CheckCircleOutlined style={{ color: '#8fa6d6' }} />
                            <Text style={{ fontSize: 14 }}>Board before Main Classic and Main Basic</Text>
                          </Space>
                          <Space>
                            <CheckCircleOutlined style={{ color: '#8fa6d6' }} />
                            <Text style={{ fontSize: 14 }}>Earn even more miles and higher upgrade priority for BeeMiles members</Text>
                          </Space>
                        </Space>

                        <Row justify="space-between" align="middle">
                          <Col>
                            <div>
                              <Text style={{ fontSize: 13, verticalAlign: 'super' }}>$</Text>
                              <Text strong style={{ fontSize: 28 }}>{upgradePrice}</Text>
                              <Text style={{ fontSize: 13 }}>.00</Text>
                            </div>
                            <Text type="secondary" style={{ fontSize: 12 }}>Per Person*</Text>
                          </Col>
                          <Col>
                            <Button
                              size="large"
                              onClick={() => {
                                setSelectedCabin('business');
                                message.success('Upgraded to Main Extra! Your trip total has been updated.');
                              }}
                              style={{
                                borderColor: '#8fa6d6',
                                color: '#8fa6d6',
                                fontWeight: 600,
                                minWidth: 120,
                              }}
                            >
                              UPGRADE
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Card>
              )}

              {/* View Seats */}
              <Card>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={4}>
                      <Space>
                        <EnvironmentOutlined style={{ fontSize: 20, color: '#8fa6d6' }} />
                        <Text strong style={{ fontSize: 16 }}>View Seats</Text>
                      </Space>
                      <Text type="secondary">View a map of the plane and select your seats</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      onClick={() => setShowSeatSelector(!showSeatSelector)}
                      style={{
                        borderColor: '#8fa6d6',
                        color: showSeatSelector ? '#fff' : '#8fa6d6',
                        background: showSeatSelector ? '#8fa6d6' : 'transparent',
                        fontWeight: 600,
                        minWidth: 140,
                      }}
                    >
                      {showSeatSelector ? 'HIDE SEATS' : 'SELECT SEATS'}
                    </Button>
                  </Col>
                </Row>
                {showSeatSelector && (
                  <div style={{ marginTop: 16 }}>
                    <Divider style={{ marginTop: 0 }} />
                    <SeatSelector
                      cabinClass={selectedCabin === 'business' ? 'comfort-plus' : 'economy'}
                      isPremiumMember={false}
                    />
                  </div>
                )}
              </Card>
            </Space>
          </Col>

          {/* RIGHT COLUMN - Trip Total */}
          <Col xs={24} lg={8}>
            <div style={{ position: 'sticky', top: 24 }}>
              <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {/* Header */}
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={4} style={{ margin: 0 }}>Trip Total</Title>
                    </Col>
                    <Col>
                      <Button type="link" style={{ padding: 0, fontSize: 12, color: '#0056b3' }}>
                        Currency Calculator
                      </Button>
                    </Col>
                  </Row>

                  <Text type="secondary">{passengers} Passenger{passengers > 1 ? 's' : ''}</Text>

                  <Divider style={{ margin: 0 }} />

                  {/* Line Items */}
                  <Row justify="space-between">
                    <Col><Text>Flights</Text></Col>
                    <Col><Text strong>${flightTotal.toFixed(2)}</Text></Col>
                  </Row>

                  <Row justify="space-between">
                    <Col><Text>Taxes, Fees & Charges</Text></Col>
                    <Col><Text>${taxesAndFees.toFixed(2)}</Text></Col>
                  </Row>

                  <Divider style={{ margin: 0 }} />

                  {/* Amount Due */}
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong style={{ color: '#0056b3', fontSize: 15 }}>Amount Due</Text>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <div>
                        <Text strong style={{ fontSize: 13 }}>$</Text>
                        <Text strong style={{ fontSize: 24 }}>{Math.floor(amountDue)}</Text>
                        <Text strong style={{ fontSize: 13 }}>.{(amountDue % 1).toFixed(2).slice(2)}</Text>
                        <Text style={{ fontSize: 12, marginLeft: 4 }}>USD</Text>
                      </div>
                      {seatsLeft <= 8 && (
                        <Tag color="red" style={{ fontSize: 11, marginTop: 4 }}>
                          {seatsLeft} left at this price
                        </Tag>
                      )}
                    </Col>
                  </Row>

                  <Divider style={{ margin: 0 }} />

                  {/* BeeMiles Earnings */}
                  <div style={{ background: '#f8f9fa', borderRadius: 6, padding: 12 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      As a BeeMiles Member, you could earn
                    </Text>
                    <br />
                    <Space size="large" style={{ marginTop: 4 }}>
                      <div>
                        <Text strong style={{ fontSize: 16 }}>{Math.round(flightTotal * 5).toLocaleString()}</Text>
                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>Miles</Text>
                      </div>
                      <div>
                        <Text strong style={{ fontSize: 16 }}>${Math.round(flightTotal * 1.1).toLocaleString()}</Text>
                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>MQDs</Text>
                      </div>
                    </Space>
                  </div>

                  {/* Amount Due (repeated at bottom like Delta) */}
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong style={{ color: '#0056b3' }}>Amount Due</Text>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                      <div>
                        <Text strong style={{ fontSize: 13 }}>$</Text>
                        <Text strong style={{ fontSize: 20 }}>{Math.floor(amountDue)}</Text>
                        <Text strong style={{ fontSize: 13 }}>.{(amountDue % 1).toFixed(2).slice(2)}</Text>
                        <Text style={{ fontSize: 12, marginLeft: 4 }}>USD</Text>
                      </div>
                      {seatsLeft <= 8 && (
                        <Tag color="red" style={{ fontSize: 11, marginTop: 4 }}>
                          {seatsLeft} left at this price
                        </Tag>
                      )}
                    </Col>
                  </Row>
                </Space>
              </Card>

              {/* Continue Button */}
              <Button
                type="primary"
                size="large"
                block
                onClick={handleContinueToPayment}
                style={{
                  marginTop: 16,
                  height: 52,
                  fontSize: 16,
                  fontWeight: 700,
                  backgroundColor: '#0069ff',
                  borderColor: '#0069ff',
                  letterSpacing: 0.5,
                }}
              >
                CONTINUE TO REVIEW & PAY
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  // ============================================
  // SEARCH VIEW (default)
  // ============================================
  return (
    <div>
      {/* Search Form */}
      <Card style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          initialValues={{
            tripType: 'roundTrip',
            origin: 'RDU',
            destination: 'LAX',
            departureDate: dayjs().add(7, 'day'),
            returnDate: dayjs().add(14, 'day'),
            passengers: 1,
          }}
        >
          {/* Trip Type Selector */}
          <Form.Item
            name="tripType"
            style={{ marginBottom: 24 }}
          >
            <Radio.Group
              size="large"
              buttonStyle="solid"
              onChange={(e) => setTripType(e.target.value)}
            >
              <Radio.Button value="oneWay">
                <Space>
                  <ArrowRightOutlined />
                  One Way
                </Space>
              </Radio.Button>
              <Radio.Button value="roundTrip">
                <Space>
                  <RetweetOutlined />
                  Round Trip
                </Space>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            {/* Origin */}
            <Col xs={24} sm={10}>
              <Form.Item
                label="From"
                name="origin"
                rules={[{ required: true, message: 'Please select origin' }]}
              >
                <Select
                  size="large"
                  showSearch
                  placeholder="Select origin airport"
                  optionFilterProp="children"
                >
                  {AIRPORTS.map(airport => (
                    <Option key={airport.code} value={airport.code}>
                      {airport.code} - {airport.city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Swap Button */}
            <Col xs={24} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                icon={<SwapOutlined />}
                onClick={handleSwap}
              >
                Swap
              </Button>
            </Col>

            {/* Destination */}
            <Col xs={24} sm={10}>
              <Form.Item
                label="To"
                name="destination"
                rules={[{ required: true, message: 'Please select destination' }]}
              >
                <Select
                  size="large"
                  showSearch
                  placeholder="Select destination airport"
                  optionFilterProp="children"
                >
                  {AIRPORTS.map(airport => (
                    <Option key={airport.code} value={airport.code}>
                      {airport.code} - {airport.city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Departure Date */}
            <Col xs={24} sm={tripType === 'roundTrip' ? 8 : 12}>
              <Form.Item
                label="Departure Date"
                name="departureDate"
                rules={[{ required: true, message: 'Please select departure date' }]}
              >
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>

            {/* Return Date - Only show for round trip */}
            {tripType === 'roundTrip' && (
              <Col xs={24} sm={8}>
                <Form.Item
                  label="Return Date"
                  name="returnDate"
                  rules={[
                    { required: true, message: 'Please select return date' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const departureDate = getFieldValue('departureDate');
                        if (!value || !departureDate || value.isAfter(departureDate)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Return date must be after departure date'));
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: '100%' }}
                    disabledDate={(current) => {
                      const departureDate = form.getFieldValue('departureDate');
                      return current && (current < dayjs().startOf('day') ||
                             (departureDate && current <= departureDate));
                    }}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
            )}

            {/* Passengers */}
            <Col xs={24} sm={tripType === 'roundTrip' ? 8 : 12}>
              <Form.Item
                label="Passengers"
                name="passengers"
                rules={[{ required: true, message: 'Please enter number of passengers' }]}
              >
                <InputNumber
                  size="large"
                  min={1}
                  max={9}
                  style={{ width: '100%' }}
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Search Button */}
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<SearchOutlined />}
              loading={isSearching}
              block
            >
              Search Flights
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div>
          {/* Outbound Flights */}
          <Title level={4} style={{ marginBottom: 16 }}>
            {tripType === 'roundTrip' ? 'Outbound Flights' : 'Available Flights'} ({searchResults.length})
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {searchResults.map(flight => {
              const businessUpcharge = flight.price.business - flight.price.economy;
              const isEconomyUser = userCabinClass === 'economy';

              return (
                <Card key={flight.id}>
                  {/* Flight Header */}
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col flex="auto">
                      <Space>
                        <Text strong style={{ fontSize: 14, color: '#8c8c8c' }}>
                          {flight.airline}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {flight.flightNumber}
                        </Text>
                        {flight.stops === 0 && (
                          <Tag color="green" style={{ fontSize: 11 }}>Nonstop</Tag>
                        )}
                      </Space>
                    </Col>
                  </Row>

                  {/* Flight Route */}
                  <Row align="middle" gutter={24} style={{ marginBottom: 24 }}>
                    <Col>
                      <div>
                        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                          {formatTime(flight.departure.time)}
                        </Title>
                        <Text strong style={{ fontSize: 13 }}>{flight.departure.code}</Text>
                      </div>
                    </Col>

                    <Col flex="auto">
                      <div style={{ textAlign: 'center', padding: '0 16px' }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {flight.duration}
                        </Text>
                        <div style={{
                          height: 1,
                          background: '#d9d9d9',
                          margin: '4px 0',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: -3,
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid #d9d9d9',
                            borderTop: '3px solid transparent',
                            borderBottom: '3px solid transparent',
                          }} />
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div style={{ textAlign: 'right' }}>
                        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                          {formatTime(flight.arrival.time)}
                        </Title>
                        <Text strong style={{ fontSize: 13 }}>{flight.arrival.code}</Text>
                      </div>
                    </Col>
                  </Row>

                  <Divider style={{ margin: '0 0 16px 0' }} />

                  {/* Cabin Options */}
                  <Row gutter={16}>
                    {/* Economy Cabin */}
                    <Col xs={24} md={12}>
                      <div
                        style={{
                          border: '2px solid #1890ff',
                          borderRadius: 8,
                          padding: 16,
                          height: '100%',
                          background: '#fff',
                        }}
                      >
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Space>
                            <Text strong style={{ fontSize: 16 }}>Main Cabin</Text>
                            {!isEconomyUser && <Tag color="blue">Included</Tag>}
                          </Space>

                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {flight.availableSeats.economy} seats available
                          </Text>

                          <div style={{ marginTop: 8 }}>
                            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                              ${flight.price.economy}
                            </Title>
                            <Text type="secondary" style={{ fontSize: 12 }}>per person</Text>
                          </div>

                          <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => handleSelectFlight(flight, 'economy')}
                            style={{ marginTop: 8 }}
                          >
                            Select
                          </Button>
                        </Space>
                      </div>
                    </Col>

                    {/* Business Class */}
                    <Col xs={24} md={12}>
                      <div
                        style={{
                          border: isEconomyUser ? '2px solid #d9d9d9' : '2px solid #faad14',
                          borderRadius: 8,
                          padding: 16,
                          height: '100%',
                          background: isEconomyUser ? '#f5f5f5' : '#fffbf0',
                          opacity: isEconomyUser ? 0.7 : 1,
                        }}
                      >
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Space>
                            <Text strong style={{ fontSize: 16 }}>Business Class</Text>
                            <Tag color="gold">Premium</Tag>
                          </Space>

                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {flight.availableSeats.business} seats available
                          </Text>

                          <div style={{ marginTop: 8 }}>
                            {isEconomyUser ? (
                              <>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                  <Title level={2} style={{ margin: 0, color: '#8c8c8c', textDecoration: 'line-through' }}>
                                    ${flight.price.business}
                                  </Title>
                                </div>
                                <Space>
                                  <Text strong style={{ fontSize: 14, color: '#faad14' }}>
                                    +${businessUpcharge} upgrade
                                  </Text>
                                </Space>
                                <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                                  per person
                                </Text>
                              </>
                            ) : (
                              <>
                                <Title level={2} style={{ margin: 0, color: '#faad14' }}>
                                  ${flight.price.business}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 12 }}>per person</Text>
                              </>
                            )}
                          </div>

                          <Button
                            type="primary"
                            size="large"
                            block
                            disabled={isEconomyUser}
                            onClick={() => handleSelectFlight(flight, 'business')}
                            style={{
                              marginTop: 8,
                              background: isEconomyUser ? undefined : '#faad14',
                              borderColor: isEconomyUser ? undefined : '#faad14',
                            }}
                          >
                            {isEconomyUser ? 'Upgrade Required' : 'Select'}
                          </Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Space>
        </div>
      )}

      {/* Return Flights */}
      {hasSearched && tripType === 'roundTrip' && returnResults.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <Divider />

          <Title level={4} style={{ marginBottom: 16 }}>
            Return Flights ({returnResults.length})
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {returnResults.map(flight => {
              const businessUpcharge = flight.price.business - flight.price.economy;
              const isEconomyUser = userCabinClass === 'economy';

              return (
                <Card key={`return-${flight.id}`}>
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col flex="auto">
                      <Space>
                        <Text strong style={{ fontSize: 14, color: '#8c8c8c' }}>
                          {flight.airline}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {flight.flightNumber}
                        </Text>
                        {flight.stops === 0 && (
                          <Tag color="green" style={{ fontSize: 11 }}>Nonstop</Tag>
                        )}
                      </Space>
                    </Col>
                  </Row>

                  <Row align="middle" gutter={24} style={{ marginBottom: 24 }}>
                    <Col>
                      <div>
                        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                          {formatTime(flight.departure.time)}
                        </Title>
                        <Text strong style={{ fontSize: 13 }}>{flight.departure.code}</Text>
                      </div>
                    </Col>

                    <Col flex="auto">
                      <div style={{ textAlign: 'center', padding: '0 16px' }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {flight.duration}
                        </Text>
                        <div style={{
                          height: 1,
                          background: '#d9d9d9',
                          margin: '4px 0',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            right: 0,
                            top: -3,
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid #d9d9d9',
                            borderTop: '3px solid transparent',
                            borderBottom: '3px solid transparent',
                          }} />
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div style={{ textAlign: 'right' }}>
                        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                          {formatTime(flight.arrival.time)}
                        </Title>
                        <Text strong style={{ fontSize: 13 }}>{flight.arrival.code}</Text>
                      </div>
                    </Col>
                  </Row>

                  <Divider style={{ margin: '0 0 16px 0' }} />

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <div
                        style={{
                          border: '2px solid #1890ff',
                          borderRadius: 8,
                          padding: 16,
                          height: '100%',
                          background: '#fff',
                        }}
                      >
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Text strong style={{ fontSize: 16 }}>Main Cabin</Text>

                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {flight.availableSeats.economy} seats available
                          </Text>

                          <div style={{ marginTop: 8 }}>
                            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                              ${flight.price.economy}
                            </Title>
                            <Text type="secondary" style={{ fontSize: 12 }}>per person</Text>
                          </div>

                          <Button
                            type="primary"
                            size="large"
                            block
                            onClick={() => handleSelectFlight(flight, 'economy')}
                            style={{ marginTop: 8 }}
                          >
                            Select
                          </Button>
                        </Space>
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div
                        style={{
                          border: isEconomyUser ? '2px solid #d9d9d9' : '2px solid #faad14',
                          borderRadius: 8,
                          padding: 16,
                          height: '100%',
                          background: isEconomyUser ? '#f5f5f5' : '#fffbf0',
                          opacity: isEconomyUser ? 0.7 : 1,
                        }}
                      >
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Space>
                            <Text strong style={{ fontSize: 16 }}>Business Class</Text>
                            <Tag color="gold">Premium</Tag>
                          </Space>

                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {flight.availableSeats.business} seats available
                          </Text>

                          <div style={{ marginTop: 8 }}>
                            {isEconomyUser ? (
                              <>
                                <Title level={2} style={{ margin: 0, color: '#8c8c8c', textDecoration: 'line-through' }}>
                                  ${flight.price.business}
                                </Title>
                                <Text strong style={{ fontSize: 14, color: '#faad14' }}>
                                  +${businessUpcharge} upgrade
                                </Text>
                                <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>per person</Text>
                              </>
                            ) : (
                              <>
                                <Title level={2} style={{ margin: 0, color: '#faad14' }}>
                                  ${flight.price.business}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 12 }}>per person</Text>
                              </>
                            )}
                          </div>

                          <Button
                            type="primary"
                            size="large"
                            block
                            disabled={isEconomyUser}
                            onClick={() => handleSelectFlight(flight, 'business')}
                            style={{
                              marginTop: 8,
                              background: isEconomyUser ? undefined : '#faad14',
                              borderColor: isEconomyUser ? undefined : '#faad14',
                            }}
                          >
                            {isEconomyUser ? 'Upgrade Required' : 'Select'}
                          </Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Space>
        </div>
      )}

      {/* No results message */}
      {hasSearched && searchResults.length === 0 && (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type="secondary">No flights found. Please try different search criteria.</Text>
          </div>
        </Card>
      )}
    </div>
  );
}
