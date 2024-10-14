import TransactionsUI from "@/components/UI/TransactionsUI";
import React from "react";

export default function Transactions({ params }: { params: { id: string } }) {
  return <TransactionsUI id={decodeURIComponent(params.id)} />;
}
