import { ContributionGroup } from "@/lib/types";
import React from "react";

export default function ContributionPill({
  data,
}: {
  data: ContributionGroup;
}) {
  return (
    <div className="flex p-2 rounded-lg bg-zinc-100 gap-8 items-center mb-3">
      {data.image ? (
        <div className="bg-white h-full">
          <img
            src={data.image || ""}
            alt={data.name}
            className="w-24 h-full object-cover rounded-lg bg-white"
          />
        </div>
      ) : (
        <div className="w-24 h-16 object-cover rounded-lg bg-white flex items-center justify-center">
          <div className="avatar placeholder flex items-center justify-center">
            <div className="bg-zinc-500 flex items-center justify-center text-white w-fit h-fit p-2  rounded-full">
              <span className="text-2xl text-end h-fit mt-2">
                {data.name[0]}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="w-full space-y-2">
        <h3 className="text-lg font-bold text-zinc-700">
          {data.name.toLocaleUpperCase()}
        </h3>
        <h3 className="text-sm text-zinc-600">{data.purpose}</h3>
        <div className="flex justify-between items-center flex-row">
          {data.participants && (
            <div className="flex items-center">
              <p className="text-lg font-light text-zinc-500 flex items-center gap-2">
                {data.participants.map((email) => (
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
            </div>
          )}
          {data.remaining && (
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
          )}
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
