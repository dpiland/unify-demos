/**
 * ProductGrid Component
 *
 * Container for product cards with pagination and layout control.
 * Displays products in grid, list, or compact mode based on feature flag.
 */

import { useState } from 'react';
import { Row, Col, Pagination, Empty, Space } from 'antd';
import { ProductCard } from './ProductCard';
import type { Product } from '../../lib/data/products';

export interface ProductGridProps {
  products: Product[];
  displayMode: 'grid' | 'list' | 'compact';
  productsPerPage: number;
  onAddToCart?: (product: Product) => void;
  showWishlist?: boolean;
}

/**
 * ProductGrid Component
 *
 * PATTERN: Uses both displayMode (string flag) and productsPerPage (number flag)
 * USE CASE: Demonstrate multiple feature flags working together
 * INTEGRATION:
 * - displayMode from productDisplayMode string flag
 * - productsPerPage from productsPerPage number flag
 */
export function ProductGrid({
  products,
  displayMode,
  productsPerPage,
  onAddToCart,
  showWishlist = false,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Empty state
  if (products.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center' }}>
        <Empty description="No products found" />
      </div>
    );
  }

  // ============================================
  // LIST MODE - Single column, full width cards
  // ============================================
  if (displayMode === 'list') {
    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          {currentProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              displayMode="list"
              onAddToCart={onAddToCart}
              showWishlist={showWishlist}
            />
          ))}
        </div>

        {products.length > productsPerPage && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
            />
          </div>
        )}
      </Space>
    );
  }

  // ============================================
  // COMPACT MODE - Dense 4-column grid
  // ============================================
  if (displayMode === 'compact') {
    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[12, 12]}>
          {currentProducts.map(product => (
            <Col key={product.id} xs={12} sm={12} md={8} lg={6} xl={6}>
              <ProductCard
                product={product}
                displayMode="compact"
                onAddToCart={onAddToCart}
                showWishlist={showWishlist}
              />
            </Col>
          ))}
        </Row>

        {products.length > productsPerPage && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
            />
          </div>
        )}
      </Space>
    );
  }

  // ============================================
  // GRID MODE (Default) - 3-column responsive grid
  // ============================================
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        {currentProducts.map(product => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <ProductCard
              product={product}
              displayMode="grid"
              onAddToCart={onAddToCart}
              showWishlist={showWishlist}
            />
          </Col>
        ))}
      </Row>

      {products.length > productsPerPage && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Pagination
            current={currentPage}
            total={products.length}
            pageSize={productsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
          />
        </div>
      )}
    </Space>
  );
}
