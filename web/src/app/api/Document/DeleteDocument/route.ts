// src/app/api/Document/DeleteDocument/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    // Your delete document logic here
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}

// You can also export GET/POST/PUT if needed
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
