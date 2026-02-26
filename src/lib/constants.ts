/**
 * Feature Flag Constants and Metadata - EliteShop E-commerce
 *
 * This file provides human-readable descriptions and default values
 * for all feature flags defined in featureFlags.ts
 */

/**
 * Feature Flag Keys (for type-safe references)
 *
 * Use these constants instead of hardcoding strings throughout your app
 */
export const FEATURE_FLAG_KEYS = {
  // Boolean flags
  SHOW_PROMO_BANNER: 'showPromoBanner',
  ENABLE_EXPRESS_CHECKOUT: 'enableExpressCheckout',
  ENABLE_RECOMMENDATIONS: 'enableRecommendations',
  SHOW_LOYALTY_PROGRAM: 'showLoyaltyProgram',
  ENABLE_WISHLIST: 'enableWishlist',

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
 * Human-readable descriptions shown in UIs and documentation
 * These explain what each flag does and when to use it
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Boolean flags
  showPromoBanner:
    'Toggle promotional banner for seasonal sales and marketing campaigns. Enable for flash sales, holidays, or special promotions.',
  enableExpressCheckout:
    'Enable one-click express checkout for premium customers. Reduces friction for loyal, high-value customers.',
  enableRecommendations:
    'Show AI-powered personalized product recommendations. Test impact on average order value and engagement.',
  showLoyaltyProgram:
    'Display loyalty points, rewards, and tier status. Soft launch to premium members before full rollout.',
  enableWishlist:
    'Allow users to save products to wishlist/favorites. Beta test feature to measure engagement impact.',

  // String flags
  productDisplayMode:
    'A/B test product layout styles: grid (visual cards), list (detailed rows), or compact (dense grid).',
  checkoutFlowVariant:
    'Test checkout experiences: standard (multi-step), express (one-click), or single-page (all fields at once).',
  promoBannerTheme:
    'A/B test promotional banner color schemes: blue (professional), red (urgent), or gradient (modern).',

  // Number flags
  productsPerPage:
    'Control pagination size: 12 (mobile-friendly), 24 (balanced), 36 (more choice), or 48 (premium).',
  cartCountdownTimer:
    'Abandoned cart urgency timer in minutes: 5 (high urgency), 10, 15 (balanced), or 30 (relaxed).',
  freeShippingThreshold:
    'Minimum order value for free shipping in dollars: $35 (new users), $50 (standard), $75, or $100.',
};

/**
 * Default Flag Values
 *
 * Fallback values used when:
 * - CloudBees SDK is not configured
 * - Network connection fails
 * - Flag is not defined in CloudBees Unify
 *
 * These ensure the app always has valid values to work with
 */
export const DEFAULT_FLAG_VALUES = {
  // Boolean flags - false is safe default (features start disabled)
  showPromoBanner: false,
  enableExpressCheckout: false,
  enableRecommendations: false,
  showLoyaltyProgram: false,
  enableWishlist: false,

  // String flags - first variant is default
  productDisplayMode: 'grid',
  checkoutFlowVariant: 'standard',
  promoBannerTheme: 'blue',

  // Number flags - balanced middle values as defaults
  productsPerPage: 24,
  cartCountdownTimer: 15,
  freeShippingThreshold: 50,
};
