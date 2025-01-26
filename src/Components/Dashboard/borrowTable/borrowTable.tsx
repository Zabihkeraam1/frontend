import { CheckCircle, Edit, Trash, View } from "lucide-react";
import React from "react";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";

interface Request {
  id: number;
  title: string;
  author: string;
  publisher: string;
}

interface RequestTableProps {
  requests: Request[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
  const handleClick = (user_id: number | undefined) => {
    if (!user_id) return;
    axios
      .post(
        `/api/dashboard/users/activate_user/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        refetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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
                <div className="font-medium">{request.id}</div>
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{request.author}</div>
              </td>
              <td className="py-3 px-6 text-right">{request.author}</td>
              <td className="py-3 px-6 text-right">{request.author}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  {component === "Deactivate-Users" && (
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleClick(request.id)}
                    >
                      <CheckCircle height={20} width={20} />
                    </button>
                  )}
                  <button
                    onClick={() => onView(request.id)}
                    className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
                  >
                    <View height={20} width={20} />
                  </button>
                  <button
                    onClick={() => onEdit(request.id)}
                    className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                  >
                    <Edit height={20} width={20} />
                  </button>
                  <button
                    onClick={() => onDelete(request.id)}
                    className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
                    disabled={loadingDelete === request.id}
                  >
                    {loadingDelete === request.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <Trash height={20} width={20} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowTable;
