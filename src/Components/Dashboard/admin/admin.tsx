import type React from "react";
import { useEffect, useState } from "react";
import { AddAdmin } from "./addAdmin";
import { AdminTable } from "./adminTable";
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import { Loader } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  email: string;
}

const Admin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const { token, permission } = useAdminAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    console.log(permission);
    axios
      .get("/api/dashboard/admin/account/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setAdmins(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleAddAdmin = (newAdmin: { name: string; email: string }) => {
    const admin: Admin = {
      ...newAdmin,
      id: admins.length + 1,
    };
    setAdmins([...admins, admin]);
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {permission === "main" && (
          <div className="w-full">
            <AddAdmin onAddAdmin={handleAddAdmin} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold mb-4">لیست ادمین</h2>
          {loading ? (
            <Loader className="animate-spin text-blue-600 m-auto" size={30} />
          ) : (
            <AdminTable admins={admins} onDeleteAdmin={handleDeleteAdmin} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Admin;
