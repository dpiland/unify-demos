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

  /**
   * Boolean Flag - Show Student Loans
   *
   * PATTERN: Conditional rendering of entire section
   * USE CASE: Display a student loan summary card on the Account Summary
   * with loan balance, monthly payment, interest rate, and repayment progress.
   * Targeted at student segment customers.
   *
   * TARGETING EXAMPLE:
   *   Show IF customerSegment == "student" OR isStudent == true
   */
  showStudentLoans: new Rox.Flag(),

  /**
   * Boolean Flag - Show Mortgage Account
   *
   * PATTERN: Conditional filtering of account cards
   * USE CASE: Show or hide the mortgage account card on the Account Summary.
   * Only relevant for mortgage holders and admin users.
   *
   * TARGETING EXAMPLE:
   *   Show IF customerSegment == "mortgage" OR customerSegment == "admin"
   */
  showMortgageAccount: new Rox.Flag(),

  /**
   * String Flag - Welcome Experience Variant
   *
   * PATTERN: Layout switching based on customer segment
   * USE CASE: Display a completely different welcome/hero section based on the
   * customer's segment. Creates the most dramatic visual difference when
   * switching personas during demos.
   * - 'standard': Simple greeting with quick actions (default)
   * - 'student-focused': Financial wellness tips, savings goal, student resources
   * - 'wealth-management': Portfolio snapshot, market indices, advisor CTA
   * - 'homeowner': Home value estimate, equity percentage, refinance comparison
   *
   * TARGETING EXAMPLE:
   *   Set "student-focused" IF isStudent == true
   *   Set "wealth-management" IF isPremiumCustomer == true AND hasInvestmentAccount == true
   *   Set "homeowner" IF hasMortgage == true
   */
  welcomeExperience: new Rox.RoxString('standard', ['standard', 'student-focused', 'wealth-management', 'homeowner']),

  /**
   * Boolean Flag - Enable Smart Budget Insights
   *
   * PATTERN: Conditional rendering of entire section (kill switch)
   * USE CASE: Show AI-powered budget insights card on Account Summary.
   * Perfect for demonstrating the "kill switch" pattern — if the feature
   * has a bug or shows incorrect data, disable it instantly without a deploy.
   *
   * DEMO NARRATIVE:
   *   "We just shipped this AI feature, but it's showing incorrect calculations.
   *    Watch — I disable it in CloudBees, and it's gone instantly. No deploy needed."
   *
   * TARGETING EXAMPLE:
   *   Enable for all users, then disable instantly if issues arise
   */
  enableSmartBudgetInsights: new Rox.Flag(),

  /**
   * Boolean Flag - Enable Redesigned Account Cards
   *
   * PATTERN: A/B testing with visual variant
   * USE CASE: Toggle between the classic vertical account cards and a new
   * horizontal card design. Demonstrates A/B testing capability where
   * you can show different UI variants to different user segments.
   *
   * DEMO NARRATIVE:
   *   "We're testing a redesigned card layout with 20% of users.
   *    Let me show you both variants — and shift the percentage in real time."
   *
   * TARGETING EXAMPLE:
   *   Enable for 20% of users via percentage rollout
   */
  enableRedesignedAccountCards: new Rox.Flag(),

  /**
   * Boolean Flag - Enable Rewards Redemption
   *
   * PATTERN: Regional/progressive rollout
   * USE CASE: Control whether users can redeem rewards or see a "coming soon"
   * message. Demonstrates geographic rollout — west coast users get it first,
   * east coast sees "coming soon".
   *
   * DEMO NARRATIVE:
   *   "We're rolling out self-service redemption region by region.
   *    West coast has it, east coast sees 'coming soon'. One click to expand."
   *
   * TARGETING EXAMPLE:
   *   Enable IF region == "us-west"
   */
  enableRewardsRedemption: new Rox.Flag(),

  /**
   * String Flag - System Alert Banner
   *
   * PATTERN: Operational/infrastructure messaging
   * USE CASE: Display system-wide alert banners for maintenance windows,
   * degraded services, or incident communication. Ops teams can push
   * alerts to all users instantly without a deploy.
   * - 'none': No alert shown
   * - 'maintenance-scheduled': Scheduled maintenance notice
   * - 'zelle-degraded': Zelle service degradation warning
   * - 'rate-limit-active': Rate limiting / high traffic notice
   *
   * DEMO NARRATIVE:
   *   "Ops just detected Zelle is experiencing degraded performance.
   *    They flip a flag — every user sees the warning instantly."
   *
   * TARGETING EXAMPLE:
   *   Set globally — no targeting needed (all users see ops alerts)
   */
  systemAlert: new Rox.RoxString('none', ['none', 'maintenance-scheduled', 'zelle-degraded', 'rate-limit-active']),

  /**
   * Number Flag - Daily Transfer Limit
   *
   * PATTERN: Business rule configuration via numeric flag
   * USE CASE: Control the maximum daily transfer amount shown in the
   * Transfer & Pay page. Demonstrates how business rules (not just UI)
   * can be managed through flags.
   * - 2500: Standard account limit
   * - 5000: Elevated limit
   * - 10000: Premium limit
   * - 25000: VIP/premier limit
   *
   * DEMO NARRATIVE:
   *   "Compliance just approved raising the daily limit for premier
   *    customers from $5K to $25K. One change, no deploy."
   *
   * TARGETING EXAMPLE:
   *   Set 25000 IF isPremiumCustomer == true
   *   Set 5000 IF customerTenureMonths > 12
   *   Default: 2500
   */
  dailyTransferLimit: new Rox.RoxNumber(2500, [2500, 5000, 10000, 25000]),

  /**
   * Boolean Flag - Show Credit Score Dashboard
   *
   * PATTERN: Entitlement gating (premium vs upsell)
   * USE CASE: Premier customers see their credit score dashboard with
   * score gauge, factors, and tips. Standard customers see an upsell
   * card encouraging them to upgrade. Same flag, two different UIs.
   *
   * DEMO NARRATIVE:
   *   "Premier customers get Credit Insights included. Standard users
   *    see an upgrade prompt. One flag controls the entitlement."
   *
   * TARGETING EXAMPLE:
   *   Enable IF isPremiumCustomer == true OR userTier == "premier"
   */
  showCreditScore: new Rox.Flag(),

  /**
   * String Flag - Theme Mode
   *
   * PATTERN: Visual theme switching
   * USE CASE: Control the app's visual theme for accessibility testing,
   * user preference rollouts, or dramatic demo impact. The entire app
   * transforms visually.
   * - 'light': Standard light theme (default)
   * - 'dark': Dark mode
   * - 'high-contrast': High contrast for accessibility
   *
   * DEMO NARRATIVE:
   *   "We're rolling out dark mode to beta testers first. One flag
   *    change, and the entire app transforms."
   *
   * TARGETING EXAMPLE:
   *   Set "dark" IF isBetaTester == true
   */
  themeMode: new Rox.RoxString('light', ['light', 'dark', 'high-contrast']),

  /**
   * Boolean Flag - Enable Notification Center
   *
   * PATTERN: Conditional rendering of nav item + page
   * USE CASE: Show/hide the Notifications page with transaction alerts,
   * security notices, and account updates. Bell icon with badge count
   * appears in the sidebar and header.
   *
   * DEMO NARRATIVE:
   *   "We're rolling out our new notification center to premium customers
   *    first. One flag enables the entire feature — nav, bell icon, page."
   *
   * TARGETING EXAMPLE:
   *   Enable IF isPremiumCustomer == true OR isBetaTester == true
   */
  enableNotificationCenter: new Rox.Flag(),

  /**
   * Boolean Flag - Enable Bill Pay Scheduler
   *
   * PATTERN: Progressive feature rollout (new tab in existing page)
   * USE CASE: Add a "Scheduled Payments" tab to Transfer & Pay with
   * recurring payment setup and management. Demonstrates adding
   * functionality to an existing page without disrupting it.
   *
   * DEMO NARRATIVE:
   *   "We built scheduled payments but want to roll it out gradually.
   *    Enable the flag and a new tab appears — disable and it's gone."
   *
   * TARGETING EXAMPLE:
   *   Enable IF customerTenureMonths > 6 AND accountType != "basic"
   */
  enableBillPayScheduler: new Rox.Flag(),

  /**
   * Boolean Flag - Enable Card Controls
   *
   * PATTERN: Conditional rendering of nav item + page
   * USE CASE: Show/hide the Card Controls page where users can
   * freeze/unfreeze cards, set spending limits, toggle international
   * transactions, and manage card security settings.
   *
   * DEMO NARRATIVE:
   *   "Card Controls is our newest self-service feature. We're testing
   *    it with beta users before a full launch."
   *
   * TARGETING EXAMPLE:
   *   Enable IF isBetaTester == true OR isPremiumCustomer == true
   */
  enableCardControls: new Rox.Flag(),
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

    // Register custom properties so they appear in CloudBees Unify targeting UI
    // Boolean properties
    Rox.setCustomBooleanProperty('isPremiumCustomer', false);
    Rox.setCustomBooleanProperty('isBetaTester', false);
    Rox.setCustomBooleanProperty('isNewUser', false);
    Rox.setCustomBooleanProperty('hasInvestmentAccount', false);
    Rox.setCustomBooleanProperty('isStudent', false);
    Rox.setCustomBooleanProperty('hasMortgage', false);

    // String properties
    Rox.setCustomStringProperty('accountType', 'checking');
    Rox.setCustomStringProperty('customerSegment', 'checking-savings');
    Rox.setCustomStringProperty('userTier', 'standard');
    Rox.setCustomStringProperty('region', 'us-east');
    Rox.setCustomStringProperty('userId', '');

    // Number properties
    Rox.setCustomNumberProperty('accountBalance', 0);
    Rox.setCustomNumberProperty('customerTenureMonths', 0);
    Rox.setCustomNumberProperty('creditScore', 0);
    Rox.setCustomNumberProperty('monthlyTransactions', 0);

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
        showStudentLoans: flags.showStudentLoans.isEnabled(),
        showMortgageAccount: flags.showMortgageAccount.isEnabled(),
        welcomeExperience: flags.welcomeExperience.getValue(),
        enableSmartBudgetInsights: flags.enableSmartBudgetInsights.isEnabled(),
        enableRedesignedAccountCards: flags.enableRedesignedAccountCards.isEnabled(),
        enableRewardsRedemption: flags.enableRewardsRedemption.isEnabled(),
        systemAlert: flags.systemAlert.getValue(),
        dailyTransferLimit: flags.dailyTransferLimit.getValue(),
        showCreditScore: flags.showCreditScore.isEnabled(),
        themeMode: flags.themeMode.getValue(),
        enableNotificationCenter: flags.enableNotificationCenter.isEnabled(),
        enableBillPayScheduler: flags.enableBillPayScheduler.isEnabled(),
        enableCardControls: flags.enableCardControls.isEnabled(),
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
