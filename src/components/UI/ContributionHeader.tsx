"use client";
import { GroupDetails } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import InitiationModal from "./InitiationModal";

export default function ContributionHeader({ group }: { group: GroupDetails }) {
  const { currentUser } = useAuth();
  const [modalPhase, setModalPhase] = useState<
    "inform" | "action" | "result" | null
  >(null);

  function capitalizeWords(phrase: string): string {
    return phrase
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const initiateWithdrawal = () => {
    setModalPhase("inform");
  };

  return (
    <div>
      <div className="space-y-2">
        {group.image && group.image.length > 1 ? (
          <img
            src={group.image || ""}
            alt={group.name}
            className="object-cover w-full h-[500px]"
          />
        ) : (
          <div className="avatar placeholder flex flex-col space-y-2">
            <div className="bg-zinc-500 flex items-center justify-center text-white w-24 p-2 rounded-full">
              <span className="text-5xl text-end h-fit mt-2">
                {group.name[0]}
              </span>
            </div>
          </div>
        )}
        <p className="text-4xl text-zinc-600">{capitalizeWords(group.name)}</p>
        <p className="text-zinc-600 text-lg">{group.purpose}</p>
      </div>
      <div className="divider" />
      <div>
        <p className="text-5xl font-bold text-neutral-900">{group.amount}</p>
      </div>
      {group.participants ? (
        <div className="rounded-lg bg-gray-200 p-2 space-y-2 mt-5">
          <p className="text-3xl text-neutral-800">{group.contributedAmount}</p>
          <div className="flex items-center gap-2">
            <Link href={`${group.name}/transactions`}>
              <p className="underline text-neutral-600">contributed by</p>
            </Link>
            <div className="avatar-group -space-x-5 rtl:space-x-reverse items-center gap-2">
              {group.participants &&
                group.participants.map((email) => (
                  <div
                    key={email}
                    className="avatar flex items-center justify-center border-0 outline-0"
                  >
                    <div className="bg-zinc-300 flex items-center justify-center text-zinc-700 w-8 border-0 outline-0 rounded-full">
                      <p className="text-2xl text-center">{email[0]}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-zinc-600">No payments made yet</p>
      )}
      <div className="divider" />
      <Link href={`${group.name}/payment`}>
        <button className="btn bg-gradient border-1 border-gray-300 w-full text-white">
          Contribute Funds
        </button>
      </Link>

      {group.admin === currentUser?.uid && (
        <button
          className="btn border-1 border-gray-300 w-full bg-zinc-900 text-white"
          onClick={initiateWithdrawal}
        >
          Initiate Withdrawal Process
        </button>
      )}

      {/* Modal */}
      {modalPhase && (
        <InitiationModal
          phase={modalPhase}
          onClose={() => setModalPhase(null)}
          onNextPhase={(nextPhase) => setModalPhase(nextPhase)}
        />
      )}
    </div>
  );
}
