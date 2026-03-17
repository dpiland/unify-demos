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
 * Feature Flag Definitions - Horizon Bank
 *
 * These flags control key banking features and allow real-time configuration
 * via CloudBees Feature Management.
 */
export const flags = {
  /**
   * Boolean Flag - Enable Instant Transfers
   *
   * PATTERN: Conditional rendering + button styling
   * USE CASE: Roll out instant transfer capability to eligible customers.
   * When enabled, the "Transfer Money" button becomes "Instant Transfer"
   * with a lightning icon and success styling.
   * When disabled, standard 1-3 business day transfers are shown.
   *
   * TARGETING EXAMPLE:
   *   Enable IF isPremiumCustomer == true AND accountBalance > 10000
   */
  enableInstantTransfers: new Rox.Flag(),

  /**
   * Boolean Flag - Show Investment Portfolio
   *
   * PATTERN: Conditional rendering of entire section
   * USE CASE: Show or hide the investment portfolio section.
   * Useful for progressive rollout to premium customers or
   * enabling investment features by region.
   *
   * TARGETING EXAMPLE:
   *   Show IF hasInvestmentAccount == true OR userTier == "premier"
   */
  showInvestmentPortfolio: new Rox.Flag(),

  /**
   * String Flag - Dashboard Layout Variant
   *
   * PATTERN: Layout switching based on flag value
   * USE CASE: A/B test different dashboard arrangements.
   * - 'classic': Traditional 4-column stats, full-width sections
   * - 'modern': Larger account overview card with 2x2 stats grid
   * - 'compact': Tight single-column layout with condensed cards
   *
   * TARGETING EXAMPLE:
   *   Set "modern" for 50% of new users, "classic" for existing users
   */
  dashboardLayout: new Rox.RoxString('classic', ['classic', 'modern', 'compact']),

  /**
   * Number Flag - Recent Transactions to Show
   *
   * PATTERN: Data slicing based on numeric value
   * USE CASE: Control how many transactions appear on the dashboard.
   * Lower values improve load time, higher values reduce pagination needs.
   *
   * TARGETING EXAMPLE:
   *   Show 50 for premier customers, 10 for standard, 5 for new users
   */
  recentTransactionsToShow: new Rox.RoxNumber(10, [5, 10, 25, 50]),

  /**
   * Boolean Flag - Show Fraud Alerts
   *
   * PATTERN: Conditional rendering of alert banner
   * USE CASE: Display a fraud detection alert on the Account Summary
   * with a suspicious transaction and "Was this you?" prompt.
   * Toggle on during a demo for immediate visual impact.
   *
   * TARGETING EXAMPLE:
   *   Show IF accountBalance > 10000 (high-value accounts get monitoring)
   */
  showFraudAlerts: new Rox.Flag(),

  /**
   * String Flag - Promotional Banner Campaign
   *
   * PATTERN: Content switching based on flag value
   * USE CASE: Display different marketing campaigns across the top of pages.
   * Marketing teams can target offers to segments without code changes.
   * - 'none': No banner shown
   * - 'mortgage-refi': Mortgage refinance promotion
   * - 'travel-rewards': Travel rewards credit card promo
   * - 'savings-bonus': High-yield savings account promo
   *
   * TARGETING EXAMPLE:
   *   Show "mortgage-refi" IF accountType == "mortgage"
   *   Show "savings-bonus" IF isNewUser == true
   */
  promotionalBanner: new Rox.RoxString('none', ['none', 'mortgage-refi', 'travel-rewards', 'savings-bonus']),

  /**
   * Boolean Flag - Enable Chat Support
   *
   * PATTERN: Conditional rendering of floating UI element
   * USE CASE: Show/hide a floating chat support widget.
   * Roll out to premium customers first, then expand.
   * Visually dramatic in demos - widget appears/disappears live.
   *
   * TARGETING EXAMPLE:
   *   Enable IF isPremiumCustomer == true OR userTier == "premier"
   */
  enableChatSupport: new Rox.Flag(),
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
      console.log('Current flag states:', {
        enableInstantTransfers: flags.enableInstantTransfers.isEnabled(),
        showInvestmentPortfolio: flags.showInvestmentPortfolio.isEnabled(),
        dashboardLayout: flags.dashboardLayout.getValue(),
        recentTransactionsToShow: flags.recentTransactionsToShow.getValue(),
        showFraudAlerts: flags.showFraudAlerts.isEnabled(),
        promotionalBanner: flags.promotionalBanner.getValue(),
        enableChatSupport: flags.enableChatSupport.isEnabled(),
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
