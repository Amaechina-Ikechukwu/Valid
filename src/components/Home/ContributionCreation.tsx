"use client";

import React, { useRef, useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="w-full max-w-xs space-y-4  ">
      <form onSubmit={handleSubmit} className="overflow-y-auto h-[80vh]">
        {previewImage && (
          <div className="mt-4 p-2 bg-zinc-200 rounded-md">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        )}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name/Purpose of contribution?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full bg-zinc-50"
            required
          />
        </label>

        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Amount</span>
          </div>
          <input
            type="number"
            placeholder="Enter amount"
            className="input input-bordered w-full bg-zinc-50"
            required
          />
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
