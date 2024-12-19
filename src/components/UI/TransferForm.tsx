"use client";
import { useAuth } from "@/contexts/AuthProvider";
import { GroupDetails } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
const CreationSuccessModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-box bg-zinc-100">
      <div className="card bg-zinc-100 w-full shadow-xl">
        <figure>
          <img
            className="h-60 object-cover w-full"
            src="https://th.bing.com/th/id/R.5d6395d6e47500b44244b2368d6cb4b3?rik=XPO1xTGdbUCvGQ&pid=ImgRaw&r=0"
            alt="confetti"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Contribution Completed!</h2>
          <p>Your transfer is on its way.</p>
          <div className="card-actions justify-end">
            <button className="btn bg-zinc-900 text-white" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const TransferForm = ({ group }: { group: GroupDetails }) => {
  const { name, contributedAmount } = group;
  const { token } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState<{
    account_name?: string;
    account_number?: string;
  } | null>(null);
  const [transferFee, setTransferFee] = useState<number | null>(null);
  const [banks, setBanks] = useState<
    { id: number; code: string; name: string }[]
  >([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    modalRef.current?.close();
    router.push(`/feature`);
  };

  // Fetch the list of banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/transactions/group/${name}/getbanks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setBanks(data.data);
        } else {
          setError("Failed to fetch banks.");
        }
      } catch (err) {
        setError("An error occurred while fetching banks.");
      }
    };

    fetchBanks();
  }, []);

  // Handle account verification with debounce
  useEffect(() => {
    if (
      accountNumber.length === 10 &&
      selectedBank &&
      selectedBank?.length > 2
    ) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      const timeout = setTimeout(() => {
        handleAccountCheck();
      }, 2000); // 2 seconds debounce
      setDebounceTimeout(timeout);
    } else {
      setIsValidAccount(false);
      setAccountDetails(null);
      setError(null);
    }

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [accountNumber, selectedBank]);

  const handleAccountCheck = async () => {
    try {
      setError(null);
      setIsValidAccount(false);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/transactions/group/${name}/verifyaccount?account_number=${accountNumber}&account_bank=${selectedBank}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.details || "Could not verify account.");
        return;
      }

      setIsValidAccount(true);
      setAccountDetails(data.data);
      handleFeeCheck();
    } catch (err) {
      setError("An error occurred while verifying the account.");
    }
  };

  const handleFeeCheck = async () => {
    // if (!isValidAccount) {
    //   setError("Please select a bank and verify your account.");
    //   return;
    // }

    try {
      setError(null);
      setTransferFee(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/transactions/group/${name}/gettransferfee?currency=NGN&amount=${contributedAmount}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.details || "Could not calculate the transfer fee.");
        return;
      }

      setTransferFee(data.data[0].fee);
    } catch (err) {
      setError("An error occurred while calculating the transfer fee.");
    }
  };

  const handleTransfer = async () => {
    if (!isValidAccount || !selectedBank || transferFee === null) {
      setError("Please complete all steps before transferring.");
      return;
    }

    try {
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/transactions/group/${name}/transferrequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            account_number: accountNumber,
            account_bank: selectedBank,
            amount: contributedAmount,
            narration: `Transfer from ${group.name}`,
            debit_currency: "NGN",
            reference: "",
            callback_url: "",
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.details || "Transfer failed.");
        return;
      }

      modalRef.current?.showModal();
    } catch (err) {
      setError("An error occurred while processing the transfer.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gradient">
        Withdrawal from {name}
      </h2>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Account Number</span>
        </label>
        <input
          type="number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter 10-digit account number"
          className="input input-bordered w-full bg-zinc-50"
        />
        {accountNumber.length === 10 && !isValidAccount && !error ? (
          <p className="text-gray-300 mt-2">Verifying account...</p>
        ) : (
          <p className="text-gradient mt-2">
            {accountDetails?.account_name || ""}
          </p>
        )}
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Select Bank</span>
        </label>
        <select
          className="select select-bordered w-full bg-zinc-50"
          value={selectedBank || ""}
          onChange={(e) => setSelectedBank(e.target.value)}
        >
          <option value="" disabled>
            Choose a bank
          </option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      {transferFee !== null && (
        <div className="text-success mt-4">
          <p>
            Contributed Amount: <strong>{contributedAmount}</strong> (Transfer
            Fee: <strong>{transferFee + 100}</strong>)
          </p>
        </div>
      )}

      {transferFee !== null && (
        <div className="form-control mt-6">
          <button
            onClick={handleTransfer}
            className="btn btn-primary w-full bg-gradient text-white"
          >
            Transfer {contributedAmount - transferFee - 100}
          </button>
        </div>
      )}

      {error && <div className="text-error mt-4">Error: {error}</div>}
      <dialog ref={modalRef} className="modal">
        <CreationSuccessModal onClose={closeModal} />
      </dialog>
    </div>
  );
};

export default TransferForm;
