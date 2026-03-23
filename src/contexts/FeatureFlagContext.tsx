/**
 * Feature Flag Context Provider
 *
 * This context provides access to CloudBees feature flags throughout the
 * React component tree. It handles SDK initialization and exposes flags
 * along with loading/initialization states.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { flags, initializeFeatureFlags } from '../lib/featureFlags';

/**
 * Context value shape
 */
interface FeatureFlagContextValue {
  /** All registered feature flags */
  flags: typeof flags;
  /** True while SDK is initializing */
  isLoading: boolean;
  /** True after SDK initialization completes (success or failure) */
  isInitialized: boolean;
  /** Error message if initialization failed */
  error: string | null;
}

/**
 * Feature Flag Context
 */
const FeatureFlagContext = createContext<FeatureFlagContextValue | undefined>(undefined);

/**
 * Feature Flag Provider Props
 */
interface FeatureFlagProviderProps {
  children: ReactNode;
}

/**
 * Feature Flag Provider Component
 *
 * Wraps the application and initializes the CloudBees SDK on mount.
 * Provides feature flags to all child components via context.
 *
 * @example
 * ```tsx
 * <FeatureFlagProvider>
 *   <App />
 * </FeatureFlagProvider>
 * ```
 */
export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Counter to force re-renders when Unify pushes new flag values
  const [, setConfigVersion] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        await initializeFeatureFlags({
          configurationFetchedHandler: (fetcherResults) => {
            if (mounted && fetcherResults.hasChanges) {
              console.log('Feature flags updated from CloudBees Unify');
              setConfigVersion(v => v + 1);
            }
          },
        });

        if (mounted) {
          setIsInitialized(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(errorMessage);
          console.error('Feature flag initialization error:', err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const value: FeatureFlagContextValue = {
    flags,
    isLoading,
    isInitialized,
    error,
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

/**
 * Hook to access Feature Flag Context
 *
 * Must be used within a FeatureFlagProvider.
 *
 * @returns Feature flag context value
 * @throws Error if used outside FeatureFlagProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { flags, isLoading } = useFeatureFlagContext();
 *
 *   if (isLoading) return <Spinner />;
 *
 *   return flags.myFlag.isEnabled() ? <NewFeature /> : <OldFeature />;
 * }
 * ```
 */
export function useFeatureFlagContext(): FeatureFlagContextValue {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error(
      'useFeatureFlagContext must be used within a FeatureFlagProvider. ' +
      'Make sure your component is wrapped with <FeatureFlagProvider>.'
    );
  }

  return context;
}
