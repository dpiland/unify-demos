/**
 * CloudBees Feature Flags SDK Integration
 *
 * This module provides a generic foundation for CloudBees Feature Management
 * demonstrations. It includes three example flags (boolean, string, number)
 * that showcase common feature flag patterns.
 *
 * 🎯 CUSTOMIZATION: Replace these generic flags with your use case-specific flags
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

/**
 * Feature Flag Definitions - EliteShop E-commerce
 *
 * This e-commerce application uses 11 feature flags to control various
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
   * 📖 USE CASE: Toggle promotional banner for seasonal sales or marketing campaigns
   * 💡 PATTERN: if (enabled) { show banner } else { hide banner }
   *
   * BUSINESS VALUE:
   * - Launch flash sales instantly without code deploy
   * - Test impact of promotional messaging on conversion
   * - Target campaigns to specific regions or user segments
   *
   * HOW TO USE:
   * ```typescript
   * const showBanner = useFeatureFlag('showPromoBanner');
   * return showBanner ? <PromoBanner /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable for all users during Black Friday
   * - Enable for new users only (isNewUser == true)
   * - Disable for premium customers who converted already
   */
  showPromoBanner: new Rox.Flag(),

  /**
   * 2. Enable Express Checkout
   *
   * 📖 USE CASE: One-click express checkout for premium/loyal customers
   * 💡 PATTERN: Conditional rendering of express checkout button
   *
   * BUSINESS VALUE:
   * - Reduce friction for high-value customers
   * - Test impact on conversion rate and cart abandonment
   * - Reward loyalty with premium experience
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
   * 📖 USE CASE: Show AI-powered personalized product suggestions
   * 💡 PATTERN: Conditional rendering of recommendations carousel
   *
   * BUSINESS VALUE:
   * - Increase average order value (AOV)
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
   * - Disable for new users (focus on browse experience)
   */
  enableRecommendations: new Rox.Flag(),

  /**
   * 4. Show Loyalty Program
   *
   * 📖 USE CASE: Display loyalty points, rewards, and tier status
   * 💡 PATTERN: Conditional rendering of loyalty card component
   *
   * BUSINESS VALUE:
   * - Soft launch to premium members before full rollout
   * - Increase customer retention and repeat purchases
   * - Test loyalty program mechanics with select cohorts
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
   * - Enable for beta testers first (isBetaTester == true)
   */
  showLoyaltyProgram: new Rox.Flag(),

  /**
   * 5. Enable Wishlist Feature
   *
   * 📖 USE CASE: Allow users to save products to wishlist/favorites
   * 💡 PATTERN: Conditional rendering of wishlist heart icon
   *
   * BUSINESS VALUE:
   * - Beta test feature before general availability
   * - Increase user engagement and return visits
   * - Test impact on conversion (wishlist → purchase)
   *
   * HOW TO USE:
   * ```typescript
   * const hasWishlist = useFeatureFlag('enableWishlist');
   * return hasWishlist ? <WishlistButton /> : null;
   * ```
   *
   * TARGETING EXAMPLES:
   * - Enable for isBetaTester == true (beta test)
   * - Enable for region == "us-west" then expand
   * - Enable for users with accountAge > 6 months
   */
  enableWishlist: new Rox.Flag(),

  // =================================================================
  // STRING FLAGS (3) - A/B Test Variants
  // =================================================================

  /**
   * 6. Product Display Mode
   *
   * 📖 USE CASE: A/B test different product layout styles
   * 💡 PATTERN: switch (mode) { case 'grid': ... case 'list': ... }
   *
   * BUSINESS VALUE:
   * - Test which layout drives more engagement and clicks
   * - Optimize for different device types (mobile vs desktop)
   * - Personalize based on user preference/behavior
   *
   * VARIANTS:
   * - 'grid': Cards in responsive grid (default, visual)
   * - 'list': Row-based list view (detailed, scannable)
   * - 'compact': Dense grid with smaller cards (more products visible)
   *
   * HOW TO USE:
   * ```typescript
   * const displayMode = useFeatureFlagString('productDisplayMode');
   * <ProductGrid displayMode={displayMode} />
   * ```
   *
   * TARGETING EXAMPLES:
   * - Split traffic: 33% grid, 33% list, 33% compact
   * - Mobile users get 'compact', desktop gets 'grid'
   * - Premium users get 'grid' (larger images)
   */
  productDisplayMode: new Rox.RoxString('grid', ['grid', 'list', 'compact']),

  /**
   * 7. Checkout Flow Variant
   *
   * 📖 USE CASE: Test different checkout user experiences
   * 💡 PATTERN: Conditional rendering based on variant string
   *
   * BUSINESS VALUE:
   * - Optimize checkout conversion rate
   * - Test multi-step vs single-page checkout
   * - Personalize flow based on user tier
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
   *
   * TARGETING EXAMPLES:
   * - Premium users get 'express' flow
   * - New users get 'single-page' (simpler)
   * - A/B test 'standard' vs 'single-page' for conversion
   */
  checkoutFlowVariant: new Rox.RoxString('standard', ['standard', 'express', 'single-page']),

  /**
   * 8. Promotional Banner Theme
   *
   * 📖 USE CASE: A/B test different banner color schemes
   * 💡 PATTERN: Apply different styling based on theme string
   *
   * BUSINESS VALUE:
   * - Test which color scheme gets more clicks
   * - Optimize promotional banner effectiveness
   * - Match seasonal themes (red for holidays, etc.)
   *
   * VARIANTS:
   * - 'blue': Professional blue (default, trust)
   * - 'red': Urgent red (urgency, sales)
   * - 'gradient': Modern gradient (eye-catching, premium)
   *
   * HOW TO USE:
   * ```typescript
   * const theme = useFeatureFlagString('promoBannerTheme');
   * <PromoBanner theme={theme} />
   * ```
   *
   * TARGETING EXAMPLES:
   * - Split traffic evenly across all 3 themes
   * - Use 'red' during flash sales for urgency
   * - Use 'gradient' for premium customers
   */
  promoBannerTheme: new Rox.RoxString('blue', ['blue', 'red', 'gradient']),

  // =================================================================
  // NUMBER FLAGS (3) - Numeric Configuration
  // =================================================================

  /**
   * 9. Products Per Page
   *
   * 📖 USE CASE: Control pagination size for product listings
   * 💡 PATTERN: Slice products array based on flag value
   *
   * BUSINESS VALUE:
   * - Test optimal page size for user experience
   * - Balance performance vs. content visibility
   * - Personalize based on user tier or device
   *
   * OPTIONS: [12, 24, 36, 48]
   *
   * HOW TO USE:
   * ```typescript
   * const pageSize = useFeatureFlagNumber('productsPerPage');
   * const displayedProducts = products.slice(0, pageSize);
   * ```
   *
   * TARGETING EXAMPLES:
   * - Premium users see 48 products (more choices)
   * - Standard users see 24 products (balanced)
   * - Mobile users see 12 products (faster load)
   */
  productsPerPage: new Rox.RoxNumber(24, [12, 24, 36, 48]),

  /**
   * 10. Cart Countdown Timer
   *
   * 📖 USE CASE: Abandoned cart urgency timer in minutes
   * 💡 PATTERN: Display countdown with configurable duration
   *
   * BUSINESS VALUE:
   * - Create urgency to reduce cart abandonment
   * - Test optimal timer duration for conversion
   * - Personalize pressure based on user tier
   *
   * OPTIONS: [5, 10, 15, 30] minutes
   *
   * HOW TO USE:
   * ```typescript
   * const timerMinutes = useFeatureFlagNumber('cartCountdownTimer');
   * <CartTimer minutes={timerMinutes} />
   * ```
   *
   * TARGETING EXAMPLES:
   * - New users: 10 minutes (more urgency)
   * - Premium users: 30 minutes (less pressure)
   * - A/B test 15 vs 30 minutes for optimal conversion
   */
  cartCountdownTimer: new Rox.RoxNumber(15, [5, 10, 15, 30]),

  /**
   * 11. Free Shipping Threshold
   *
   * 📖 USE CASE: Minimum order value for free shipping (in dollars)
   * 💡 PATTERN: Calculate shipping based on threshold
   *
   * BUSINESS VALUE:
   * - Increase average order value (AOV)
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
   *
   * TARGETING EXAMPLES:
   * - New users: $35 threshold (encourage first purchase)
   * - Standard users: $50 threshold (default)
   * - Test $50 vs $75 for AOV impact
   */
  freeShippingThreshold: new Rox.RoxNumber(50, [35, 50, 75, 100]),
};

