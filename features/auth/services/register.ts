import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    setError: (error: string) => void
): Promise<void> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User created successfully');
    } catch (error) {
        setError((error as Error).message);
    }
};
