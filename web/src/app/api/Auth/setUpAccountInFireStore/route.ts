import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/lib/Firebase/_index";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if UID is present
    if (!uid) {
      return NextResponse.json({ error: "User ID (uid) is required." }, { status: 400 });
    }

    // Create or update the user document in Firestore
    const userRef = db.collection("users").doc(uid);
    await userRef.set({
      state: null,
      lastActive: Date.now(),
    }, { merge: true }); // Merge in case document exists

    return NextResponse.json({ message: "User account set up successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error setting up account:", error);
    return NextResponse.json({ error: "Failed to set up account." }, { status: 500 });
  }
}
