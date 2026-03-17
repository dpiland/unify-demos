/**
 * CloudBees Feature Flags SDK Integration
 *
 * This module provides the feature flag definitions for the MedConnect Provider Portal.
 * It includes healthcare-specific flags (boolean, string, number) that control
 * clinical features based on provider role, department, and access level.
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
 * Feature Flag Definitions - Healthcare Provider Portal
 *
 * These flags control clinical features in the provider dashboard.
 * They demonstrate how CloudBees Feature Management enables role-based
 * feature delivery for physicians, nurses, and residents.
 */
export const flags = {
  // ============================================
  // BOOLEAN FLAGS - Feature Toggles
  // ============================================

  /**
   * Enable Telemedicine
   *
   * USE CASE: Virtual visit / video consultation capabilities
   * PATTERN: Toggle visibility of telemedicine panel
   *
   * HEALTHCARE SCENARIO:
   * - Progressive rollout of virtual visit capabilities
   * - Enable for providers with hasTelemedicineAccess property
   * - Restrict from residents who cannot conduct independent visits
   *
   * HOW TO USE:
   * ```typescript
   * const enableTelemedicine = useFeatureFlag('enableTelemedicine');
   * const hasAccess = user.properties.booleans.hasTelemedicineAccess;
   * return (enableTelemedicine && hasAccess) ? <TelemedicinePanel /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (rollout gradually)
   * - Target rule: hasTelemedicineAccess == true
   */
  enableTelemedicine: new Rox.Flag(),

  /**
   * Show Patient Insights
   *
   * USE CASE: AI-driven patient risk scores and clinical insights
   * PATTERN: Toggle visibility of insights panel
   *
   * HEALTHCARE SCENARIO:
   * - Display risk-stratified patient lists and care gap alerts
   * - Enable for experienced physicians first, then expand
   * - Uses riskScoreThreshold flag to filter highlighted patients
   *
   * HOW TO USE:
   * ```typescript
   * const showPatientInsights = useFeatureFlag('showPatientInsights');
   * return showPatientInsights ? <PatientInsightsPanel /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false
   * - Target rule: isAttending == true AND yearsOfExperience > 5
   */
  showPatientInsights: new Rox.Flag(),

  /**
   * Enable Care Plans
   *
   * USE CASE: Care plan creation and management
   * PATTERN: Toggle care plan management section
   *
   * HEALTHCARE SCENARIO:
   * - Enable for providers who can prescribe and manage treatment
   * - Show active care plans with goals, progress, and tasks
   * - Restrict from residents without prescribing authority
   *
   * HOW TO USE:
   * ```typescript
   * const enableCarePlans = useFeatureFlag('enableCarePlans');
   * return enableCarePlans ? <CarePlanCard /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false
   * - Target rule: canPrescribe == true
   */
  enableCarePlans: new Rox.Flag(),

  /**
   * Show Clinical Alerts
   *
   * USE CASE: Critical lab results, drug interactions, clinical notifications
   * PATTERN: Toggle clinical alert banner visibility
   *
   * HEALTHCARE SCENARIO:
   * - Safety-critical: on by default for all providers
   * - Display critical lab values, overdue follow-ups, drug interactions
   * - Can be temporarily disabled during system maintenance
   *
   * HOW TO USE:
   * ```typescript
   * const showClinicalAlerts = useFeatureFlag('showClinicalAlerts');
   * return showClinicalAlerts ? <ClinicalAlertBanner /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: true (safety-critical, always on)
   * - Only disable for maintenance windows
   */
  showClinicalAlerts: new Rox.Flag(),

  /**
   * Enable Prescriptions
   *
   * USE CASE: Electronic prescribing and refill management
   * PATTERN: Toggle prescription panel visibility
   *
   * HEALTHCARE SCENARIO:
   * - Enable for providers with prescribing authority
   * - Show pending refill requests, recent prescriptions, interactions
   * - Double-gate with canPrescribe user property
   *
   * HOW TO USE:
   * ```typescript
   * const enablePrescriptions = useFeatureFlag('enablePrescriptions');
   * const canPrescribe = user.properties.booleans.canPrescribe;
   * return (enablePrescriptions && canPrescribe) ? <PrescriptionPanel /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false
   * - Target rule: canPrescribe == true
   */
  enablePrescriptions: new Rox.Flag(),

  /**
   * Enable AI Clinical Summary
   *
   * USE CASE: AI-generated visit summaries and clinical documentation
   * PATTERN: Toggle AI-powered documentation assistant
   *
   * HEALTHCARE SCENARIO:
   * - The "wow" feature — AI generates visit notes, summaries, and follow-up plans
   * - Roll out to attendings first, then NPs, never to unsupervised residents
   * - Demonstrates high-stakes feature rollout with careful targeting
   * - Provider burnout from documentation is the #1 industry pain point
   *
   * HOW TO USE:
   * ```typescript
   * const enableAIClinicalSummary = useFeatureFlag('enableAIClinicalSummary');
   * const isAttending = user.properties.booleans.isAttending;
   * return (enableAIClinicalSummary && isAttending) ? <AIClinicalSummary /> : null;
   * ```
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (high-stakes — careful rollout)
   * - Target rule: isAttending == true AND yearsOfExperience > 5
   */
  enableAIClinicalSummary: new Rox.Flag(),

  /**
   * Enable Notification Center
   *
   * USE CASE: Real-time clinical notifications in the header
   * PATTERN: Toggle notification bell icon with popover dropdown
   *
   * HEALTHCARE SCENARIO:
   * - Rolling out real-time alerts to providers who opted in
   * - Consolidates critical labs, appointment reminders, messages, handoff alerts
   * - Uses notificationDisplayCount to control information density
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (opt-in rollout)
   */
  enableNotificationCenter: new Rox.Flag(),

  /**
   * Enable Patient Intake
   *
   * USE CASE: Digital patient check-in and intake workflow
   * PATTERN: Toggle interactive intake Steps flow in Patients tab
   *
   * HEALTHCARE SCENARIO:
   * - Digital intake replaces paper forms — phased rollout by department
   * - Multi-step: Demographics > Insurance > Chief Complaint > Vitals > Complete
   * - Reduces check-in time from 15 min to 3 min
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (phased rollout)
   */
  enablePatientIntake: new Rox.Flag(),

  /**
   * Enable Patient Messaging
   *
   * USE CASE: Secure patient-provider messaging inbox
   * PATTERN: Toggle entire Messages tab visibility
   *
   * HEALTHCARE SCENARIO:
   * - Compliance-sensitive secure messaging rolled out to PCPs and NPs first
   * - Double-gated: flag + !isResident (residents cannot message independently)
   * - Demo moment: switch to resident persona and Messages tab disappears
   *
   * IN CLOUDBEES UI:
   * - Create as Boolean flag
   * - Default: false (compliance review required)
   * - Target rule: isResident == false
   */
  enablePatientMessaging: new Rox.Flag(),

  // ============================================
  // STRING FLAGS - A/B Testing & Variants
  // ============================================

  /**
   * Clinical Workflow
   *
   * USE CASE: A/B test which clinical documentation workflow reduces provider burnout
   * PATTERN: Switch between workflow variants that affect the entire dashboard experience
   *
   * VARIANTS:
   * - 'standard': Traditional clinical workflow with full manual documentation
   * - 'streamlined': Reduced clicks, smart defaults, auto-populated fields
   * - 'guided': Step-by-step guided workflow with prompts and checklists
   *
   * HEALTHCARE SCENARIO:
   * - "Which workflow reduces documentation time?" is a C-suite question
   * - Standard for established providers who prefer control
   * - Streamlined for high-volume clinics targeting efficiency
   * - Guided for residents and new providers who need structure
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'standard', 'streamlined', 'guided'
   * - Default: 'standard'
   * - A/B test: measure documentation time per encounter
   */
  clinicalWorkflow: new Rox.RoxString('standard', ['standard', 'streamlined', 'guided']),

  /**
   * Patient Chart View
   *
   * USE CASE: Control how the patient list/chart is displayed
   * PATTERN: Test different visualization styles for patient data
   *
   * VARIANTS:
   * - 'table': Detailed table with sortable columns (default)
   * - 'card': Visual cards with patient summary and risk indicators
   * - 'compact': Minimal single-line entries for quick scanning
   *
   * HEALTHCARE SCENARIO:
   * - Table view for detailed clinical review
   * - Card view for visual patient overview
   * - Compact view for high-volume clinics
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'table', 'card', 'compact'
   * - Default: 'table'
   */
  patientChartView: new Rox.RoxString('table', ['table', 'card', 'compact']),

  /**
   * Appointment View Mode
   *
   * USE CASE: Control how appointments are displayed
   * PATTERN: Switch between scheduling visualization styles
   *
   * VARIANTS:
   * - 'calendar': Mini calendar grid with appointment counts
   * - 'list': Chronological list with time, patient, reason (default)
   * - 'timeline': Ant Design Timeline with color-coded entries
   *
   * HEALTHCARE SCENARIO:
   * - Calendar for visual scheduling overview
   * - List for quick daily agenda scanning
   * - Timeline for chronological patient flow
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'calendar', 'list', 'timeline'
   * - Default: 'list'
   */
  appointmentViewMode: new Rox.RoxString('list', ['calendar', 'list', 'timeline']),

  /**
   * Quality Dashboard View
   *
   * USE CASE: A/B test which quality metrics view helps admins vs clinicians
   * PATTERN: Switch between quality dashboard display variants
   *
   * VARIANTS:
   * - 'scorecard': Big circular progress rings for key metrics (default)
   * - 'detailed': Full breakdown with all metrics, population health, performance
   * - 'compact': Condensed single-row summary for quick glance
   *
   * HEALTHCARE SCENARIO:
   * - Admin users (hasAdminAccess) see 'detailed' for CMS compliance review
   * - Clinicians see 'scorecard' for quick quality pulse check
   * - Compact for mobile or secondary displays
   *
   * IN CLOUDBEES UI:
   * - Create as String flag
   * - Variants: 'scorecard', 'detailed', 'compact'
   * - Default: 'scorecard'
   * - Target rule: hasAdminAccess == true → 'detailed'
   */
  qualityDashboardView: new Rox.RoxString('scorecard', ['scorecard', 'detailed', 'compact']),

  // ============================================
  // NUMBER FLAGS - Numeric Configuration
  // ============================================

  /**
   * Patients Per Page
   *
   * USE CASE: Control how many patients to display per page
   * PATTERN: Balance information density vs. readability
   *
   * OPTIONS: 5, 10, 20, 50 patients
   *
   * HEALTHCARE SCENARIO:
   * - 5 for focused care reviews
   * - 10 for standard daily workflow (default)
   * - 20-50 for high-volume clinics or administrative review
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 5, 10, 20, 50
   * - Default: 10
   */
  patientsPerPage: new Rox.RoxNumber(10, [5, 10, 20, 50]),

  /**
   * Max Concurrent Telehealth Sessions
   *
   * USE CASE: Capacity management for virtual visit infrastructure
   * PATTERN: Control how many simultaneous telehealth sessions a provider can run
   *
   * OPTIONS: 1, 2, 3, 5 concurrent sessions
   *
   * HEALTHCARE SCENARIO:
   * - "We can scale telemedicine capacity in real-time without a deploy"
   * - 1 for standard providers (one patient at a time)
   * - 2-3 for experienced providers running back-to-back virtual visits
   * - 5 for group sessions or triage scenarios
   * - Adjustable by department or provider role
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 1, 2, 3, 5
   * - Default: 2
   * - Target rule: isAttending == true → 3, isResident == true → 1
   */
  maxConcurrentTelehealthSessions: new Rox.RoxNumber(2, [1, 2, 3, 5]),

  /**
   * Risk Score Threshold
   *
   * USE CASE: Minimum risk score to highlight in patient insights
   * PATTERN: Control sensitivity of risk-based alerts
   *
   * OPTIONS: 3, 5, 7, 9 (scale of 1-10)
   *
   * HEALTHCARE SCENARIO:
   * - 3: Show all moderate+ risk patients (high sensitivity)
   * - 5: Balanced threshold
   * - 7: Only elevated risk patients (default)
   * - 9: Only critical patients (emergency focus)
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 3, 5, 7, 9
   * - Default: 7
   */
  riskScoreThreshold: new Rox.RoxNumber(7, [3, 5, 7, 9]),

  /**
   * Notification Display Count
   *
   * USE CASE: Control how many notifications appear in the dropdown
   * PATTERN: Balance information overload vs clinical awareness
   *
   * OPTIONS: 3, 5, 10, 20 notifications
   *
   * HEALTHCARE SCENARIO:
   * - 3 for focused view (only most critical)
   * - 5 for standard awareness (default)
   * - 10-20 for shift supervisors monitoring multiple providers
   * - "How many alerts is optimal before fatigue sets in?"
   *
   * IN CLOUDBEES UI:
   * - Create as Number flag
   * - Options: 3, 5, 10, 20
   * - Default: 5
   */
  notificationDisplayCount: new Rox.RoxNumber(5, [3, 5, 10, 20]),
};

