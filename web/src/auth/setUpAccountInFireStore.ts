export const setUpAccountInFireStore = async (
  idToken: string,
  setError: (error: string) => void
) => {
  try {
    const response = await fetch("/api/setUpAccountInFireStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // Send idToken for authentication
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error || "Failed to set up account.");
    }
  } catch (e) {
    setError("Error setting up account in Firestore.");
    console.error("Error in setUpAccountInFireStore:", e);
  }
};