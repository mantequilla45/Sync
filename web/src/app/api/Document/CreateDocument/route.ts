import { NextResponse } from 'next/server';
import { Document } from '../../../../../../_shared/interface';
import { db } from '@/lib/Firebase/_index';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    const formData = await req.formData();

    const projectId = formData.get('projectId');
    const documentTitle = formData.get('title');
    const filePath = formData.get('filePath');

    if (!projectId || !documentTitle || !filePath) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const projectRef = db.collection('projects').doc(projectId as string);
    const projectSnapshot = await projectRef.get();
    if (!projectSnapshot.exists) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }


    const newDocument: Document = {
      UID: '',
      title: documentTitle as string,
      filePath: filePath as string,
      createdBy: userId,
      lastEditedBy: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collaboratorUIDs: [],
      activeUserUIDs: [],
      versionHistoryUIDs: [],
      permissionUIDs: [],
      commentUIDs: [],
      taskUIDs: []
    };

    const documentRef = db.collection('documents').doc();
    newDocument.UID = documentRef.id;


    await documentRef.set(newDocument, { merge: true });

    await projectRef.update({
      documentUIDs: FieldValue.arrayUnion(newDocument.UID)
    });

    return NextResponse.json({ status: 200, documentId: newDocument.UID });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}
