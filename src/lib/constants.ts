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
};

/**
 * Default Flag Values
 */
export const DEFAULT_FLAG_VALUES = {
  enableInstantTransfers: false,
  showInvestmentPortfolio: false,
  dashboardLayout: 'classic',
  recentTransactionsToShow: 10,
};
