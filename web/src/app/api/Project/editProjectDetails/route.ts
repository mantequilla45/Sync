// src/app/api/Project/editProjectDetails/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/Firebase/FirebaseClient';
import { doc, updateDoc } from 'firebase/firestore';

export async function PUT(request: NextRequest) {
  try {
    const { projectId, updates } = await request.json();

    if (!projectId || !updates) {
      return NextResponse.json(
        { error: 'Project ID and update data are required' }, 
        { status: 400 }
      );
    }

    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, updates);

    return NextResponse.json({ 
      message: 'Project details updated successfully',
      updated: updates
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project details' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
