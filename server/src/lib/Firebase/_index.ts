import admin from "./FirebaseAdmin";

export const auth = admin.auth();
export const bucket = admin.storage().bucket();
export const db = admin.firestore();