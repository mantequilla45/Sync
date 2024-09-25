import { db } from "@/lib/Firebase/_index";
import { DocumentReference, DocumentData } from "firebase-admin/firestore";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 });

    const userData = await fetchUserData(userId);
    if (!userData) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const projectRoleRefs: DocumentReference[] = userData?.projectRoleUIDs || [];
    if (projectRoleRefs.length === 0) return new Response(JSON.stringify({ error: 'No project roles found' }), { status: 404 });

    const documents = await fetchDocumentsForRoles(projectRoleRefs);
    return new Response(JSON.stringify(documents), { status: 200 });
  } catch (error) {
    console.error("Error fetching project docs:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project documents' }), { status: 500 });
  }
}

async function fetchUserData(userId: string) {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data() : null;
}

async function fetchDocumentsForRoles(roleRefs: DocumentReference[]): Promise<any[]> {
  const documents: DocumentData[] = [];

  for (const roleRef of roleRefs) {
    const roleSnapshot = await fetchDocument(roleRef.path);
    if (!roleSnapshot) continue;

    const projectIDRef: DocumentReference = roleSnapshot.get('projectId');
    if (!projectIDRef) continue;

    const projectData = await fetchProjectData(projectIDRef.path);
    if (!projectData) continue;

    const projectDocuments = await fetchDocumentsFromProject(projectData.documentUIDs);
    documents.push(...projectDocuments);
  }
  return documents;
}

async function fetchDocument(docPath: string) {
  const docSnapshot = await db.doc(docPath).get();
  return docSnapshot.exists ? docSnapshot : null;
}

async function fetchProjectData(projectPath: string) {
  const projectSnapshot = await fetchDocument(projectPath);
  return projectSnapshot ? projectSnapshot.data() : null;
}

async function fetchDocumentsFromProject(documentRefs: DocumentReference[]): Promise<DocumentData[]> {
  const documents: any[] = [];
  for (const docRefPath of documentRefs) {
    const docSnapshot = await fetchDocument(docRefPath.path);
    if (docSnapshot) {
      documents.push({
        documentId: docSnapshot.id,
        ...docSnapshot.data(),
      });
    }
  }
  return documents;
}
