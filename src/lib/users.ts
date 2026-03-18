/**
 * User Management System — NovaCRM SaaS Dashboard
 *
 * Provides a fake user authentication system for demos.
 * Users can "log in" by selecting a persona, which sets their properties
 * for feature flag targeting.
 *
 * This allows demos to showcase:
 * - Subscription-tier-based targeting
 * - Role-based feature gating
 * - Usage-based rollouts
 */

/**
 * User Interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  description: string;

  // Properties for feature flag targeting
  properties: {
    // Boolean properties
    booleans: Record<string, boolean>;
    // String properties
    strings: Record<string, string>;
    // Number properties
    numbers: Record<string, number>;
  };
}

/**
 * Default Demo Users — SaaS Platform Personas
 *
 * Four personas representing common SaaS user types with
 * different subscription tiers, roles, and usage levels.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'platform-admin',
    name: 'Sarah Admin',
    email: 'sarah.admin@novacrm.io',
    description: 'Platform administrator managing all customer accounts',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        isAdmin: true,
      },
      strings: {
        accountType: 'enterprise',
        subscriptionTier: 'enterprise',
        role: 'admin',
        region: 'us-west',
        userId: 'platform-admin',
      },
      numbers: {
        accountAge: 48,
        usageLevel: 95,
        accountMRR: 12500,
        seatCount: 150,
      },
    },
  },
  {
    id: 'developer-user',
    name: 'Dev Patel',
    email: 'dev.patel@startup.io',
    description: 'Developer on a starter plan building integrations',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: true,
        isNewUser: false,
        isAdmin: false,
      },
      strings: {
        accountType: 'starter',
        subscriptionTier: 'starter',
        role: 'developer',
        region: 'us-east',
        userId: 'developer-user',
      },
      numbers: {
        accountAge: 18,
        usageLevel: 40,
        accountMRR: 299,
        seatCount: 5,
      },
    },
  },
  {
    id: 'enterprise-csm',
    name: 'Morgan Enterprise',
    email: 'morgan.e@bigcorp.com',
    description: 'Enterprise customer with premium support and analytics',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        isAdmin: false,
      },
      strings: {
        accountType: 'enterprise',
        subscriptionTier: 'enterprise',
        role: 'customer-success',
        region: 'eu-west',
        userId: 'enterprise-csm',
      },
      numbers: {
        accountAge: 36,
        usageLevel: 75,
        accountMRR: 8500,
        seatCount: 85,
      },
    },
  },
  {
    id: 'trial-user',
    name: 'Riley Trial',
    email: 'riley.trial@newco.io',
    description: 'New trial user exploring the platform for the first time',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
        isAdmin: false,
      },
      strings: {
        accountType: 'trial',
        subscriptionTier: 'trial',
        role: 'viewer',
        region: 'us-east',
        userId: 'trial-user',
      },
      numbers: {
        accountAge: 0,
        usageLevel: 3,
        accountMRR: 0,
        seatCount: 1,
      },
    },
  },
];

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return DEFAULT_USERS.find(user => user.id === id);
}

/**
 * Get user initials for avatar display
 */
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

/**
 * Local Storage Keys
 */
const STORAGE_KEY = 'demo_current_user';

/**
 * Save current user to local storage
 */
export function saveCurrentUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
}

/**
 * Load current user from local storage
 */
export function loadCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch (error) {
    console.error('Failed to load user from localStorage:', error);
    return null;
  }
}

/**
 * Clear current user (logout)
 */
export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user from localStorage:', error);
  }
}
