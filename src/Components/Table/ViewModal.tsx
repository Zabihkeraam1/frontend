type ViewModalProps<T> = {
  selectedRow: T;
  closeModal: () => void;
  id: number | undefined;
  component: string;
};

const ViewModal = <T,>({ selectedRow, closeModal }: ViewModalProps<T>) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">View Details</h2>
      <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(selectedRow, null, 2)}</pre>
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Close
      </button>
    </div>
  </div>
);

export default ViewModal;
