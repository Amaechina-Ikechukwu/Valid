import React from "react";

type ModalProps = {
  phase: "inform" | "action" | "result";
  onClose: () => void;
  onNextPhase: (nextPhase: "inform" | "action" | "result" | null) => void;
};

const InitiationModal: React.FC<ModalProps> = ({
  phase,
  onClose,
  onNextPhase,
}) => {
  const handleNext = () => {
    if (phase === "inform") onNextPhase("action");
    else if (phase === "action") onNextPhase("result");
    else onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
        {phase === "inform" && (
          <div>
            <h3 className="text-2xl font-bold">Withdrawal Information</h3>
            <p className="text-gray-600">
              You are about to initiate the withdrawal process. Please confirm.
            </p>
          </div>
        )}
        {phase === "action" && (
          <div>
            <h3 className="text-2xl font-bold">Processing Withdrawal</h3>
            <p className="text-gray-600">
              Please wait while the process completes...
            </p>
          </div>
        )}
        {phase === "result" && (
          <div>
            <h3 className="text-2xl font-bold">Withdrawal Complete</h3>
            <p className="text-gray-600">
              The withdrawal has been successfully processed.
            </p>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          {phase !== "result" && (
            <button className="btn bg-gray-200" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn bg-blue-500 text-white" onClick={handleNext}>
            {phase === "result" ? "Close" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitiationModal;
