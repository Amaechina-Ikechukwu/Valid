import { ContributionGroup } from "@/lib/types";
import React from "react";

import { cn } from "@/lib/utils";

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

export default function ContributionPill({
  data,
}: {
  data: ContributionGroup;
}) {
  return (
    <div className="flex flex-col md:w-full rounded-[20px] bg-zinc-100 shadow-md overflow-hidden bg-white">
      <div className="w-full h-48">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <BackgroundBoxes hero={data.name[0]} />
        )}
      </div>
      <div className="w-full p-4 space-y-2">
        <h3 className="text-lg font-bold text-zinc-700">
          {data.name.toLocaleUpperCase()}
        </h3>
        <p className="text-sm text-zinc-600">{data.purpose}</p>
        <div className="flex items-center space-x-2">
          {/* {data.participants && (
            <div className="flex items-center gap-2">
              {data.participants.map((email) => (
                <div
                  key={email}
                  className="w-8 h-8 bg-zinc-300 flex items-center justify-center rounded-full text-zinc-700"
                >
                  <p className="text-lg">{email[0]}</p>
                </div>
              ))}
              <span className="text-sm text-zinc-500">paid</span>
            </div>
          )} */}
          {data.participants && data.remaining !== undefined && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
              />
            </svg>
          )}

          {data.participants && data.remaining !== undefined ? (
            <div className="text-sm text-zinc-500 font-light">
              {data.remaining}% to be completed
            </div>
          ) : (
            <div className="text-sm text-zinc-500 font-light">
              No contributions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
