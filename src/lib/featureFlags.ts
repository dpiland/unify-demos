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
 * Feature Flag Definitions — NovaCRM SaaS Dashboard
 *
 * These flags control key features of the SaaS platform dashboard.
 * Each flag demonstrates a different feature-flag pattern used in real
 * software-provider applications.
 */
export const flags = {
  /**
   * Boolean Flag — AI Insights Panel Toggle
   *
   * Controls visibility of the AI-powered insights section on the dashboard.
   * This section shows churn prediction scores, upsell recommendations,
   * and usage trend analysis.
   *
   * USE CASE: Progressive rollout of a new AI-driven feature to gauge
   * adoption and performance before enabling for all customers.
   *
   * TARGETING EXAMPLES:
   * - Enable for enterprise-tier customers first
   * - Enable for accounts with > 12 months tenure
   * - A/B test impact on support ticket volume
   *
   * HOW TO USE:
   * ```typescript
   * const showAI = useFeatureFlag('showAIInsights');
   * return showAI ? <AIInsightsPanel /> : null;
   * ```
   */
  showAIInsights: new Rox.Flag(),

  /**
   * Boolean Flag — Enterprise Dashboard Gate
   *
   * Gates access to enterprise-tier analytics features including
   * cohort analysis, customer lifetime value projections,
   * advanced segmentation, and exportable reports.
   *
   * USE CASE: Feature gating based on subscription tier. Enterprise
   * customers see full analytics; starter/trial customers see an
   * upgrade prompt.
   *
   * TARGETING EXAMPLES:
   * - Enable for subscriptionTier == "enterprise"
   * - Enable for isPremiumCustomer == true
   * - Enable for accountMRR > 5000
   *
   * HOW TO USE:
   * ```typescript
   * const hasEnterprise = useFeatureFlag('enableEnterpriseDashboard');
   * return <EnterpriseDashboardCard isEnabled={hasEnterprise} />;
   * ```
   */
  enableEnterpriseDashboard: new Rox.Flag(),

  /**
   * Number Flag — Recent Events Display Limit
   *
   * Controls how many subscription events (signups, upgrades,
   * cancellations) are displayed in the activity feed table.
   *
   * USE CASE: Performance tuning and UX optimization. Show fewer items
   * on slower connections or for users who prefer a compact view.
   *
   * TARGETING EXAMPLES:
   * - Show 5 for trial users (compact onboarding view)
   * - Show 10 default for most users
   * - Show 25 for power users / admins
   * - Show 50 for enterprise accounts needing full audit trail
   *
   * HOW TO USE:
   * ```typescript
   * const count = useFeatureFlagNumber('recentEventsToShow');
   * const events = allEvents.slice(0, count);
   * ```
   */
  recentEventsToShow: new Rox.RoxNumber(10, [5, 10, 25, 50]),
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
        showAIInsights: flags.showAIInsights.isEnabled(),
        enableEnterpriseDashboard: flags.enableEnterpriseDashboard.isEnabled(),
        recentEventsToShow: flags.recentEventsToShow.getValue(),
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
