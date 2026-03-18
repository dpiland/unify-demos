/**
 * CloudBees Feature Flags SDK Integration
 *
 * This module defines the feature flags for the CloudBees Unify
 * DevSecOps control plane demo. Flags control which platform modules
 * are available and what plan tier the user is on.
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
 * Feature Flag Definitions — CloudBees Unify Control Plane
 *
 * Four boolean flags gate platform modules. One string flag controls
 * the plan tier for support/SLA display.
 */
export const flags = {
  /**
   * Boolean Flag — Feature Management Module
   *
   * Controls access to the Feature Management section: feature flags,
   * experiments, rollouts, and targeting rules.
   *
   * TARGETING EXAMPLES:
   * - Enable for planTier == "team" or "enterprise"
   * - Enable for isPremiumCustomer == true
   *
   * When OFF: shows a marketing preview page with upgrade CTA
   */
  enableFeatureManagement: new Rox.Flag(),

  /**
   * Boolean Flag — Applications Module
   *
   * Controls access to the Applications section: application registry,
   * deployment tracking, environment management.
   *
   * TARGETING EXAMPLES:
   * - Enable for planTier == "team" or "enterprise"
   * - Enable for pipelinesCount > 10
   *
   * When OFF: shows a marketing preview page with upgrade CTA
   */
  enableApplications: new Rox.Flag(),

  /**
   * Boolean Flag — Smart Tests Module
   *
   * Controls access to the Smart Tests section: test intelligence,
   * test selection optimization, flaky test detection.
   *
   * TARGETING EXAMPLES:
   * - Enable for planTier == "enterprise" only
   * - Enable for isBetaTester == true
   *
   * When OFF: shows a marketing preview page with upgrade CTA
   */
  enableSmartTests: new Rox.Flag(),

  /**
   * Boolean Flag — Security Module
   *
   * Controls access to the Security section: SAST/DAST scanning,
   * vulnerability dashboard, compliance reports.
   *
   * TARGETING EXAMPLES:
   * - Enable for planTier == "enterprise" only
   * - Enable for orgSize == "enterprise"
   *
   * When OFF: shows a marketing preview page with upgrade CTA
   */
  enableSecurity: new Rox.Flag(),

  /**
   * String Flag — Plan Tier
   *
   * Controls which support options and SLA information are displayed.
   * Demonstrates the string flag pattern for multi-variant configuration.
   *
   * OPTIONS:
   * - "free": Community support, no SLA
   * - "team": Business hours support, 8hr response SLA
   * - "enterprise": 24/7 premium support, 1hr critical SLA
   */
  planTier: new Rox.RoxString('free', ['free', 'team', 'enterprise']),
};

/**
 * Initialize CloudBees Feature Flags SDK
 */
export async function initializeFeatureFlags(options: RoxSetupOptions = {}): Promise<void> {
  const sdkKey = import.meta.env.VITE_CLOUDBEES_SDK_KEY;

  if (!sdkKey || sdkKey === 'your_sdk_key_here') {
    console.warn(
      'CloudBees SDK key not configured. Feature flags will use default values.\n' +
      'To connect to CloudBees Feature Management:\n' +
      '1. Copy .env.example to .env\n' +
      '2. Get your SDK key from CloudBees Unify (Feature Management > Installation)\n' +
      '3. Add the key to .env as VITE_CLOUDBEES_SDK_KEY\n' +
      '4. Restart the dev server'
    );
    return;
  }

  try {
    Rox.register('', flags);

    console.log('Initializing CloudBees Feature Flags...');

    await Rox.setup(sdkKey, {
      developmentOnly: import.meta.env.DEV,
      ...options,
    });

    console.log('CloudBees Feature Flags initialized successfully');
    console.log(`Registered ${Object.keys(flags).length} feature flags`);

    if (import.meta.env.DEV) {
      console.log('Current flag states:', {
        enableFeatureManagement: flags.enableFeatureManagement.isEnabled(),
        enableApplications: flags.enableApplications.isEnabled(),
        enableSmartTests: flags.enableSmartTests.isEnabled(),
        enableSecurity: flags.enableSecurity.isEnabled(),
        planTier: flags.planTier.getValue(),
      });
    }
  } catch (error) {
    console.error('Failed to initialize CloudBees Feature Flags:', error);
    console.warn('Continuing with default flag values');
  }
}

/**
 * Type-safe flag keys
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
 * Sets all custom properties for feature flag targeting.
 * Called when a user logs in or switches profiles.
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
}
