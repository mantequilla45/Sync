import { NextResponse } from "next/server";
import { db } from "@/lib/Firebase/_index";

export async function GET(req: Request) {
    const projectID = req.headers.get('project-id');
    const userID = req.headers.get('x-user-id');
    
    // Validate presence of projectID and userID
    if (!projectID || !userID) {
        return NextResponse.json({ error: "Project ID and User ID are required in headers" }, { status: 400 });
    }

    // References to the user and project in the Firestore database
    const userRef = db.collection("users").doc(userID as string);
    const projectRef = db.collection("projects").doc(projectID as string);
    
    try {
        // Fetch the project and user documents
        const [docSnapshot, userSnapshot] = await Promise.all([projectRef.get(), userRef.get()]);

        // Check if both project and user exist
        if (!docSnapshot.exists || !userSnapshot.exists) {
            return NextResponse.json({ error: "Project or User not found" }, { status: 404 });
        }

        // Retrieve the user role data and project role information
        const userRoleUIDs = docSnapshot.data()?.userRoleUIDs || [];
        const projectRoleUIDs = userSnapshot.data()?.projectRoleUIDs || [];

        // Ensure there are project roles and user roles
        if (!userRoleUIDs.length || !projectRoleUIDs.length) {
            return NextResponse.json({ error: "No roles found for user or project" }, { status: 403 });
        }

        // Fetch the role UID data for comparison
        const userRoleUIDData = await Promise.all(
            projectRoleUIDs.map(async (docRef: any) => {
                const docSnapshot = await docRef.get();
                return docSnapshot.exists ? docSnapshot.get('UID') : null;
            })
        );

        // Check for matching roles
        const hasMatch = userRoleUIDData.some(uid => userRoleUIDs.includes(uid));

        if (hasMatch) {
            return NextResponse.json({ hasMatch }); 
        } else {
            return NextResponse.json({ error: "User does not have access to the project" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
