type EditModalProps<T> = {
  selectedRow: T;
  closeModal: () => void;
  id: number | undefined;
  component: string;
};

const EditModal = <T,>({ selectedRow, closeModal }: EditModalProps<T>) =>{
  console.log(selectedRow);
  return(
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
      <p>Edit form content goes here for the selected row.</p>
      <div className="flex justify-between">
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
      <button onClick={closeModal} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded">
        Cancel
      </button>
      </div>
    </div>
  </div>
  )
};

export default EditModal;
