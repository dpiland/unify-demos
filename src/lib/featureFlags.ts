/**
 * CloudBees Feature Flags SDK Integration
 *
 * This module provides the CloudBees Feature Management foundation
 * for the Ridgeline Outfitters outdoor gear store demo.
 *
 * HOW TO ADD NEW FLAGS:
 * 1. Add flag definition to the 'flags' object below
 * 2. Update FLAG_DESCRIPTIONS in constants.ts
 * 3. Use flags in components via useFeatureFlag hooks
 * 4. Create/configure the flag in CloudBees Unify UI
 */

import Rox from 'rox-browser';
import type { RoxSetupOptions} from './types';
import type { User } from './users';

/** Guard against duplicate Rox.register in React Strict Mode */
let initialized = false;

/**
 * Feature Flag Definitions - Ridgeline Outfitters
 *
 * This outdoor gear store uses 11 feature flags to control various
 * aspects of the shopping experience, enabling safe rollouts, A/B testing,
 * and personalized experiences based on user segmentation.
 */
export const flags = {
  // =================================================================
  // BOOLEAN FLAGS (5) - Enable/Disable Features
  // =================================================================

  /**
   * 1. Show Promotional Banner
   *
   * USE CASE: Toggle seasonal outdoor campaign banner (end-of-season sale, Worn Wear events)
   * PATTERN: if (enabled) { show banner } else { hide banner }
   *
   * BUSINESS VALUE:
   * - Launch seasonal clearance instantly without code deploy
   * - Test impact of outdoor campaign messaging on conversion
   * - Target campaigns to specific regions or customer segments
   *
   * HOW TO USE:
   * ```typescript
   * const showBanner = useFeatureFlag('showPromoBanner');
   * return showBanner ? <PromoBanner /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable for all users during end-of-season clearance
   * - Enable for new users only (isNewUser == true)
   * - Disable for Pro members who already converted
   */
  showPromoBanner: new Rox.Flag(),

  /**
   * 2. Enable Express Checkout
   *
   * USE CASE: One-click express checkout for Pro members and returning outdoor enthusiasts
   * PATTERN: Conditional rendering of express checkout button
   *
   * BUSINESS VALUE:
   * - Reduce friction for high-value customers
   * - Test impact on conversion rate and cart abandonment
   * - Reward loyalty with premium checkout experience
   *
   * HOW TO USE:
   * ```typescript
   * const hasExpress = useFeatureFlag('enableExpressCheckout');
   * return hasExpress ? <ExpressCheckoutButton /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable IF isPremiumCustomer == true
   * - Enable IF lifetimeSpend > 5000
   * - Enable IF memberSince > 12 (months)
   */
  enableExpressCheckout: new Rox.Flag(),

  /**
   * 3. Enable Product Recommendations
   *
   * USE CASE: Show "Complete Your Kit" personalized gear suggestions
   * PATTERN: Conditional rendering of recommendations section
   *
   * BUSINESS VALUE:
   * - Increase average order value by suggesting complementary gear
   * - A/B test recommendation algorithm effectiveness
   * - Gradually roll out to measure performance impact
   *
   * HOW TO USE:
   * ```typescript
   * const showRecs = useFeatureFlag('enableRecommendations');
   * return showRecs ? <ProductRecommendations /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable for 50% of users (A/B test)
   * - Enable for users with >3 previous purchases
   * - Disable for first-time visitors (focus on browse experience)
   */
  enableRecommendations: new Rox.Flag(),

  /**
   * 4. Show Loyalty Program
   *
   * USE CASE: Display Peak Rewards loyalty points, trail credits, and tier status
   * PATTERN: Conditional rendering of loyalty card component
   *
   * BUSINESS VALUE:
   * - Soft launch to Pro members before full rollout
   * - Increase customer retention and repeat gear purchases
   * - Test loyalty mechanics with select outdoor enthusiast cohorts
   *
   * HOW TO USE:
   * ```typescript
   * const showLoyalty = useFeatureFlag('showLoyaltyProgram');
   * return showLoyalty ? <LoyaltyCard /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable IF isPremiumCustomer == true AND memberSince > 12
   * - Enable for region == "us-west" (regional rollout)
   * - Enable for field testers first (isBetaTester == true)
   */
  showLoyaltyProgram: new Rox.Flag(),

  /**
   * 5. Enable Wishlist Feature
   *
   * USE CASE: Allow users to save gear to wishlist for upcoming trips
   * PATTERN: Conditional rendering of wishlist/save icon on product cards
   *
   * BUSINESS VALUE:
   * - Beta test feature before general availability
   * - Increase engagement and return visits for trip planning
   * - Test impact on conversion (wishlist to purchase)
   *
   * HOW TO USE:
   * ```typescript
   * const hasWishlist = useFeatureFlag('enableWishlist');
   * return hasWishlist ? <WishlistButton /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable for isBetaTester == true (field test)
   * - Enable for region == "us-west" then expand
   * - Enable for users with memberSince > 6 months
   */
  enableWishlist: new Rox.Flag(),

  /**
   * 6. Enable Black Friday Deals
   *
   * USE CASE: Site-wide 20% off all items + free shipping (no minimum)
   * PATTERN: if (enabled) { apply 20% discount + free shipping }
   *
   * BUSINESS VALUE:
   * - Launch Black Friday instantly without code deploy
   * - Enable 1 week early for VIP/Summit members
   * - Disable instantly if inventory runs low
   *
   * TARGETING EXAMPLES:
   * - Enable for membershipTier == "vip" (1 week early access)
   * - Enable for all users on Black Friday
   */
  enableBlackFriday: new Rox.Flag(),

  /**
   * 7. Enable Flash Sale
   *
   * USE CASE: Time-limited tiered discounts with countdown timer
   * Discount tiers: 40% VIP, 25% Beta, 10% Basic, 5% New
   * PATTERN: if (enabled) { show flash sale banner + apply tier discount }
   *
   * BUSINESS VALUE:
   * - Create urgency with 2-hour countdown
   * - Reward loyal customers with higher discounts
   * - Test conversion impact of tiered pricing
   *
   * TARGETING EXAMPLES:
   * - Enable for all users during flash sale window
   * - A/B test discount levels by segment
   */
  enableFlashSale: new Rox.Flag(),

  // =================================================================
  // STRING FLAGS (3) - A/B Test Variants
  // =================================================================

  /**
   * 6. Product Display Mode
   *
   * USE CASE: A/B test different gear layout styles
   * PATTERN: switch (mode) { case 'grid': ... case 'list': ... }
   *
   * BUSINESS VALUE:
   * - Test which layout drives more engagement and add-to-carts
   * - Optimize for different device types (mobile vs desktop)
   * - Personalize based on user shopping preference
   *
   * VARIANTS:
   * - 'grid': Cards in responsive grid (default, visual)
   * - 'list': Row-based list view (detailed specs, scannable)
   * - 'compact': Dense grid with smaller cards (browse more gear)
   *
   * HOW TO USE:
   * ```typescript
   * const displayMode = useFeatureFlagString('productDisplayMode');
   * <ProductGrid displayMode={displayMode} />
   * ```
   */
  productDisplayMode: new Rox.RoxString('grid', ['grid', 'list', 'compact']),

  /**
   * 7. Checkout Flow Variant
   *
   * USE CASE: Test different checkout user experiences
   * PATTERN: Conditional rendering based on variant string
   *
   * BUSINESS VALUE:
   * - Optimize checkout conversion rate
   * - Test multi-step vs single-page checkout
   * - Personalize flow based on customer tier
   *
   * VARIANTS:
   * - 'standard': Traditional multi-step checkout (default)
   * - 'express': Streamlined one-click for returning customers
   * - 'single-page': All checkout fields on one page
   *
   * HOW TO USE:
   * ```typescript
   * const checkoutFlow = useFeatureFlagString('checkoutFlowVariant');
   * <CheckoutButton variant={checkoutFlow} />
   * ```
   */
  checkoutFlowVariant: new Rox.RoxString('standard', ['standard', 'express', 'single-page']),

  /**
   * 8. Promotional Banner Theme
   *
   * USE CASE: A/B test different banner themes for outdoor campaigns
   * PATTERN: Apply different styling/messaging based on theme string
   *
   * BUSINESS VALUE:
   * - Test which nature-inspired theme gets more clicks
   * - Optimize promotional banner effectiveness
   * - Match seasonal outdoor themes
   *
   * VARIANTS:
   * - 'earth': Forest/olive tones (default, end-of-season sales)
   * - 'alpine': Deep navy/mountain theme (free shipping, new arrivals)
   * - 'sunset': Warm amber tones (Worn Wear, trade-in programs)
   *
   * HOW TO USE:
   * ```typescript
   * const theme = useFeatureFlagString('promoBannerTheme');
   * <PromoBanner theme={theme} />
   * ```
   */
  promoBannerTheme: new Rox.RoxString('earth', ['earth', 'alpine', 'sunset']),

  // =================================================================
  // NUMBER FLAGS (3) - Numeric Configuration
  // =================================================================

  /**
   * 9. Products Per Page
   *
   * USE CASE: Control pagination size for gear listings
   * PATTERN: Slice products array based on flag value
   *
   * BUSINESS VALUE:
   * - Test optimal page size for browsing outdoor gear
   * - Balance performance vs. content visibility
   * - Personalize based on customer tier or device
   *
   * OPTIONS: [12, 24, 36, 48]
   *
   * HOW TO USE:
   * ```typescript
   * const pageSize = useFeatureFlagNumber('productsPerPage');
   * const displayedProducts = products.slice(0, pageSize);
   * ```
   */
  productsPerPage: new Rox.RoxNumber(24, [12, 24, 36, 48]),

  /**
   * 10. Cart Countdown Timer
   *
   * USE CASE: Gear reservation timer to reduce cart abandonment
   * PATTERN: Display countdown with configurable duration
   *
   * BUSINESS VALUE:
   * - Create urgency for popular/limited outdoor gear
   * - Test optimal timer duration for conversion
   * - Personalize pressure based on customer tier
   *
   * OPTIONS: [5, 10, 15, 30] minutes
   *
   * HOW TO USE:
   * ```typescript
   * const timerMinutes = useFeatureFlagNumber('cartCountdownTimer');
   * <CartTimer minutes={timerMinutes} />
   * ```
   */
  cartCountdownTimer: new Rox.RoxNumber(15, [5, 10, 15, 30]),

  /**
   * 11. Free Shipping Threshold
   *
   * USE CASE: Minimum order value for free standard shipping on outdoor orders
   * PATTERN: Calculate shipping based on threshold
   *
   * BUSINESS VALUE:
   * - Increase average order value
   * - Test different thresholds for revenue optimization
   * - Incentivize new customers with lower threshold
   *
   * OPTIONS: [35, 50, 75, 100] dollars
   *
   * HOW TO USE:
   * ```typescript
   * const threshold = useFeatureFlagNumber('freeShippingThreshold');
   * const shipping = cartTotal >= threshold ? 0 : 10;
   * ```
   */
  freeShippingThreshold: new Rox.RoxNumber(50, [35, 50, 75, 100]),
};

