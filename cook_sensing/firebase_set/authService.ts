// src/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed up:", user);
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing up:", authError.message);
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing in:", authError.message);
  }
};
