import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import BorrowTable from "../borrowTable/borrowTable";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
import RequestDetails from "../borrowTable/borrowDetails";
import { Loader } from "lucide-react";

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

const DashRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(10);
  const [reload, setReload] = useState(false);
  const { token } = useAdminAuthStore();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const refetchData = () => {
    setReload(!reload);
  };
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/api/dashboard/reserves/inactive/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [reload]);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing user with id: ${id}`);
  };
  const handleView = (id: number) => {
    const userToView = requests.find((request) => request.id === id);
    if (userToView) {
      setSelectedRequest(userToView);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "آیا مطمعن هستید؟",
        text: "دیتای هذف شده قابل بازیافت نمیباشد!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نخیر",
        confirmButtonText: "بلی",
      });

      if (result.isConfirmed) {
        setLoadingDelete(id);
        axios.post(`/api/dashboard/reserves/inactive/user/delete/${id}`, {},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(requests.filter((request) => request.id !== id));
        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Failed to delete user", "error");
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleReceived = () => {};
  const filteredRequests = requests.filter((request) =>
    `${request.book_title} ${request.firstName} ${request.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  // Pagination
  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  return (
    <div className="px-2 min-h-screen ">
      {selectedRequest && (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      <header className="flex justify-between mt-4 mb-2 relative">
        <h1 className="text-3xl font-bold text-gray-800">لیست درخواستی‌ها</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </header>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <BorrowTable
            requests={currentRequests}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            onReceive={handleReceived}
            loadingDelete={loadingDelete}
            component="Requests"
            refetchData={refetchData}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredRequests.length}
            itemsPerPage={requestPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default DashRequests;
