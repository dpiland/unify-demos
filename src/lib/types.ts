/**
 * TypeScript type definitions for the Feature Flags demo application
 */

/**
 * Demo module information
 */
export interface DemoModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ComponentType;
}

/**
 * Feature flag status for UI display
 */
export interface FlagStatus {
  key: string;
  name: string;
  description: string;
  type: 'boolean' | 'string' | 'number';
  value: boolean | string | number;
  enabled?: boolean;
}

/**
 * CloudBees SDK initialization options
 */
export interface RoxSetupOptions {
  developmentOnly?: boolean;
  disableNetworkFetch?: boolean;
  fetchInterval?: number;
  [key: string]: any; // Allow other Rox-specific options
}
