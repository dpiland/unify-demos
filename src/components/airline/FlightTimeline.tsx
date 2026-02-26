/**
 * FlightTimeline Component
 *
 * Visual timeline display for upcoming flights using Ant Design Timeline.
 * Shows flights in chronological order with departure times and routes.
 *
 * USAGE:
 * ```tsx
 * <FlightTimeline flights={flightArray} />
 * ```
 */

import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { FlightCard } from './FlightCard';

/**
 * Flight Interface (must match FlightCard)
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

interface FlightTimelineProps {
  flights: Flight[];
}

/**
 * Get timeline item color based on flight status
 */
function getTimelineColor(status: Flight['status']): 'blue' | 'green' | 'red' | 'gray' {
  switch (status) {
    case 'scheduled':
      return 'blue';
    case 'boarding':
      return 'green';
    case 'delayed':
      return 'red';
    case 'departed':
    case 'completed':
      return 'gray';
    default:
      return 'blue';
  }
}

/**
 * FlightTimeline Component
 *
 * PATTERN: Timeline visualization of flights
 * USE CASE: Visual representation of travel itinerary
 * CONTROLLED BY: flightDisplayMode string flag (when set to 'timeline')
 */
export function FlightTimeline({ flights }: FlightTimelineProps) {
  // Sort flights by departure time
  const sortedFlights = [...flights].sort((a, b) => {
    return new Date(a.departure.time).getTime() - new Date(b.departure.time).getTime();
  });

  // Create timeline items
  const timelineItems = sortedFlights.map((flight) => ({
    key: flight.id,
    color: getTimelineColor(flight.status),
    dot: <ClockCircleOutlined style={{ fontSize: 16 }} />,
    children: <FlightCard flight={flight} displayMode="timeline" />,
  }));

  return (
    <div style={{ padding: '16px 0' }}>
      <Timeline items={timelineItems} mode="left" />
    </div>
  );
}
