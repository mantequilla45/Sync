import { NextResponse } from 'next/server';
import { Project, ProjectRole } from '../../../../../../_shared/interface';
import { db } from '@/lib/Firebase/_index';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
    }

    const formData = await req.formData();
    const projectName = formData.get('name');
    const projectDescription = formData.get('description');

    if (!projectName || !projectDescription) {
      return NextResponse.json({ error: 'Project name or description is missing' }, { status: 400 });
    }

    const projectRef = db.collection("projects").doc();
    const projectRoleRef = db.collection("projectRole").doc();
    const userRef = db.collection("users").doc(userId);

    // Creating a new project object
    const newProject: Project = {
      UID: projectRef.id,
      title: projectName as string,
      description: projectDescription as string,
      owner: userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userRoleUIDs: [projectRoleRef.id],
      documentUIDs: [],
      taskUIDs: []
    };

    const newProjectRole: ProjectRole = {
      UID: projectRoleRef.id,
      userId: userId,
      projectId: projectRef.id,
      roleName: 'owner', 
      canCreateDocuments: true,
      canEditDocuments: true,
      canAssignTasks: true,
      canManageUsers: true
    };

    const batch = db.batch();
    batch.set(projectRef, newProject);
    batch.set(projectRoleRef, newProjectRole);

    batch.update(userRef, {
      projectRoleUIDs: FieldValue.arrayUnion(projectRoleRef.id)
    });

    await batch.commit();

    return NextResponse.json({ status: 200, projectId: newProject.UID });
  } catch (error) {
    console.error('Error uploading project:', error);
    return NextResponse.json({ error: 'Failed to upload project' }, { status: 500 });
  }
}
