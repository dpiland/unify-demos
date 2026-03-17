/**
 * Feature Flag Constants and Metadata - Horizon Bank
 */

/**
 * Feature Flag Keys (for type-safe references)
 */
export const FEATURE_FLAG_KEYS = {
  ENABLE_INSTANT_TRANSFERS: 'enableInstantTransfers',
  SHOW_INVESTMENT_PORTFOLIO: 'showInvestmentPortfolio',
  DASHBOARD_LAYOUT: 'dashboardLayout',
  RECENT_TRANSACTIONS_TO_SHOW: 'recentTransactionsToShow',
  SHOW_FRAUD_ALERTS: 'showFraudAlerts',
  PROMOTIONAL_BANNER: 'promotionalBanner',
  ENABLE_CHAT_SUPPORT: 'enableChatSupport',
} as const;

/**
 * Flag Descriptions
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  enableInstantTransfers:
    'Enable instant money transfers for eligible accounts (vs standard 1-3 business day processing)',
  showInvestmentPortfolio:
    'Display the investment portfolio section with holdings and performance data',
  dashboardLayout:
    'Dashboard layout variant for A/B testing (classic, modern, or compact)',
  recentTransactionsToShow:
    'Number of recent transactions visible on the dashboard (5, 10, 25, or 50)',
  showFraudAlerts:
    'Display fraud detection alerts with suspicious transaction warnings on the Account Summary',
  promotionalBanner:
    'Promotional banner campaign shown across the app (none, mortgage-refi, travel-rewards, savings-bonus)',
  enableChatSupport:
    'Show floating chat support widget for customer assistance',
};

/**
 * Default Flag Values
 */
export const DEFAULT_FLAG_VALUES = {
  enableInstantTransfers: false,
  showInvestmentPortfolio: false,
  dashboardLayout: 'classic',
  recentTransactionsToShow: 10,
  showFraudAlerts: false,
  promotionalBanner: 'none',
  enableChatSupport: false,
};
