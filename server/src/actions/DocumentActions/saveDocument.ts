import { db, bucket } from '../../lib/Firebase/_index';

export const saveDocument = async (documentID: string, projectId: string, documentContent: string) => {
    const projectRef = db.collection('projects').doc(projectId);
    const documentRef = db.collection('documents').doc(documentID);

    const fileName = `documents/${documentID}.html`;

    await db.runTransaction(async(transaction) => {
        transaction.update(documentRef, {
            updatedAt: Date.now()
        })
        transaction.update(projectRef, {
            updatedAt: Date.now()
        })
        
        const file = bucket.file(fileName);
        await file.save(documentContent, {
          metadata: {
            contentType: 'text/html'
          }
        });
    })
}