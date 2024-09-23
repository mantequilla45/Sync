// app/api/getProfileImage/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bucket } from '@/lib/Firebase/_index';
// Import your reusable Firebase Admin instance

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get('uid');
  const imagePath = request.nextUrl.searchParams.get('imagePath')

  if (!uid || !imagePath) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const file = bucket.file(imagePath);

    // Generate a signed URL (valid for 1 hour by default)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
