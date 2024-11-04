import FlutterwavePayment from "@/components/UI/Payments";
import { contributionGroups, groupTransactions } from "@/lib/exampledata";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  // const id = decodeURIComponent(params.id);
  return (
    <div className="h-full flex items-center justify-center">
      <FlutterwavePayment id={params.id} />
    </div>
  );
}
