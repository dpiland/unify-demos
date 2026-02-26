/**
 * SeatSelector Component
 *
 * Interactive seat map for flight seat selection with 6 columns (A-F) × 30 rows.
 * Color-coded seats show availability and restrictions based on membership tier.
 *
 * USAGE:
 * ```tsx
 * <SeatSelector
 *   cabinClass="economy"
 *   isPremiumMember={false}
 *   onSelectSeat={(seat) => console.log('Selected:', seat)}
 * />
 * ```
 */

import { useState } from 'react';
import { Button, Space, Tag, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface SeatSelectorProps {
  cabinClass: string;
  isPremiumMember: boolean;
  onSelectSeat?: (seatNumber: string) => void;
}

/**
 * SeatSelector Component
 *
 * PATTERN: Interactive UI with state management + access control
 * USE CASE: Seat selection with premium restrictions
 * CONTROLLED BY: enableSeatSelection boolean flag
 * USER PROPERTY: isPremiumMember determines premium seat access
 */
export function SeatSelector({ cabinClass, isPremiumMember, onSelectSeat }: SeatSelectorProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // Seat configuration
  const SEAT_ROWS = 30;
  const SEAT_COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Premium seats (rows 1-5 and exit rows 12-13)
  const premiumSeats = new Set<string>();
  for (let row = 1; row <= 5; row++) {
    SEAT_COLUMNS.forEach((col) => premiumSeats.add(`${row}${col}`));
  }
  for (let row = 12; row <= 13; row++) {
    SEAT_COLUMNS.forEach((col) => premiumSeats.add(`${row}${col}`));
  }

  // Occupied seats (random selection for demo)
  const occupiedSeats = new Set([
    '1A', '1B', '2C', '3D', '4E', '5F',
    '7A', '8B', '9C', '10D', '11E', '12F',
    '15A', '16B', '17C', '18D', '19E', '20F',
    '22A', '23B', '24C', '25D', '26E', '27F',
  ]);

  // Handle seat selection
  const handleSeatClick = (seatNumber: string) => {
    // Check if seat is available
    if (occupiedSeats.has(seatNumber)) {
      return; // Seat occupied
    }

    // Check premium seat access
    if (premiumSeats.has(seatNumber) && !isPremiumMember) {
      return; // Premium seat requires premium membership
    }

    setSelectedSeat(seatNumber);
    onSelectSeat?.(seatNumber);
  };

  // Get seat button style
  const getSeatStyle = (seatNumber: string) => {
    const isOccupied = occupiedSeats.has(seatNumber);
    const isPremium = premiumSeats.has(seatNumber);
    const isSelected = selectedSeat === seatNumber;

    if (isOccupied) {
      return {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
        color: '#8c8c8c',
        cursor: 'not-allowed',
      };
    }

    if (isSelected) {
      return {
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        color: '#fff',
      };
    }

    if (isPremium) {
      return {
        backgroundColor: isPremiumMember ? '#ffd666' : '#fff7e6',
        borderColor: '#faad14',
        color: isPremiumMember ? '#614700' : '#ad8b00',
        cursor: isPremiumMember ? 'pointer' : 'not-allowed',
      };
    }

    return {
      backgroundColor: '#fff',
      borderColor: '#d9d9d9',
      color: '#262626',
    };
  };

  return (
    <div>
      {/* Legend */}
      <Space size="large" style={{ marginBottom: 16 }}>
        <Space>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#fff',
              border: '1px solid #d9d9d9',
            }}
          />
          <Text>Available</Text>
        </Space>
        <Space>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#d9d9d9',
              border: '1px solid #d9d9d9',
            }}
          />
          <Text>Occupied</Text>
        </Space>
        <Space>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#ffd666',
              border: '1px solid #faad14',
            }}
          />
          <Text>Premium</Text>
        </Space>
        <Space>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#1890ff',
              border: '1px solid #1890ff',
            }}
          />
          <Text>Selected</Text>
        </Space>
      </Space>

      {/* Selected seat info */}
      {selectedSeat && (
        <div style={{ marginBottom: 16 }}>
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
            <Text strong>Selected Seat: {selectedSeat}</Text>
            {premiumSeats.has(selectedSeat) && <Tag color="gold">Premium Seat</Tag>}
          </Space>
        </div>
      )}

      {/* Premium member notification */}
      {!isPremiumMember && (
        <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 16 }}>
          Premium seats (rows 1-5 and exit rows) require premium membership or upgrade.
        </Paragraph>
      )}

      {/* Seat map */}
      <div
        style={{
          overflowX: 'auto',
          padding: '16px 0',
          backgroundColor: '#fafafa',
          borderRadius: 8,
        }}
      >
        <div style={{ minWidth: 400 }}>
          {/* Header row with column letters */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8, paddingLeft: 40 }}>
            {SEAT_COLUMNS.map((col) => (
              <div
                key={col}
                style={{
                  width: 32,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#8c8c8c',
                  fontSize: 12,
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Seat rows */}
          {Array.from({ length: SEAT_ROWS }, (_, rowIndex) => {
            const rowNumber = rowIndex + 1;
            return (
              <div key={rowNumber} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {/* Row number */}
                <div
                  style={{
                    width: 32,
                    textAlign: 'right',
                    lineHeight: '32px',
                    fontWeight: 'bold',
                    color: '#8c8c8c',
                    fontSize: 12,
                  }}
                >
                  {rowNumber}
                </div>

                {/* Seats in row */}
                {SEAT_COLUMNS.map((column, colIndex) => {
                  const seatNumber = `${rowNumber}${column}`;
                  const isOccupied = occupiedSeats.has(seatNumber);
                  const isPremium = premiumSeats.has(seatNumber);
                  const canSelect =
                    !isOccupied && (!isPremium || (isPremium && isPremiumMember));

                  return (
                    <Button
                      key={seatNumber}
                      size="small"
                      disabled={!canSelect}
                      onClick={() => handleSeatClick(seatNumber)}
                      style={{
                        width: 32,
                        height: 32,
                        padding: 0,
                        fontSize: 10,
                        ...getSeatStyle(seatNumber),
                      }}
                    >
                      {column}
                    </Button>
                  );
                })}

                {/* Aisle after column C */}
                {rowNumber === 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 10,
                      color: '#8c8c8c',
                    }}
                  >
                    ← Aisle
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer info */}
      <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 16, marginBottom: 0 }}>
        Cabin Class: <Text strong>{cabinClass}</Text>
        {isPremiumMember && ' • Premium access enabled'}
      </Paragraph>
    </div>
  );
}
