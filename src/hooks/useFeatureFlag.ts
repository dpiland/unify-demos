/**
 * Feature Flag Hooks
 *
 * Convenience hooks for accessing feature flags in React components.
 * These hooks provide a simple, type-safe API for checking flag values.
 */

import { useFeatureFlagContext } from '../contexts/FeatureFlagContext';
import type { FlagKey } from '../lib/featureFlags';

/**
 * Hook to check if a boolean feature flag is enabled
 *
 * @param flagKey - The key of the flag to check
 * @returns True if flag is enabled, false otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isEnabled = useFeatureFlag('enableNewDashboard');
 *
 *   return isEnabled ? <NewDashboard /> : <OldDashboard />;
 * }
 * ```
 */
export function useFeatureFlag(flagKey: FlagKey): boolean {
  const { flags } = useFeatureFlagContext();
  const flag = flags[flagKey];

  // Check if this is a boolean flag
  if ('isEnabled' in flag && typeof flag.isEnabled === 'function') {
    return flag.isEnabled();
  }

  // For non-boolean flags, return false
  console.warn(`Flag "${flagKey}" is not a boolean flag. Use useFeatureFlagString or useFeatureFlagNumber instead.`);
  return false;
}

/**
 * Hook to get a string feature flag value
 *
 * @param flagKey - The key of the flag to get
 * @returns The string value of the flag
 *
 * @example
 * ```tsx
 * function CheckoutButton() {
 *   const variant = useFeatureFlagString('checkoutVariant');
 *
 *   return (
 *     <Button variant={variant}>
 *       {variant === 'express' ? 'Express Checkout' : 'Checkout'}
 *     </Button>
 *   );
 * }
 * ```
 */
export function useFeatureFlagString(flagKey: FlagKey): string {
  const { flags } = useFeatureFlagContext();
  const flag = flags[flagKey];

  if ('getValue' in flag && typeof flag.getValue === 'function') {
    const value = flag.getValue();
    return typeof value === 'string' ? value : String(value);
  }

  console.warn(`Flag "${flagKey}" does not have a getValue method.`);
  return '';
}

/**
 * Hook to get a number feature flag value
 *
 * @param flagKey - The key of the flag to get
 * @returns The numeric value of the flag
 *
 * @example
 * ```tsx
 * function ProductGrid() {
 *   const pageSize = useFeatureFlagNumber('itemsPerPage');
 *
 *   return <Pagination pageSize={pageSize} />;
 * }
 * ```
 */
export function useFeatureFlagNumber(flagKey: FlagKey): number {
  const { flags } = useFeatureFlagContext();
  const flag = flags[flagKey];

  if ('getValue' in flag && typeof flag.getValue === 'function') {
    const value = flag.getValue();
    return typeof value === 'number' ? value : Number(value);
  }

  console.warn(`Flag "${flagKey}" does not have a getValue method.`);
  return 0;
}

/**
 * Hook to get a feature flag value with loading state
 *
 * Useful when you need to show a loading indicator while the SDK initializes.
 *
 * @param flagKey - The key of the flag to check
 * @returns Object with flag state and loading status
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isEnabled, isLoading } = useFeatureFlagWithStatus('enableBetaFeatures');
 *
 *   if (isLoading) return <Skeleton />;
 *
 *   return isEnabled ? <BetaFeature /> : <StandardFeature />;
 * }
 * ```
 */
export function useFeatureFlagWithStatus(flagKey: FlagKey) {
  const { flags, isLoading } = useFeatureFlagContext();
  const flag = flags[flagKey];

  let isEnabled = false;
  if ('isEnabled' in flag && typeof flag.isEnabled === 'function') {
    isEnabled = flag.isEnabled();
  }

  return {
    isEnabled,
    isLoading,
  };
}

/**
 * Hook to get all feature flag information
 *
 * Returns the entire context for advanced use cases where you need
 * access to loading state, initialization status, and all flags.
 *
 * @returns Complete feature flag context
 *
 * @example
 * ```tsx
 * function DebugPanel() {
 *   const { flags, isLoading, isInitialized, error } = useFeatureFlags();
 *
 *   return (
 *     <div>
 *       <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
 *       <p>Initialized: {isInitialized ? 'Yes' : 'No'}</p>
 *       {error && <p>Error: {error}</p>}
 *       <pre>{JSON.stringify(flags, null, 2)}</pre>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFeatureFlags() {
  return useFeatureFlagContext();
}
