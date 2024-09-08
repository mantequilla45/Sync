
import * as admin from 'firebase-admin';
import serviceAccount from '../../../lib/hostingtest-aadc2-firebase-adminsdk-s9rmc-a75b9b5849.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const verifyIdToken = async (token: string) => {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };

export default admin;