import * as admin from 'firebase-admin';
import serviceAccount from './hostingtest-aadc2-firebase-adminsdk-s9rmc-a75b9b5849.json';
import { UserStatus } from '../../../_shared/enums';

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// Initialize Firestore
const db = admin.firestore();

export const verifyIdToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};

export const updateUserStatus = async (uid: string, status: UserStatus) => {
  const userStatusRef = db.doc(`status/${uid}`); // Use Firestore instance to get a document reference
  await userStatusRef.set({
    state: status,
    lastActive: Date.now(),
  }, { merge: true }); // `merge: true` updates existing fields without overwriting the entire document
};

export default admin;
export const auth = admin.auth();
