import admin from "../lib/FirebaseAdmin";
import { UserStatus } from "../../../_shared/enums";

const db = admin.firestore()

export const updateUserStatus = async (uid: string, status: UserStatus) => {
    const userStatusRef = db.doc(`users/${uid}`);
    await userStatusRef.set({
      state: status,
      lastActive: Date.now(),
    }, { merge: true });
  };
  