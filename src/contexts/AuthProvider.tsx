"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import signInWithGoogle from "@/firebase/firebaseAuth";
import { auth } from "@/firebase/config";

// Auth context types
interface AuthContextProps {
  currentUser: User | null;
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

// Initialize authentication state outside of component lifecycle
let initialized = false;
let initialUser: User | null = null;

const initializeAuth = (setCurrentUser: (user: User | null) => void) => {
  if (!initialized) {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      initialUser = user;
    });
    initialized = true;
  }
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  // Initialize authentication once
  initializeAuth(setCurrentUser);

  const login = () => {
    signInWithGoogle();
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = { currentUser, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
