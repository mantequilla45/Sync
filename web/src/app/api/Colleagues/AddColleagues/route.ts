import { db } from "@/lib/Firebase/_index";
import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
    try {
        const userId = req.headers.get('x-user-id');
        const formData = await req.formData()
        const colleagueUID = formData.get('colleagueUID') as string
        
        if (!userId || !colleagueUID) {
            return NextResponse.json({ error: 'User ID is missing' }, { status: 400 });
        }

        const userRef = db.collection("users").doc(userId);
        const colleagueRef = db.collection("users").doc(colleagueUID);

        await db.runTransaction(async (transaction) => {

            transaction.update(userRef, {
                colleagueUIDs: FieldValue.arrayUnion(colleagueRef)
            });

            transaction.update(colleagueRef, {
                colleagueUIDs: FieldValue.arrayUnion(userRef)
            });
        })

        return NextResponse.json({ status: 200, message: "Success" });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to add colleague to the project' }, { status: 500 });
    }
}