// import axios from "../../axiosInstance";
// import React, { useEffect, useState } from "react";
// import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

// type Category = {
//   id: number;
//   name: string;
// };
// interface Props{
//     update: boolean;
// }
// const DashCategoryList: React.FC<Props> = ({update}) => {
//   const [category, setCategory] = useState<Category[]>([]);
//   const { token } = useAdminAuthStore();

//   useEffect(() => {
//     const fetchFaculties = async () => {
//       try {
//         const response = await axios.get("/api/dashboard/categories", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("API response:", response.data);
//         // Check if response.data contains the expected structure
//         if (response.data && Array.isArray(response.data.data)) {
//             setCategory(response.data.data); // Assuming response.data.data contains the list of faculties
//         } else {
//           console.error("Unexpected API response structure:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching faculties:", error);
//       }
//     };

//     fetchFaculties();
//   }, [update, token]);

//   return (
//     <div className="flex mt-6 mb-6 p-4 border border-gray-300 rounded-lg">
//       {category.length > 0 ? (
//         category.map((category) => (
//           <ul key={category.id} className="ml-4">
//             <li className=" text-gray-700 list-disc py-2 ml-4">{category.name}</li>
//           </ul>
//         ))
//       ) : (
//         <p>No category available</p>
//       )}
//     </div>
//   );
// };

// export default DashCategoryList;



import axios from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type Category = {
  id: number;
  name: string;
};

interface Props {
  update: boolean;
}

const DashCategoryTable: React.FC<Props> = ({ update }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/dashboard/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Assuming response.data.data contains the list of categories
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [update, token]);

  return (
    <div className="mt-6">
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
              <td colSpan={1} className="text-center py-3">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashCategoryTable;