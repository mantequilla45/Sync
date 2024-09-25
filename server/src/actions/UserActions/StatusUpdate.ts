import { db } from "../../lib/Firebase/_index";
import { UserStatus } from "../../../../_shared/enums";

export const updateUserStatus = async (uid: string, status: UserStatus) => {
    const userStatusRef = db.doc(`users/${uid}`);
    await userStatusRef.set({
      state: status,
      lastActive: Date.now(),
    }, { merge: true });
  };
  