"use client";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useRef, useState } from "react";
// import axios from "axios";

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
          <h2 className="card-title">Contribution Created!</h2>
          <p>Your contribution has been successfully created.</p>
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

export default function ContributionCreation() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount.replace(/,/g, ""));

    if (numericAmount < 5000) {
      setErrorMessage("Amount must be at least 5,000.");
      return;
    }
    setErrorMessage(null);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        setProgress(0);
      }

      // const contributionData = {
      //   name,
      //   purpose,
      //   amount: numericAmount,
      //   imageUrl,
      // };

      // // Send data to your server
      // await axios.post("/api/contributions", contributionData);

      // Show modal on successful creation
      modalRef.current?.showModal();
    } catch (error: any) {
      setErrorMessage("Failed to create contribution. Please try again.");
      console.error(error);
    }
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedAmount = formatAmount(e.target.value);
    setAmount(formattedAmount);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `contributions/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      <form onSubmit={handleSubmit} className="overflow-y-auto h-[80vh]">
        {previewImage && (
          <div className="mt-4 p-2 bg-zinc-200 rounded-md">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
            {progress > 0 && (
              <progress
                className="progress w-56 progress-success"
                value={progress}
                max="100"
              ></progress>
            )}
          </div>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name of contribution?</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full bg-zinc-50"
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Purpose of contribution?</span>
          </div>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full bg-zinc-50"
            required
          />
        </label>

        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Amount</span>
            <h6 className="text-warning text-sm">
              Currency will default to NGN
            </h6>
          </div>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="input input-bordered w-full bg-zinc-50"
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </label>

        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Upload Picture</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full bg-zinc-50"
            onChange={handleImageChange}
          />
        </label>

        <button
          type="submit"
          className="btn w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white outline outline-0 mt-4"
        >
          Create Contribution
        </button>
      </form>

      <dialog ref={modalRef} className="modal">
        <CreationSuccessModal onClose={closeModal} />
      </dialog>
    </div>
  );
}
