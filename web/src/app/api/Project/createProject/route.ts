import { NextResponse } from 'next/server';
import { Project} from '../../../../../../_shared/interface'
import { db } from '@/lib/Firebase/_index';

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

    const newProject: Project = {
      UID: '',
      title: projectName as string,
      description: projectDescription as string,
      owner: userId, // The user ID of the owner
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userRoleUIDs: [], 
      documentUIDs: [], 
      taskUIDs: [] 
    };

    const projectRef = db.collection("projects").doc();
    newProject.UID = projectRef.id;
    await projectRef.set(newProject, { merge: true });

    return NextResponse.json({ status: 200, projectId: newProject.UID });
  } catch (error) {
    console.error('Error uploading project:', error);
    return NextResponse.json({ error: 'Failed to upload project' }, { status: 500 });
  }
}