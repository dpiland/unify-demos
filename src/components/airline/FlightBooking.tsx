/**
 * FlightBooking Component
 *
 * Complete flight search and booking interface.
 * Allows passengers to search for flights and make new bookings.
 *
 * USAGE:
 * ```tsx
 * <FlightBooking onBookFlight={(flight) => console.log('Booked:', flight)} />
 * ```
 */

import { useState } from 'react';
import { Button, Card, Col, DatePicker, Divider, Form, InputNumber, Radio, Row, Select, Space, Tag, Typography, message } from 'antd';
import {
  ArrowRightOutlined,
  SearchOutlined,
  SwapOutlined,
  CalendarOutlined,
  UserOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Title } = Typography;
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
];

/**
 * Generate mock search results
 */
function generateSearchResults(origin: string, destination: string, date: string): SearchResult[] {
  const flights: SearchResult[] = [
    {
      id: 'search-001',
      flightNumber: 'SK 2001',
      airline: 'SkyTravel',
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
      flightNumber: 'SK 2002',
      airline: 'SkyTravel',
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
      flightNumber: 'SK 2003',
      airline: 'SkyTravel',
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
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
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

  // Handle flight search
  const handleSearch = async (values: any) => {
    setIsSearching(true);
    setHasSearched(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Outbound flights
    const outboundFlights = generateSearchResults(
      values.origin,
      values.destination,
      values.departureDate.format('YYYY-MM-DD')
    );

    setSearchResults(outboundFlights);

    // Return flights (if round trip)
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

  // Handle flight booking
  const handleBook = (flight: SearchResult, cabinClass: 'economy' | 'business') => {
    message.success(`Booked ${flight.flightNumber} in ${cabinClass} class!`);
    onBookFlight?.(flight, cabinClass);
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
            origin: 'JFK',
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
              // Calculate upcharge for business class
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

                  {/* Cabin Options - Horizontal Layout */}
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
                            onClick={() => handleBook(flight, 'economy')}
                            style={{ marginTop: 8 }}
                          >
                            Select Main Cabin
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
                            {flight.availableSeats.business} seats available • Extra legroom • Priority boarding
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
                            onClick={() => handleBook(flight, 'business')}
                            style={{
                              marginTop: 8,
                              background: isEconomyUser ? undefined : '#faad14',
                              borderColor: isEconomyUser ? undefined : '#faad14',
                            }}
                          >
                            {isEconomyUser ? 'Upgrade Required' : 'Select Business Class'}
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

      {/* Return Flights - Only for round trip */}
      {hasSearched && tripType === 'roundTrip' && returnResults.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <Divider />

          <Title level={4} style={{ marginBottom: 16 }}>
            Return Flights ({returnResults.length})
          </Title>

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {returnResults.map(flight => {
              // Calculate upcharge for business class
              const businessUpcharge = flight.price.business - flight.price.economy;
              const isEconomyUser = userCabinClass === 'economy';

              return (
                <Card key={`return-${flight.id}`}>
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

                  {/* Cabin Options - Horizontal Layout */}
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
                            onClick={() => handleBook(flight, 'economy')}
                            style={{ marginTop: 8 }}
                          >
                            Select Main Cabin
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
                            {flight.availableSeats.business} seats available • Extra legroom • Priority boarding
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
                            onClick={() => handleBook(flight, 'business')}
                            style={{
                              marginTop: 8,
                              background: isEconomyUser ? undefined : '#faad14',
                              borderColor: isEconomyUser ? undefined : '#faad14',
                            }}
                          >
                            {isEconomyUser ? 'Upgrade Required' : 'Select Business Class'}
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
