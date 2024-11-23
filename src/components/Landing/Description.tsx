import React from "react";

export default function Description() {
  return (
    <div className="antialiased w-full bg-white">
      <div className="w-screen absolute md:right-10 bg-gradient h-8 relative z-4" />
      <div className="w-full bg-white mt-[140px] flex flex-col md:flex-row items-center justify-between space-y-4 px-4">
        <div className="space-y-4 flex flex-col md:w-3/6">
          <h3 className="relative z-20 text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-t from-neutral-400 to-neutral-600   font-josefin font-bold">
            It is designed to facilitate collective funding efforts where
            participants may not have a pre-existing trusted individual to
            manage the pooled funds.
          </h3>
          <button className="btn bg-gradient relative z-20 btn-lg border-0 text-2xl text-white mt-5">
            Use Valid Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>

        <div className="relative  h-[500px] border border-3 border-white">
          <img
            src="https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={500}
            height={500}
            alt={"valid together"}
            className="  object-cover object-center h-full  hover:object-contain hover:h-auto border-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b bg-gradient-to-r from-white via-transparent to-white "></div>
        </div>
      </div>
      <div className="px-4">
        <button className="btn bg-gradient relative z-20 btn-lg border-0 text-2xl text-white mt-5 md:w-3/6 md:hidden w-full">
          Start Using Valid
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
