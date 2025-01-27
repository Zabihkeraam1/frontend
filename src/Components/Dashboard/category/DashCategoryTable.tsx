import axios from "../../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import { Loader } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

interface Props {
  update: boolean;
}

const DashCategoryTable: React.FC<Props> = ({ update }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/dashboard/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [update, token]);

  return (
    <div className="mt-6">
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">آی دی</th>
              <th className="py-3 px-6">نام</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{category.id}</td>
                  <td className="py-3 px-6">{category.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashCategoryTable;