import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { AiFillPrinter, AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import PrintModal from "../PrintModal";

type TableColumn<T> = {
  header: string;
  accessor: keyof T | "actions";
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  component: string;
};

type ActionType = "view" | "edit" | "delete";

const ReusableTable = <T extends { id?: number }>({
  columns,
  data,
  component
}: TableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);

  const openModal = (row: T, action: ActionType) => {
    setSelectedRow(row);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setActionType(null);
  };
  const [ openPrintModal, setOpenPrintModal ] = useState(false);
  const [ userId, setUserId ] = useState<number|undefined>();
  const handlePrint = (id:number|undefined) => {
    console.log(id, "handleModal");
    setOpenPrintModal(true);
    setUserId(id);
  };
  const closePrintModal = () => {
    setOpenPrintModal(false);
    setUserId(undefined);
  };
  const { token } = useAdminAuthStore();
  const handleClick = (user_id: number | undefined) => {
    if (!user_id) return;
    axios
      .post(`http://localhost:8000/api/dashboard/users/activate_user/${user_id}`,{} ,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="py-3 px-4 text-gray-600 font-semibold"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {column.accessor === "actions" ? (
                    <div className="flex">
                      <div className="bg-gray-300 rounded-md text-xl">
                      {component === "DeActiveUsers" && (
                        <button
                          className="p-1 text-blue-500 hover:text-blue-700"
                          onClick={() => handleClick(row.id)}
                        >
                          <AiOutlineCheckCircle />
                        </button>
                      )}
                      {component === "ActiveUsers" && (
                        <button
                          className="p-1 text-blue-500 hover:text-blue-700"
                          onClick={() => handlePrint(row.id)}
                        >
                          <AiFillPrinter />
                        </button>
                      )}
                      <button
                        onClick={() => openModal(row, "view")}
                        className="text-blue-600 p-1 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openModal(row, "edit")}
                        className="text-yellow-600 p-1 hover:text-yellow-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openModal(row, "delete")}
                        className="text-red-600 p-1 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                      </div>
                    </div>
                  ) : (
                    renderCellValue(row[column.accessor])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditional Modals */}
      {selectedRow && actionType === "view" && (
        <ViewModal selectedRow={selectedRow} closeModal={closeModal} />
      )}
      {selectedRow && actionType === "edit" && (
        <EditModal selectedRow={selectedRow} closeModal={closeModal} />
      )}
      {actionType === "delete" && <DeleteModal closeModal={closeModal} />}
      {openPrintModal && <PrintModal closeModal={closePrintModal} id={userId}/>}
    </div>
  );
};

// Improved typing for renderCellValue function
const renderCellValue = <T,>(
  value: T[keyof T] | React.ReactNode
): React.ReactNode => {
  if (typeof value === "string" || typeof value === "number") {
    return value; // Handle string and number types
  }
  if (React.isValidElement(value)) {
    return value; // If the value is a valid React element
  }
  return null; // Fallback if value is not renderable
};

export default ReusableTable;