/**
 * Initialize CloudBees Feature Flags SDK
 *
 * SETUP INSTRUCTIONS:
 * 1. Get your SDK key from CloudBees Unify:
 *    - Go to Feature Management -> Installation
 *    - Copy the SDK key for your environment
 * 2. Create .env.local file (copy from .env.example)
 * 3. Add: VITE_CLOUDBEES_SDK_KEY=your_actual_key
 * 4. Restart dev server
 *
 * @param options - Optional Rox setup configuration
 * @returns Promise that resolves when SDK is initialized
 */
export async function initializeFeatureFlags(options: RoxSetupOptions = {}): Promise<void> {
  const sdkKey = import.meta.env.VITE_CLOUDBEES_SDK_KEY;

  if (!sdkKey || sdkKey === 'your_sdk_key_here') {
    console.warn(
      'CloudBees SDK key not configured. Feature flags will use default values.\n' +
      'To connect to CloudBees Feature Management:\n' +
      '1. Copy .env.example to .env.local\n' +
      '2. Get your SDK key from CloudBees Unify (Feature Management -> Installation)\n' +
      '3. Add the key to .env.local as VITE_CLOUDBEES_SDK_KEY\n' +
      '4. Restart the dev server'
    );
    return;
  }

  try {
    if (!initialized) {
      Rox.register('', flags);
      initialized = true;
    }

    console.log('Initializing CloudBees Feature Flags...');

    await Rox.setup(sdkKey, {
      developmentOnly: import.meta.env.DEV,
      ...options,
    });

    console.log('CloudBees Feature Flags initialized successfully');
    console.log(`Registered ${Object.keys(flags).length} feature flags`);

    if (import.meta.env.DEV) {
      console.log('Current flag states (Ridgeline Outfitters):');
      console.log('  Boolean Flags:', {
        showPromoBanner: flags.showPromoBanner.isEnabled(),
        enableExpressCheckout: flags.enableExpressCheckout.isEnabled(),
        enableRecommendations: flags.enableRecommendations.isEnabled(),
        showLoyaltyProgram: flags.showLoyaltyProgram.isEnabled(),
        enableWishlist: flags.enableWishlist.isEnabled(),
        enableBlackFriday: flags.enableBlackFriday.isEnabled(),
        enableFlashSale: flags.enableFlashSale.isEnabled(),
      });
      console.log('  String Flags:', {
        productDisplayMode: flags.productDisplayMode.getValue(),
        checkoutFlowVariant: flags.checkoutFlowVariant.getValue(),
        promoBannerTheme: flags.promoBannerTheme.getValue(),
      });
      console.log('  Number Flags:', {
        productsPerPage: flags.productsPerPage.getValue(),
        cartCountdownTimer: flags.cartCountdownTimer.getValue(),
        freeShippingThreshold: flags.freeShippingThreshold.getValue(),
      });
    }
  } catch (error) {
    console.error('Failed to initialize CloudBees Feature Flags:', error);
    console.warn('Continuing with default flag values');
  }
}

