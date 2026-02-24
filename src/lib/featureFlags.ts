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
import type { RoxSetupOptions } from './types';

/**
 * Feature Flag Definitions
 *
 * These are GENERIC EXAMPLES showing the three types of feature flags.
 * Customize these for your specific use case (retail, fintech, healthcare, etc.)
 */
export const flags = {
  /**
   * EXAMPLE 1: Boolean Flag - Simple On/Off Toggle
   *
   * 📖 USE CASE: Enable/disable entire features or UI elements
   * 💡 PATTERN: if (enabled) { show feature } else { hide feature }
   *
   * REAL-WORLD EXAMPLES:
   * - Toggle promotional banners
   * - Enable beta feature access
   * - Show/hide new UI sections
   * - Control maintenance mode
   * - Enable experimental functionality
   *
   * HOW TO USE:
   * ```typescript
   * const showBanner = useFeatureFlag('showWelcomeBanner');
   * return showBanner ? <Banner /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Set default value (true/false)
   * - Target specific users/groups if needed
   */
  showWelcomeBanner: new Rox.Flag(),

  /**
   * EXAMPLE 2: String Flag - A/B Testing Variants
   *
   * 📖 USE CASE: Test different versions of a feature (A/B/C testing)
   * 💡 PATTERN: switch (variant) { case 'A': ... case 'B': ... }
   *
   * REAL-WORLD EXAMPLES:
   * - Button styles/colors (primary, success, warning)
   * - Layout variations (grid, list, card)
   * - Content variations (short, long, with-image)
   * - Pricing tiers (basic, premium, enterprise)
   * - Checkout flows (standard, express, one-click)
   *
   * HOW TO USE:
   * ```typescript
   * const variant = useFeatureFlagString('buttonVariant');
   * return <Button type={variant}>Click Me</Button>;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Define variants: 'default', 'primary', 'success'
   * - Set percentages for A/B testing (e.g., 33% each)
   * - Target different variants to different audiences
   */
  buttonVariant: new Rox.RoxString('default', ['default', 'primary', 'success']),

  /**
   * EXAMPLE 3: Number Flag - Numeric Configuration
   *
   * 📖 USE CASE: Control numeric values like limits, sizes, intervals
   * 💡 PATTERN: const size = getNumberFlag(); <Component size={size} />
   *
   * REAL-WORLD EXAMPLES:
   * - Page size (5, 10, 20, 50 items)
   * - Refresh intervals (10s, 30s, 60s)
   * - Max items to display
   * - Timeouts and delays
   * - Cache durations
   * - Rate limits
   *
   * HOW TO USE:
   * ```typescript
   * const itemCount = useFeatureFlagNumber('itemsToDisplay');
   * const items = data.slice(0, itemCount);
   * return <List items={items} />;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Define numeric options: 5, 10, 20, 50
   * - Set default value (e.g., 10)
   * - Gradually roll out higher values to test performance
   */
  itemsToDisplay: new Rox.RoxNumber(10, [5, 10, 20, 50]),
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
      console.log('🏴 Current flag states:', {
        showWelcomeBanner: flags.showWelcomeBanner.isEnabled(),
        buttonVariant: flags.buttonVariant.getValue(),
        itemsToDisplay: flags.itemsToDisplay.getValue(),
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
