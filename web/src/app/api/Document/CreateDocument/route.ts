import { NextResponse } from 'next/server';
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

    if (!projectId || !documentTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userRef = db.collection("users").doc(userId);
    const projectRef = db.collection('projects').doc(projectId as string);
    const documentRef = db.collection('documents').doc();

    const fileName = `documents/${documentRef.id}.html`;

    await db.runTransaction(async (transaction) => {
      const projectSnapshot = await transaction.get(projectRef);

      if (!projectSnapshot.exists) {
        throw new Error('Project not found');
      }


      const newDocument = {
        UID: documentRef.id,
        title: documentTitle as string,
        filePath: '',
        createdBy: userRef,
        lastEditedBy: userRef,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        collaboratorUIDs: [],
        activeUserUIDs: [],
        versionHistoryUIDs: [],
        commentUIDs: [],
        taskUIDs: [],
        projectUID: projectRef
      };

      const file = bucket.file(fileName);
      await file.save('', {
        metadata: {
          contentType: 'text/html'
        }
      });

      const filePath = `gs://${bucket.name}/${fileName}`;
      newDocument.filePath = filePath;

      // Save document metadata in Firestore
      transaction.set(documentRef, newDocument, { merge: true });
      transaction.update(projectRef, {
        documentUIDs: FieldValue.arrayUnion(documentRef)
      });
    });

    return NextResponse.json({ status: 200, documentId: documentRef.id, filePath: fileName });
  } catch (error) {
    console.error('Error creating document and HTML file:', error);
    return NextResponse.json({ error: 'Failed to create document and HTML file' }, { status: 500 });
  }
}
