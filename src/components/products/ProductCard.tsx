/**
 * ProductCard Component
 *
 * Displays individual product with image, name, price, rating, and add-to-cart button.
 * Adapts layout based on display mode (grid, list, compact).
 */

import { Badge, Button, Card, Rate, Space, Tag, Typography } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import type { Product } from '../../lib/data/products';

const { Text, Title, Paragraph } = Typography;

export interface ProductCardProps {
  product: Product;
  displayMode: 'grid' | 'list' | 'compact';
  onAddToCart?: (product: Product) => void;
  showWishlist?: boolean;
}

/**
 * ProductCard Component
 *
 * PATTERN: Conditional rendering and styling based on displayMode flag
 * USE CASE: A/B test different product layouts to optimize engagement
 * INTEGRATION: displayMode comes from productDisplayMode feature flag
 */
export function ProductCard({ product, displayMode, onAddToCart, showWishlist = false }: ProductCardProps) {
  const { name, description, price, salePrice, rating, reviewCount, inStock, badge, image } = product;

  // Calculate discount percentage if on sale
  const discountPercent = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  const displayPrice = salePrice || price;

  // Handle add to cart
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // ============================================
  // COMPACT MODE - Dense grid, small cards
  // ============================================
  if (displayMode === 'compact') {
    return (
      <Card
        hoverable
        cover={
          <Badge.Ribbon
            text={badge === 'sale' ? `${discountPercent}% OFF` : badge?.toUpperCase()}
            color={
              badge === 'sale' ? 'red' : badge === 'new' ? 'green' : badge === 'bestseller' ? 'gold' : 'blue'
            }
            style={{ display: badge ? 'block' : 'none' }}
          >
            <img alt={name} src={image} style={{ height: 150, width: '100%', objectFit: 'cover' }} />
          </Badge.Ribbon>
        }
        styles={{ body: { padding: 12 } }}
      >
        <div style={{ minHeight: 120 }}>
          <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8, fontSize: 14 }}>
            {name}
          </Title>

          <div style={{ marginBottom: 8 }}>
            <Space direction="vertical" size={0}>
              <Space size={4}>
                <Text strong style={{ fontSize: 16, color: salePrice ? '#ff4d4f' : '#000' }}>
                  ${displayPrice}
                </Text>
                {salePrice && (
                  <Text delete type="secondary" style={{ fontSize: 12 }}>
                    ${price}
                  </Text>
                )}
              </Space>
              <Space size={4} style={{ fontSize: 11 }}>
                <Rate disabled value={rating} style={{ fontSize: 11 }} />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  ({reviewCount})
                </Text>
              </Space>
            </Space>
          </div>

          <Button
            type="primary"
            size="small"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={!inStock}
            block
            style={{ fontSize: 12 }}
          >
            {inStock ? 'Add' : 'Out of Stock'}
          </Button>
        </div>
      </Card>
    );
  }

  // ============================================
  // LIST MODE - Horizontal layout, detailed
  // ============================================
  if (displayMode === 'list') {
    return (
      <Card
        hoverable
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: 16 } }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          {/* Product Image */}
          <Badge.Ribbon
            text={badge === 'sale' ? `${discountPercent}% OFF` : badge?.toUpperCase()}
            color={
              badge === 'sale' ? 'red' : badge === 'new' ? 'green' : badge === 'bestseller' ? 'gold' : 'blue'
            }
            style={{ display: badge ? 'block' : 'none' }}
          >
            <img
              alt={name}
              src={image}
              style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 4 }}
            />
          </Badge.Ribbon>

          {/* Product Details */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Title level={4} style={{ marginBottom: 8 }}>
              {name}
            </Title>

            <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 12 }}>
              {description}
            </Paragraph>

            <Space size={4} style={{ marginBottom: 12 }}>
              <Rate disabled value={rating} style={{ fontSize: 14 }} />
              <Text type="secondary">({reviewCount} reviews)</Text>
            </Space>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Space size={8}>
                <Text strong style={{ fontSize: 24, color: salePrice ? '#ff4d4f' : '#000' }}>
                  ${displayPrice}
                </Text>
                {salePrice && (
                  <Text delete type="secondary" style={{ fontSize: 16 }}>
                    ${price}
                  </Text>
                )}
              </Space>

              <Space size={8}>
                {showWishlist && (
                  <Button icon={<HeartOutlined />} size="large">
                    Wishlist
                  </Button>
                )}
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={!inStock}
                >
                  {inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // ============================================
  // GRID MODE (Default) - Card layout, visual
  // ============================================
  return (
    <Card
      hoverable
      cover={
        <Badge.Ribbon
          text={badge === 'sale' ? `${discountPercent}% OFF` : badge?.toUpperCase()}
          color={
            badge === 'sale' ? 'red' : badge === 'new' ? 'green' : badge === 'bestseller' ? 'gold' : 'blue'
          }
          style={{ display: badge ? 'block' : 'none' }}
        >
          <img alt={name} src={image} style={{ height: 240, width: '100%', objectFit: 'cover' }} />
        </Badge.Ribbon>
      }
      styles={{ body: { padding: 16 } }}
    >
      <div style={{ minHeight: 180 }}>
        <Title level={4} ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
          {name}
        </Title>

        <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 12 }}>
          {description}
        </Paragraph>

        <Space size={4} style={{ marginBottom: 12 }}>
          <Rate disabled value={rating} style={{ fontSize: 14 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({reviewCount})
          </Text>
        </Space>

        <div style={{ marginBottom: 12 }}>
          <Space size={8}>
            <Text strong style={{ fontSize: 20, color: salePrice ? '#ff4d4f' : '#000' }}>
              ${displayPrice}
            </Text>
            {salePrice && (
              <Text delete type="secondary" style={{ fontSize: 14 }}>
                ${price}
              </Text>
            )}
          </Space>
        </div>

        <Space size={8} style={{ width: '100%' }}>
          {showWishlist && (
            <Button icon={<HeartOutlined />} onClick={() => console.log('Add to wishlist')}>
              Wishlist
            </Button>
          )}
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={!inStock}
            style={{ flex: showWishlist ? 1 : 'auto', width: showWishlist ? 'auto' : '100%' }}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Space>
      </div>
    </Card>
  );
}
