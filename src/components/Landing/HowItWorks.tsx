import React from "react";
import { WobbleCard } from "../UI/WobbleCard";
import create from "@/app/create.png";
import Image from "next/image";
import wsGroup from "@/app/ws-group.png";
export default function HowItWorks() {
  return (
    <div className="px-4 w-full ">
      <p className=" text-4xl md:text-7xl text-gray-400 mt-[150px]">
        How to use Valid
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mt-[40px]">
        <WobbleCard containerClassName="col-span-1 min-h-[200px]">
          <h2 className="max-w-80  text-left text-balance text-2xl  lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Join Valid.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-xl text-neutral-200">
            Create an account on Valid to get started.
          </p>
        </WobbleCard>
        <WobbleCard
          containerClassName="col-span-1  h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Create a contibution group.
            </h2>
            <p className="mt-4 text-left  text-xl text-neutral-200">
              Click to the "Create" button to write the details and purpose of
              the contribution group.
            </p>
          </div>
          <Image
            src={create}
            width={200}
            height={200}
            alt="Create Valid Group"
            className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-61 object-contain rounded-2xl"
          />
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1  bg-blue-900 min-h-[300px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-3xl font-semibold tracking-[-0.015em] text-white">
              Share to friends and participants!
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-xl text-neutral-200">
              Copy group link to share to those that will participate in the
              contribution and relax. Safe transaction and record keeping is
              done for you.
            </p>
          </div>
          <Image
            src={wsGroup}
            width={300}
            height={300}
            alt="Valid"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-13 md:-bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </div>
  );
}
