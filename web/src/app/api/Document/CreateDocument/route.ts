import { NextResponse } from 'next/server';
import { Document } from '../../../../../../_shared/interface';
import { db, bucket } from '@/lib/Firebase/_index';
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

    console.log(projectId)
    if (!projectId || !documentTitle) {
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
      filePath: '',  // Will be updated with the Firebase Storage file path
      createdBy: userId,
      lastEditedBy: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      collaboratorUIDs: [],
      activeUserUIDs: [],
      versionHistoryUIDs: [],
      commentUIDs: [],
      taskUIDs: []
    };

    const documentRef = db.collection('documents').doc();
    newDocument.UID = documentRef.id;

    const fileName = `documents/${newDocument.UID}.json`;
    
    const emptyDelta = {
      ops: []  // Empty Quill delta structure
    };

    const file = bucket.file(fileName);

    await file.save(JSON.stringify(emptyDelta), {
      metadata: {
        contentType: 'application/json'
      }
    });

    const filePath = `gs://${bucket.name}/${fileName}`;
    newDocument.filePath = filePath;

    await documentRef.set(newDocument, { merge: true });

    await projectRef.update({
      documentUIDs: FieldValue.arrayUnion(newDocument.UID)
    });

    return NextResponse.json({ status: 200, documentId: newDocument.UID, filePath: fileName });
  } catch (error) {
    console.error('Error creating document and JSON delta file:', error);
    return NextResponse.json({ error: 'Failed to create document and JSON delta file' }, { status: 500 });
  }
}
