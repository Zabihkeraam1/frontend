import axios from "../../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";

type Faculty = {
  id: number;
  name: string;
};

interface Props {
  update: boolean;
}

const DashFacultyTable: React.FC<Props> = ({ update }) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/dashboard/faculties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setFaculties(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [update, token]);

  return (
    <div className="flex mt-6 mb-6">
      {loading ? (
        <div className="flex justify-center items-center w-full py-6">
          <div className="animate-spin h-7 w-7 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="flex w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">آی دی</th>
              <th className="py-3 px-6 text-left">نام</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {faculties.length > 0 ? (
              faculties.map((faculty) => (
                <tr key={faculty.id} className="flex border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{faculty.id}</td>
                  <td className="py-3 px-6 text-left">{faculty.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3">No faculties available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashFacultyTable;