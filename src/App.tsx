/**
 * Ridgeline Outfitters - Outdoor Gear Store
 *
 * Patagonia-inspired outdoor gear storefront powered by CloudBees Feature Management.
 * Demonstrates 11 feature flags controlling different aspects of the shopping experience:
 *
 * BOOLEAN FLAGS (5):
 * - showPromoBanner: Toggle seasonal outdoor campaign banner
 * - enableExpressCheckout: One-click checkout for Pro members
 * - enableRecommendations: "Complete Your Kit" gear suggestions
 * - showLoyaltyProgram: Peak Rewards loyalty program display
 * - enableWishlist: Gear wishlist/save-for-later feature
 *
 * STRING FLAGS (3):
 * - productDisplayMode: A/B test layouts (grid/list/compact)
 * - checkoutFlowVariant: Test checkout UX (standard/express/single-page)
 * - promoBannerTheme: A/B test banner themes (earth/alpine/sunset)
 *
 * NUMBER FLAGS (3):
 * - productsPerPage: Control pagination size (12/24/36/48)
 * - cartCountdownTimer: Gear reservation timer (5/10/15/30 minutes)
 * - freeShippingThreshold: Min order for free shipping ($35/$50/$75/$100)
 */

import { useState, useRef } from 'react';
import { Badge, Button, Layout, Space, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useFeatureFlag, useFeatureFlagString, useFeatureFlagNumber } from './hooks/useFeatureFlag';
import { HeroSection } from './components/hero/HeroSection';
import { PromoBanner } from './components/banners/PromoBanner';
import { BlackFridayBanner } from './components/banners/BlackFridayBanner';
import { FlashSaleBanner } from './components/banners/FlashSaleBanner';
import { EnvironmentalBanner } from './components/banners/EnvironmentalBanner';
import { ProductGrid } from './components/products/ProductGrid';
import { ShoppingCart } from './components/cart/ShoppingCart';
import { ProductRecommendations } from './components/recommendations/ProductRecommendations';
import { LoyaltyCard } from './components/loyalty/LoyaltyCard';
import { PRODUCTS } from './lib/data/products';
import { getCartByUserId, addToCart, updateCartItemQuantity, removeFromCart, getCartItemCount, type CartItem } from './lib/data/cart';
import { loadCurrentUser } from './lib/users';
import './App.css';

const { Header, Content } = Layout;
const { Text } = Typography;

/** Navigation mega-menu data -- mirrors Patagonia's category structure */
const NAV_MENUS: Record<string, { title: string; links: string[] }[]> = {
  Featured: [
    { title: 'Web Specials', links: ['Shop All', 'Sale Jackets', 'Sale Fleece', 'Sale Baselayers'] },
    { title: 'Featured Collections', links: ['New Arrivals', 'Best Sellers', 'Staff Picks', 'Lightweight Layers'] },
    { title: 'Stories', links: ['Field Reports', 'Worn Wear Stories', 'Environmental Essays'] },
  ],
  "Men's": [
    { title: 'Shop by Category', links: ['Jackets & Vests', 'Fleece', 'Tops', 'Baselayers', 'Hats & Accessories'] },
    { title: 'Shop by Activity', links: ['Snow', 'Climb', 'Trail Run', 'Hike', 'Fly Fish'] },
    { title: 'Web Specials', links: ['Shop All'] },
    { title: 'Featured Collections', links: ['New Arrivals', 'Best Sellers', 'Lightweight Jackets'] },
  ],
  "Women's": [
    { title: 'Shop by Category', links: ['Jackets & Vests', 'Fleece', 'Tops', 'Baselayers', 'Hats & Accessories'] },
    { title: 'Shop by Activity', links: ['Snow', 'Climb', 'Trail Run', 'Hike', 'Surf'] },
    { title: 'Web Specials', links: ['Shop All'] },
    { title: 'Featured Collections', links: ['New Arrivals', 'Best Sellers', 'Lightweight Jackets'] },
  ],
  "Kids'": [
    { title: 'Shop by Category', links: ['Jackets & Vests', 'Fleece', 'Tops', 'Baselayers', 'Accessories'] },
    { title: 'Shop by Age', links: ['Baby (0-2)', 'Toddler (2-5)', 'Kids (5-14)'] },
    { title: 'Featured', links: ['New Arrivals', 'Best Sellers', 'Sale'] },
  ],
  'Packs & Gear': [
    { title: 'Shop by Category', links: ['Backpacks', 'Duffel Bags', 'Tote Bags', 'Waist Packs', 'Luggage'] },
    { title: 'Shop by Use', links: ['Everyday Carry', 'Day Hiking', 'Travel', 'Climb & Alpine'] },
    { title: 'Featured', links: ['New Arrivals', 'Best Sellers', 'Sale'] },
  ],
  Sports: [
    { title: 'Shop by Sport', links: ['Snow', 'Climb', 'Trail Run', 'Hike', 'Fly Fish', 'Surf', 'Mountain Bike'] },
    { title: 'Featured', links: ['New Arrivals', 'Best Sellers', 'Gift Guide'] },
  ],
  'My Profile': [
    { title: 'My Account', links: ['Order History', 'Saved Addresses', 'Payment Methods', 'Account Settings'] },
    { title: 'Rewards', links: ['Peak Rewards', 'My Points', 'Redeem Rewards', 'Refer a Friend'] },
    { title: 'My Gear', links: ['Wishlist', 'Recently Viewed', 'Worn Wear Trade-Ins', 'Product Reviews'] },
  ],
};

