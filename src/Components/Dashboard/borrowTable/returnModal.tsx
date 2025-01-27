import React, { useState } from "react";

interface ReturnDateModalProps {
  closeModal: () => void;
  onSubmit: (returnDate: string) => void;
}

const ReturnModal: React.FC<ReturnDateModalProps> = ({ closeModal, onSubmit }) => {
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(returnDate);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Set Return Date</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="border rounded p-2 w-full mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-1 px-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnModal;