import { db } from "@/lib/Firebase/_index";
import { DocumentReference, DocumentData } from "firebase-admin/firestore";

async function getProjectRolesWithProjects(projectRoleUIDs: DocumentReference<DocumentData>[]): Promise<any[]> {
  try {
    return await Promise.all(
      projectRoleUIDs.map(async (roleRef) => {
        const roleDoc = await roleRef.get();
        const roleData = roleDoc.data();

        if (!roleData?.projectId) {
          throw new Error(`Role document ${roleRef.id} missing projectId`);
        }

        const projectRef = roleData.projectId as DocumentReference<DocumentData>;
        const projectDoc = await projectRef.get();

        if (!projectDoc.exists) {
          throw new Error(`Project document ${projectRef.id} does not exist`);
        }

        const projectData = projectDoc.data();

        return {
          roleId: roleRef.id,
          projectId: projectRef.id,
          projectFields: {
            ...projectData,
          },
        };
      })
    );
  } catch (error) {
    console.error("Error retrieving project roles with projects:", error);
    throw new Error("Failed to retrieve project roles with projects");
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 });
    }

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const userData = userDoc.data();
    const projectRoleUIDs = userData?.projectRoleUIDs;

    if (!Array.isArray(projectRoleUIDs)) {
      return new Response(JSON.stringify({ error: 'Project roles not found' }), { status: 404 });
    }

    const projectRolesWithProjects = await getProjectRolesWithProjects(projectRoleUIDs);

    return new Response(JSON.stringify({ projectRoles: projectRolesWithProjects }), { status: 200 });
  } catch (error) {
    console.error("Error fetching project roles with projects:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project roles with projects' }), { status: 500 });
  }
}
