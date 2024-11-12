import { ContributionGroup } from "@/lib/types";
import React from "react";

export default function ContributionPill({
  data,
}: {
  data: ContributionGroup;
}) {
  return (
    <div className="flex p-2 rounded-lg bg-zinc-100 gap-4 items-center mb-3">
      {data.image ? (
        <img
          src={data.image || ""}
          alt={data.name}
          className="w-8 object-cover"
        />
      ) : (
        <div className="avatar placeholder flex items-center justify-center">
          <div className="bg-zinc-500 flex items-center justify-center text-white w-fit h-fit p-2  rounded-full">
            <span className="text-2xl text-end h-fit mt-2">{data.name[0]}</span>
          </div>
        </div>
      )}
      <div className="w-full">
        <h3 className="text-lg font-bold text-zinc-700">{data.name}</h3>
        <h3 className="text-xs text-zinc-600">{data.purpose}</h3>
        <div className="flex justify-between items-center ">
          <p className="text-lg font-light text-zinc-500">
            {data.participants &&
              data.participants.map((email) => (
                <div
                  key={email}
                  className="avatar  flex items-center justify-center border-0 outline-0"
                >
                  <div className="bg-zinc-300 flex items-center justify-center text-zinc-700 w-8  border-0 outline-0 rounded-full">
                    <p className="text-2xl text-center   ">{email[0]}</p>
                  </div>
                </div>
              ))}
            paid
          </p>
          <div
            className="radial-progress text-sm text-zinc-500"
            style={
              {
                "--value": data.remaining,
                "--size": "2rem",
                "--thickness": "2px",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            {data.remaining}
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}
