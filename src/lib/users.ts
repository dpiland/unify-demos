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
 * Default Healthcare Provider Personas
 *
 * These users represent different types of clinical providers for demonstrations.
 * Each persona has unique properties that enable targeted feature flag rules.
 *
 * TARGETING USE CASES:
 * - Primary care physicians see full clinical toolset
 * - Specialists get admin access and advanced features
 * - Nurse practitioners have prescribing but limited admin
 * - Residents have restricted access (no prescribing, no telemedicine)
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'primary-care',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@medconnect.com',
    description: 'Board-certified family medicine physician with a full patient panel',
    properties: {
      booleans: {
        isAttending: true,
        hasTelemedicineAccess: true,
        canPrescribe: true,
        isResident: false,
        hasAdminAccess: false,
      },
      strings: {
        role: 'physician',
        department: 'family-medicine',
        specialty: 'primary-care',
        region: 'us-east',
        userId: 'pcp-001',
      },
      numbers: {
        patientPanelSize: 1200,
        yearsOfExperience: 12,
        appointmentsPerDay: 22,
        activeCarePlans: 85,
      },
    },
  },
  {
    id: 'specialist',
    name: 'Dr. James Morton',
    email: 'james.morton@medconnect.com',
    description: 'Orthopedic surgeon with hospital privileges and advanced clinical access',
    properties: {
      booleans: {
        isAttending: true,
        hasTelemedicineAccess: true,
        canPrescribe: true,
        isResident: false,
        hasAdminAccess: true,
      },
      strings: {
        role: 'surgeon',
        department: 'orthopedics',
        specialty: 'orthopedic-surgery',
        region: 'us-west',
        userId: 'surg-001',
      },
      numbers: {
        patientPanelSize: 450,
        yearsOfExperience: 18,
        appointmentsPerDay: 10,
        activeCarePlans: 120,
      },
    },
  },
  {
    id: 'nurse-practitioner',
    name: 'Maria Lopez, NP',
    email: 'maria.lopez@medconnect.com',
    description: 'Family nurse practitioner managing chronic disease and wellness visits',
    properties: {
      booleans: {
        isAttending: false,
        hasTelemedicineAccess: true,
        canPrescribe: true,
        isResident: false,
        hasAdminAccess: false,
      },
      strings: {
        role: 'nurse-practitioner',
        department: 'family-medicine',
        specialty: 'chronic-disease',
        region: 'us-east',
        userId: 'np-001',
      },
      numbers: {
        patientPanelSize: 600,
        yearsOfExperience: 6,
        appointmentsPerDay: 18,
        activeCarePlans: 45,
      },
    },
  },
  {
    id: 'resident',
    name: 'Dr. Anil Patel',
    email: 'anil.patel@medconnect.com',
    description: 'Second-year internal medicine resident on clinical rotations',
    properties: {
      booleans: {
        isAttending: false,
        hasTelemedicineAccess: false,
        canPrescribe: false,
        isResident: true,
        hasAdminAccess: false,
      },
      strings: {
        role: 'resident',
        department: 'internal-medicine',
        specialty: 'general',
        region: 'us-east',
        userId: 'res-001',
      },
      numbers: {
        patientPanelSize: 30,
        yearsOfExperience: 1,
        appointmentsPerDay: 8,
        activeCarePlans: 10,
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
