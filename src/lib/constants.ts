/**
 * Feature Flag Constants and Metadata - Ridgeline Outfitters
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
    'Toggle seasonal outdoor campaign banner. Enable for end-of-season clearance, Worn Wear events, or environmental action campaigns.',
  enableExpressCheckout:
    'Enable one-click express checkout for Pro members. Reduces friction for experienced outdoor enthusiasts.',
  enableRecommendations:
    'Show "Complete Your Kit" gear recommendations. Suggests complementary outdoor items based on browsing.',
  showLoyaltyProgram:
    'Display Peak Rewards loyalty program with trail credits, tier status, and redeemable rewards.',
  enableWishlist:
    'Enable gear wishlist/save-for-later feature. Let customers build wishlists for upcoming trips.',
  enableBlackFriday:
    'Enable Black Friday site-wide sale: 20% off all items + free shipping on every order. Enable early for VIP Summit members.',
  enableFlashSale:
    'Enable tiered flash sale with 2-hour countdown: 40% off Summit, 25% Trailtest, 10% Dayhiker, 5% Explorer.',
  enableEarlyAccess:
    'Show Early Access Collection: Summit members see exclusive new arrivals, other tiers see an upgrade teaser.',
  enablePerkPreview:
    'Show Summit perk strip: VIP members see checkmarks, others see locks with upgrade CTA. Drives membership upgrades.',

  // String flags
  productDisplayMode:
    'A/B test gear display layouts: grid (visual cards), list (detailed specs), or compact (browse more gear).',
  checkoutFlowVariant:
    'Test checkout experiences: standard (multi-step), express (one-click for Pro), or single-page.',
  promoBannerTheme:
    'A/B test banner themes: earth (forest/olive tones), alpine (navy/mountain), or sunset (warm amber).',

  // Number flags
  productsPerPage:
    'Control gear listing page size: 12 (mobile), 24 (balanced), 36 (browse), or 48 (power shopper).',
  cartCountdownTimer:
    'Gear reservation timer in minutes: 5 (high demand), 10, 15 (standard), or 30 (relaxed).',
  freeShippingThreshold:
    'Minimum order for free standard shipping: $35 (new), $50 (standard), $75, or $100.',
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

  // String flags - first variant is default
  productDisplayMode: 'grid',
  checkoutFlowVariant: 'standard',
  promoBannerTheme: 'earth',

  // Number flags - balanced middle values as defaults
  productsPerPage: 24,
  cartCountdownTimer: 15,
  freeShippingThreshold: 50,
};
