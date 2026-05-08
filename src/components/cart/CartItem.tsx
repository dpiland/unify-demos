/**
 * CartItem Component
 *
 * Displays individual cart item with image, details, quantity controls, and remove button.
 */

import { Button, InputNumber, Space, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { CartItem as CartItemType } from '../../lib/data/cart';

const { Text, Title } = Typography;

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

/**
 * CartItem Component
 *
 * Individual cart item with quantity controls
 */
export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const { name, price, salePrice, image } = product;

  // Use sale price if available
  const displayPrice = salePrice || price;
  const itemTotal = displayPrice * quantity;

  // Handle quantity change
  const handleQuantityChange = (value: number | null) => {
    if (value && onUpdateQuantity) {
      onUpdateQuantity(product.id, value);
    }
  };

  // Handle remove
  const handleRemove = () => {
    if (onRemove) {
      onRemove(product.id);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: 12,
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 4,
          flexShrink: 0,
        }}
      />

      {/* Product Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Title
          level={5}
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 4, fontSize: 14, lineHeight: 1.4 }}
        >
          {name}
        </Title>

        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <Space size={8}>
            <Text strong style={{ fontSize: 16, color: salePrice ? '#b91c1c' : '#000' }}>
              ${displayPrice}
            </Text>
            {salePrice && (
              <Text delete type="secondary" style={{ fontSize: 12 }}>
                ${price}
              </Text>
            )}
          </Space>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <Space size={8}>
              <InputNumber
                min={1}
                max={99}
                value={quantity}
                onChange={handleQuantityChange}
                size="small"
                style={{ width: 60 }}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemove}
                size="small"
              >
                Remove
              </Button>
            </Space>

            <Text strong style={{ fontSize: 14 }}>
              ${itemTotal.toFixed(2)}
            </Text>
          </div>
        </Space>
      </div>
    </div>
  );
}
