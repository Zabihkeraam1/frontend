import axios from "../../axiosInstance";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type DeleteModalProps<T> = {
  selectedRow: T;
  closeModal: () => void;
  itemId: number | undefined;
  component: string;
  refetchData: () => void; // Add a refetchData prop
};

const DeleteModal = <T,>({ selectedRow, closeModal, itemId, component, refetchData }: DeleteModalProps<T>) => {
  const { token } = useAdminAuthStore();
  console.log(selectedRow);
  const handleDelete = () =>{
   
    if(component === "Books"){
      axios.delete(`/api/dashboard/books/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        console.log(response);
        refetchData(); // Call the refetchData function when deletion is successful
        closeModal();
      })
    }
    else{
      axios.delete(`/api/dashboard/users/destroy/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        console.log(response);
        refetchData(); // Call the refetchData function when deletion is successful
        closeModal();
      })
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">تایید حذف!</h2>
        <p>آیا مطمعن هستید که میخواهید حذف کنید؟</p>
        {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre> */}
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;