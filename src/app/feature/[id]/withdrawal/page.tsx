import TransferForm from "@/components/UI/TransferForm";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/contributions/${decodeURIComponent(
      params.id
    )}`,
    {
      method: "GET", // Specify the HTTP method
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching contribution data: ${response.statusText}`);
  }

  const group = await response.json();
  return <TransferForm group={group.data} />;
}
