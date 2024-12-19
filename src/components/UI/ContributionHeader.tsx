"use client";
import { GroupDetails } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import InitiationModal from "./InitiationModal";
import { BackgroundGradient } from "./BackgroundGradient";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
function BackgroundBoxes({ hero }: { hero: string }) {
  return (
    <div className="h-48 w-full relative overflow-hidden bg-slate-900 flex items-center justify-center rounded-t-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        {hero}
      </h1>
    </div>
  );
}
export default function ContributionHeader({ group }: { group: GroupDetails }) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [modalPhase, setModalPhase] = useState<
    "inform" | "action" | "result" | null
  >(null);
  const [copied, setCopied] = useState(false);
  function capitalizeWords(phrase: string): string {
    return phrase
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const initiateWithdrawal = () => {
    setModalPhase("inform");
  };
  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
    setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
  };
  useEffect(() => {
    if (modalPhase === "result") {
      window.location.reload();
    }
  }, [modalPhase]);

  return (
    <BackgroundGradient>
      <div className="bg-white p-4 space-y-3 rounded-[20px] flex flex-col md:flex-row items-center justify-evenly w-full">
        <div className=" ">
          {group.image && group.image.length > 1 ? (
            <img
              src={group.image || ""}
              alt={group.name}
              className="object-cover w-full md:w-[300px]  h-[500px] md:h-[300px] rounded-t-[20px] md:rounded-[20px]"
            />
          ) : (
            <div className="avatar placeholder flex flex-col space-y-2">
              <BackgroundBoxes hero={group.name[0]} />
            </div>
          )}
        </div>
        <div className="w-full md:w-fit">
          <div>
            <p className="text-4xl text-zinc-600">
              {capitalizeWords(group.name)}
            </p>
            <p className="text-zinc-600 text-lg md:max-w-sm">{group.purpose}</p>
            <button
              className="btn btn-active btn-link p-0 text-gray-500"
              onClick={copyLink}
            >
              {copied ? "Link Copied!" : "Tap to copy group link"}
            </button>
          </div>
          <div className="divider" />
          <div>
            <p className="text-5xl font-bold text-neutral-900">
              {group.amount}
            </p>
          </div>
          {group.participants ? (
            <div className="rounded-lg bg-gray-200 p-2 space-y-2 mt-5">
              <p className="text-3xl text-neutral-800">
                {group.contributedAmount}
              </p>
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
          <div className="space-y-2">
            {group.adminWithdrawal &&
            group.admin !== currentUser?.uid &&
            group.adminWithdrawal.initiated ? (
              <button
                onClick={() => router.push(`${group.name}/payment`)}
                className="btn bg-gradient border-1 border-gray-300 w-full text-white"
              >
                Approve withdrawal by admin
              </button>
            ) : (
              <Link href={`${group.name}/payment`}>
                <button
                  disabled={
                    group.adminWithdrawal && group.adminWithdrawal.initiated
                  }
                  className="btn bg-gradient border-1 border-gray-300 w-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Contribute Funds
                </button>
              </Link>
            )}
            {group.adminWithdrawal == undefined ? (
              group.admin === currentUser?.uid && (
                <button
                  className="btn border-1 border-gray-300 w-full bg-zinc-900 text-white"
                  onClick={initiateWithdrawal}
                >
                  Initiate Withdrawal Process
                </button>
              )
            ) : (
              <button
                className="btn border-1 border-gray-300 w-full bg-emerald-600 text-white"
                onClick={() => router.push(`${group.name}/withdrawal`)}
              >
                You've been approved. Withdrawal Now
              </button>
            )}
          </div>

          {/* Modal */}
          {modalPhase && (
            <InitiationModal
              phase={modalPhase}
              onClose={() => setModalPhase(null)}
              onNextPhase={(nextPhase) => setModalPhase(nextPhase)}
              groudid={group.id}
            />
          )}
        </div>
      </div>
    </BackgroundGradient>
  );
}
