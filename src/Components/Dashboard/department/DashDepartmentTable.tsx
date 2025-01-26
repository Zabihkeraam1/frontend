import axios from "../../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";

type Department = {
  id: number;
  name: string;
};

type Faculty = {
  id: number;
  name: string;
  departments: Department[];
};

interface Props {
  update: boolean;
}

const DashDepartmentTable: React.FC<Props> = ({ update }) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/dashboard/faculties/with/departments", {
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

  useEffect(() => {
    console.log("Faculties state updated:", faculties);
  }, [faculties]);

  return (
    <div className="mt-6">
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin h-7 w-7 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 ">پوهنځی</th>
              <th className="py-3 px-6 ">دیپارتمنت</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {faculties.length > 0 ? (
              faculties.map((faculty) => (
                <React.Fragment key={faculty.id}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{faculty.name}</td>
                    <td className="py-3 px-6">
                      {faculty.departments.length > 0 ? (
                        <ol className="list-decimal pl-6">
                          {faculty.departments.map((department) => (
                            <li key={department.id} className="my-2 text-gray-700">{department.name}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>No departments available</p>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
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

export default DashDepartmentTable;