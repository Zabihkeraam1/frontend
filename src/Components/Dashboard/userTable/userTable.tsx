import { CheckCircle, Edit, Loader, Printer, Trash, View } from "lucide-react";
import React, { useState } from "react";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import UserCard from "./UserCard";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface BookTableProps {
  users: User[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadingDelete: number | null;
  component: string;
  refetchData: () => void;
}

const UserTable: React.FC<BookTableProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
  loadingDelete,
  component,
  refetchData,
}) => {
  const { token } = useAdminAuthStore();
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();
  const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handlePrint = (id: number | undefined) => {
    setOpenPrintModal(true);
    setUserId(id);
  };

  const closePrintModal = () => {
    setOpenPrintModal(false);
    setUserId(undefined);
  };

  const handleClick = (user_id: number | undefined) => {
    if (!user_id) return;
    setLoadingActivating(user_id);
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
        setSuccessMessage(`User ${user_id} activated successfully`);
        console.log(response);
        refetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setLoadingActivating(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      });
  };
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">آی‌دی</th>
            <th className="py-3 px-6 text-right">نام</th>
            <th className="py-3 px-6 text-right">تخلص</th>
            <th className="py-3 px-6 text-right">ایمیل</th>
            <th className="py-3 px-6 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{user.id}</div>
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{user.firstName}</div>
              </td>
              <td className="py-3 px-6 text-right">{user.lastName}</td>
              <td className="py-3 px-6 text-right">{user.email}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  {component === "Deactivate-Users" && (
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleClick(user.id)}
                      disabled={loadingActivating === user.id}
                    >
                       {loadingActivating === user.id ? (
                        <Loader size={20} className="animate-spin text-blue-600" />
                      ) : (
                        <CheckCircle height={20} width={20} />
                      )}
                    </button>
                  )}
                  {component === "Users" && (
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handlePrint(user.id)}
                    >
                      <Printer height={20} width={20} />
                    </button>
                  )}
                  <button
                    onClick={() => onView(user.id)}
                    className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
                  >
                    <View height={20} width={20} />
                  </button>
                  {component === "Users" && (
                    <button
                      onClick={() => onEdit(user.id)}
                      className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                    >
                      <Edit height={20} width={20} />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(user.id)}
                    className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
                    disabled={loadingDelete === user.id}
                  >
                    {loadingDelete === user.id ? (
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
      {openPrintModal && <UserCard closeModal={closePrintModal} id={userId} />}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
    </div>
  );
};

export default UserTable;
