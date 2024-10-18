"use client";
import HomeComponent from "@/components/Home/HomeComponent";
import LoginComponent from "@/components/LoginComponent";
import { useAuth } from "@/contexts/AuthProvider";

export default function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginComponent />;
  }
  return (
    <div className="text-5xl font-bold text-fuchsia-500">
      <HomeComponent />
    </div>
  );
}
