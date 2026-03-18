/**
 * Feature Flag Constants and Metadata — NovaCRM SaaS Dashboard
 *
 * Human-readable descriptions and default values for all feature flags.
 */

/**
 * Feature Flag Keys (for type-safe references)
 */
export const FEATURE_FLAG_KEYS = {
  SHOW_AI_INSIGHTS: 'showAIInsights',
  ENABLE_ENTERPRISE_DASHBOARD: 'enableEnterpriseDashboard',
  RECENT_EVENTS_TO_SHOW: 'recentEventsToShow',
} as const;

/**
 * Flag Descriptions
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  showAIInsights:
    'Toggle the AI-powered insights panel showing churn predictions, upsell recommendations, and usage trend analysis.',
  enableEnterpriseDashboard:
    'Gate access to enterprise-tier analytics features including cohort analysis, LTV projections, and advanced segmentation.',
  recentEventsToShow:
    'Control how many subscription events appear in the activity feed (5, 10, 25, 50).',
};

/**
 * Default Flag Values
 *
 * Fallback values used when CloudBees SDK is not configured or unavailable.
 */
export const DEFAULT_FLAG_VALUES = {
  showAIInsights: false,
  enableEnterpriseDashboard: false,
  recentEventsToShow: 10,
};
