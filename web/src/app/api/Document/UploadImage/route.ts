// app/api/uploadImage/route.ts
import { NextResponse } from 'next/server';
import { bucket } from '@/lib/Firebase/_index';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const uniqueFileName = `uploads/${Date.now()}-${file.name}`;

        const blob = bucket.file(uniqueFileName);
        const blobStream = blob.createWriteStream();

        blobStream.end(Buffer.from(await file.arrayBuffer()));

        // Wait for upload to complete
        await new Promise((resolve, reject) => {
            blobStream.on('finish', resolve);
            blobStream.on('error', reject);
        });

        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(uniqueFileName)}?alt=media`;

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Error uploading the image to Firebase', error);
        return NextResponse.json({ error: 'Failed to upload the image to Firebase' }, { status: 500 });
    }
}
