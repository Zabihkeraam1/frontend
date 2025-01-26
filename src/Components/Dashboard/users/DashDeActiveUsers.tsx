import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import Pagination from "../pagination/pagination";
import UserTable from "../userTable/userTable";
import Swal from "sweetalert2";
import UserDetails from "../userTable/userDetails";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  current_residence: string;
  original_residence: string;
  phone: string;
  type: string;
  department: string;
  faculty: string;
  nic: string;
  nin: string;
}


const DashDeActiveUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);
  const { token } = useAdminAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const refetchData = () => {
    setReload(!reload);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/dashboard/users/inactivated_students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, reload]);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing user with id: ${id}`);
  };
  const handleView = (id: number) => {
    const userToView = users.find((user) => user.id === id);
    if (userToView) {
      setSelectedUser(userToView);
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
        // Implement delete functionality
        axios.delete(`/api/dashboard/users/destroy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Failed to delete user", "error");
    } finally {
      setLoadingDelete(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">کاربران غیرفعال</h1>
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
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <UserTable
            users={currentUsers}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            loadingDelete={loadingDelete}
            component="Deactivate-Users"
            refetchData={refetchData}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={usersPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default DashDeActiveUsers;