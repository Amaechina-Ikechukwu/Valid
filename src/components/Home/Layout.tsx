"use client";
import { AuthProvider } from "@/contexts/AuthProvider";
import React from "react";
import Navigation from "../Navigation/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <div className="divider"></div>
      </div>

      {children}
    </AuthProvider>
  );
}
