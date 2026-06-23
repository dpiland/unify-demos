/**
 * CloudBees Feature Management — Albert Invent PMM Portfolio
 *
 * Feature flags here are the *mechanism*, not the point. They let one application
 * serve a tailored experience to each member of the interview panel: the same
 * codebase, four different audiences, four different jobs to be done.
 *
 * HOW IT WORKS
 *  - Each persona (see users.ts) sets a `panelistId` / `audience` custom property.
 *  - The `audienceView` string flag can be targeted in CloudBees Unify to route a
 *    panelist to their view ("audience == 'content' -> content").
 *  - Default value is 'auto', which means the app falls back to the persona's own
 *    defaultView. That keeps the demo fully working OFFLINE (no SDK key, no network),
 *    while still being genuinely controllable from CloudBees when connected.
 *
 * The module flags below are simple kill-switches for individual sections, defaulted
 * ON so every view is complete out of the box.
 */

import Rox from 'rox-browser';
import { Capacitor } from '@capacitor/core';
import type { RoxSetupOptions } from './types';
import type { User } from './users';

export const flags = {
  /**
   * String Flag — Audience View Router
   *
   * Routes the signed-in panelist to the experience built for their function.
   * 'auto' defers to the persona's defaultView (offline-safe). Set a concrete
   * value in CloudBees Unify to override / force a view live.
   */
  audienceView: new Rox.RoxString('auto', [
    'auto',
    'overview',
    'content',
    'panel',
    'product',
    'sales',
  ]),

  /** Boolean — Content view: show the ROI calculator leave-behind concept */
  showRoiLeaveBehind: new Rox.Flag(true),

  /** Boolean — Product view: show the analyst-relations flywheel + strategy */
  showAnalystStrategy: new Rox.Flag(true),

  /** Boolean — Sales view: show the Cowork self-serve enablement projects */
  showCoworkEnablement: new Rox.Flag(true),

  /** Boolean — Panel view: show the anticipated-pushback Q&A prep */
  showPushbackPrep: new Rox.Flag(true),

  /**
   * String Flag — Theme Mode (consumed by main.tsx)
   * Kept for the theming system; defaults to light.
   */
  themeMode: new Rox.RoxString('light', ['light', 'dark', 'high-contrast']),
};

export async function initializeFeatureFlags(options: RoxSetupOptions = {}): Promise<void> {
  const sdkKey = import.meta.env.VITE_CLOUDBEES_SDK_KEY;

  if (!sdkKey || sdkKey === 'your_sdk_key_here') {
    console.warn(
      'CloudBees SDK key not configured. Running on default flag values ' +
        '(persona-driven views still work fully offline).'
    );
    return;
  }

  try {
    Rox.register('', flags);

    // Register custom properties so they appear in CloudBees Unify targeting UI
    Rox.setCustomBooleanProperty('isPanelist', false);
    Rox.setCustomBooleanProperty('isHiringManager', false);
    Rox.setCustomBooleanProperty('isProduct', false);
    Rox.setCustomBooleanProperty('isRevenue', false);

    Rox.setCustomStringProperty('panelistId', '');
    Rox.setCustomStringProperty('audience', 'overview');
    Rox.setCustomStringProperty('userTier', 'candidate');
    Rox.setCustomStringProperty('region', 'us-east');
    Rox.setCustomStringProperty('userId', '');

    Rox.setCustomNumberProperty('blockOrder', 0);

    // Platform properties
    const platform = Capacitor.getPlatform();
    const isNativeMobile = Capacitor.isNativePlatform();
    Rox.setCustomStringProperty('platform', platform);
    Rox.setCustomBooleanProperty('isMobile', isNativeMobile);

    console.log('Initializing CloudBees Feature Management...');

    await Rox.setup(sdkKey, {
      developmentOnly: import.meta.env.DEV,
      ...options,
    });

    console.log('CloudBees Feature Management initialized.');
    console.log(`Registered ${Object.keys(flags).length} flags.`);

    if (import.meta.env.DEV) {
      console.log('Current flag states:', {
        audienceView: flags.audienceView.getValue(),
        showRoiLeaveBehind: flags.showRoiLeaveBehind.isEnabled(),
        showAnalystStrategy: flags.showAnalystStrategy.isEnabled(),
        showCoworkEnablement: flags.showCoworkEnablement.isEnabled(),
        showPushbackPrep: flags.showPushbackPrep.isEnabled(),
        themeMode: flags.themeMode.getValue(),
      });
    }
  } catch (error) {
    console.error('Failed to initialize CloudBees Feature Management:', error);
    console.warn('Continuing with default flag values.');
  }
}

export type FlagKey = keyof typeof flags;

export function getAllFlagKeys(): FlagKey[] {
  return Object.keys(flags) as FlagKey[];
}

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
 * Set CloudBees custom properties from the selected persona, then re-fetch flag
 * configurations. Called on login / persona switch.
 */
export function setUserProperties(user: User): void {
  Object.entries(user.properties.booleans).forEach(([key, value]) => {
    Rox.setCustomBooleanProperty(key, value);
  });
  Object.entries(user.properties.strings).forEach(([key, value]) => {
    Rox.setCustomStringProperty(key, value);
  });
  Object.entries(user.properties.numbers).forEach(([key, value]) => {
    Rox.setCustomNumberProperty(key, value);
  });

  // Re-evaluate flags with the updated targeting context (no-op offline).
  Rox.fetch();

  console.log('Audience properties set for:', user.name);
}
