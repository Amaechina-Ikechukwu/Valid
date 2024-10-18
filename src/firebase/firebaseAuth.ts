// firebaseAuth.js
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    return result; // Return the signed-in user
  } catch (error: any) {
    switch (error.code) {
      case "auth/cancelled-popup-request":
        console.error("Google sign-in popup was cancelled.");
        break;
      case "auth/popup-blocked":
        console.error("Popup was blocked by the browser.");
        break;
      case "auth/popup-closed-by-user":
        console.error("Popup was closed before sign-in.");
        break;
      default:
        console.error("Authentication error:", error);
    }
  }
};

export default signInWithGoogle;
