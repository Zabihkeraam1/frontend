import React, { useEffect, useState, ReactNode } from "react";
import axios from "../../axiosInstance";
import Table from "../Table/Table";
import { FaSearch, FaEdit } from "react-icons/fa";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import Pagination from "./pagination/pagination";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const columns = [
  { header: "آی‌دی", accessor: "id" },
  { header: "نام", accessor: "firstName" },
  { header: "تخلص", accessor: "lastName" },
  { header: "ایمیل", accessor: "email" },
  { header: "عملیات", accessor: "actions" },
];

const DashUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [reload, setReload] = useState(false);
  const { token } = useAdminAuthStore();
  const refetchData = () => {
    setReload(!reload);
  };
  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/users/activated_students", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing user with id: ${id}`);
  };

  const convertUsersToRecords = (users: User[]): Record<string, ReactNode>[] => {
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      actions: (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(user.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
        </div>
      ),
    }));
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const tableData = convertUsersToRecords(currentUsers);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">همه کاربران</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو..."
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
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table columns={columns} data={tableData} component="Users" refetchData={refetchData} />
          </div>
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

export default DashUser;

