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
 * Each persona has properties that can be used for feature flag targeting
 * via the `customerSegment` string property in CloudBees Unify.
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'student',
    name: 'Jamie Chen (Student)',
    email: 'jamie.chen@horizonbank.com',
    description: 'College junior managing student finances and building credit',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
        hasInvestmentAccount: false,
        isStudent: true,
        hasMortgage: false,
      },
      strings: {
        accountType: 'student',
        customerSegment: 'student',
        userTier: 'standard',
        region: 'us-east',
        userId: 'student',
      },
      numbers: {
        accountBalance: 1820,
        customerTenureMonths: 8,
        creditScore: 670,
        monthlyTransactions: 22,
      },
    },
  },
  {
    id: 'mortgage',
    name: 'Pat Holloway (Mortgage)',
    email: 'pat.holloway@horizonbank.com',
    description: 'Homeowner with an active mortgage and checking account',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: false,
        hasInvestmentAccount: false,
        isStudent: false,
        hasMortgage: true,
      },
      strings: {
        accountType: 'mortgage',
        customerSegment: 'mortgage',
        userTier: 'standard',
        region: 'us-east',
        userId: 'mortgage',
      },
      numbers: {
        accountBalance: 11400,
        customerTenureMonths: 48,
        creditScore: 740,
        monthlyTransactions: 40,
      },
    },
  },
  {
    id: 'financial-planning',
    name: 'Morgan Whitfield (Financial Planning)',
    email: 'morgan.whitfield@horizonbank.com',
    description: 'Wealth management client with investment and premier accounts',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        hasInvestmentAccount: true,
        isStudent: false,
        hasMortgage: false,
      },
      strings: {
        accountType: 'premier',
        customerSegment: 'financial-planning',
        userTier: 'premier',
        region: 'us-west',
        userId: 'financial-planning',
      },
      numbers: {
        accountBalance: 245000,
        customerTenureMonths: 84,
        creditScore: 810,
        monthlyTransactions: 75,
      },
    },
  },
  {
    id: 'checking-savings',
    name: 'Alex Rivera (Checking/Savings)',
    email: 'alex.rivera@horizonbank.com',
    description: 'Everyday checking and savings customer',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: false,
        hasInvestmentAccount: false,
        isStudent: false,
        hasMortgage: false,
      },
      strings: {
        accountType: 'checking',
        customerSegment: 'checking-savings',
        userTier: 'standard',
        region: 'us-west',
        userId: 'checking-savings',
      },
      numbers: {
        accountBalance: 5600,
        customerTenureMonths: 24,
        creditScore: 720,
        monthlyTransactions: 38,
      },
    },
  },
  {
    id: 'admin',
    name: 'Dana Admin (Admin)',
    email: 'dana.admin@horizonbank.com',
    description: 'Internal admin with visibility into all features and modules',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: true,
        isNewUser: false,
        hasInvestmentAccount: true,
        isStudent: false,
        hasMortgage: true,
      },
      strings: {
        accountType: 'admin',
        customerSegment: 'admin',
        userTier: 'admin',
        region: 'us-east',
        userId: 'admin',
      },
      numbers: {
        accountBalance: 100000,
        customerTenureMonths: 120,
        creditScore: 850,
        monthlyTransactions: 100,
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
  const baseName = name.replace(/\s*\(.*\)$/, '');
  return baseName
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
