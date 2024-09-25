import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { bucket, auth } from '@/lib/Firebase/_index';

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id'); // Get UID from the headers set by middleware

    if (!userId) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));
    const fileExtension = file.name.split('.').pop();
    const fileName = `profile-pictures/${userId}/${userId}.${fileExtension}`;

    const upload = bucket.file(fileName).createWriteStream({
      metadata: {
        contentType: file.type,
      },
    });

    stream.pipe(upload);

    await new Promise((resolve, reject) => {
      upload.on('finish', resolve);
      upload.on('error', reject);
    });

    const photoURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    await auth.updateUser(userId, { photoURL });

    return NextResponse.json({ photoURL }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
