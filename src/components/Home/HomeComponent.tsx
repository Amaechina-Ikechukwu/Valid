"use client";
import { ContributionGroup } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContributionPill from "./ContributionPill";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";

const EmptyContributionComponent = () => {
  return (
    <div className="h-full flex justify-center items-center overflow-hidden">
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img
            src="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="dollar"
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
              <button className="btn text-fuchsia-700 bg-white font-bold w-full mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
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
};

export default function HomeComponent() {
  const router = useRouter();
  const { token } = useAuth();
  const [contributionGroups, setContributionGroups] = useState<
    ContributionGroup[]
  >([]);

  useEffect(() => {
    async function fetchGroups() {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/contributions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const { data } = await response.json();

        setContributionGroups(data);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      }
    }

    fetchGroups();
  }, [token]);

  if (contributionGroups.length === 0) {
    return <EmptyContributionComponent />;
  }

  return (
    <div className="space-y-4 overflow-y-auto h-6/12 p-4">
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/feature/create")}
          className="btn text-fuchsia-700 hover:bg-fuchsia-300 bg-white font-bold w-fit mb-3 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
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
      <div className="overflow-y-auto h-[420px]">
        {contributionGroups.map((group) => (
          <Link href={`/feature/${group.id}`} key={group.id}>
            <ContributionPill data={group} key={group.id} />
          </Link>
        ))}
      </div>
    </div>
  );
}
