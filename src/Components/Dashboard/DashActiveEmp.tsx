import React, { useEffect, useState, ReactNode } from "react";
import Table from "../Table/Table";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

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

const convertUsersToRecords = (users: User[]): Record<string, ReactNode>[] => {
  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }));
};
const DashActiveEmp: React.FC = () => {
  const { token } = useAdminAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(token);
    axios
      .get("http://localhost:8000/api/dashboard/users/activated_teachers", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then((response) => {
        setUsers(response.data.data);
        console.log(response);
      });
  }, []);
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const tableData = convertUsersToRecords(filteredUsers);
  return (
    <div className="px-2 min-h-screen ">
      <header className="flex justify-between mt-4 mb-2 relative">
        <h1 className="text-3xl font-bold">کاربران فعال</h1>
        <div>
          <input
             type="text"
             placeholder="Search..."
             className="bg-gray-300 pr-2 text-xl py-2"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-xl text-gray-500 absolute hover:text-blue-500 hover:cursor-pointer top-3 left-2" />
        </div>
      </header>
      <div>{users && <Table columns={columns} data={tableData} component="ActiveUsers" />}</div>
    </div>
  );
};
export default DashActiveEmp;
