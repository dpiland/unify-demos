/**
 * User Management System
 *
 * Provides a fake user authentication system for demos.
 * Users can "log in" by selecting a persona, which sets their properties
 * for feature flag targeting.
 *
 * This allows demos to showcase:
 * - User segmentation and targeting
 * - Different user experiences based on properties
 * - A/B testing with different user types
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
 * Default Demo Users
 *
 * These users represent common personas for demonstrations.
 * Customize these for your specific demo use case.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'standard-user',
    name: 'Alex Standard',
    email: 'alex.standard@example.com',
    description: 'Regular user with standard features',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: false,
      },
      strings: {
        accountType: 'basic',
        userTier: 'standard',
        region: 'us-east',
        userId: 'standard-user',
      },
      numbers: {
        accountAge: 12, // months
        usageLevel: 5, // low usage
      },
    },
  },
  {
    id: 'premium-user',
    name: 'Jordan Premium',
    email: 'jordan.premium@example.com',
    description: 'Premium customer with access to advanced features',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
      },
      strings: {
        accountType: 'premium',
        userTier: 'premium',
        region: 'us-west',
        userId: 'premium-user',
      },
      numbers: {
        accountAge: 36, // months
        usageLevel: 25, // high usage
      },
    },
  },
  {
    id: 'beta-tester',
    name: 'Sam Beta',
    email: 'sam.beta@example.com',
    description: 'Beta tester with access to experimental features',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: true,
        isNewUser: false,
      },
      strings: {
        accountType: 'basic',
        userTier: 'beta',
        region: 'us-west',
        userId: 'beta-tester',
      },
      numbers: {
        accountAge: 24, // months
        usageLevel: 15, // medium usage
      },
    },
  },
  {
    id: 'new-user',
    name: 'Taylor New',
    email: 'taylor.new@example.com',
    description: 'New user just getting started',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
      },
      strings: {
        accountType: 'basic',
        userTier: 'new',
        region: 'us-east',
        userId: 'new-user',
      },
      numbers: {
        accountAge: 1, // months
        usageLevel: 2, // very low usage
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
