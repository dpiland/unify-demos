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
 * Default Demo Users - EliteShop Shopping Personas
 *
 * These users represent common e-commerce customer personas for demonstrations.
 * Each persona has different properties that enable targeted feature rollouts
 * and personalized shopping experiences.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'regular-shopper',
    name: 'Casey Standard',
    email: 'casey.standard@example.com',
    description: 'Regular shopper browsing for everyday items',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: false,
        hasActiveCart: true,
      },
      strings: {
        membershipTier: 'basic',
        shoppingPreference: 'price-conscious',
        region: 'us-east',
        userId: 'regular-shopper',
      },
      numbers: {
        lifetimeSpend: 450, // dollars
        loyaltyPoints: 100,
        memberSince: 12, // months
        averageOrderValue: 65,
        cartItemCount: 3,
      },
    },
  },
  {
    id: 'vip-shopper',
    name: 'Morgan Premium',
    email: 'morgan.premium@example.com',
    description: 'VIP member with premium perks and exclusive access',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        hasActiveCart: true,
      },
      strings: {
        membershipTier: 'vip',
        shoppingPreference: 'quality-focused',
        region: 'us-west',
        userId: 'vip-shopper',
      },
      numbers: {
        lifetimeSpend: 8500, // dollars
        loyaltyPoints: 2500,
        memberSince: 36, // months
        averageOrderValue: 185,
        cartItemCount: 5,
      },
    },
  },
  {
    id: 'beta-tester',
    name: 'Taylor Beta',
    email: 'taylor.beta@example.com',
    description: 'Beta tester helping evaluate new shopping features',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: true,
        isNewUser: false,
        hasActiveCart: true,
      },
      strings: {
        membershipTier: 'beta',
        shoppingPreference: 'tech-savvy',
        region: 'us-west',
        userId: 'beta-tester',
      },
      numbers: {
        lifetimeSpend: 1200, // dollars
        loyaltyPoints: 350,
        memberSince: 18, // months
        averageOrderValue: 95,
        cartItemCount: 2,
      },
    },
  },
  {
    id: 'new-shopper',
    name: 'Alex New',
    email: 'alex.new@example.com',
    description: 'First-time visitor exploring the store',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
        hasActiveCart: false,
      },
      strings: {
        membershipTier: 'new',
        shoppingPreference: 'browsing',
        region: 'us-east',
        userId: 'new-shopper',
      },
      numbers: {
        lifetimeSpend: 0, // dollars
        loyaltyPoints: 0,
        memberSince: 0, // months
        averageOrderValue: 0,
        cartItemCount: 0,
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
