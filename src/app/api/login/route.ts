import { NextResponse } from 'next/server';
import { verifyIdToken } from '../../lib/FirebaseAdmin';
import { serialize } from 'cookie';

export async function GET(request: Request) {
  const responseBody = { message: 'Hello, world!' };
  return NextResponse.json(responseBody);
}

export async function POST(request: Request) {
  const authorizationHeader = request.headers.get('authorization');
  const token = authorizationHeader?.split('Bearer ')[1];
  console.log(token);

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);
    const { uid, email } = decodedToken;

    const cookie = serialize('authToken', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',   
      path: '/',            
      maxAge: 60 * 60,     
    });

    const response = NextResponse.json({
      message: `User ${email} authenticated successfully!`,
      userId: uid,
    }, { status: 200 });

    response.headers.set('Set-Cookie', cookie);

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}