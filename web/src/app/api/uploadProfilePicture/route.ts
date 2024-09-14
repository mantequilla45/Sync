// /app/api/upload-profile-picture/route.ts
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { Readable } from 'stream';
import admin from '@/lib/FirebaseAdmin';

export async function POST(req: Request) {
  try {
    // Extract the file from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get a readable stream for the file
    const buffer = await file.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    // Firebase Storage bucket reference
    const bucket = admin.storage().bucket();

    // Get the user ID from the request headers (x-user-id)
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    // Use the file extension from the uploaded file
    const fileExtension = file.name.split('.').pop(); // Get the file extension
    const fileName = `profile-pictures/${userId}/${userId}.${fileExtension}`; // Name the file as uid.extension

    const upload = bucket.file(fileName).createWriteStream({
      metadata: {
        contentType: file.type, // Ensure the correct content type is used
      },
    });

    stream.pipe(upload);

    // Wait for the upload to finish
    await new Promise((resolve, reject) => {
      upload.on('finish', resolve);
      upload.on('error', reject);
    });

    // Generate the new file URL
    const photoURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    console.log(photoURL);

    // Update the user's profile in Firebase Auth with the new photoURL
    const auth = getAuth();
    await auth.updateUser(userId, {
      photoURL,
    });

    // Return the URL of the newly uploaded file
    return NextResponse.json({ photoURL }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
