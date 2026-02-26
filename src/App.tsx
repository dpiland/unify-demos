/**
 * EliteShop - E-commerce Application
 *
 * Professional e-commerce storefront powered by CloudBees Feature Management.
 * Demonstrates 11 feature flags controlling different aspects of the shopping experience:
 *
 * BOOLEAN FLAGS (5):
 * - showPromoBanner: Toggle promotional banner visibility
 * - enableExpressCheckout: One-click checkout for premium customers
 * - enableRecommendations: AI-powered product suggestions
 * - showLoyaltyProgram: Display loyalty points and rewards
 * - enableWishlist: Wishlist/favorites feature
 *
 * STRING FLAGS (3):
 * - productDisplayMode: A/B test layouts (grid/list/compact)
 * - checkoutFlowVariant: Test checkout UX (standard/express/single-page)
 * - promoBannerTheme: A/B test banner colors (blue/red/gradient)
 *
 * NUMBER FLAGS (3):
 * - productsPerPage: Control pagination size (12/24/36/48)
 * - cartCountdownTimer: Abandoned cart urgency (5/10/15/30 minutes)
 * - freeShippingThreshold: Min order for free shipping ($35/$50/$75/$100)
 */

import { useState } from 'react';
import { Badge, Button, Card, Col, Input, Layout, Row, Space, Statistic, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TeamOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { PromoBanner } from './components/banners/PromoBanner';
import { ProductGrid } from './components/products/ProductGrid';
import { ShoppingCart } from './components/cart/ShoppingCart';
import { ProductRecommendations } from './components/recommendations/ProductRecommendations';
import { LoyaltyCard } from './components/loyalty/LoyaltyCard';
import { PRODUCTS } from './lib/data/products';
import { getCartByUserId, addToCart, updateCartItemQuantity, removeFromCart, getCartItemCount, type CartItem } from './lib/data/cart';
import { loadCurrentUser } from './lib/users';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

/**
 * EliteShop App Component
 *
 * Integrates all 11 feature flags to create a personalized shopping experience.
 * Each user persona sees a different experience based on their properties.
 */
function App() {
  // ============================================
  // FEATURE FLAGS
  // ============================================

  // Boolean Flags - Control feature visibility
  const showPromoBanner = useFeatureFlag('showPromoBanner');
  const enableExpressCheckout = useFeatureFlag('enableExpressCheckout');
  const enableRecommendations = useFeatureFlag('enableRecommendations');
  const showLoyaltyProgram = useFeatureFlag('showLoyaltyProgram');
  const enableWishlist = useFeatureFlag('enableWishlist');

  // String Flags - A/B testing variants
  const productDisplayMode = useFeatureFlagString('productDisplayMode') as 'grid' | 'list' | 'compact';
  const checkoutFlowVariant = useFeatureFlagString('checkoutFlowVariant') as 'standard' | 'express' | 'single-page';
  const promoBannerTheme = useFeatureFlagString('promoBannerTheme') as 'blue' | 'red' | 'gradient';

  // Number Flags - Numeric configuration
  const productsPerPage = useFeatureFlagNumber('productsPerPage');
  const cartCountdownMinutes = useFeatureFlagNumber('cartCountdownTimer');
  const freeShippingThreshold = useFeatureFlagNumber('freeShippingThreshold');

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  // Load current user and their cart
  const currentUser = loadCurrentUser();
  const userId = currentUser?.id || 'new-shopper';
  const initialCart = getCartByUserId(userId);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [cartOpen, setCartOpen] = useState(false);

  // Cart item count for badge
  const cartItemCount = getCartItemCount(cartItems);

  // ============================================
  // CART HANDLERS
  // ============================================

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    setCartItems(prev => addToCart(prev, product));
    // Optional: Show success message
    console.log('Added to cart:', product.name);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => updateCartItemQuantity(prev, productId, quantity));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => removeFromCart(prev, productId));
  };

  // ============================================
  // USER-SPECIFIC DATA
  // ============================================

  // Get user-specific stats (would come from API in real app)
  const userStats = {
    activeOrders: currentUser?.properties.numbers.cartItemCount || 0,
    loyaltyPoints: currentUser?.properties.numbers.loyaltyPoints || 0,
    membershipTier: currentUser?.properties.strings.membershipTier || 'new',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ============================================
          HEADER - Store branding, search, cart icon
          ============================================ */}
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Store Logo/Brand */}
        <Space size={12} style={{ flexShrink: 0 }}>
          <ShoppingOutlined style={{ fontSize: 28, color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, color: '#1890ff', whiteSpace: 'nowrap' }}>
            EliteShop
          </Title>
        </Space>

        {/* Search Bar */}
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          size="large"
          style={{ maxWidth: 500, flex: 1, minWidth: 200 }}
        />

        {/* Shopping Cart Icon - leaves room for user menu on the right */}
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <Badge count={cartItemCount} showZero offset={[-5, 5]}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}
              onClick={() => setCartOpen(true)}
              size="large"
            >
              Cart
            </Button>
          </Badge>
        </div>
        {/* User menu from AppWithAuth will appear after the cart */}
      </Header>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>

            {/* ============================================
                PROMOTIONAL BANNER (Conditional)
                PATTERN: Boolean flag controls visibility
                FLAG: showPromoBanner
                THEME: promoBannerTheme (string flag)
                ============================================ */}
            {showPromoBanner && (
              <PromoBanner
                theme={promoBannerTheme}
                freeShippingThreshold={freeShippingThreshold}
              />
            )}

            {/* ============================================
                STATISTICS ROW
                ============================================ */}
            <Row gutter={16}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Products Available"
                    value={PRODUCTS.length}
                    prefix={<ShoppingOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Active Orders"
                    value={userStats.activeOrders}
                    prefix={<ShoppingCartOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Monthly Revenue"
                    value={12450}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                    precision={0}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="Total Members"
                    value={2400}
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* ============================================
                LOYALTY PROGRAM CARD (Conditional)
                PATTERN: Boolean flag controls visibility
                FLAG: showLoyaltyProgram
                TARGETING: Premium customers with tenure > 12 months
                ============================================ */}
            {showLoyaltyProgram && (
              <LoyaltyCard
                points={userStats.loyaltyPoints}
                tierName={userStats.membershipTier}
                onViewRewards={() => console.log('View rewards')}
              />
            )}

            {/* ============================================
                PRODUCT GRID
                PATTERN: Multiple flags working together
                FLAGS:
                - productDisplayMode (string): grid/list/compact layout
                - productsPerPage (number): pagination size
                - enableWishlist (boolean): show wishlist button
                ============================================ */}
            <Card
              title={
                <Space size={8}>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>Featured Products</span>
                  <Text type="secondary" style={{ fontSize: 14, fontWeight: 'normal' }}>
                    ({PRODUCTS.length} items)
                  </Text>
                </Space>
              }
              extra={
                <Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Display: <strong>{productDisplayMode}</strong> • {productsPerPage} per page
                  </Text>
                </Space>
              }
            >
              <ProductGrid
                products={PRODUCTS}
                displayMode={productDisplayMode}
                productsPerPage={productsPerPage}
                onAddToCart={handleAddToCart}
                showWishlist={enableWishlist}
              />
            </Card>

            {/* ============================================
                PRODUCT RECOMMENDATIONS (Conditional)
                PATTERN: Boolean flag controls visibility
                FLAG: enableRecommendations
                USE CASE: A/B test impact on average order value
                ============================================ */}
            {enableRecommendations && (
              <ProductRecommendations
                products={PRODUCTS.slice(0, 6)}
                title="Recommended For You"
                onAddToCart={handleAddToCart}
              />
            )}
          </Space>
        </div>
      </Content>

      {/* ============================================
          SHOPPING CART DRAWER
          PATTERN: Multiple flags control cart behavior
          FLAGS:
          - freeShippingThreshold (number): Free shipping calculation
          - enableExpressCheckout (boolean): Show express button
          - checkoutFlowVariant (string): Checkout flow type
          - cartCountdownTimer (number): Urgency countdown
          ============================================ */}
      <ShoppingCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        freeShippingThreshold={freeShippingThreshold}
        enableExpressCheckout={enableExpressCheckout}
        checkoutFlowVariant={checkoutFlowVariant}
        cartCountdownMinutes={cartCountdownMinutes}
      />
    </Layout>
  );
}

export default App;
