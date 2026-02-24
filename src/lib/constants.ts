/**
 * Feature Flag Constants and Metadata
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
  SHOW_WELCOME_BANNER: 'showWelcomeBanner',
  BUTTON_VARIANT: 'buttonVariant',
  ITEMS_TO_DISPLAY: 'itemsToDisplay',
} as const;

/**
 * Flag Descriptions
 *
 * Human-readable descriptions shown in UIs and documentation
 * These explain what each flag does and when to use it
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  showWelcomeBanner:
    'Toggle the welcome banner on/off. Example of boolean flag for showing/hiding UI elements.',
  buttonVariant:
    'A/B test different button styles (default, primary, success). Example of string flag for testing variants.',
  itemsToDisplay:
    'Control how many items to show in the list (5, 10, 20, 50). Example of number flag for configuring numeric values.',
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
  showWelcomeBanner: false,

  // String flags - first variant is default
  buttonVariant: 'default',

  // Number flags - middle value is safe default
  itemsToDisplay: 10,
};
