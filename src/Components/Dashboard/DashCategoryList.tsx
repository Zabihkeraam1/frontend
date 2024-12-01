import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type Category = {
  id: number;
  name: string;
};
interface Props{
    update: boolean;
}
const DashCategoryList: React.FC<Props> = ({update}) => {
  const [category, setCategory] = useState<Category[]>([]);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        // Check if response.data contains the expected structure
        if (response.data && Array.isArray(response.data.data)) {
            setCategory(response.data.data); // Assuming response.data.data contains the list of faculties
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
      {category.length > 0 ? (
        category.map((category) => (
          <ul key={category.id} className="ml-4">
            <li className=" text-gray-700 list-disc py-2 ml-4">{category.name}</li>
          </ul>
        ))
      ) : (
        <p>No category available</p>
      )}
    </div>
  );
};

export default DashCategoryList;


