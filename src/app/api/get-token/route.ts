// src/pages/api/get-token.ts

import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from 'next-firebase-auth-edge';
import { authConfig } from '@/middleware'; // Ensure authConfig is correctly set up

export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies;
    const tokens = await getTokens(cookies, authConfig);

    if (!tokens?.token) {
      return NextResponse.json({ error: 'No valid token found' }, { status: 401 });
    }

    return NextResponse.json({ token: tokens.token });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve tokens' }, { status: 500 });
  }
}
