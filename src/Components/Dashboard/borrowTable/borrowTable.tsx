import { Check, CheckCircle, Loader, Trash, View } from "lucide-react";
import React, { useState } from "react";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import ReturnModal from "./returnModal";
import ReceivedModal from "./receivedModal";

interface Request {
  id: number;
  book_title: string;
  book_author: string;
  book_code: string;
  book_status: string;
  remain_book: number;
  return_date: string;
  total_book: number;
  isbn: string;
  category: string;
  section: string;
  shelf: number;
  user_id: number;
  firstName: string;
  lastName: string;
  user_department: string;
  nic: string;
  nin: string;
  user_status: string;
}

interface RequestTableProps {
  requests: Request[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onReceive: (id: number) => void;
  loadingDelete: number | null;
  component: string;
  refetchData: () => void;
}

const BorrowTable: React.FC<RequestTableProps> = ({
  requests,
  onView,
  onEdit,
  onDelete,
  loadingDelete,
  component,
  refetchData,
}) => {
  const { token } = useAdminAuthStore();
  const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openReturnDateModal, setOpenReturnDateModal] = useState(false);
  const [openReceiveModal, setOpenReceivedModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
  const [selectedReceivedId, setSelectedReceivedId] = useState<number | undefined>(undefined);

  const handleClick = (returnDate: string) => {
    if (!selectedRequestId) return;
    setLoadingActivating(selectedRequestId);
    axios
      .post(
        `/api/dashboard/reserves/active/${selectedRequestId}`,
        { return_by: returnDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(`Request ${selectedRequestId} activated successfully`);
        console.log("response", response);
        refetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoadingActivating(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      });
  };

  const handleReceive = () => {
    console.log("receive", selectedReceivedId);
    if (!selectedReceivedId) return;
    axios.post(`/api/dashboard/reserves/return/book/${selectedReceivedId}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setSuccessMessage(`Request ${selectedReceivedId} activated successfully`);
      console.log("response", response);
      refetchData();
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setLoadingActivating(null);

  });
  }
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">عنوان کتاب</th>
            <th className="py-3 px-6 text-right">نویسنده</th>
            <th className="py-3 px-6 text-right">نام امانت گیرنده</th>
            <th className="py-3 px-6 text-right">تخلص امانت گیرنده</th>
            <th className="py-3 px-6 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {requests.map((request) => (
            <tr
              key={request.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{request.book_title}</div>
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{request.book_author}</div>
              </td>
              <td className="py-3 px-6 text-right">{request.firstName}</td>
              <td className="py-3 px-6 text-right">{request.lastName}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  {component === "Requests" && (
                    <button
                      className="p-1 hover:bg-gray-300 rounded-md text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedRequestId(request.id);
                        setOpenReturnDateModal(true);
                      }}
                      disabled={loadingActivating === request.id}
                    >
                      {loadingActivating === request.id ? (
                        <Loader size={20} className="animate-spin text-blue-600" />
                      ) : (
                        <CheckCircle height={20} width={20} />
                      )}
                    </button>
                  )}
                  {component === "borrow" && (
                    <button
                      className="p-1 hover:bg-gray-300 rounded-md text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedReceivedId(request.id);
                        setOpenReceivedModal(true);
                      }}
                      disabled={loadingActivating === request.id}
                    >
                      {loadingActivating === request.id ? (
                        <Loader size={20} className="animate-spin text-blue-600" />
                      ) : (
                        <CheckCircle height={20} width={20} />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => onView(request.id)}
                    className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
                  >
                    <View height={20} width={20} />
                  </button>
                  {component === "R" && (
                    <button
                      onClick={() => onEdit(request.id)}
                      className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                    >
                      <Check height={20} width={20} />
                    </button>
                  )}
                  {component === "Requests" && (<button
                    onClick={() => onDelete(request.id)}
                    className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
                    disabled={loadingDelete === request.id}
                  >
                    {loadingDelete === request.id ? (
                      <Loader size={20} className="animate-spin text-red-600" />
                    ) : (
                      <Trash height={20} width={20} />
                    )}
                  </button>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openReturnDateModal && (
        <ReturnModal
          closeModal={() => setOpenReturnDateModal(false)}
          onSubmit={handleClick}
        />
      )}
      {openReceiveModal && (
        <ReceivedModal
          closeModal={() => setOpenReceivedModal(false)}
          onSubmit={handleReceive}
        />
      )}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
    </div>
  );
};

export default BorrowTable;