import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type Faculty = {
  id: number;
  name: string;
};
interface Props{
    update: boolean;
}
const DashFacultyList: React.FC<Props> = ({update}) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard/faculties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        // Check if response.data contains the expected structure
        if (response.data && Array.isArray(response.data.data)) {
          setFaculties(response.data.data); // Assuming response.data.data contains the list of faculties
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, [update, token]);

  return (
    <div className="flex mt-6 mb-6 p-4 border border-gray-300 rounded-lg">
      {faculties.length > 0 ? (
        faculties.map((faculty) => (
          <ul key={faculty.id} className="ml-4">
            <li className=" text-gray-700 list-disc py-2 ml-4">{faculty.name}</li>
          </ul>
        ))
      ) : (
        <p>No faculties available</p>
      )}
    </div>
  );
};

export default DashFacultyList;



