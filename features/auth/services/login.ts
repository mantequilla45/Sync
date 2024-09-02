import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/firebase";

export const loginWithEmailAndPassword = async (
    email: string,
    password: string,
    setError: (error: string) => void
): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        setError((error as Error).message);
    }
};
