import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const userId =  req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('name') as File;




    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
