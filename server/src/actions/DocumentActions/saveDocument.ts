/*import { db, bucket } from '../../lib/Firebase/_index';

export const saveDocument = async (documentID: string, projectId: string, documentContent: string) => {
    const projectRef = db.collection('projects').doc(projectId);
    const documentRef = db.collection('documents').doc(documentID);

    const fileName = `documents/${documentID}.html`;

    // A4 styled HTML content
    const a4StyledContent = `
        <html>
            <head>
                <style>
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                    .a4-paper {
                        width: 210mm;
                        height: 297mm;
                        border: 1px solid #ccc;
                        padding: 20px;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                </style>
            </head>
            <body>
                <div class="a4-paper">${documentContent}</div>
            </body>
        </html>
    `;

    await db.runTransaction(async(transaction) => {
        transaction.update(documentRef, {
            updatedAt: Date.now()
        });
        transaction.update(projectRef, {
            updatedAt: Date.now()
        });
        
        const file = bucket.file(fileName);
        await file.save(a4StyledContent, {
            metadata: {
                contentType: 'text/html'
            }
        });
    });
}
*/

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