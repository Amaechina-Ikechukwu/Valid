import Link from "next/link";
import React from "react";
const EmptyContributionComponent = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img
            src="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="dollar "
          />
        </figure>
        <div className="card-body flex justify-end h-full">
          <div>
            <h2 className="card-title text-5xl text-fuchsia-200">Valid!</h2>
            <p className="text-lg text-white">
              Pull funds together to get that goods today!!!
            </p>
            <Link href="/feature/create">
              <button className="btn  text-fuchsia-700 bg-white font-bold w-full mt-2">
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
  return <EmptyContributionComponent />;
}
