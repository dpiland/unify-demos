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
  FRAUD_ALERTS: 'fraudAlerts',
  PROMOTIONAL_BANNER: 'promotionalBanner',
  ENABLE_CHAT_SUPPORT: 'enableChatSupport',
  SHOW_STUDENT_LOANS: 'showStudentLoans',
  SHOW_MORTGAGE_ACCOUNT: 'showMortgageAccount',
  WELCOME_EXPERIENCE: 'welcomeExperience',
  ENABLE_SMART_BUDGET_INSIGHTS: 'enableSmartBudgetInsights',
  ENABLE_REDESIGNED_ACCOUNT_CARDS: 'enableRedesignedAccountCards',
  ENABLE_REWARDS_REDEMPTION: 'enableRewardsRedemption',
  SYSTEM_ALERT: 'systemAlert',
  DAILY_TRANSFER_LIMIT: 'dailyTransferLimit',
  SHOW_CREDIT_SCORE: 'showCreditScore',
  THEME_MODE: 'themeMode',
  ENABLE_NOTIFICATION_CENTER: 'enableNotificationCenter',
  ENABLE_BILL_PAY_SCHEDULER: 'enableBillPayScheduler',
  ENABLE_CARD_CONTROLS: 'enableCardControls',
  ENABLE_CRYPTO_TRADING: 'enableCryptoTrading',
  ENABLE_INVESTMENT_ADVISORY: 'enableInvestmentAdvisory',
  ENABLE_MORTGAGE_SIMULATOR: 'enableMortgageSimulator',
  ENABLE_TOP_BANNER: 'enableTopBanner',
  SHOW_RECURRING_SUBSCRIPTIONS: 'showRecurringSubscriptions',
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
  fraudAlerts:
    'Display fraud detection banner with suspicious transaction warning and card freeze action on Account Summary',
  promotionalBanner:
    'Promotional banner campaign shown across the app (none, mortgage-refi, travel-rewards, savings-bonus)',
  enableChatSupport:
    'Show floating chat support widget for customer assistance',
  showStudentLoans:
    'Display student loan summary card with balance, payments, and repayment progress',
  showMortgageAccount:
    'Display the mortgage account card on the Account Summary page',
  welcomeExperience:
    'Personalized welcome section variant based on customer segment (standard, student-focused, wealth-management, homeowner)',
  enableSmartBudgetInsights:
    'Display AI-powered budget insights card with spending analysis (kill switch demo — disable instantly if issues arise)',
  enableRedesignedAccountCards:
    'Toggle between classic vertical account cards and redesigned horizontal layout (A/B testing demo)',
  enableRewardsRedemption:
    'Enable self-service rewards redemption (regional rollout demo — east coast sees "coming soon")',
  systemAlert:
    'System-wide alert banner for maintenance, degraded services, or incidents (ops team demo — push alerts instantly)',
  dailyTransferLimit:
    'Maximum daily transfer amount in dollars (business rule demo — compliance can adjust limits without deploys)',
  showCreditScore:
    'Show credit score dashboard for premier customers, upsell card for standard (entitlement gating demo)',
  themeMode:
    'App visual theme: light, dark, or high-contrast (accessibility rollout demo — entire app transforms)',
  enableNotificationCenter:
    'Show Notifications page with transaction alerts, security notices, and account updates (premium rollout demo)',
  enableBillPayScheduler:
    'Add Scheduled Payments tab to Transfer & Pay with recurring payment setup (progressive rollout demo)',
  enableCardControls:
    'Show Card Controls page to freeze/unfreeze cards, set spending limits, and toggle international transactions (beta rollout demo)',
  enableCryptoTrading:
    'Show crypto trading panel on Investments page with live prices, buy/sell, and portfolio allocation (pilot rollout demo)',
  enableInvestmentAdvisory:
    'Show personalized investment advisory section with risk assessment and advisor scheduling (premium entitlement demo)',
  enableMortgageSimulator:
    'Show Mortgage Simulator page with payment calculator, term comparison, and pre-qualification (prospect engagement demo)',
  enableTopBanner:
    'Display promotional top banner — INTENTIONALLY BUGGY: discount percentage climbs out of control (kill switch demo — disable instantly when bug is noticed)',
  showRecurringSubscriptions:
    'Display recurring subscription tracker with monthly cost aggregation and individual subscription details (financial wellness feature)',
  topBannerFix:
    'Display FIXED promotional top banner without the runaway discount bug — demonstrates progressive rollout of bug fixes (roll out to beta → 25% → all)',
};

/**
 * Default Flag Values
 */
export const DEFAULT_FLAG_VALUES = {
  enableInstantTransfers: false,
  showInvestmentPortfolio: true,
  dashboardLayout: 'classic',
  recentTransactionsToShow: 5,
  fraudAlerts: false,
  promotionalBanner: 'none',
  enableChatSupport: false,
  showStudentLoans: false,
  showMortgageAccount: false,
  welcomeExperience: 'standard',
  enableSmartBudgetInsights: false,
  enableRedesignedAccountCards: false,
  enableRewardsRedemption: false,
  systemAlert: 'none',
  dailyTransferLimit: 2500,
  showCreditScore: false,
  themeMode: 'light',
  enableNotificationCenter: false,
  enableBillPayScheduler: false,
  enableCardControls: false,
  enableCryptoTrading: true,
  enableInvestmentAdvisory: true,
  enableMortgageSimulator: false,
  enableTopBanner: false,
  showRecurringSubscriptions: false,
};
