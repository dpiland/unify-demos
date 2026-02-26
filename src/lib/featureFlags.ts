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
 * Feature Flag Definitions - Airline Passenger Portal
 *
 * These flags control features in the airline passenger booking portal.
 * They demonstrate how CloudBees Feature Management enables personalized
 * travel experiences based on passenger tier, booking class, and loyalty status.
 */
export const flags = {
  // ============================================
  // BOOLEAN FLAGS - Feature Toggles
  // ============================================

  /**
   * Enable Seat Selection
   *
   * 📖 USE CASE: Interactive seat map for flight seat selection
   * 💡 PATTERN: Toggle visibility of seat selection interface
   *
   * AIRLINE SCENARIO:
   * - Progressive rollout of new seat selection UI
   * - Test interactive seat maps before general availability
   * - Enable for specific routes or aircraft types
   *
   * HOW TO USE:
   * ```typescript
   * const enableSeatSelection = useFeatureFlag('enableSeatSelection');
   * return enableSeatSelection ? <SeatSelector /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (rollout gradually)
   * - Target rules: Enable for premium members first, then all users
   */
  enableSeatSelection: new Rox.Flag(),

  /**
   * Enable Lounge Access
   *
   * 📖 USE CASE: Airport lounge information and amenities
   * 💡 PATTERN: Show/hide lounge access section based on eligibility
   *
   * AIRLINE SCENARIO:
   * - Display lounge details only to eligible passengers
   * - Combine flag with user property: hasLoungeAccess
   * - Test lounge benefit visibility for upsell opportunities
   *
   * HOW TO USE:
   * ```typescript
   * const enableLoungeAccess = useFeatureFlag('enableLoungeAccess');
   * const hasAccess = user.properties.booleans.hasLoungeAccess;
   * return (enableLoungeAccess && hasAccess) ? <LoungeAccessCard /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false
   * - Target rule: hasLoungeAccess == true (business, elite, staff)
   */
  enableLoungeAccess: new Rox.Flag(),

  /**
   * Enable Priority Boarding
   *
   * 📖 USE CASE: Priority services including boarding, security, baggage
   * 💡 PATTERN: Display premium service benefits for eligible passengers
   *
   * AIRLINE SCENARIO:
   * - Show priority boarding groups and fast-track security
   * - Test visibility of premium services for conversion
   * - Enable for business class and elite frequent flyers
   *
   * HOW TO USE:
   * ```typescript
   * const enablePriorityBoarding = useFeatureFlag('enablePriorityBoarding');
   * const hasPriority = user.properties.booleans.hasPriorityBoarding;
   * return (enablePriorityBoarding && hasPriority) ? <PriorityServicesCard /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false
   * - Target rule: hasPriorityBoarding == true (business class, elite status)
   */
  enablePriorityBoarding: new Rox.Flag(),

  /**
   * Show Flight Alerts
   *
   * 📖 USE CASE: Real-time flight status notifications and updates
   * 💡 PATTERN: Toggle notification banner visibility
   *
   * AIRLINE SCENARIO:
   * - Display gate changes, delays, boarding announcements
   * - Test different notification styles
   * - Disable during off-peak hours to reduce noise
   *
   * HOW TO USE:
   * ```typescript
   * const showFlightAlerts = useFeatureFlag('showFlightAlerts');
   * return showFlightAlerts ? <Alert message="Flight Update" /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: true (important for all passengers)
   * - Can disable temporarily for system maintenance
   */
  showFlightAlerts: new Rox.Flag(),

  /**
   * Enable Mobile Check-in
   *
   * 📖 USE CASE: Mobile check-in and digital boarding pass features
   * 💡 PATTERN: Toggle mobile-first check-in capabilities
   *
   * AIRLINE SCENARIO:
   * - Gradual rollout of mobile check-in features
   * - Test digital boarding pass adoption
   * - Enable for specific routes or flight types
   *
   * HOW TO USE:
   * ```typescript
   * const enableMobileCheckin = useFeatureFlag('enableMobileCheckin');
   * return enableMobileCheckin ? <MobileCheckinCard /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: true (mobile-first strategy)
   * - Can target by device type or user preferences
   */
  enableMobileCheckin: new Rox.Flag(),

  // ============================================
  // STRING FLAGS - A/B Testing & Variants
  // ============================================

  /**
   * Dashboard Layout
   *
   * 📖 USE CASE: Test different dashboard layout variants
   * 💡 PATTERN: Switch between layout styles for UX optimization
   *
   * VARIANTS:
   * - 'classic': Traditional airline layout with sidebar navigation
   * - 'modern': Card-based responsive design (default, recommended)
   * - 'compact': Dense information display for power users
   *
   * AIRLINE SCENARIO:
   * - A/B test which layout drives more bookings
   * - Modern layout optimized for mobile, classic for desktop
   * - Compact layout for frequent flyers who want efficiency
   *
   * HOW TO USE:
   * ```typescript
   * const layout = useFeatureFlagString('dashboardLayout');
   * switch (layout) {
   *   case 'classic': return <ClassicLayout />;
   *   case 'modern': return <ModernLayout />;
   *   case 'compact': return <CompactLayout />;
   * }
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'classic', 'modern', 'compact'
   * - Default: 'modern'
   * - A/B test: 33% each or 50% modern, 25% classic, 25% compact
   */
  dashboardLayout: new Rox.RoxString('modern', ['classic', 'modern', 'compact']),

  /**
   * Flight Display Mode
   *
   * 📖 USE CASE: Control how upcoming flights are displayed
   * 💡 PATTERN: Test different visualization styles for flight information
   *
   * VARIANTS:
   * - 'timeline': Visual timeline with departure/arrival markers (default)
   * - 'card': Individual flight cards with detailed info
   * - 'list': Compact list view with maximum information density
   *
   * AIRLINE SCENARIO:
   * - Test which display mode improves engagement
   * - Timeline is visual and intuitive for casual travelers
   * - List view preferred by business travelers for efficiency
   * - Card view balances detail and visual appeal
   *
   * HOW TO USE:
   * ```typescript
   * const displayMode = useFeatureFlagString('flightDisplayMode');
   * {displayMode === 'timeline' && <FlightTimeline />}
   * {displayMode === 'card' && <FlightCards />}
   * {displayMode === 'list' && <FlightList />}
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'timeline', 'card', 'list'
   * - Default: 'timeline'
   * - Target rules: 'list' for isPremiumMember == true
   */
  flightDisplayMode: new Rox.RoxString('timeline', ['timeline', 'card', 'list']),

  /**
   * Upgrade Prompt Style
   *
   * 📖 USE CASE: A/B test different upgrade offer presentation styles
   * 💡 PATTERN: Optimize conversion rates for cabin upgrades
   *
   * VARIANTS:
   * - 'subtle': Small banner at bottom of flight card
   * - 'prominent': Large card with benefits highlighted (default)
   * - 'modal': Full-screen modal with interactive comparison
   *
   * AIRLINE SCENARIO:
   * - Test which presentation style drives more upgrade purchases
   * - Subtle for low-pressure approach
   * - Prominent for clear value proposition
   * - Modal for detailed comparison (highest conversion potential)
   *
   * HOW TO USE:
   * ```typescript
   * const upgradeStyle = useFeatureFlagString('upgradePromptStyle');
   * return <UpgradeOfferCard style={upgradeStyle} />;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'subtle', 'prominent', 'modal'
   * - Default: 'prominent'
   * - A/B test: 50% prominent vs 50% modal (exclude business class)
   * - Target rule: isBusinessClass == false
   */
  upgradePromptStyle: new Rox.RoxString('prominent', ['subtle', 'prominent', 'modal']),

  // ============================================
  // NUMBER FLAGS - Numeric Configuration
  // ============================================

  /**
   * Recent Bookings to Show
   *
   * 📖 USE CASE: Control how many flight bookings to display
   * 💡 PATTERN: Balance information density vs. page performance
   *
   * OPTIONS: 2, 3, 5, 8 bookings
   *
   * AIRLINE SCENARIO:
   * - Show 2-3 for casual travelers (cleaner interface)
   * - Show 5-8 for business travelers (need to see more trips)
   * - Test optimal number for engagement without overwhelming
   *
   * HOW TO USE:
   * ```typescript
   * const bookingCount = useFeatureFlagNumber('recentBookingsToShow');
   * const visibleFlights = allFlights.slice(0, bookingCount);
   * return <FlightList flights={visibleFlights} />;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 2, 3, 5, 8
   * - Default: 3
   * - Target rules: 5 for isPremiumMember == true, 2 for isNewUser == true
   */
  recentBookingsToShow: new Rox.RoxNumber(3, [2, 3, 5, 8]),

  /**
   * Flight Status Refresh Interval
   *
   * 📖 USE CASE: Flight status update frequency in seconds
   * 💡 PATTERN: Balance real-time accuracy vs. API load and battery usage
   *
   * OPTIONS: 30, 60, 120, 300 seconds (0.5min, 1min, 2min, 5min)
   *
   * AIRLINE SCENARIO:
   * - 30s for active travelers near departure time
   * - 60s for general use (balanced)
   * - 120s+ for longer wait times or battery saving
   *
   * HOW TO USE:
   * ```typescript
   * const refreshInterval = useFeatureFlagNumber('flightStatusRefreshInterval');
   * useEffect(() => {
   *   const timer = setInterval(() => fetchFlightStatus(), refreshInterval * 1000);
   *   return () => clearInterval(timer);
   * }, [refreshInterval]);
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 30, 60, 120, 300
   * - Default: 60 (1 minute)
   * - Can increase interval during off-peak hours to reduce load
   */
  flightStatusRefreshInterval: new Rox.RoxNumber(60, [30, 60, 120, 300]),

  /**
   * Loyalty Points Multiplier
   *
   * 📖 USE CASE: Bonus loyalty points for promotions
   * 💡 PATTERN: Test promotional campaigns impact on loyalty program
   *
   * OPTIONS: 1, 1.5, 2, 3 (1x, 1.5x, 2x, 3x points)
   *
   * AIRLINE SCENARIO:
   * - 1x = standard earning (no promotion)
   * - 1.5x = moderate promotion (weekend special)
   * - 2x = strong promotion (double points campaign)
   * - 3x = mega promotion (holiday special, new route launch)
   *
   * HOW TO USE:
   * ```typescript
   * const multiplier = useFeatureFlagNumber('loyaltyPointsMultiplier');
   * const earnedPoints = basePoints * multiplier;
   * return <Text>Earn {earnedPoints} points {multiplier > 1 && `(${multiplier}x bonus!)`}</Text>;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 1, 1.5, 2, 3
   * - Default: 1 (no promotion)
   * - Enable 2x-3x for promotional periods
   * - Can target specific routes or membership tiers
   */
  loyaltyPointsMultiplier: new Rox.RoxNumber(1, [1, 1.5, 2, 3]),
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
      console.log('✈️  Current airline flag states:', {
        enableSeatSelection: flags.enableSeatSelection.isEnabled(),
        enableLoungeAccess: flags.enableLoungeAccess.isEnabled(),
        enablePriorityBoarding: flags.enablePriorityBoarding.isEnabled(),
        showFlightAlerts: flags.showFlightAlerts.isEnabled(),
        enableMobileCheckin: flags.enableMobileCheckin.isEnabled(),
        dashboardLayout: flags.dashboardLayout.getValue(),
        flightDisplayMode: flags.flightDisplayMode.getValue(),
        upgradePromptStyle: flags.upgradePromptStyle.getValue(),
        recentBookingsToShow: flags.recentBookingsToShow.getValue(),
        flightStatusRefreshInterval: flags.flightStatusRefreshInterval.getValue(),
        loyaltyPointsMultiplier: flags.loyaltyPointsMultiplier.getValue(),
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
