/**
 * CartSummary Component
 *
 * Displays order totals, tax, shipping, and total price.
 * Shows free shipping progress bar.
 */

import { Space, Typography, Divider, Progress } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
}

/**
 * CartSummary Component
 *
 * PATTERN: Uses freeShippingThreshold number flag for calculations
 * USE CASE: Show progress toward free shipping to incentivize larger orders
 * INTEGRATION: freeShippingThreshold from freeShippingThreshold number flag
 */
export function CartSummary({
  subtotal,
  tax,
  shipping,
  total,
  freeShippingThreshold,
}: CartSummaryProps) {
  // Calculate free shipping progress
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);
  const hasEarnedFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div>
      {/* Free Shipping Progress */}
      {!hasEarnedFreeShipping && remainingForFreeShipping > 0 && (
        <div style={{ marginBottom: 16, padding: 12, background: '#f0f2f5', borderRadius: 8 }}>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            You're ${remainingForFreeShipping.toFixed(2)} away from FREE shipping!
          </Text>
          <Progress
            percent={progressPercent}
            strokeColor="#52c41a"
            showInfo={false}
            size="small"
          />
        </div>
      )}

      {hasEarnedFreeShipping && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: 8,
          }}
        >
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 16 }} />
            <Text strong style={{ color: '#52c41a' }}>
              You've earned FREE shipping!
            </Text>
          </Space>
        </div>
      )}

      {/* Order Summary */}
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Subtotal:</Text>
          <Text strong>${subtotal.toFixed(2)}</Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Tax:</Text>
          <Text>${tax.toFixed(2)}</Text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Shipping:</Text>
          <Text style={{ color: shipping === 0 ? '#52c41a' : 'inherit' }}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </Text>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>
            Total:
          </Title>
          <Title level={3} style={{ margin: 0, color: '#1e3a5f' }}>
            ${total.toFixed(2)}
          </Title>
        </div>
      </Space>
    </div>
  );
}
