"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { GroupDetails } from "@/lib/types";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Link from "next/link";
import React from "react";

export default function ContributionHeader({ data }: { data: GroupDetails }) {
  const { currentUser } = useAuth();
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW ?? "",
    tx_ref: Date.now().toString(),
    amount: 1000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: currentUser?.email ?? "",
      phone_number: currentUser?.phoneNumber ?? "",
      name: currentUser?.displayName ?? "",
    },
    customizations: {
      title: data.name + " (Valid)",
      description: data.description,
      logo: data.image ?? " ",
    },
    meta: {
      groupId: data.name,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  return (
    <div>
      <div className="space-y-2">
        {data.image ? (
          <img src={data.image || ""} alt={data.name} />
        ) : (
          <div className="avatar placeholder flex flex-col space-y-2">
            <div className="bg-zinc-500 flex items-center justify-center text-white w-24 p-2  rounded-full">
              <span className="text-5xl text-end h-fit mt-2">
                {data.name[0]}
              </span>
            </div>
          </div>
        )}
        <p className="text-2xl text-zinc-600">{data.name}</p>
        <p className="text-zinc-600">{data.description}</p>
      </div>
      <div className="divider" />
      <div>
        <p className="text-5xl font-bold">{data.total}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`${data.name}/transactions`}>
          <p className="underline ">contributed by</p>
        </Link>

        <div
          className="avatar-group -space-x-5 rtl:space-x-reverse items-center gap-2 "
          role="button"
        >
          {data.participantsEmails.map((email) => (
            <div
              key={email}
              className="avatar  flex items-center justify-center border-0 outline-0"
            >
              <div className="bg-zinc-300 flex items-center justify-center text-zinc-700 w-8  border-0 outline-0 rounded-full">
                <p className="text-2xl text-center   ">{email[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />
      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
        className="btn bg-zinc-900 border-1 border-gray-300 w-full"
      >
        Contribute Funds
      </button>
      {data.admin == "you" && (
        <button className="btn btn-ghost border-1 border-gray-300 w-full">
          Initiate Withdrawal Process
        </button>
      )}
    </div>
  );
}
