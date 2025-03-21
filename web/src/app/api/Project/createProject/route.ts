import { NextResponse } from 'next/server';
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
    const collaborators = JSON.parse(formData.get('collaborators') as string || '[]'); // Expecting an array of user IDs.

    if (!projectName || !projectDescription) {
      return NextResponse.json({ error: 'Project name or description is missing' }, { status: 400 });
    }

    const projectRef = db.collection('projects').doc();
    const projectRoleRef = db.collection('projectRole').doc();
    const userRef = db.collection('users').doc(userId);

    const newProject = {
      UID: projectRef.id,
      title: projectName as string,
      description: projectDescription as string,
      owner: userRef,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userRoleUIDs: [projectRoleRef],
      documentUIDs: [],
      taskUIDs: [],
    };

    const batch = db.batch();

    const ownerRole = {
      UID: projectRoleRef.id,
      userId: userRef,
      projectId: projectRef,
      roleName: 'owner',
      canCreateDocuments: true,
      canEditDocuments: true,
      canAssignTasks: true,
      canManageUsers: true,
    };

    batch.set(projectRef, newProject);
    batch.set(projectRoleRef, ownerRole);

    // Update owner's user document
    batch.update(userRef, {
      projectRoleUIDs: FieldValue.arrayUnion(projectRoleRef),
    });

    for (const collaboratorId of collaborators) {
      const collaboratorRef = db.collection('users').doc(collaboratorId);
      const collaboratorRoleRef = db.collection('projectRole').doc();

      const collaboratorRole = {
        UID: collaboratorRoleRef.id,
        userId: collaboratorRef,
        projectId: projectRef,
        roleName: 'member',
        canCreateDocuments: true,
        canEditDocuments: true,
        canAssignTasks: false,
        canManageUsers: false,
      };

      batch.set(collaboratorRoleRef, collaboratorRole);

      batch.update(collaboratorRef, {
        projectRoleUIDs: FieldValue.arrayUnion(collaboratorRoleRef),
      });
    }

    await batch.commit();

    return NextResponse.json({ status: 200, projectId: newProject.UID });
  } catch (error) {
    console.error('Error creating project and roles:', error);
    return NextResponse.json({ error: 'Failed to create project and roles' }, { status: 500 });
  }
}
