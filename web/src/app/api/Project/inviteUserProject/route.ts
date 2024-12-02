import { db } from "@/lib/Firebase/_index";
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { console } from "inspector";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const colleagueUID = formData.get('colleagueUID') as string;
        const projectUID = formData.get('projectUID') as string;
        const editPerm = formData.get('editPerm') === 'true'; 
        const createPerm = formData.get('createPerm') === 'true';
        const assignPerm = formData.get('assignPerm') === 'true';
        const manageUsersPerm = formData.get('manageUsersPerm') === 'true';

        if (!projectUID || !colleagueUID || !projectUID) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const colleagueRef = db.collection("users").doc(colleagueUID);
        const projectRef = db.collection('projects').doc(projectUID);
        console.log("Hello ",projectRef);
        const projectRoleRef = db.collection("projectRole").doc();

        await db.runTransaction(async (transaction) => {
            const newProjectRole = {
                UID: projectRoleRef.id,
                userId: colleagueRef,
                projectId: projectRef,
                roleName: 'member',
                canCreateDocuments: createPerm, 
                canEditDocuments: editPerm,     
                canAssignTasks: assignPerm,     
                canManageUsers: manageUsersPerm 
            };

            transaction.set(projectRoleRef, newProjectRole);


            transaction.update(colleagueRef, {
                projectRoleUIDs: FieldValue.arrayUnion(projectRoleRef)
            });

            transaction.update(projectRef, {
                userRoleUIDs: FieldValue.arrayUnion(projectRoleRef.id)
            });
        });

        return NextResponse.json({ status: 200, message: "Success" });
    } catch (error) {
        console.error('Transaction failed:', error);
        return NextResponse.json({ error: 'Failed to add colleague to the project' }, { status: 500 });
    }
}
