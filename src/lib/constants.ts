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
  ENABLE_TELEMEDICINE: 'enableTelemedicine',
  SHOW_PATIENT_INSIGHTS: 'showPatientInsights',
  ENABLE_CARE_PLANS: 'enableCarePlans',
  SHOW_CLINICAL_ALERTS: 'showClinicalAlerts',
  ENABLE_PRESCRIPTIONS: 'enablePrescriptions',
  ENABLE_AI_CLINICAL_SUMMARY: 'enableAIClinicalSummary',

  ENABLE_NOTIFICATION_CENTER: 'enableNotificationCenter',
  ENABLE_PATIENT_INTAKE: 'enablePatientIntake',
  ENABLE_PATIENT_MESSAGING: 'enablePatientMessaging',

  // String flags
  CLINICAL_WORKFLOW: 'clinicalWorkflow',
  PATIENT_CHART_VIEW: 'patientChartView',
  APPOINTMENT_VIEW_MODE: 'appointmentViewMode',
  QUALITY_DASHBOARD_VIEW: 'qualityDashboardView',

  // Number flags
  PATIENTS_PER_PAGE: 'patientsPerPage',
  MAX_CONCURRENT_TELEHEALTH_SESSIONS: 'maxConcurrentTelehealthSessions',
  RISK_SCORE_THRESHOLD: 'riskScoreThreshold',
  NOTIFICATION_DISPLAY_COUNT: 'notificationDisplayCount',
} as const;

/**
 * Flag Descriptions - Healthcare Provider Portal
 *
 * Human-readable descriptions shown in UIs and documentation
 * These explain the business purpose of each flag in the clinical context
 */
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Boolean Flags
  enableTelemedicine:
    'Enable virtual visit and video consultation capabilities. Allows providers to conduct remote patient appointments with integrated video, notes, and prescribing.',

  showPatientInsights:
    'Display AI-driven patient risk scores and clinical insights panel. Shows risk-stratified patient lists, trending conditions, and care gap alerts.',

  enableCarePlans:
    'Enable care plan creation and management. Allows providers to create, track, and update patient care plans with goals, tasks, and progress monitoring.',

  showClinicalAlerts:
    'Toggle critical clinical notifications including abnormal lab results, drug interaction warnings, and overdue follow-up reminders. Safety-critical, on by default.',

  enablePrescriptions:
    'Enable electronic prescribing and refill management. Shows pending refill requests, recent prescriptions, and drug interaction alerts for authorized prescribers.',

  enableAIClinicalSummary:
    'Enable AI-generated visit summaries and clinical documentation assistant. Automatically generates structured visit notes, assessment plans, and follow-up recommendations. High-stakes feature rolled out to senior attendings first.',

  enableNotificationCenter:
    'Enable real-time notification center in the header. Consolidates critical lab alerts, appointment reminders, secure messages, and shift handoff notifications into a single bell icon with popover dropdown.',

  enablePatientIntake:
    'Enable digital patient check-in and intake workflow. Replaces paper forms with a guided multi-step flow: verify demographics, insurance, chief complaint, and vitals. Reduces check-in time from 15 minutes to 3 minutes.',

  enablePatientMessaging:
    'Enable secure patient-provider messaging inbox. Adds a Messages tab with threaded conversations, reply capability, and unread tracking. Compliance-sensitive — rolled out to PCPs and NPs first, restricted from residents.',

  // String Flags
  clinicalWorkflow:
    'A/B test clinical documentation workflow: standard (full manual), streamlined (smart defaults, reduced clicks), or guided (step-by-step with checklists). Tests which workflow reduces provider documentation burden — the #1 burnout driver.',

  patientChartView:
    'Control patient chart display format: table (detailed sortable columns), card (visual summary with risk indicators), or compact (minimal single-line entries). Tests optimal presentation for clinical workflow.',

  appointmentViewMode:
    'Control appointment display format: calendar (visual grid overview), list (chronological with details), or timeline (color-coded patient flow). Tests optimal scheduling visualization.',

  qualityDashboardView:
    'Control quality metrics dashboard display: scorecard (big progress rings for key metrics), detailed (full breakdown with population health and provider performance), or compact (condensed single-row summary). A/B tests which view helps administrators vs clinicians.',

  // Number Flags
  patientsPerPage:
    'Number of patients to display per page (5-50). Controls information density - fewer for focused care reviews, more for high-volume clinics.',

  maxConcurrentTelehealthSessions:
    'Maximum simultaneous telehealth sessions per provider (1-5). Enables real-time capacity management without deployment. Scale up for surge demand, dial back for quality focus.',

  riskScoreThreshold:
    'Minimum risk score (1-10) to highlight in patient insights. Lower threshold shows more patients (high sensitivity), higher threshold focuses on critical cases only.',

  notificationDisplayCount:
    'Number of notifications to show in the dropdown (3-20). Controls information density — fewer for focused critical alerts, more for shift supervisors monitoring multiple providers.',
};

/**
 * Default Flag Values - Healthcare Configuration
 *
 * Fallback values used when:
 * - CloudBees SDK is not configured
 * - Network connection fails
 * - Flag is not defined in CloudBees Unify
 *
 * These ensure the app always has valid values to work with
 */
export const DEFAULT_FLAG_VALUES = {
  // Boolean flags
  enableTelemedicine: false,            // Rollout gradually by provider role
  showPatientInsights: false,           // Enable for attendings first
  enableCarePlans: false,               // Enable for prescribers
  showClinicalAlerts: true,             // Safety-critical, always on
  enablePrescriptions: false,           // Rollout by prescribing authority
  enableAIClinicalSummary: false,       // High-stakes, careful rollout
  enableNotificationCenter: false,     // Opt-in rollout
  enablePatientIntake: false,          // Phased rollout by department
  enablePatientMessaging: false,       // Compliance review required

  // String flags
  clinicalWorkflow: 'standard',         // Traditional documentation workflow
  patientChartView: 'table',            // Detailed clinical view
  appointmentViewMode: 'list',          // Quick daily agenda
  qualityDashboardView: 'scorecard',   // Big progress rings

  // Number flags
  patientsPerPage: 10,                  // Standard workflow
  maxConcurrentTelehealthSessions: 2,   // Default capacity
  riskScoreThreshold: 7,                // Elevated risk and above
  notificationDisplayCount: 5,         // Standard awareness
};