/**
 * Initialize CloudBees Feature Flags SDK
 *
 * ⚙️ SETUP INSTRUCTIONS:
 * 1. Get your SDK key from CloudBees Unify:
 *    - Go to Feature Management → Installation
 *    - Copy the SDK key for your environment
 * 2. Create .env.local file (copy from .env.example)
 * 3. Add: VITE_CLOUDBEES_SDK_KEY=your_actual_key
 * 4. Restart dev server
 *
 * This function:
 * - Retrieves SDK key from environment
 * - Registers all flag definitions with Rox
 * - Connects to CloudBees Feature Management
 * - Enables real-time flag updates (no page refresh needed!)
 *
 * @param options - Optional Rox setup configuration
 * @returns Promise that resolves when SDK is initialized
 */
export async function initializeFeatureFlags(options: RoxSetupOptions = {}): Promise<void> {
  const sdkKey = import.meta.env.VITE_CLOUDBEES_SDK_KEY;

  // Validate SDK key
  if (!sdkKey || sdkKey === 'your_sdk_key_here') {
    console.warn(
      '⚠️  CloudBees SDK key not configured. Feature flags will use default values.\n' +
      'To connect to CloudBees Feature Management:\n' +
      '1. Copy .env.example to .env.local\n' +
      '2. Get your SDK key from CloudBees Unify (Feature Management → Installation)\n' +
      '3. Add the key to .env.local as VITE_CLOUDBEES_SDK_KEY\n' +
      '4. Restart the dev server'
    );
    return;
  }

  try {
    // Register all flags with Rox SDK
    // Empty string means default namespace (recommended for simplicity)
    Rox.register('', flags);

    console.log('🚀 Initializing CloudBees Feature Flags...');

    // Connect to CloudBees and fetch flag configurations
    await Rox.setup(sdkKey, {
      // Only enable development mode in local dev (adds extra logging)
      developmentOnly: import.meta.env.DEV,
      ...options,
    });

    console.log('✅ CloudBees Feature Flags initialized successfully');
    console.log(`📊 Registered ${Object.keys(flags).length} feature flags`);

    // Log current flag states in development (helpful for debugging)
    if (import.meta.env.DEV) {
      console.log('🏴 Current flag states (EliteShop):');
      console.log('  Boolean Flags:', {
        showPromoBanner: flags.showPromoBanner.isEnabled(),
        enableExpressCheckout: flags.enableExpressCheckout.isEnabled(),
        enableRecommendations: flags.enableRecommendations.isEnabled(),
        showLoyaltyProgram: flags.showLoyaltyProgram.isEnabled(),
        enableWishlist: flags.enableWishlist.isEnabled(),
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
    console.error('❌ Failed to initialize CloudBees Feature Flags:', error);
    console.warn('⚠️  Continuing with default flag values');
  }
}

/**
 * Type-safe flag keys for use throughout the application
 *
 * This ensures you can't reference flags that don't exist
 * TypeScript will autocomplete available flag names
 */
export type FlagKey = keyof typeof flags;

/**
 * Get all flag keys as an array
 *
 * Useful for building flag management UIs or debugging
 */
export function getAllFlagKeys(): FlagKey[] {
  return Object.keys(flags) as FlagKey[];
}

/**
 * Get flag type (boolean, string, or number)
 *
 * Useful for building dynamic flag management UIs
 *
 * @param key - Flag key to check
 * @returns Flag type: 'boolean', 'string', or 'number'
 */
export function getFlagType(key: FlagKey): 'boolean' | 'string' | 'number' {
  const flag = flags[key];

  // Boolean flags have isEnabled() method
  if ('isEnabled' in flag && typeof flag.isEnabled === 'function') {
    return 'boolean';
  }

  // String and Number flags have getValue()
  if ('getValue' in flag) {
    const value = flag.getValue();
    return typeof value === 'number' ? 'number' : 'string';
  }

  return 'boolean';
}

/**
 * Set Custom Properties from User Object
 *
 * This function sets all custom properties based on a user object.
 * Call this when a user logs in or switches profiles.
 *
 * @param user - User object with properties to set
 *
 * EXAMPLE:
 * ```typescript
 * const user = loadCurrentUser();
 * if (user) {
 *   setUserProperties(user);
 * }
 * ```
 */
export function setUserProperties(user: User): void {
  // Set boolean properties
  Object.entries(user.properties.booleans).forEach(([key, value]) => {
    Rox.setCustomBooleanProperty(key, value);
  });

  // Set string properties
  Object.entries(user.properties.strings).forEach(([key, value]) => {
    Rox.setCustomStringProperty(key, value);
  });

  // Set number properties
  Object.entries(user.properties.numbers).forEach(([key, value]) => {
    Rox.setCustomNumberProperty(key, value);
  });

  console.log('🔧 User properties set for:', user.name);
  console.log('   Properties:', {
    booleans: user.properties.booleans,
    strings: user.properties.strings,
    numbers: user.properties.numbers,
  });
}
