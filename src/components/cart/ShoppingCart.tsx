/**
 * ShoppingCart Component
 *
 * Cart drawer that slides in from the right.
 * Displays cart items, summary, countdown timer, and checkout buttons.
 */

import { useState, useEffect } from 'react';
import { Drawer, Button, Empty, Space, Typography, Alert, Divider } from 'antd';
import { ShoppingCartOutlined, ThunderboltOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import type { CartItem as CartItemType, Cart } from '../../lib/data/cart';
import { calculateCart } from '../../lib/data/cart';

const { Text } = Typography;

export interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  freeShippingThreshold: number;
  enableExpressCheckout: boolean;
  checkoutFlowVariant: 'standard' | 'express' | 'single-page';
  cartCountdownMinutes: number;
  isBlackFriday?: boolean;
  saleOverridePercent?: number;
}

/**
 * ShoppingCart Component
 *
 * PATTERN: Multiple feature flags control different aspects of the cart
 * USE CASE: Personalized checkout experience based on user tier
 * INTEGRATION:
 * - freeShippingThreshold from freeShippingThreshold number flag
 * - enableExpressCheckout from enableExpressCheckout boolean flag
 * - checkoutFlowVariant from checkoutFlowVariant string flag
 * - cartCountdownMinutes from cartCountdownTimer number flag
 */
export function ShoppingCart({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  freeShippingThreshold,
  enableExpressCheckout,
  checkoutFlowVariant,
  cartCountdownMinutes,
  isBlackFriday = false,
  saleOverridePercent,
}: ShoppingCartProps) {
  // Black Friday: free shipping on all orders (threshold = 0)
  const effectiveThreshold = isBlackFriday ? 0 : freeShippingThreshold;
  // Calculate cart totals with override discount applied
  const cart: Cart = calculateCart(cartItems, effectiveThreshold, saleOverridePercent || (isBlackFriday ? 20 : 0));

  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(cartCountdownMinutes * 60); // Convert to seconds

  // Countdown timer effect
  useEffect(() => {
    if (!open || cartItems.length === 0) return;

    setTimeRemaining(cartCountdownMinutes * 60);

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, cartItems.length, cartCountdownMinutes]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle checkout
  const handleCheckout = (flow: 'standard' | 'express' | 'single-page') => {
    console.log(`Checkout with ${flow} flow:`, cart);
    // In a real app, navigate to checkout page or process payment
    alert(`Proceeding to ${flow} checkout!\nTotal: $${cart.total.toFixed(2)}`);
  };

  return (
    <Drawer
      title={
        <Space>
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
          <span>Shopping Cart ({cartItems.length})</span>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      styles={{
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        },
      }}
    >
      {/* Empty Cart State */}
      {cartItems.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Space direction="vertical" size={8}>
                <Text>Your cart is empty</Text>
                <Button type="primary" onClick={onClose}>
                  Continue Shopping
                </Button>
              </Space>
            }
          />
        </div>
      ) : (
        <>
          {/* Cart Items (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {cartItems.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* Cart Footer (Fixed at bottom) */}
          <div style={{ borderTop: '1px solid #f0f0f0', padding: 16 }}>
            {/* Flash Sale Alert */}
            {saleOverridePercent && saleOverridePercent > 0 && (
              <Alert
                message={`Flash Sale — ${saleOverridePercent}% off applied!`}
                type="error"
                showIcon
                style={{ marginBottom: 12, fontWeight: 600 }}
              />
            )}

            {/* Black Friday Alert */}
            {isBlackFriday && !saleOverridePercent && (
              <Alert
                message="Black Friday — Free Shipping on All Orders!"
                type="success"
                showIcon
                style={{ marginBottom: 12, fontWeight: 600 }}
              />
            )}

            {/* Countdown Timer */}
            {timeRemaining > 0 && (
              <Alert
                message={
                  <Space size={8}>
                    <ClockCircleOutlined />
                    <Text strong>Order within {formatTime(timeRemaining)}</Text>
                  </Space>
                }
                description="Complete your order to get free shipping!"
                type="warning"
                showIcon={false}
                style={{ marginBottom: 16, padding: '8px 12px' }}
              />
            )}

            {/* Cart Summary */}
            <CartSummary
              subtotal={cart.subtotal}
              tax={cart.tax}
              shipping={cart.shipping}
              total={cart.total}
              freeShippingThreshold={effectiveThreshold}
            />

            <Divider style={{ margin: '16px 0' }} />

            {/* Checkout Buttons */}
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {/* Express Checkout Button (Conditional on flag) */}
              {enableExpressCheckout && (
                <Button
                  type="primary"
                  size="large"
                  icon={<ThunderboltOutlined />}
                  onClick={() => handleCheckout('express')}
                  block
                  style={{
                    background: '#2d4a2e',
                    borderColor: '#2d4a2e',
                    fontWeight: 600,
                  }}
                >
                  Express Checkout
                </Button>
              )}

              {/* Standard Checkout Button */}
              <Button
                type="primary"
                size="large"
                onClick={() => handleCheckout(checkoutFlowVariant)}
                block
              >
                {checkoutFlowVariant === 'single-page'
                  ? 'Checkout (Single Page)'
                  : checkoutFlowVariant === 'express'
                  ? 'Express Checkout'
                  : 'Proceed to Checkout'}
              </Button>

              <Button size="large" onClick={onClose} block>
                Continue Shopping
              </Button>
            </Space>
          </div>
        </>
      )}
    </Drawer>
  );
}
