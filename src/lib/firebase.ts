/**
 * MOCK FIREBASE CONFIGURATION
 * This file replaces the actual Firebase SDK to allow the app to run completely local.
 */

// Mock authentication state
export const isFirebaseConfigured = true;

// Mock User interface to replace Firebase User type
export interface User {
  uid: string;
  email: string | null;
  emailVerified?: boolean;
  displayName: string | null;
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "";
  phone?: string;
  photoURL: string | null;
  studentId: string | null;
  role?: "student" | "trainer" | "admin" | "air_g_student";
  credits?: number;
  streak?: number;
  lastVisit?: string;
  preferredLanguage?: string;
  walletBalance?: number;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

// Dummy objects to prevent import errors
export const auth = {};
export const db = {};

// Mock Auth functions
export const createUserWithEmailAndPassword = async () => ({ user: { uid: '123' } });
export const signInWithEmailAndPassword = async () => ({ user: { uid: '123' } });
export const signOut = async () => {};
export const onAuthStateChanged = (auth: any, callback: (user: User | null) => void) => {
  // We'll handle state in the context instead
  return () => {};
};

// Mock Firestore functions (Dummies)
export const collection = (db: any, path: string) => ({ path });
export const doc = (db: any, path: string, id: string) => ({ path, id });
export const getDocs = async () => ({ docs: [], empty: true });
export const getDoc = async () => ({ exists: () => false });
export const addDoc = async () => ({ id: 'new-id' });
export const updateDoc = async () => {};
export const deleteDoc = async () => {};
export const query = () => ({});
export const where = () => ({});
export const orderBy = () => ({});
export const limit = () => ({});

export default {
  isFirebaseConfigured,
  auth,
  db
};
