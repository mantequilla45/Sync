
import { db } from "@/lib/Firebase/_index";
import { DocumentReference, DocumentData } from "firebase-admin/firestore";

// Type definitions for better type safety
interface UserData {
  projectRoleUIDs: DocumentReference[];
}

interface ProjectRole {
  projectId: DocumentReference;
}

interface ProjectData {
  documentUIDs: DocumentReference[];
}

interface DocumentResponse {
  documentId: string;
  [key: string]: any;
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is missing' }), { 
        status: 400 
      });
    }

    const userData = await fetchUserData(userId);
    if (!userData?.projectRoleUIDs?.length) {
      return new Response(JSON.stringify({ error: 'No project roles found' }), { 
        status: 404 
      });
    }

    const documents = await fetchDocumentsForRoles(userData.projectRoleUIDs);
    return new Response(JSON.stringify(documents), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error("Error fetching project docs:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project documents' }), { 
      status: 500 
    });
  }
}

async function fetchUserData(userId: string): Promise<UserData | null> {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data() as UserData : null;
}

async function fetchDocumentsForRoles(roleRefs: DocumentReference[]): Promise<DocumentResponse[]> {
  // Fetch all role documents in parallel
  const roleSnapshots = await Promise.all(
    roleRefs.map(ref => fetchDocument(ref.path))
  );

  // Get project references from valid role snapshots
  const projectPromises = roleSnapshots
    .filter((snapshot): snapshot is DocumentData => snapshot !== null)
    .map(async roleData => {
      const projectRef = (roleData.get('projectId') as DocumentReference);
      if (!projectRef) return null;
      return fetchProjectData(projectRef.path);
    });

  const projectsData = await Promise.all(projectPromises);

  // Flatten and fetch all documents from all projects
  const allDocuments = await Promise.all(
    projectsData
      .filter((project): project is ProjectData => project !== null)
      .flatMap(project => project.documentUIDs)
      .map(async docRef => {
        const docSnapshot = await fetchDocument(docRef.path);
        if (!docSnapshot) return null;
        
        return {
          documentId: docSnapshot.id,
          ...docSnapshot.data(),
        };
      })
  );

  return allDocuments.filter((doc): doc is DocumentResponse => doc !== null);
}

async function fetchDocument(docPath: string): Promise<DocumentData | null> {
  try {
    const docSnapshot = await db.doc(docPath).get();
    return docSnapshot.exists ? docSnapshot : null;
  } catch (error) {
    console.error(`Error fetching document at path ${docPath}:`, error);
    return null;
  }
}

async function fetchProjectData(projectPath: string): Promise<ProjectData | null> {
  const projectSnapshot = await fetchDocument(projectPath);
  return projectSnapshot ? projectSnapshot.data() as ProjectData : null;
}