/**
 * Type-safe flag keys for use throughout the application
 */
export type FlagKey = keyof typeof flags;

/**
 * Get all flag keys as an array
 */
export function getAllFlagKeys(): FlagKey[] {
  return Object.keys(flags) as FlagKey[];
}

/**
 * Get flag type (boolean, string, or number)
 *
 * @param key - Flag key to check
 * @returns Flag type: 'boolean', 'string', or 'number'
 */
export function getFlagType(key: FlagKey): 'boolean' | 'string' | 'number' {
  const flag = flags[key];

  if ('isEnabled' in flag && typeof flag.isEnabled === 'function') {
    return 'boolean';
  }

  if ('getValue' in flag) {
    const value = flag.getValue();
    return typeof value === 'number' ? 'number' : 'string';
  }

  return 'boolean';
}

/**
 * Set Custom Properties from User Object
 *
 * Sets all custom properties based on a user object.
 * Call this when a user logs in or switches profiles.
 *
 * @param user - User object with properties to set
 */
export function setUserProperties(user: User): void {
  Object.entries(user.properties.booleans).forEach(([key, value]) => {
    Rox.setCustomBooleanProperty(key, value);
  });

  Object.entries(user.properties.strings).forEach(([key, value]) => {
    Rox.setCustomStringProperty(key, value);
  });

  Object.entries(user.properties.numbers).forEach(([key, value]) => {
    Rox.setCustomNumberProperty(key, value);
  });

  console.log('User properties set for:', user.name);
  console.log('   Properties:', {
    booleans: user.properties.booleans,
    strings: user.properties.strings,
    numbers: user.properties.numbers,
  });
}
