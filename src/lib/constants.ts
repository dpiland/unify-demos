/**
 * Feature Flag Constants — CloudBees Unify Control Plane
 */

export const FEATURE_FLAG_KEYS = {
  ENABLE_FEATURE_MANAGEMENT: 'enableFeatureManagement',
  ENABLE_APPLICATIONS: 'enableApplications',
  ENABLE_SMART_TESTS: 'enableSmartTests',
  ENABLE_SECURITY: 'enableSecurity',
  PLAN_TIER: 'planTier',
} as const;

export const FLAG_DESCRIPTIONS: Record<string, string> = {
  enableFeatureManagement:
    'Enable the Feature Management module — feature flags, experiments, rollouts, and targeting rules.',
  enableApplications:
    'Enable the Applications module — application registry, deployment tracking, and environment management.',
  enableSmartTests:
    'Enable the Smart Tests module — test intelligence, test selection optimization, and flaky test detection.',
  enableSecurity:
    'Enable the Security module — SAST/DAST scanning, vulnerability dashboard, and compliance reports.',
  planTier:
    'Controls the plan tier (free/team/enterprise) which determines support options and SLA display.',
};

export const DEFAULT_FLAG_VALUES = {
  enableFeatureManagement: false,
  enableApplications: false,
  enableSmartTests: false,
  enableSecurity: false,
  planTier: 'free',
};