/**
 * Initialize CloudBees Feature Flags SDK
 *
 * SETUP INSTRUCTIONS:
 * 1. Get your SDK key from CloudBees Unify:
 *    - Go to Feature Management -> Installation
 *    - Copy the SDK key for your environment
 * 2. Create .env.local file (copy from .env.example)
 * 3. Add: VITE_CLOUDBEES_SDK_KEY=your_actual_key
 * 4. Restart dev server
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
    Rox.register('', flags);

    console.log('🚀 Initializing CloudBees Feature Flags...');

    // Connect to CloudBees and fetch flag configurations
    await Rox.setup(sdkKey, {
      developmentOnly: import.meta.env.DEV,
      ...options,
    });

    console.log('✅ CloudBees Feature Flags initialized successfully');
    console.log(`📊 Registered ${Object.keys(flags).length} feature flags`);

    // Log current flag states in development
    if (import.meta.env.DEV) {
      console.log('🏥 Current healthcare flag states:', {
        enableTelemedicine: flags.enableTelemedicine.isEnabled(),
        showPatientInsights: flags.showPatientInsights.isEnabled(),
        enableCarePlans: flags.enableCarePlans.isEnabled(),
        showClinicalAlerts: flags.showClinicalAlerts.isEnabled(),
        enablePrescriptions: flags.enablePrescriptions.isEnabled(),
        enableAIClinicalSummary: flags.enableAIClinicalSummary.isEnabled(),
        clinicalWorkflow: flags.clinicalWorkflow.getValue(),
        patientChartView: flags.patientChartView.getValue(),
        appointmentViewMode: flags.appointmentViewMode.getValue(),
        patientsPerPage: flags.patientsPerPage.getValue(),
        maxConcurrentTelehealthSessions: flags.maxConcurrentTelehealthSessions.getValue(),
        riskScoreThreshold: flags.riskScoreThreshold.getValue(),
        enableNotificationCenter: flags.enableNotificationCenter.isEnabled(),
        enablePatientIntake: flags.enablePatientIntake.isEnabled(),
        enablePatientMessaging: flags.enablePatientMessaging.isEnabled(),
        qualityDashboardView: flags.qualityDashboardView.getValue(),
        notificationDisplayCount: flags.notificationDisplayCount.getValue(),
      });
    }
  } catch (error) {
    console.error('❌ Failed to initialize CloudBees Feature Flags:', error);
    console.warn('⚠️  Continuing with default flag values');
  }
}

/**
 * Type-safe flag keys for use throughout the application
 */
export type FlagKey = keyof typeof flags;

/**
 * Get all flag keys as an array
 */
export function getAllFlagKeys(): FlagKey[] {
  return Object.keys(flags) as FlagKey[];
}

/**
 * Get flag type (boolean, string, or number)
 *
 * @param key - Flag key to check
 * @returns Flag type: 'boolean', 'string', or 'number'
 */
export function getFlagType(key: FlagKey): 'boolean' | 'string' | 'number' {
  const flag = flags[key];

  if ('isEnabled' in flag && typeof flag.isEnabled === 'function') {
    return 'boolean';
  }

  if ('getValue' in flag) {
    const value = flag.getValue();
    return typeof value === 'number' ? 'number' : 'string';
  }

  return 'boolean';
}

/**
 * Set Custom Properties from User Object
 *
 * Sets all custom properties based on a user object.
 * Call this when a user logs in or switches profiles.
 *
 * @param user - User object with properties to set
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
