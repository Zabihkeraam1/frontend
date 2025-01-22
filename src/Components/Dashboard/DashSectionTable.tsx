
import axios from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

type Section = {
  id: number;
  section: string;
};

interface Props {
  update: boolean;
}

const DashSectionTable: React.FC<Props> = ({ update }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const { token } = useAdminAuthStore();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("/api/dashboard/sections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setSections(response.data.data); // Assuming response.data.data contains the list of sections
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
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
          {sections.length > 0 ? (
            sections.map((s) => (
              <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{s.id}</td>
                <td className="py-3 px-6">{s.section}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={1} className="text-center py-3">No sections available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashSectionTable;