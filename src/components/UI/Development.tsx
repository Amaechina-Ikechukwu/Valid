"use client";
import { useAuth } from "@/contexts/AuthProvider";
import React from "react";

export default function Development() {
  const { token } = useAuth();
  return (
    <div>
      <p>{token}</p>
    </div>
  );
}
