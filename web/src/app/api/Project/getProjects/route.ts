import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/Firebase/_index";
import { DocumentReference, DocumentData } from "firebase-admin/firestore";

// Mark route as dynamic since it uses headers and database
export const dynamic = 'force-dynamic';

// Interface for project details
interface ProjectDetails {
  projectId: string;
  title: string;
  description: string;
}

async function getProjectDetails(projectRoleUIDs: DocumentReference<DocumentData>[]): Promise<ProjectDetails[]> {
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
          projectId: projectRef.id,
          title: projectData?.title || "Untitled Project",
          description: projectData?.description || "No description available",
        };
      })
    );
  } catch (error) {
    console.error("Error retrieving project details:", error);
    throw new Error("Failed to retrieve project details");
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is missing' },
        { status: 400 }
      );
    }

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const projectRoleUIDs = userData?.projectRoleUIDs;

    if (!Array.isArray(projectRoleUIDs)) {
      return NextResponse.json(
        { error: 'Project roles not found' },
        { status: 404 }
      );
    }

    const projectDetails = await getProjectDetails(projectRoleUIDs);

    return NextResponse.json(
      { projects: projectDetails },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json(
      { error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}
