/**
 * User Management System - Ridgeline Outfitters
 *
 * Provides a fake user authentication system for demos.
 * Users can "log in" by selecting an outdoor persona, which sets their
 * properties for feature flag targeting.
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

  properties: {
    booleans: Record<string, boolean>;
    strings: Record<string, string>;
    numbers: Record<string, number>;
  };
}

/**
 * Default Demo Users - Outdoor Enthusiast Personas
 *
 * These users represent common outdoor gear customer personas.
 * Each persona has different properties that enable targeted feature rollouts
 * and personalized shopping experiences.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'vip-shopper',
    name: 'Jordan Summit (VIP)',
    email: 'jordan.summit@example.com',
    description: 'Backcountry expert and Pro member with premium gear access',
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
        lifetimeSpend: 2500,
        loyaltyPoints: 2500,
        memberSince: 36,
        averageOrderValue: 225,
        cartItemCount: 5,
      },
    },
  },
  {
    id: 'beta-tester',
    name: 'Sam Trailtest (Beta)',
    email: 'sam.trailtest@example.com',
    description: 'Field tester evaluating new gear and site features',
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
        lifetimeSpend: 1200,
        loyaltyPoints: 350,
        memberSince: 18,
        averageOrderValue: 120,
        cartItemCount: 2,
      },
    },
  },
  {
    id: 'regular-shopper',
    name: 'Riley Dayhiker (Basic)',
    email: 'riley.dayhiker@example.com',
    description: 'Weekend hiker shopping for everyday trail gear',
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
        lifetimeSpend: 450,
        loyaltyPoints: 100,
        memberSince: 12,
        averageOrderValue: 85,
        cartItemCount: 3,
      },
    },
  },
  {
    id: 'new-shopper',
    name: 'Alex Explorer (New)',
    email: 'alex.explorer@example.com',
    description: 'First-time visitor discovering outdoor gear',
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
        lifetimeSpend: 0,
        loyaltyPoints: 0,
        memberSince: 0,
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
    .replace(/\(.*\)/, '')
    .trim()
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
