// import { Check, CheckCircle, Loader, Trash, View } from "lucide-react";
// import React, { useState } from "react";
// import axios from "../../../axiosInstance";
// import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
// import ReturnModal from "./returnModal";

// interface Request {
//   id: number;
//   book: string;
//   book_code: string;
//   book_status: string;
//   firstName: string;
//   lastName: string;
//   nic: string;
//   nin: string;
//   remain_book: number;
//   section: string;
//   shelf: number;
//   total_book: number;
//   user_status: string;
// }

// interface RequestTableProps {
//   requests: Request[];
//   onView: (id: number) => void;
//   onEdit: (id: number) => void;
//   onDelete: (id: number) => void;
//   loadingDelete: number | null;
//   component: string;
//   refetchData: () => void;
// }

// const BorrowTable: React.FC<RequestTableProps> = ({
//   requests,
//   onView,
//   onEdit,
//   onDelete,
//   loadingDelete,
//   component,
//   refetchData,
// }) => {
//   const { token } = useAdminAuthStore();
//     const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [openReturnDateModal, setOpenReturnDateModal] = useState(false);
//   const [request_id, setSelectedUserId] = useState<number | undefined>(undefined);
//   const handleClick = (returnDate: string) => {
//     if (!request_id) return;
//     setLoadingActivating(request_id);
//     axios
//       .post(
//         `/api/dashboard/reserves/active/${request_id}`,
//         { returnDate },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setSuccessMessage(`User ${request_id} activated successfully`);
//         console.log("response", response);
//         refetchData();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       }).finally(() => {
//         setLoadingActivating(null);
//         setTimeout(() => setSuccessMessage(null), 3000);
//       });
//   };
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-right">عنوان کتاب</th>
//             <th className="py-3 px-6 text-right">نویسنده</th>
//             <th className="py-3 px-6 text-right">نام امانت گیرنده</th>
//             <th className="py-3 px-6 text-right">تخلص امانت گیرنده</th>
//             <th className="py-3 px-6 text-center">عملیات</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {requests.map((request) => (
//             <tr
//               key={request.id}
//               className="border-b border-gray-200 hover:bg-gray-100"
//             >
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{request.book}</div>
//               </td>
//               <td className="py-3 px-6 text-right whitespace-nowrap">
//                 <div className="font-medium">{request.book}</div>
//               </td>
//               <td className="py-3 px-6 text-right">{request.firstName}</td>
//               <td className="py-3 px-6 text-right">{request.lastName}</td>
//               <td className="py-3 px-6 text-center">
//                 <div className="flex item-center justify-center">
//                   {component === "Requests" && (
//                     <button
//                       className="p-1 hover:bg-gray-300 rounded-md text-blue-500 hover:text-blue-700"
//                       onClick={() => handleClick(request.id)}
//                       disabled={loadingActivating === request.id}
//                       >
//                          {loadingActivating === request.id ? (
//                           <Loader size={20} className="animate-spin text-blue-600" />
//                         ) : (
//                           <CheckCircle height={20} width={20} />
//                         )}
//                     </button>
//                   )}
//                   <button
//                     onClick={() => onView(request.id)}
//                     className="w-8 h-8 mr-2 transform text-green-400 hover:text-green-500 hover:scale-110 flex items-center justify-center"
//                   >
//                     <View height={20} width={20} />
//                   </button>
//                   {component === "R" && (
//                   <button
//                     onClick={() => onEdit(request.id)}
//                     className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
//                   >
//                     <Check height={20} width={20} />
//                   </button>
//                   )}
//                   <button
//                     onClick={() => onDelete(request.id)}
//                     className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
//                     disabled={loadingDelete === request.id}
//                   >
//                     {loadingDelete === request.id ? (
//                       <Loader size={20} className="animate-spin text-red-600" />
//                     ) : (
//                       <Trash height={20} width={20} />
//                     )}
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {openReturnDateModal && (
//         <ReturnModal
//           closeModal={() => setOpenReturnDateModal(false)}
//           onSubmit={handleClick}
//         />
//       )}
//       {successMessage && (
//         <div className="mt-4 text-green-500 text-center">{successMessage}</div>
//       )}
//     </div>
//   );
// };

// export default BorrowTable;


import { Check, CheckCircle, Loader, Trash, View } from "lucide-react";
import React, { useState } from "react";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import ReturnModal from "./returnModal";

interface Request {
  id: number;
  book: string;
  book_code: string;
  book_status: string;
  firstName: string;
  lastName: string;
  nic: string;
  nin: string;
  remain_book: number;
  section: string;
  shelf: number;
  total_book: number;
  user_status: string;
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
  const [loadingActivating, setLoadingActivating] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openReturnDateModal, setOpenReturnDateModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);

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
                <div className="font-medium">{request.book}</div>
              </td>
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{request.book}</div>
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
                  <button
                    onClick={() => onDelete(request.id)}
                    className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
                    disabled={loadingDelete === request.id}
                  >
                    {loadingDelete === request.id ? (
                      <Loader size={20} className="animate-spin text-red-600" />
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
      {openReturnDateModal && (
        <ReturnModal
          closeModal={() => setOpenReturnDateModal(false)}
          onSubmit={handleClick}
        />
      )}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
    </div>
  );
};

export default BorrowTable;