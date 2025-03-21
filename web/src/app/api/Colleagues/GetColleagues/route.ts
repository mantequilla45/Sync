import { NextRequest, NextResponse } from 'next/server';
import { db, auth } from "@/lib/Firebase/_index";
import { DocumentReference } from "firebase-admin/firestore";

// Mark route as dynamic since it uses headers and database
export const dynamic = 'force-dynamic';

interface Colleague {
    uid: string;
    displayName: string;
    displayPicture: string;
    sharedProjectIds: string[];
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

        const userRef = db.collection('users').doc(userId);

        // Fetch colleague UIDs
        const colleagueUIDs = await fetchColleaguesUIDs(userRef);
        if (!colleagueUIDs || colleagueUIDs.length === 0) {
            return NextResponse.json(
                { error: 'No colleagues found' },
                { status: 404 }
            );
        }

        // Fetch current user's project IDs
        const userProjectIds = await fetchProjectIdsFromRoles(userId);

        // Fetch colleagues with shared projects
        const colleagues = await Promise.all(
            colleagueUIDs.map(async (uid) => 
                await fetchColleagueWithSharedProjects(uid, userProjectIds)
            )
        );

        return NextResponse.json(
            { colleagues: colleagues.filter(Boolean) },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching colleagues:", error);
        return NextResponse.json(
            { error: 'Failed to fetch colleagues' },
            { status: 500 }
        );
    }
}

async function fetchColleaguesUIDs(userRef: DocumentReference): Promise<string[] | null> {
    try {
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            console.error("User document does not exist.");
            return null;
        }

        const colleagueRefs: DocumentReference[] = userDoc.get('colleagueUIDs') || [];
        return colleagueRefs.map((ref) => ref.id);
    } catch (error) {
        console.error("Error fetching colleague UIDs:", error);
        return null;
    }
}

async function fetchColleagueBaseDetails(uid: string): Promise<Omit<Colleague, 'sharedProjectIds'> | null> {
    try {
        const user = await auth.getUser(uid);
        const userCredDocRef = db.collection('userCredentials').doc(uid);
        const userCredSnapshot = await userCredDocRef.get();

        let displayName = '';
        let displayPicture = '';

        if (userCredSnapshot.exists) {
            const userCredData = userCredSnapshot.data();
            displayName = userCredData?.name || '';
        }

        displayName = user.displayName ?? `User (${user.email})`;
        displayPicture = user.photoURL ?? 
            'https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2FVFk3hnh3nSXTAKbASUWOxkJMexR2%2FVFk3hnh3nSXTAKbASUWOxkJMexR2.png?alt=media&token=1b559886-5925-450a-98bd-e7e93d69a301';

        return {
            uid: user.uid,
            displayName,
            displayPicture,
        };
    } catch (error) {
        console.error('Error fetching colleague base details:', error);
        return null;
    }
}

async function fetchProjectIdsFromRoles(uid: string): Promise<string[]> {
    try {
        const userDocRef = db.collection('users').doc(uid);
        const userDocSnapshot = await userDocRef.get();

        if (!userDocSnapshot.exists) {
            console.error(`User document does not exist for UID: ${uid}`);
            return [];
        }

        const projectRoleRefs: FirebaseFirestore.DocumentReference[] = userDocSnapshot.get('projectRoleUIDs') || [];
        const projectIds = await Promise.all(
            projectRoleRefs.map(async (roleRef) => {
                try {
                    const roleSnapshot = await roleRef.get();
                    if (roleSnapshot.exists) {
                        const projectRef = roleSnapshot.get('projectId');
                        return projectRef ? projectRef.id : null;
                    }
                    console.error(`Project role document does not exist: ${roleRef.path}`);
                    return null;
                } catch (error) {
                    console.error(`Error fetching project role document: ${roleRef.path}`, error);
                    return null;
                }
            })
        );

        return projectIds.filter((projectId): projectId is string => !!projectId);
    } catch (error) {
        console.error(`Error fetching project IDs for UID: ${uid}`, error);
        return [];
    }
}

async function fetchColleagueWithSharedProjects(uid: string, userProjectIds: string[]): Promise<Colleague | null> {
    try {
        const colleagueBase = await fetchColleagueBaseDetails(uid);
        if (!colleagueBase) {
            return null;
        }

        // Fetch colleague's project IDs
        const colleagueProjectIds = await fetchProjectIdsFromRoles(uid);

        // Find shared project IDs
        const sharedProjectIds = colleagueProjectIds.filter((projectId) => userProjectIds.includes(projectId));

        return {
            ...colleagueBase,
            sharedProjectIds,
        };
    } catch (error) {
        console.error(`Error fetching colleague with shared projects (UID: ${uid}):`, error);
        return null;
    }
}
