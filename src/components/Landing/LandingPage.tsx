"use client";

import Image from "next/image";
import React from "react";
import groupCard from "@/app/group card.png";
import Link from "next/link";
export default function LandingPage() {
  return (
    <div>
      <div className=" antialiased flex flex-col md:flex-row h-full justify-center">
        <div className="px-4">
          <h1 className="relative z-10 text-7xl md:text-9xl  bg-clip-text text-transparent  bg-gradient-to-r from-blue-500 to-purple-600  w-fit h-fit font-josefin font-bold">
            Valid
          </h1>

          <h3 className="relative z-50 text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600   font-josefin font-bold">
            a secure platform that acts as a neutral, trusted party for group
            financial contributions.
          </h3>
          <Link href="#description">
            <button className="btn bg-black relative z-20 btn-lg border-0 text-2xl text-white mt-5">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-8 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="mt-10 relative z-6">
          <Image
            src={groupCard}
            //   width={500}
            //   height={500}
            alt="Valid Contribution Group User Interface"
            className="rounded-lg shadow-md z-40 transform rotate-12 scale-125 md:scale-[1.85] relative -left-20 md:-left-[250px] "
          />
          {/* Optional subtle shadow */}
          {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 blur-md transform rotate-6" /> */}
        </div>
      </div>
    </div>
  );
}
