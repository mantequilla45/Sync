import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import admin from 'firebase-admin';

interface SessionVerificationResult {
  success: boolean;
  uid?: string;
  email?: string;
  message?: string;
}

export default async function verifySession(token: string | undefined): Promise<SessionVerificationResult> {
  if (!token) {
    return { success: false, message: 'No token provided' };
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return { success: true, uid: decodedToken.uid, email: decodedToken.email };
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' };
  }
}