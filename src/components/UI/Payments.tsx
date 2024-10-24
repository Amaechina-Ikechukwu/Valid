"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { GroupDetails } from "@/lib/types";

const FlutterwavePayment = ({ data }: { data: GroupDetails }) => {
  const [amount, setAmount] = useState<number>(1000);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const { currentUser } = useAuth();
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW ?? "",
    tx_ref: Date.now().toString(),
    amount: amount,
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

  const fwConfig = {
    ...config,
    callback: (response: any) => {
      console.log(response);
      closePaymentModal(); // close modal programmatically
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Enter Payment Amount</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount (NGN)
        </label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="input input-bordered w-full bg-zinc-50"
          placeholder="Enter amount"
          required
        />
      </div>

      <FlutterWaveButton
        {...fwConfig}
        text="Pay Now"
        className="btn bg-zinc-900 border-1 border-gray-300 w-full"
      />
    </div>
  );
};

export default FlutterwavePayment;
