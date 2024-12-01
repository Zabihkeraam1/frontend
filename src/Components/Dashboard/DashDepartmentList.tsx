import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type Department = {
  id: number;
  name: string;
};

type Faculty = {
  id: number;
  name: string;
  departments: Department[];
};

interface Props{
    update: boolean;
}
const DashDepartmentList: React.FC<Props> = ({update}) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard/faculties/with/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setFaculties(response.data.data);  // Ensure the faculties are set correctly
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, [update, token]);

  useEffect(() => {
    console.log("Faculties state updated:", faculties);
  }, [faculties]);

  return (
    <div className="mt-6">
      {faculties.length > 0 ? (
        faculties.map((faculty) => (
          <div key={faculty.id} className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-bold">{faculty.name}</h3>
            {faculty.departments.length > 0 ? (
              <ul className="list-disc flex pl-6">
                {faculty.departments.map((department) => (
                  <li key={department.id} className="text-gray-700 mx-4">
                    {department.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No departments available</p>
            )}
          </div>
        ))
      ) : (
        <p>No faculties available</p>
      )}
    </div>
  );
};

export default DashDepartmentList;
