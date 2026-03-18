/**
 * User Management System — CloudBees Unify Control Plane
 *
 * Three personas representing Free, Team, and Enterprise plan tiers.
 * Each persona has different properties for feature flag targeting,
 * demonstrating how platform modules unlock based on subscription level.
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

export const DEFAULT_USERS: User[] = [
  {
    id: 'free-developer',
    name: 'Alex Free',
    email: 'alex.free@startup.io',
    description: 'Individual developer on the free plan exploring the platform',
    properties: {
      booleans: {
        isPremiumCustomer: false,
        isBetaTester: false,
        isNewUser: true,
        isAdmin: false,
      },
      strings: {
        planTier: 'free',
        role: 'developer',
        region: 'us-east',
        orgSize: 'individual',
        userId: 'free-developer',
      },
      numbers: {
        pipelinesCount: 2,
        deploymentFrequency: 5,
        teamSize: 1,
        accountAge: 1,
      },
    },
  },
  {
    id: 'team-lead',
    name: 'Jordan Team',
    email: 'jordan.team@midcorp.com',
    description: 'Engineering team lead with Team plan managing CI/CD pipelines',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: false,
        isNewUser: false,
        isAdmin: true,
      },
      strings: {
        planTier: 'team',
        role: 'team-lead',
        region: 'us-west',
        orgSize: 'mid-market',
        userId: 'team-lead',
      },
      numbers: {
        pipelinesCount: 25,
        deploymentFrequency: 50,
        teamSize: 12,
        accountAge: 18,
      },
    },
  },
  {
    id: 'cloudbees-admin',
    name: 'CB Admin',
    email: 'admin@cloudbees.com',
    description: 'CloudBees internal admin with full platform access and beta features',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: true,
        isNewUser: false,
        isAdmin: true,
        isCloudBeesAdmin: true,
      },
      strings: {
        planTier: 'enterprise',
        role: 'cloudbees-admin',
        region: 'us-west',
        orgSize: 'enterprise',
        userId: 'cloudbees-admin',
      },
      numbers: {
        pipelinesCount: 500,
        deploymentFrequency: 1000,
        teamSize: 200,
        accountAge: 60,
      },
    },
  },
  {
    id: 'enterprise-admin',
    name: 'Sam Enterprise',
    email: 'sam.enterprise@bigcorp.com',
    description: 'Enterprise platform engineer with full access to all modules',
    properties: {
      booleans: {
        isPremiumCustomer: true,
        isBetaTester: true,
        isNewUser: false,
        isAdmin: true,
      },
      strings: {
        planTier: 'enterprise',
        role: 'platform-engineer',
        region: 'eu-west',
        orgSize: 'enterprise',
        userId: 'enterprise-admin',
      },
      numbers: {
        pipelinesCount: 200,
        deploymentFrequency: 500,
        teamSize: 85,
        accountAge: 48,
      },
    },
  },
];

export function getUserById(id: string): User | undefined {
  return DEFAULT_USERS.find(user => user.id === id);
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

const STORAGE_KEY = 'demo_current_user';

export function saveCurrentUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to localStorage:', error);
  }
}

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

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear user from localStorage:', error);
  }
}
