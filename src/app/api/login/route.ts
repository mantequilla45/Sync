import { NextResponse } from 'next/server';
import { verifyIdToken } from '../../../../lib/FirebaseAdmin';

export async function GET(request: Request) {
  const responseBody = { message: 'Hello, world!' };
  return NextResponse.json(responseBody);
}

export async function POST(request: Request) {
  console.log("reached post")
  const authorizationHeader = request.headers.get('authorization');
  const token = authorizationHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);
    const { uid, email } = decodedToken;

    return NextResponse.json({
      message: `User ${email} authenticated successfully!`,
      userId: uid,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}