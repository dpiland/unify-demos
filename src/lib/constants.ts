/**
 * Feature Flag Constants and Metadata — Albert Invent PMM Portfolio
 */

export const FEATURE_FLAG_KEYS = {
  AUDIENCE_VIEW: 'audienceView',
  SHOW_ROI_LEAVE_BEHIND: 'showRoiLeaveBehind',
  SHOW_ANALYST_STRATEGY: 'showAnalystStrategy',
  SHOW_COWORK_ENABLEMENT: 'showCoworkEnablement',
  SHOW_PUSHBACK_PREP: 'showPushbackPrep',
  THEME_MODE: 'themeMode',
} as const;

export const FLAG_DESCRIPTIONS: Record<string, string> = {
  audienceView:
    'Routes the signed-in panelist to the experience built for their function (auto = use the persona default; can be overridden/targeted in CloudBees Unify).',
  showRoiLeaveBehind:
    'Content view: show the decision-stage ROI calculator leave-behind concept.',
  showAnalystStrategy:
    'Product view: show the analyst-relations flywheel and briefing/inquiry strategy.',
  showCoworkEnablement:
    'Sales view: show the Cowork projects for self-serve enablement and onboarding.',
  showPushbackPrep:
    'Panel view: show the anticipated case-study pushback and crisp responses.',
  themeMode:
    'App visual theme: light, dark, or high-contrast.',
};

export const DEFAULT_FLAG_VALUES = {
  audienceView: 'auto',
  showRoiLeaveBehind: true,
  showAnalystStrategy: true,
  showCoworkEnablement: true,
  showPushbackPrep: true,
  themeMode: 'light',
};
