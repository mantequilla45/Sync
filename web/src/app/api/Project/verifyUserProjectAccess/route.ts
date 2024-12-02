import { NextResponse } from "next/server";
import { db } from "@/lib/Firebase/_index";

export async function GET(req: Request) {

    const projectID = req.headers.get('project-id');
    const userID = req.headers.get('x-user-id');
    if (!projectID && !userID) {
        return NextResponse.json({ error: "Project ID is required in headers" }, { status: 400 });
    }

    const userRef = db.collection("users").doc(userID as string);
    const projectRef = db.collection("projects").doc(projectID as string);


    
    const docSnapshot = await projectRef.get();
    const userSnapshot = await userRef.get();

    if (docSnapshot.exists && userSnapshot.exists) {
        const userRoleUIDs = docSnapshot.data()?.userRoleUIDs;
        const projectRoleIDs = userSnapshot.data()?.projectRoleUIDs;

        const userRoleUIDData = await Promise.all(
            projectRoleIDs.map(async (docRef: any) => {
              const docSnapshot = await docRef.get();
              return docSnapshot.exists ? docSnapshot.get('UID') : null;
            })
        );
        
        const hasMatch = userRoleUIDData.some(uid => userRoleUIDs.includes(uid));

        return NextResponse.json({hasMatch}); 
    } else {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
}
