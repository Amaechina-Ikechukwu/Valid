"use client";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import React, { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import LoginComponent from "../LoginComponent";
import ValidLoader from "../UI/ValidLoader";

function ChildrenLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <ValidLoader />;
  }

  if (!currentUser) {
    return <LoginComponent />;
  }
  return (
    <div className="bg-white h-screen overflow-auto flex items-center justify-center w-full">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>
        <Navigation />
        <div className="divider"></div>
      </div>
      <Suspense fallback={<ValidLoader />}>
        <ChildrenLayout>{children}</ChildrenLayout>
      </Suspense>
    </AuthProvider>
  );
}
