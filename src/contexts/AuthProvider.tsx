"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged, signOut, User, getIdToken } from "firebase/auth";
import signInWithGoogle from "@/firebase/firebaseAuth";
import { auth } from "@/firebase/config";
import ValidLoader from "@/components/UI/ValidLoader";

// Auth context types
interface AuthContextProps {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch token when user is available
        getIdToken(user).then((token) => {
          setToken(token);
          setLoading(false); // Loading complete once token is retrieved
        });
      } else {
        setToken(null);
        setLoading(false); // Loading complete even if no user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const login = () => {
    setLoading(true); // Show loading while signing in
    signInWithGoogle().finally(() => setLoading(false)); // End loading after sign-in process
  };

  const logout = () => {
    setLoading(true); // Show loading while signing out
    return signOut(auth).finally(() => setLoading(false)); // End loading after sign-out process
  };

  const value = { currentUser, token, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <ValidLoader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
