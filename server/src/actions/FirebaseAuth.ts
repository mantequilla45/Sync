import admin from "../lib/FirebaseAdmin";

export const verifyIdToken = async (token: string) => {
    return await admin.auth().verifyIdToken(token);
  };
  