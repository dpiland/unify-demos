/**
 * ProductRecommendations Component
 *
 * Horizontal scrollable carousel of recommended products.
 * Displays personalized product suggestions to increase engagement and AOV.
 */

import { Card, Typography, Space, Rate, Button } from 'antd';
import { ShoppingCartOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { Product } from '../../lib/data/products';

const { Title, Text } = Typography;

export interface ProductRecommendationsProps {
  products: Product[];
  title?: string;
  onAddToCart?: (product: Product) => void;
}

/**
 * ProductRecommendations Component
 *
 * PATTERN: Conditional rendering based on enableRecommendations boolean flag
 * USE CASE: A/B test impact of recommendations on average order value
 * INTEGRATION: Shown when enableRecommendations flag is true
 */
export function ProductRecommendations({
  products,
  title = 'Recommended For You',
  onAddToCart,
}: ProductRecommendationsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Card
      title={
        <Space size={8}>
          <span>{title}</span>
          <Text type="secondary" style={{ fontSize: 14, fontWeight: 'normal' }}>
            Based on your browsing history
          </Text>
        </Space>
      }
      extra={
        <Button type="link" icon={<ArrowRightOutlined />}>
          View All
        </Button>
      }
      styles={{ body: { padding: 0 } }}
    >
      {/* Horizontal Scrollable Container */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: 16,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'thin',
        }}
      >
        {products.slice(0, 6).map(product => (
          <div
            key={product.id}
            style={{
              minWidth: 220,
              maxWidth: 220,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                border: '1px solid #f0f0f0',
                borderRadius: 8,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Product Image */}
              <div style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                  }}
                />
                {product.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      padding: '4px 8px',
                      borderRadius: 4,
                      background:
                        product.badge === 'sale'
                          ? '#ff4d4f'
                          : product.badge === 'new'
                          ? '#52c41a'
                          : product.badge === 'bestseller'
                          ? '#faad14'
                          : '#1890ff',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.badge === 'sale'
                      ? `${Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}% OFF`
                      : product.badge}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Title
                  level={5}
                  ellipsis={{ rows: 2 }}
                  style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.3, minHeight: 38 }}
                >
                  {product.name}
                </Title>

                <Space size={4} style={{ marginBottom: 8 }}>
                  <Rate disabled value={product.rating} style={{ fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    ({product.reviewCount})
                  </Text>
                </Space>

                <div style={{ marginTop: 'auto' }}>
                  <Space size={4} style={{ marginBottom: 8 }}>
                    <Text
                      strong
                      style={{
                        fontSize: 18,
                        color: product.salePrice ? '#ff4d4f' : '#000',
                      }}
                    >
                      ${product.salePrice || product.price}
                    </Text>
                    {product.salePrice && (
                      <Text delete type="secondary" style={{ fontSize: 12 }}>
                        ${product.price}
                      </Text>
                    )}
                  </Space>

                  <Button
                    type="primary"
                    size="small"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => onAddToCart && onAddToCart(product)}
                    block
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint for mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            div::-webkit-scrollbar {
              height: 6px;
            }
            div::-webkit-scrollbar-thumb {
              background: #d9d9d9;
              border-radius: 3px;
            }
          }
        `}
      </style>
    </Card>
  );
}
