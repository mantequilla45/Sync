export const setUpAccountInFireStore = async (
  idToken: string,
  email: string,
  setError: (error: string) => void
) => {
  try {
    const response = await fetch("/api/Auth/setUpAccountInFireStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`, // Send idToken for authentication
      },
      body: JSON.stringify({ email }),
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
