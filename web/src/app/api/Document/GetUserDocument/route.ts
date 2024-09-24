import { db } from "@/lib/Firebase/_index";
import { DocumentReference } from "firebase-admin/firestore";

export async function GET(req: Request) {
  try {
    // Fetch user ID from headers
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 });
    }

    // Fetch the user document from Firestore
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const userData = userDoc.data();
    const projectRoleRefs: DocumentReference[] = userData?.projectRoleUIDs || [];
    //console.log(projectRoleRefs);
    if (!projectRoleRefs || projectRoleRefs.length === 0) {
      return new Response(JSON.stringify({ error: 'No project roles found' }), { status: 404 });
    }

    const documents: any[] = [];

    // Iterate over each role reference to fetch associated projects and documents
    for (const roleRefPath of projectRoleRefs) {
      
      // Ensure roleRefPath is a valid string and strip leading slashes if needed
      
      // Fetch the role document
      const roleSnapshot = await db.doc(roleRefPath.path).get();  // Corrected reference fetching
      if (!roleSnapshot.exists) {
        continue;  // Skip if the role document doesn't exist
      }

      console.log("PR = " + roleRefPath.path);

      const projectIDRef: DocumentReference = roleSnapshot.get('projectId')
      
      //console.log(roleSnapshot);
      if (projectIDRef) {
        // Fetch the project document associated with the role
        const projectRef = db.doc(projectIDRef.path);
        console.log(projectRef.path);
        const projectSnapshot = await projectRef.get();
        if (projectSnapshot.exists) {
          const projectData = projectSnapshot.data();

          // Fetch associated document references from the project
          if (projectData?.documentUIDs) {
            for (const docRefPath of projectData.documentUIDs) {
              const docSnapshot = await db.doc(docRefPath.path).get();
              if (docSnapshot.exists) {
                documents.push({
                  documentId: docSnapshot.id,
                  ...docSnapshot.data(),
                });
              }
            }
          }
        }
      }
    }

    const r = new Response(JSON.stringify(documents), { status: 200 });
    // Return the documents fetched
    console.log(documents);
    return r
  } catch (error) {
    console.error("Error fetching project docs:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project documents' }), { status: 500 });
  }
}
