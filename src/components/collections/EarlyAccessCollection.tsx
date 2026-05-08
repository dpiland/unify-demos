/**
 * EarlyAccessCollection Component
 *
 * Summit (VIP) exclusive new arrivals section.
 * - Summit members: see exclusive products with "Early Access" badges
 * - Non-Summit members: see a teaser card with upgrade CTA
 *
 * Controlled by enableEarlyAccess boolean flag.
 */

import { Card, Typography, Space, Rate, Button, Tag } from 'antd';
import { ShoppingCartOutlined, LockOutlined, CrownOutlined, StarOutlined } from '@ant-design/icons';
import type { Product } from '../../lib/data/products';

const { Title, Text, Paragraph } = Typography;

/**
 * Early Access exclusive products — premium gear not yet in the main catalog.
 */
const EARLY_ACCESS_PRODUCTS: Product[] = [
  {
    id: 'ea-001',
    name: 'DAS Light Hoody',
    description: 'Next-gen synthetic belay parka with FullRange insulation. Ultralight at 10.6 oz.',
    price: 399,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 12,
    inStock: true,
    badge: 'new',
    tags: ['belay-parka', 'synthetic', 'ultralight', 'alpine'],
  },
  {
    id: 'ea-002',
    name: 'Dual Aspect Jacket',
    description: 'Gore-Tex Pro alpine shell built for the most demanding conditions on earth.',
    price: 699,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=400&h=400&fit=crop',
    rating: 5.0,
    reviewCount: 4,
    inStock: true,
    badge: 'limited',
    tags: ['gore-tex-pro', 'alpine', 'shell', 'expedition'],
  },
  {
    id: 'ea-003',
    name: 'Ascensionist Pack 55L',
    description: 'Alpine climbing pack with removable lid, ice tool attachments, and rope strap.',
    price: 289,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 8,
    inStock: true,
    badge: 'new',
    tags: ['climbing', 'alpine-pack', 'technical', 'expedition'],
  },
  {
    id: 'ea-004',
    name: 'Capilene Air Hoody',
    description: 'Merino-blend base layer with 3D air channels. Our warmest, most breathable Capilene ever.',
    price: 159,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    badge: 'new',
    tags: ['merino', 'capilene', 'baselayer', 'breathable'],
  },
];

export interface EarlyAccessCollectionProps {
  isSummitMember: boolean;
  onAddToCart?: (product: Product) => void;
}

export function EarlyAccessCollection({ isSummitMember, onAddToCart }: EarlyAccessCollectionProps) {
  // ============================================
  // SUMMIT TEASER - Non-VIP upgrade prompt
  // ============================================
  if (!isSummitMember) {
    return (
      <Card
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d4a2e 100%)',
          border: 'none',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {/* Blurred preview thumbnails */}
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {EARLY_ACCESS_PRODUCTS.slice(0, 3).map(p => (
              <div
                key={p.id}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  overflow: 'hidden',
                  filter: 'blur(4px) brightness(0.7)',
                  opacity: 0.6,
                }}
              >
                <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Teaser content */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <Space size={8} style={{ marginBottom: 8 }}>
              <LockOutlined style={{ color: '#fbbf24', fontSize: 18 }} />
              <Tag color="gold" style={{ margin: 0, fontWeight: 700, fontSize: 12 }}>
                SUMMIT EXCLUSIVE
              </Tag>
            </Space>
            <Title level={4} style={{ color: '#fff', margin: '8px 0' }}>
              Early Access Collection
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 16px 0' }}>
              {EARLY_ACCESS_PRODUCTS.length} new arrivals available to Summit members before anyone else.
              Upgrade to get first access to our latest gear drops.
            </Paragraph>
            <Button
              type="primary"
              icon={<CrownOutlined />}
              style={{
                background: '#fbbf24',
                borderColor: '#fbbf24',
                color: '#1a1a2e',
                fontWeight: 700,
              }}
              onClick={() => alert('Upgrade to Summit membership!')}
            >
              Upgrade to Summit
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // ============================================
  // SUMMIT COLLECTION - Exclusive products
  // ============================================
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <StarOutlined style={{ color: '#fbbf24', fontSize: 22 }} />
        <Title level={3} style={{ margin: 0 }}>
          Early Access Collection
        </Title>
        <Tag color="gold" style={{ fontWeight: 700, fontSize: 12 }}>
          SUMMIT EXCLUSIVE
        </Tag>
        <Text type="secondary" style={{ fontSize: 13 }}>
          New arrivals — available to you before everyone else
        </Text>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: 8,
          scrollbarWidth: 'thin',
        }}
      >
        {EARLY_ACCESS_PRODUCTS.map(product => (
          <div
            key={product.id}
            style={{
              minWidth: 260,
              maxWidth: 260,
              flexShrink: 0,
            }}
          >
            <Card
              hoverable
              cover={
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ height: 220, width: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      display: 'flex',
                      gap: 6,
                    }}
                  >
                    <Tag
                      color="#fbbf24"
                      style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 11, margin: 0, border: 'none' }}
                    >
                      EARLY ACCESS
                    </Tag>
                    {product.badge === 'limited' && (
                      <Tag color="#b91c1c" style={{ fontWeight: 700, fontSize: 11, margin: 0, border: 'none' }}>
                        LIMITED
                      </Tag>
                    )}
                  </div>
                </div>
              }
              styles={{ body: { padding: 16 } }}
            >
              <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
                {product.name}
              </Title>

              <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 8, fontSize: 13 }}>
                {product.description}
              </Paragraph>

              <Space size={4} style={{ marginBottom: 12 }}>
                <Rate disabled value={product.rating} style={{ fontSize: 13 }} />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  ({product.reviewCount})
                </Text>
              </Space>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: 20 }}>
                  ${product.price}
                </Text>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => onAddToCart?.(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