/** Map nav link labels to product category filters */
const NAV_LINK_TO_CATEGORY: Record<string, string | null> = {
  'Shop All': null,
  'Jackets & Vests': 'Jackets & Outerwear',
  'Fleece': 'Fleece & Midlayers',
  'Tops': 'Baselayers & Tops',
  'Baselayers': 'Baselayers & Tops',
  'Backpacks': 'Packs & Gear',
  'Duffel Bags': 'Packs & Gear',
  'Tote Bags': 'Packs & Gear',
  'Waist Packs': 'Packs & Gear',
  'Luggage': 'Packs & Gear',
  'Hats & Accessories': 'Packs & Gear',
  'Accessories': 'Packs & Gear',
};

/**
 * Ridgeline Outfitters App Component
 *
 * Integrates all 11 feature flags to create a personalized outdoor gear
 * shopping experience. Each user persona sees a different experience
 * based on their properties.
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
  const enableBlackFriday = useFeatureFlag('enableBlackFriday');
  const enableFlashSale = useFeatureFlag('enableFlashSale');

  // String Flags - A/B testing variants
  const productDisplayMode = useFeatureFlagString('productDisplayMode') as 'grid' | 'list' | 'compact';
  const checkoutFlowVariant = useFeatureFlagString('checkoutFlowVariant') as 'standard' | 'express' | 'single-page';
  const promoBannerTheme = useFeatureFlagString('promoBannerTheme') as 'earth' | 'alpine' | 'sunset';

  // Number Flags - Numeric configuration
  const productsPerPage = useFeatureFlagNumber('productsPerPage');
  const cartCountdownMinutes = useFeatureFlagNumber('cartCountdownTimer');
  const freeShippingThreshold = useFeatureFlagNumber('freeShippingThreshold');

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const currentUser = loadCurrentUser();
  const userId = currentUser?.id || 'new-shopper';
  const initialCart = getCartByUserId(userId);

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showRewards, setShowRewards] = useState(false);
  const productGridRef = useRef<HTMLDivElement>(null);
  const rewardsRef = useRef<HTMLDivElement>(null);

  const cartItemCount = getCartItemCount(cartItems);

  // ============================================
  // CART HANDLERS
  // ============================================

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    setCartItems(prev => addToCart(prev, product));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => updateCartItemQuantity(prev, productId, quantity));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => removeFromCart(prev, productId));
  };

  // ============================================
  // NAV HANDLERS
  // ============================================

  const handleNavClick = (link: string) => {
    setActiveNav(null);

    // Peak Rewards: scroll to the rewards section
    if (link === 'Peak Rewards' || link === 'My Points' || link === 'Redeem Rewards') {
      setShowRewards(true);
      setTimeout(() => {
        rewardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    // Category links: filter product grid and scroll to it
    const category = NAV_LINK_TO_CATEGORY[link];
    if (category !== undefined) {
      setCategoryFilter(category);
    } else {
      setCategoryFilter(null);
    }
    setTimeout(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // ============================================
  // USER-SPECIFIC DATA
  // ============================================

  const userStats = {
    loyaltyPoints: currentUser?.properties.numbers.loyaltyPoints || 0,
    membershipTier: currentUser?.properties.strings.membershipTier || 'new',
  };

  // Flash Sale tiered discounts: Summit 40%, Trailtest 25%, Dayhiker 10%, Explorer 5%
  const flashSaleDiscountMap: Record<string, number> = { vip: 40, beta: 25, basic: 10, new: 5 };
  const flashSaleDiscount = enableFlashSale ? flashSaleDiscountMap[userStats.membershipTier] || 5 : 0;

  // Effective promo state: Flash Sale > Black Friday > Regular Promo
  const isBlackFridayActive = enableBlackFriday && !enableFlashSale;
  const activeSaleOverride = flashSaleDiscount > 0 ? flashSaleDiscount : undefined;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ============================================
          ANNOUNCEMENT BAR - Environmental messaging
          ============================================ */}
      <div className="announcement-bar">
        1% for the Planet &mdash; We donate 1% of sales to environmental causes
      </div>

      {/* ============================================
          HEADER - Brand, navigation, cart
          ============================================ */}
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          borderBottom: '1px solid #e8e5df',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          height: 56,
          lineHeight: '56px',
        }}
      >
        {/* Mountain Logo + Brand Name */}
        <Space size={10} style={{ flexShrink: 0 }}>
          {/* Inline mountain ridge SVG */}
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 0L20 12L28 20H0L8 12L14 0Z" fill="#1a1a2e"/>
            <path d="M8 6L12 14L16 20H0L4 14L8 6Z" fill="#2d4a2e" opacity="0.7"/>
          </svg>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#1a1a2e',
              whiteSpace: 'nowrap',
            }}
          >
            Ridgeline
          </span>
        </Space>

        {/* Mega Navigation */}
        <nav className="mega-nav">
          {Object.keys(NAV_MENUS).map(label => (
            <div
              key={label}
              className={`mega-nav-item${activeNav === label ? ' active' : ''}`}
              onMouseEnter={() => setActiveNav(label)}
              onMouseLeave={() => setActiveNav(null)}
            >
              <span className="nav-label">
                {label === 'My Profile' && <UserOutlined style={{ marginRight: 4 }} />}
                {label}
              </span>

              {activeNav === label && (
                <div className="mega-dropdown">
                  {NAV_MENUS[label].map(column => (
                    <div key={column.title} className="mega-dropdown-column">
                      <h4>{column.title}</h4>
                      <ul>
                        {column.links.map(link => (
                          <li key={link}>
                            <a onClick={(e) => { e.preventDefault(); handleNavClick(link); }}>{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search + Cart */}
        <Space size={16} style={{ flexShrink: 0 }}>
          <Button
            type="text"
            icon={<SearchOutlined style={{ fontSize: 18, color: '#1a1a2e' }} />}
            size="small"
          />
          <Badge count={cartItemCount} showZero={false} offset={[-2, 4]}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: 20, color: '#1a1a2e' }} />}
              onClick={() => setCartOpen(true)}
              size="small"
            />
          </Badge>
        </Space>
      </Header>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <Content style={{ background: '#faf9f7' }}>

        {/* ============================================
            HERO SECTION - Full-bleed nature imagery
            ============================================ */}
        <HeroSection />

        {/* ============================================
            PROMOTIONAL BANNERS (Priority: Flash Sale > Black Friday > Regular)
            FLAGS: enableFlashSale, enableBlackFriday, showPromoBanner
            ============================================ */}
        {enableFlashSale ? (
          <FlashSaleBanner
            discountPercent={flashSaleDiscount}
            membershipTier={userStats.membershipTier}
          />
        ) : enableBlackFriday ? (
          <BlackFridayBanner />
        ) : showPromoBanner ? (
          <PromoBanner
            theme={promoBannerTheme}
            freeShippingThreshold={freeShippingThreshold}
          />
        ) : null}

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 24px' }}>
          <Space direction="vertical" size={48} style={{ width: '100%' }}>

            {/* ============================================
                LOYALTY PROGRAM CARD (Nav-triggered only)
                PATTERN: Boolean flag + nav trigger from My Profile > Peak Rewards
                FLAG: showLoyaltyProgram
                ============================================ */}
            {showRewards && (
              <div ref={rewardsRef}>
                <LoyaltyCard
                  points={userStats.loyaltyPoints}
                  tierName={userStats.membershipTier}
                  onViewRewards={() => console.log('View rewards')}
                />
              </div>
            )}

            {/* ============================================
                PRODUCT GRID
                PATTERN: Multiple flags working together
                FLAGS:
                - productDisplayMode (string): grid/list/compact layout
                - productsPerPage (number): pagination size
                - enableWishlist (boolean): show wishlist button
                ============================================ */}
            <div ref={productGridRef}>
              <div className="product-section-header">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span className="section-header">
                    {categoryFilter || 'Shop All Gear'}
                  </span>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {(categoryFilter
                      ? PRODUCTS.filter(p => p.category === categoryFilter)
                      : PRODUCTS
                    ).length} items
                  </Text>
                </div>
                <Space size={8} wrap>
                  {['All', 'Jackets & Outerwear', 'Fleece & Midlayers', 'Baselayers & Tops', 'Packs & Gear'].map(cat => {
                    const isActive = cat === 'All' ? !categoryFilter : categoryFilter === cat;
                    return (
                      <Button
                        key={cat}
                        size="small"
                        type={isActive ? 'primary' : 'default'}
                        onClick={() => setCategoryFilter(cat === 'All' ? null : cat)}
                        style={{
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: isActive ? 600 : 400,
                          ...(isActive
                            ? { background: '#1a1a2e', borderColor: '#1a1a2e' }
                            : { color: '#5c574f', borderColor: '#d9d6d0' }),
                        }}
                      >
                        {cat === 'All' ? 'All' : cat}
                      </Button>
                    );
                  })}
                </Space>
              </div>
              <ProductGrid
                products={
                  categoryFilter
                    ? PRODUCTS.filter(p => p.category === categoryFilter)
                    : PRODUCTS
                }
                displayMode={productDisplayMode}
                productsPerPage={productsPerPage}
                onAddToCart={handleAddToCart}
                showWishlist={enableWishlist}
                isBlackFriday={isBlackFridayActive}
                saleOverridePercent={activeSaleOverride}
              />
            </div>

            {/* ============================================
                PRODUCT RECOMMENDATIONS (Conditional)
                PATTERN: Boolean flag controls visibility
                FLAG: enableRecommendations
                ============================================ */}
            {enableRecommendations && (
              <ProductRecommendations
                products={PRODUCTS.slice(0, 6)}
                title="Complete Your Kit"
                onAddToCart={handleAddToCart}
              />
            )}
          </Space>
        </div>

        {/* ============================================
            ENVIRONMENTAL BANNER - Sustainability messaging
            ============================================ */}
        <EnvironmentalBanner />
      </Content>

      {/* ============================================
          SHOPPING CART DRAWER
          PATTERN: Multiple flags control cart behavior
          FLAGS:
          - freeShippingThreshold (number): Free shipping calculation
          - enableExpressCheckout (boolean): Show express button
          - checkoutFlowVariant (string): Checkout flow type
          - cartCountdownTimer (number): Gear reservation countdown
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
        isBlackFriday={isBlackFridayActive}
        saleOverridePercent={activeSaleOverride}
      />
    </Layout>
  );
}

export default App;
