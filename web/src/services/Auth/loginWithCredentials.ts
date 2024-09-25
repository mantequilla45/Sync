export const loginWithCredentials = async (
  idToken: string,
  setError: (error: string) => void
) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login success:", data);
      window.location.href = "/home";
    } else {
      setError(data.error || "Failed to login.");
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Network error:", error);
    setError("An unexpected error occurred.");
  }
};
