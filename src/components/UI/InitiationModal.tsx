import { useAuth } from "@/contexts/AuthProvider";
import axios from "axios";
import React, { useEffect } from "react";

type ModalProps = {
  phase: "inform" | "action" | "result";
  onClose: () => void;
  onNextPhase: (nextPhase: "inform" | "action" | "result" | null) => void;
  groudid: string;
};

const InitiationModal: React.FC<ModalProps> = ({
  phase,
  onClose,
  onNextPhase,
  groudid,
}) => {
  const handleNext = () => {
    if (phase === "inform") onNextPhase("action");
    else if (phase === "action") onNextPhase("result");
    else onClose();
  };
  const { token } = useAuth();
  useEffect(() => {
    if (!token) {
      console.error("No token found, authorization will fail.");
      return;
    }

    if (phase === "action") {
      const InitiateWithdrawal = async () => {
        try {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API}/contributions/adminwithdrawal/${groudid}`,
            {}, // Empty body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Withdrawal response:", response.data); // Debug log
          handleNext();
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

      InitiateWithdrawal();
    }
  }, [phase, token]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        {phase === "inform" && (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Withdrawal Information</h3>
            <p className="text-gray-600">
              You are about to initiate the withdrawal process.
            </p>
            <p className="text-gradient">
              After which, you will have to inform all contributors to approve
              your withdrawal.
            </p>
          </div>
        )}
        {phase === "action" && (
          <div>
            <h3 className="text-2xl font-bold">
              Processing Withdrawal Initiation
            </h3>
            <p className="text-gray-600">
              Please wait while the process completes...
            </p>
          </div>
        )}
        {phase === "result" && (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Withdrawal Initiation Complete
            </h3>
            <p className="text-gray-600">
              The withdrawal has been successfully processed.
            </p>
            <p className="text-gradient">
              Please inform all contributors to approve your withdrawal.
            </p>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          {phase !== "result" && (
            <button className="btn bg-gray-200" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn bg-gradient text-white" onClick={handleNext}>
            {phase === "result" ? "Close" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiationModal;
