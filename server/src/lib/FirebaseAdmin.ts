import * as admin from 'firebase-admin';
import serviceAccount from './hostingtest-aadc2-firebase-adminsdk-s9rmc-a75b9b5849.json';

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "hostingtest-aadc2.appspot.com"
  });
}

export default admin;
export const auth = admin.auth();
export const bucket = admin.storage().bucket();
