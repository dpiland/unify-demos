/**
 * Feature Flag Constants and Metadata - E-Commerce Store
 *
 * Human-readable descriptions and default values for all feature flags.
 */

/**
 * Feature Flag Keys (for type-safe references)
 */
export const FEATURE_FLAG_KEYS = {
  // Boolean flags
  SHOW_PROMO_BANNER: 'showPromoBanner',
  ENABLE_EXPRESS_CHECKOUT: 'enableExpressCheckout',
  ENABLE_RECOMMENDATIONS: 'enableRecommendations',
  SHOW_LOYALTY_PROGRAM: 'showLoyaltyProgram',
  ENABLE_WISHLIST: 'enableWishlist',
  ENABLE_BLACK_FRIDAY: 'enableBlackFriday',
  ENABLE_FLASH_SALE: 'enableFlashSale',
  ENABLE_EARLY_ACCESS: 'enableEarlyAccess',
  ENABLE_PERK_PREVIEW: 'enablePerkPreview',
  ENABLE_PERSONALIZED_HERO: 'enablePersonalizedHero',
  TEST_BANNER: 'testBanner',

  // String flags
  PRODUCT_DISPLAY_MODE: 'productDisplayMode',
  CHECKOUT_FLOW_VARIANT: 'checkoutFlowVariant',
  PROMO_BANNER_THEME: 'promoBannerTheme',

  // Number flags
  PRODUCTS_PER_PAGE: 'productsPerPage',
  CART_COUNTDOWN_TIMER: 'cartCountdownTimer',
  FREE_SHIPPING_THRESHOLD: 'freeShippingThreshold',
} as const;

/**
 * Flag Descriptions
 *
 * Human-readable descriptions for UIs and documentation.
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Boolean flags
  showPromoBanner:
    'Toggle seasonal promotional banner. Enable for sales, special offers, or marketing campaigns.',
  enableExpressCheckout:
    'Enable one-click express checkout for premium members. Reduces friction for returning customers.',
  enableRecommendations:
    'Show personalized product recommendations. Suggests complementary items based on browsing and purchase history.',
  showLoyaltyProgram:
    'Display loyalty program with points, tier status, and redeemable rewards.',
  enableWishlist:
    'Enable wishlist/save-for-later feature. Let customers save products for future purchase.',
  enableBlackFriday:
    'Enable Black Friday site-wide sale: 20% off all items + free shipping. Enable early for VIP members.',
  enableFlashSale:
    'Enable tiered flash sale with countdown timer. Different discount tiers for different membership levels.',
  enableEarlyAccess:
    'Show Early Access Collection: VIP members see exclusive products, others see upgrade teaser.',
  enablePerkPreview:
    'Show membership perk strip: VIP members see checkmarks, others see locks with upgrade CTA.',
  enablePersonalizedHero:
    'Show personalized hero banner for VIP members with their name and custom imagery.',
  testBanner:
    'Test banner with intentional UI issues — broken layout for demo purposes. Shows instant rollback capability.',

  // String flags
  productDisplayMode:
    'A/B test product display layouts: grid (visual cards), list (detailed info), or compact (browse more).',
  checkoutFlowVariant:
    'Test checkout experiences: standard (multi-step), express (one-click), or single-page.',
  promoBannerTheme:
    'A/B test banner themes: primary (brand colors), bold (high-contrast), or subtle (minimal).',

  // Number flags
  productsPerPage:
    'Control product listing page size: 12 (mobile), 24 (balanced), 36 (browse), or 48 (power shopper).',
  cartCountdownTimer:
    'Product reservation timer in minutes: 5 (high urgency), 10, 15 (standard), or 30 (relaxed).',
  freeShippingThreshold:
    'Minimum order for free standard shipping: $35 (promotional), $50 (standard), $75, or $100.',
};

/**
 * Default Flag Values
 *
 * Fallback values used when CloudBees SDK is not configured,
 * network connection fails, or flag is not defined in CloudBees Unify.
 */
export const DEFAULT_FLAG_VALUES = {
  // Boolean flags - false is safe default (features start disabled)
  showPromoBanner: false,
  enableExpressCheckout: false,
  enableRecommendations: false,
  showLoyaltyProgram: false,
  enableWishlist: false,
  enableBlackFriday: false,
  enableFlashSale: false,
  enableEarlyAccess: false,
  enablePerkPreview: false,
  enablePersonalizedHero: false,
  testBanner: false,

  // String flags - first variant is default
  productDisplayMode: 'grid',
  checkoutFlowVariant: 'standard',
  promoBannerTheme: 'primary',

  // Number flags - balanced middle values as defaults
  productsPerPage: 24,
  cartCountdownTimer: 15,
  freeShippingThreshold: 50,
};
