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
 * Default Airline Passenger Personas
 *
 * These users represent different types of airline passengers for demonstrations.
 * Each persona has unique properties that enable targeted feature flag rules.
 *
 * TARGETING USE CASES:
 * - Economy passengers see standard features + upgrade offers
 * - Business passengers get lounge access and priority services
 * - Elite frequent flyers get all premium features
 * - Staff members have employee-specific features and restrictions
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'economy-traveler',
    name: 'Emma Economy',
    email: 'emma.economy@example.com',
    description: 'Leisure traveler with economy class ticket and no loyalty status',
    properties: {
      booleans: {
        hasLoungeAccess: false,
        isPremiumMember: false,
        isBusinessClass: false,
        hasCheckedIn: false,
        hasPriorityBoarding: false,
        isFrequentFlyer: false,
      },
      strings: {
        membershipTier: 'standard',
        cabinClass: 'economy',
        bookingType: 'leisure',
        homeAirport: 'JFK',
        region: 'us-east',
        userId: 'economy-001',
      },
      numbers: {
        frequentFlyerMiles: 2500,
        totalFlights: 4,
        membershipYears: 0,
        averageSpend: 350,
        currentBookings: 1,
      },
    },
  },
  {
    id: 'business-passenger',
    name: 'Bryan Business',
    email: 'bryan.business@example.com',
    description: 'Corporate traveler with business class ticket and lounge access',
    properties: {
      booleans: {
        hasLoungeAccess: true,
        isPremiumMember: false,
        isBusinessClass: true,
        hasCheckedIn: true,
        hasPriorityBoarding: true,
        isFrequentFlyer: false,
      },
      strings: {
        membershipTier: 'standard',
        cabinClass: 'business',
        bookingType: 'corporate',
        homeAirport: 'LAX',
        region: 'us-west',
        userId: 'business-001',
      },
      numbers: {
        frequentFlyerMiles: 15000,
        totalFlights: 18,
        membershipYears: 2,
        averageSpend: 1800,
        currentBookings: 2,
      },
    },
  },
  {
    id: 'elite-flyer',
    name: 'Olivia Elite',
    email: 'olivia.elite@example.com',
    description: 'Elite frequent flyer with top-tier status and exclusive benefits',
    properties: {
      booleans: {
        hasLoungeAccess: true,
        isPremiumMember: true,
        isBusinessClass: false, // Flies economy but gets upgrades
        hasCheckedIn: true,
        hasPriorityBoarding: true,
        isFrequentFlyer: true,
      },
      strings: {
        membershipTier: 'platinum',
        cabinClass: 'economy-plus',
        bookingType: 'leisure',
        homeAirport: 'SFO',
        region: 'us-west',
        userId: 'elite-001',
      },
      numbers: {
        frequentFlyerMiles: 185000,
        totalFlights: 127,
        membershipYears: 8,
        averageSpend: 2400,
        currentBookings: 3,
      },
    },
  },
  {
    id: 'airline-staff',
    name: 'Alex Staff',
    email: 'alex.staff@airlineco.com',
    description: 'Airline employee traveling on staff benefits',
    properties: {
      booleans: {
        hasLoungeAccess: true,
        isPremiumMember: false,
        isBusinessClass: false,
        hasCheckedIn: false,
        hasPriorityBoarding: false,
        isFrequentFlyer: false,
        isStaffMember: true, // Special property for staff
      },
      strings: {
        membershipTier: 'employee',
        cabinClass: 'standby',
        bookingType: 'employee',
        homeAirport: 'ORD',
        region: 'us-central',
        userId: 'staff-001',
        employeeDepartment: 'operations',
      },
      numbers: {
        frequentFlyerMiles: 0, // Staff don't earn miles on employee travel
        totalFlights: 52,
        membershipYears: 5,
        averageSpend: 0, // Employee tickets
        currentBookings: 1,
        employeeId: 10423,
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
