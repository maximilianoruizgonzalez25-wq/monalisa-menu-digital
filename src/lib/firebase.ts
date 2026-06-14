/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { OperationType, FirestoreErrorInfo } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase app safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

// Strict Firestore error handler as required by systems guidelines
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Logging: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Check if Firebase is using dummy placeholder configuration
export function isFirebaseConfigPlaceholder(): boolean {
  return !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('placeholder') || firebaseConfig.projectId === 'dummy-project';
}
