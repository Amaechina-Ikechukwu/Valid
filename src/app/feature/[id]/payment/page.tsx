import FlutterwavePayment from "@/components/UI/Payments";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/contributions/${decodeURIComponent(
      params.id
    )}`
  );
  let group = await data.json();

  return (
    <div className="h-full flex items-center justify-center">
      <FlutterwavePayment group={group.data} />
    </div>
  );
}
