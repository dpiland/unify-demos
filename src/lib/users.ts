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
 * Horizon Bank User Personas
 *
 * These represent different banking customer segments for demonstrations.
 * Each persona has properties that can be used for feature flag targeting.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'standard-checking',
    name: 'Sarah Everyday',
    email: 'sarah.everyday@horizonbank.com',
    description: 'Standard checking account holder with everyday banking needs',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: false,
        hasInvestmentAccount: false,
      },
      strings: {
        accountType: 'checking',
        userTier: 'standard',
        region: 'us-east',
        userId: 'standard-checking',
      },
      numbers: {
        accountBalance: 4250,
        customerTenureMonths: 18,
        creditScore: 710,
        monthlyTransactions: 35,
      },
    },
  },
  {
    id: 'premier-customer',
    name: 'Marcus Premier',
    email: 'marcus.premier@horizonbank.com',
    description: 'Premier banking customer with investment accounts and high balances',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        hasInvestmentAccount: true,
      },
      strings: {
        accountType: 'premier',
        userTier: 'premier',
        region: 'us-west',
        userId: 'premier-customer',
      },
      numbers: {
        accountBalance: 187500,
        customerTenureMonths: 72,
        creditScore: 805,
        monthlyTransactions: 85,
      },
    },
  },
  {
    id: 'beta-banker',
    name: 'Dev Tester',
    email: 'dev.tester@horizonbank.com',
    description: 'Internal beta tester with access to experimental banking features',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: true,
        isNewUser: false,
        hasInvestmentAccount: true,
      },
      strings: {
        accountType: 'checking',
        userTier: 'beta',
        region: 'us-west',
        userId: 'beta-banker',
      },
      numbers: {
        accountBalance: 12800,
        customerTenureMonths: 30,
        creditScore: 745,
        monthlyTransactions: 50,
      },
    },
  },
  {
    id: 'new-member',
    name: 'Priya Newmember',
    email: 'priya.new@horizonbank.com',
    description: 'New customer who recently opened a checking account',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
        hasInvestmentAccount: false,
      },
      strings: {
        accountType: 'checking',
        userTier: 'new',
        region: 'us-east',
        userId: 'new-member',
      },
      numbers: {
        accountBalance: 1500,
        customerTenureMonths: 2,
        creditScore: 680,
        monthlyTransactions: 12,
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
