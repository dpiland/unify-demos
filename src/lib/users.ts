/**
 * Audience Personas — Albert Invent Product Marketing Portfolio
 *
 * Each persona is a member of Drew Piland's Round 5 interview panel. Logging in
 * as a panelist loads the view built for THAT person's function — what Drew would
 * own and ship to make their job easier in the first 90 days.
 *
 * The persona's `defaultView` drives which experience renders. CloudBees Feature
 * Management can override it server-side via the `audienceView` flag (targeted on
 * the `panelistId` property set below), but the app is fully functional offline on
 * these defaults — so a live demo never depends on the network.
 */

export type AudienceView = 'overview' | 'content' | 'panel' | 'product' | 'sales';

export interface User {
  id: string;
  name: string;
  email: string;
  /** Job title shown under the name */
  role: string;
  /** Which audience experience this persona opens */
  defaultView: AudienceView;
  /** Short line describing what this view delivers for them */
  description: string;
  /** Accent color for this persona's chip / avatar */
  accent: string;

  // Properties for CloudBees feature flag targeting
  properties: {
    booleans: Record<string, boolean>;
    strings: Record<string, string>;
    numbers: Record<string, number>;
  };
}

/**
 * The panel (Round 5, Albert Invent — 2026-06-25)
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'brooke',
    name: 'Brooke Kuei',
    email: 'brooke.kuei@albertinvent.com',
    role: 'Content Marketing Manager',
    defaultView: 'content',
    description: 'Customer journey, content audit, and the gaps a first PMM closes.',
    accent: '#7D19FE',
    properties: {
      booleans: { isPanelist: true },
      strings: {
        panelistId: 'brooke',
        audience: 'content',
        userTier: 'content',
        region: 'us-east',
        userId: 'brooke',
      },
      numbers: { blockOrder: 1 },
    },
  },
  {
    id: 'dana',
    name: 'Dana Barrett',
    email: 'dana.barrett@albertinvent.com',
    role: 'VP Marketing · Hiring Manager',
    defaultView: 'panel',
    description: 'Case study walkthrough — the launch I led (Pt 1) and the category narrative (Pt 2).',
    accent: '#6a0fe0',
    properties: {
      booleans: { isPanelist: true, isHiringManager: true },
      strings: {
        panelistId: 'dana',
        audience: 'panel',
        userTier: 'leadership',
        region: 'us-west',
        userId: 'dana',
      },
      numbers: { blockOrder: 2 },
    },
  },
  {
    id: 'oakley',
    name: 'Oakley Reid',
    email: 'oakley.reid@albertinvent.com',
    role: 'AI/ML Product Manager',
    defaultView: 'product',
    description: 'Market awareness, testing the category message, and analyst strategy.',
    accent: '#9445fe',
    properties: {
      booleans: { isPanelist: true, isProduct: true },
      strings: {
        panelistId: 'oakley',
        audience: 'product',
        userTier: 'product',
        region: 'us-west',
        userId: 'oakley',
      },
      numbers: { blockOrder: 4 },
    },
  },
  {
    id: 'mark',
    name: 'Mark Poggi',
    email: 'mark.poggi@albertinvent.com',
    role: 'SVP Commercial',
    defaultView: 'sales',
    description: 'Sales progression tools, self-serve enablement, and onboarding.',
    accent: '#5511b0',
    properties: {
      booleans: { isPanelist: true, isRevenue: true },
      strings: {
        panelistId: 'mark',
        audience: 'sales',
        userTier: 'commercial',
        region: 'us-east',
        userId: 'mark',
      },
      numbers: { blockOrder: 5 },
    },
  },
];

/** A neutral landing persona that opens the overview (used as the demo intro). */
export const OVERVIEW_USER: User = {
  id: 'overview',
  name: 'Drew Piland',
  email: 'jdpiland6@gmail.com',
  role: 'Product Marketing — Candidate',
  defaultView: 'overview',
  description: 'The map: one portfolio, four audiences, four jobs to be done.',
  accent: '#2a0856',
  properties: {
    booleans: { isPanelist: false },
    strings: {
      panelistId: 'overview',
      audience: 'overview',
      userTier: 'candidate',
      region: 'us-east',
      userId: 'overview',
    },
    numbers: { blockOrder: 0 },
  },
};

export const ALL_USERS: User[] = [OVERVIEW_USER, ...DEFAULT_USERS];

export function getUserById(id: string): User | undefined {
  return ALL_USERS.find(user => user.id === id);
}

/** Get user initials for avatar display */
export function getUserInitials(name: string): string {
  const baseName = name.replace(/\s*\(.*\)$/, '');
  return baseName
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

const STORAGE_KEY = 'albert_pmm_current_user';

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
