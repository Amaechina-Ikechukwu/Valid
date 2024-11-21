"use client";

import { ContributionGroup } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContributionPill from "./ContributionPill";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";
import ValidLoader from "../UI/ValidLoader";
import { BackgroundGradient } from "../UI/BackgroundGradient";

const EmptyContributionComponent = () => (
  <div className="h-full flex justify-center items-center overflow-hidden">
    <div className="card bg-base-100 image-full w-96 shadow-xl">
      <figure>
        <img
          src="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Dollar background"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex justify-end h-full">
        <div>
          <h2 className="card-title text-5xl text-fuchsia-200">Valid!</h2>
          <p className="text-lg text-white">
            Pull funds together to get that goods today!
          </p>
          <Link href="/feature/create">
            <button
              className="btn text-fuchsia-700 bg-white font-bold w-full mt-2"
              aria-label="Create contribution"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create contribution
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function HomeComponent() {
  const router = useRouter();
  const { token } = useAuth();
  const [contributionGroups, setContributionGroups] = useState<
    ContributionGroup[] | undefined
  >();

  useEffect(() => {
    if (!token) return;

    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/contributions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContributionGroups(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            `Failed to fetch contributions [${error.response?.status}]:`,
            error.response?.data || error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchGroups();
  }, [token]);

  if (contributionGroups == undefined) {
    return <ValidLoader />;
  }

  if (contributionGroups.length === 0) {
    return <EmptyContributionComponent />;
  }

  return (
    <div className="space-y-4   p-4">
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/feature/create")}
          className="btn bg-gradient  text-white font-bold w-fit mb-3 text-sm"
          aria-label="Create new contribution group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create
        </button>
      </div>
      <p className="text-sm text-zinc-400">Your contribution groups</p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4 h-[420px] space-y-2 items-center justify-center">
        {contributionGroups.map((group) => (
          <Link href={`/feature/${group.name}`} key={group.id}>
            <div className="w-11/12 md:w-full justify-self-center">
              <BackgroundGradient>
                <ContributionPill data={group} />
              </BackgroundGradient>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
