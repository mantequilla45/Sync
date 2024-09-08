import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Clear the authentication token by setting the cookie to expire in the past
  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    serialize('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // Set expiration date to the past
    })
  );

  // Respond with a success message
  return NextResponse.json({ message: 'Logged out successfully' }, { headers });
}
