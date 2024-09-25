import admin from "./FirebaseAdmin";

export const bucket = admin.storage().bucket();
export const db = admin.firestore();
export const auth = admin.auth();