/**
 * Cart Component
 *
 * Shopping cart drawer displaying selected flights.
 * Shows flight details, pricing, and checkout functionality.
 *
 * USAGE:
 * ```tsx
 * <Cart open={isOpen} onClose={() => setIsOpen(false)} />
 * ```
 */

import { Button, Drawer, Empty, Space, Typography, Divider, Row, Col, message } from 'antd';
import {
  DeleteOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useCart } from '../contexts/CartContext';

const { Title, Text } = Typography;

interface CartProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Format time from ISO string
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
 * Format date from ISO string
 */
function formatDate(isoTime: string): string {
  const date = new Date(isoTime);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function Cart({ open, onClose }: CartProps) {
  const { items, removeItem, clearCart, getTotalPrice, getItemCount } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      message.warning('Your cart is empty');
      return;
    }

    message.success(`Processing checkout for ${items.length} flight${items.length > 1 ? 's' : ''}!`);
    clearCart();
    onClose();
  };

  return (
    <Drawer
      title={
        <Space>
          <span>Your Cart</span>
          {getItemCount() > 0 && (
            <Text type="secondary" style={{ fontSize: 14 }}>
              ({getItemCount()} {getItemCount() === 1 ? 'flight' : 'flights'})
            </Text>
          )}
        </Space>
      }
      placement="right"
      width={480}
      open={open}
      onClose={onClose}
      footer={
        items.length > 0 && (
          <div>
            {/* Total */}
            <div style={{ marginBottom: 16 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong style={{ fontSize: 16 }}>
                    Total
                  </Text>
                </Col>
                <Col>
                  <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                    ${getTotalPrice().toLocaleString()}
                  </Title>
                </Col>
              </Row>
            </div>

            {/* Checkout Button */}
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                block
                icon={<CreditCardOutlined />}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button size="large" block onClick={clearCart}>
                Clear Cart
              </Button>
            </Space>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <Empty
          description="Your cart is empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 100 }}
        >
          <Text type="secondary">Add flights from the booking page to get started</Text>
        </Empty>
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: 8,
                padding: 16,
                background: '#fff',
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {/* Flight Header */}
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <Text strong style={{ fontSize: 15 }}>
                        {item.flightNumber}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: 11,
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {item.cabinClass}
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>

                <Divider style={{ margin: '8px 0' }} />

                {/* Route */}
                <Row align="middle" gutter={8}>
                  <Col>
                    <div>
                      <Text strong style={{ fontSize: 16 }}>
                        {formatTime(item.departureTime)}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.originCode}
                      </Text>
                    </div>
                  </Col>
                  <Col flex="auto" style={{ textAlign: 'center' }}>
                    <ArrowRightOutlined style={{ color: '#8c8c8c' }} />
                    <div>
                      <ClockCircleOutlined style={{ fontSize: 10, marginRight: 4 }} />
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {item.duration}
                      </Text>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ textAlign: 'right' }}>
                      <Text strong style={{ fontSize: 16 }}>
                        {formatTime(item.arrivalTime)}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.destinationCode}
                      </Text>
                    </div>
                  </Col>
                </Row>

                {/* Date */}
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {formatDate(item.departureTime)}
                  </Text>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                {/* Price Breakdown */}
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space size={4}>
                      <UserOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        {item.passengers} passenger{item.passengers > 1 ? 's' : ''}
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text strong style={{ fontSize: 16, color: '#1890ff' }}>
                      ${(item.price * item.passengers).toLocaleString()}
                    </Text>
                  </Col>
                </Row>
              </Space>
            </div>
          ))}
        </Space>
      )}
    </Drawer>
  );
}
