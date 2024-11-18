

type DeleteModalProps = {
  closeModal: () => void;
};

const DeleteModal = ({ closeModal }: DeleteModalProps) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
      <p>Are you sure you want to delete this item?</p>
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Delete
      </button>
      <button onClick={closeModal} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded">
        Cancel
      </button>
    </div>
  </div>
);

export default DeleteModal;
