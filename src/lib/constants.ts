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
 * Flag Descriptions - Airline Passenger Portal
 *
 * Human-readable descriptions shown in UIs and documentation
 * These explain the business purpose of each flag in the airline context
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Boolean Flags
  enableSeatSelection:
    'Enable interactive seat selection with visual seat map. Allows passengers to choose their preferred seats with real-time availability.',

  enableLoungeAccess:
    'Show airport lounge access and amenities for eligible passengers. Displays lounge locations, hours, and benefits for business class and elite members.',

  enablePriorityBoarding:
    'Display priority boarding and fast-track security services. Shows boarding groups, priority lanes, and expedited services for premium passengers.',

  showFlightAlerts:
    'Toggle real-time flight status alerts and notifications. Displays gate changes, delays, boarding calls, and important travel updates.',

  enableMobileCheckin:
    'Enable mobile check-in and digital boarding pass features. Allows passengers to check in online and receive mobile boarding passes.',

  // String Flags
  dashboardLayout:
    'A/B test dashboard layout variants: classic (traditional sidebar), modern (card-based responsive), or compact (dense for power users). Tests which layout drives better engagement.',

  flightDisplayMode:
    'Control flight display format: timeline (visual journey), card (detailed individual cards), or list (compact information). Tests optimal presentation for different traveler types.',

  upgradePromptStyle:
    'Test upgrade offer presentation: subtle (small banner), prominent (large benefits card), or modal (full-screen comparison). Optimizes cabin upgrade conversion rates.',

  // Number Flags
  recentBookingsToShow:
    'Number of recent flight bookings to display (2-8). Controls information density - fewer for casual travelers, more for frequent flyers.',

  flightStatusRefreshInterval:
    'Flight status update frequency in seconds (30-300). Balances real-time accuracy with API load and device battery usage.',

  loyaltyPointsMultiplier:
    'Bonus loyalty points multiplier for promotions (1x-3x). Enables special campaigns like double points weekends or triple points for new routes.',
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

  // String flags - Best practice defaults
  dashboardLayout: 'modern',           // Modern card-based design
  flightDisplayMode: 'timeline',       // Visual and intuitive
  upgradePromptStyle: 'prominent',     // Clear value proposition

  // Number flags - Balanced defaults
  recentBookingsToShow: 3,                    // Clean without overwhelming
  flightStatusRefreshInterval: 60,            // 1 minute (balanced)
  loyaltyPointsMultiplier: 1,                 // No promotion by default
};
