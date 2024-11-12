import { GroupDetails } from "@/lib/types";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ContributionHeader({ group }: { group: GroupDetails }) {
  if (!group) {
    return (
      <div className="h-full flex items-center justify-center">
        <h6 className="text-gray-400">This group does not exists</h6>
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-2">
        {group.image && group.image.length > 1 ? (
          <img src={group.image || ""} alt={group.name} />
        ) : (
          <div className="avatar placeholder flex flex-col space-y-2">
            <div className="bg-zinc-500 flex items-center justify-center text-white w-24 p-2  rounded-full">
              <span className="text-5xl text-end h-fit mt-2">
                {group.name[0]}
              </span>
            </div>
          </div>
        )}
        <p className="text-2xl text-zinc-600">{group.name}</p>
        <p className="text-zinc-600">{group.purpose}</p>
      </div>
      <div className="divider" />
      <div>
        <p className="text-5xl font-bold">{group.amount}</p>
      </div>
      {group.participants ? (
        <div className="rounded-lg bg-gray-200 p-2 space-y-2 mt-5">
          <p className="text-3xl">{group.contributedAmount}</p>
          <div className="flex items-center gap-2">
            <Link href={`${group.name}/transactions`}>
              <p className="underline ">contributed by</p>
            </Link>

            <div
              className="avatar-group -space-x-5 rtl:space-x-reverse items-center gap-2 "
              role="button"
            >
              {group.participants &&
                group.participants.map((email) => (
                  <div
                    key={email}
                    className="avatar  flex items-center justify-center border-0 outline-0"
                  >
                    <div className="bg-zinc-300 flex items-center justify-center text-zinc-700 w-8  border-0 outline-0 rounded-full">
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
        <button className="btn bg-zinc-900 border-1 border-gray-300 w-full ">
          Contribute Funds
        </button>
      </Link>

      {group.admin == "you" && (
        <button className="btn btn-ghost border-1 border-gray-300 w-full">
          Initiate Withdrawal Process
        </button>
      )}
    </div>
  );
}
