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
  // Boolean flags
  ENABLE_SEAT_SELECTION: 'enableSeatSelection',
  ENABLE_LOUNGE_ACCESS: 'enableLoungeAccess',
  ENABLE_PRIORITY_BOARDING: 'enablePriorityBoarding',
  SHOW_FLIGHT_ALERTS: 'showFlightAlerts',
  ENABLE_MOBILE_CHECKIN: 'enableMobileCheckin',
  SHOW_CREDIT_CARD_PROMO: 'showCreditCardPromo',
  ENABLE_ST_PATRICKS_DAY: 'enableStPatricksDay',
  ENABLE_MEMORIAL_DAY: 'enableMemorialDay',

  // String flags
  DASHBOARD_LAYOUT: 'dashboardLayout',
  FLIGHT_DISPLAY_MODE: 'flightDisplayMode',
  UPGRADE_PROMPT_STYLE: 'upgradePromptStyle',

  // Number flags
  RECENT_BOOKINGS_TO_SHOW: 'recentBookingsToShow',
  FLIGHT_STATUS_REFRESH_INTERVAL: 'flightStatusRefreshInterval',
  LOYALTY_POINTS_MULTIPLIER: 'loyaltyPointsMultiplier',
} as const;

/**
 * Flag Descriptions - HiveAir Airlines Passenger Portal
 *
 * Human-readable descriptions shown in UIs and documentation
 * These explain the business purpose of each flag in the HiveAir Airlines context
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Boolean Flags
  enableSeatSelection:
    'Enable interactive HiveAir seat selection with visual seat map. Allows passengers to choose their preferred seats with real-time availability across Main Cabin, Comfort+, and First Class.',

  enableLoungeAccess:
    'Show HiveAir HiveAir Lounge access and amenities for eligible passengers. Displays HiveAir Lounge locations, hours, and benefits for BeeMiles members, First Class passengers, and HiveAir Lounge members.',

  enablePriorityBoarding:
    'Display HiveAir Priority services and boarding groups. Shows priority lanes, expedited security, and boarding zones for BeeMiles members and premium cabin passengers.',

  showFlightAlerts:
    'Toggle real-time HiveAir flight status alerts and notifications. Displays gate changes, delays, boarding calls, and important travel updates for HiveAir flights.',

  enableMobileCheckin:
    'Enable HiveAir mobile check-in and digital boarding pass features. Allows passengers to check in through the FlyHiveAir app and receive mobile boarding passes.',

  showCreditCardPromo:
    'Controls credit card promotional content. Non-cardholders see sign-up benefits (20% off award travel). Existing cardholders see referral bonus offer (earn 100k BeeMiles). Uses hasCreditCard property for targeting.',

  enableStPatricksDay:
    'Festive St. Patrick\'s Day site-wide theme. Replaces brand colors with green, adds shamrock decorations and a themed banner. Enable on/around March 17th for a fun seasonal experience.',

  enableMemorialDay:
    'Patriotic Memorial Day site-wide theme. Replaces brand colors with red/white/blue, adds star decorations and a promotional banner offering 50% off for service members and their families. Enable on/around Memorial Day weekend.',

  // String Flags
  dashboardLayout:
    'A/B test My Trips dashboard layout variants: classic (traditional sidebar), modern (card-based responsive), or compact (dense for BeeMiles members). Tests which layout drives better engagement.',

  flightDisplayMode:
    'Control HiveAir flight display format: timeline (visual journey), card (detailed individual cards), or list (compact information). Tests optimal presentation for different traveler types.',

  upgradePromptStyle:
    'Test HiveAir Comfort+ and First Class upgrade offer presentation: subtle (small banner), prominent (large benefits card), or modal (full-screen comparison with BeeMiles cost). Optimizes cabin upgrade conversion rates.',

  // Number Flags
  recentBookingsToShow:
    'Number of upcoming HiveAir flights to display (2-8). Controls information density - fewer for leisure travelers, more for BeeMiles members with multiple bookings.',

  flightStatusRefreshInterval:
    'HiveAir flight status update frequency in seconds (30-300). Balances real-time accuracy with API load and device battery usage.',

  loyaltyPointsMultiplier:
    'Bonus BeeMiles multiplier for promotions (1x-3x). Enables special campaigns like double BeeMiles weekends, triple miles for new routes, or BeeMiles bonus accelerators.',
};

/**
 * Default Flag Values - Airline Configuration
 *
 * Fallback values used when:
 * - CloudBees SDK is not configured
 * - Network connection fails
 * - Flag is not defined in CloudBees Unify
 *
 * These ensure the app always has valid values to work with
 */
export const DEFAULT_FLAG_VALUES = {
  // Boolean flags - Conservative defaults (features disabled until tested)
  enableSeatSelection: false,      // Rollout gradually
  enableLoungeAccess: false,       // Enable only for eligible passengers
  enablePriorityBoarding: false,   // Enable for premium passengers
  showFlightAlerts: true,          // Important for all passengers
  enableMobileCheckin: true,       // Mobile-first strategy
  showCreditCardPromo: true,       // Show promo to everyone by default
  enableStPatricksDay: false,      // Enable only on March 17th
  enableMemorialDay: false,        // Enable only on Memorial Day weekend

  // String flags - Best practice defaults
  dashboardLayout: 'modern',           // Modern card-based design
  flightDisplayMode: 'timeline',       // Visual and intuitive
  upgradePromptStyle: 'prominent',     // Clear value proposition

  // Number flags - Balanced defaults
  recentBookingsToShow: 3,                    // Clean without overwhelming
  flightStatusRefreshInterval: 60,            // 1 minute (balanced)
  loyaltyPointsMultiplier: 1,                 // No promotion by default
};
