"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { Transaction } from "@/lib/types";

import axios from "axios";
import React, { useEffect, useState } from "react";
const EmptyTransactions = () => {
  return (
    <p className="text-2xl text-zinc-500 text-center">No transactions yet</p>
  );
};
export default function TransactionsUI({ id }: { id: string }) {
  const { token } = useAuth();
  const [groupTransactions, setGroupTransaction] = useState<Transaction[]>([]);
  useEffect(() => {
    async function fetchGroups() {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/transactions/group/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGroupTransaction(response.data.data); // Adjust if the structure of data is different
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Failed to fetch transactions:",
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }

    fetchGroups();
  }, [token]);
  if (groupTransactions == undefined || groupTransactions == null) {
    return <EmptyTransactions />;
  }
  const uniqueEmails = Array.from(
    new Set(groupTransactions.map((transaction) => transaction.email))
  );

  return (
    <div>
      <div>
        <p>Participants: </p>
        <div className=" flex overflow-x-auto space-x-2">
          {uniqueEmails.map((email) => (
            <div
              key={email}
              className="avatar  flex items-center justify-center border-0 outline-0"
            >
              <div className="bg-zinc-300 flex items-center justify-center text-zinc-700 w-8  border-0 outline-0 rounded-full">
                <p className="text-2xl text-center   ">{email[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />
      <div>
        {groupTransactions.map((trans) => (
          <div
            key={trans.email}
            className="flex p-2 rounded-lg bg-zinc-100 gap-4 items-center mb-3 "
          >
            <div className="avatar placeholder flex items-center justify-center ">
              <div className="bg-zinc-500 flex items-center justify-center text-white w-fit h-fit p-2  rounded-full border border-6 border-emerald-400">
                <p className="text-2xl text-center">{trans.email[0]}</p>
              </div>
            </div>
            <div>
              <p className="text-5xl text-zinc-700 font-bold">{trans.amount}</p>
              <p>{trans.email}</p>
              <div className="flex items-center space-x-2">
                <p className="font-light">{trans.date || " "}</p>
                <div className="bg-zinc-300 rounded-full w-2 h-2" />
                <p className="font-light text-emerald-400">Credit</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
