"use client";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import React from "react";
import Navigation from "../Navigation/Navigation";
import LoginComponent from "../LoginComponent";
function ChildrenLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginComponent />;
  }
  return <div>{children}</div>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <div className="divider"></div>
      </div>
      <ChildrenLayout>{children}</ChildrenLayout>
    </AuthProvider>
  );
}
