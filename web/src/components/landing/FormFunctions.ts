import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { loginWithCredentials } from "@/auth/loginWithCredentials";
import { setUpAccountInFireStore } from "@/auth/setUpAccountInFireStore";
import { auth } from "../../firebase";

export const login = async (
  email: string,
  password: string,
  setError: (message: string) => void
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await loginWithCredentials(await userCredential.user.getIdToken(), setError);
  } catch (e) {
    setError("Failed to login. Check your email or password.");
    console.error("Error logging in:", e);
  }
};

export const register = async (
  email: string,
  password: string,
  confirmPassword: string,
  setError: (message: string) => void
) => {
  setError(""); // Clear previous errors

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    // Create the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await loginWithCredentials(await userCredential.user.getIdToken(), setError);
    await setUpAccountInFireStore(await userCredential.user.getIdToken(), setError);
  } catch (e) {
    setError("Failed to register. Please try again.");
    console.error("Error registering:", e);
  }
};

