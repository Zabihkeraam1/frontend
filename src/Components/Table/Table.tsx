
import React, { useState } from "react";
import axios from "../../axiosInstance";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import PrintModal from "../PrintModal";
import {CheckCircle, Edit, Printer, Trash, View} from "lucide-react";


type TableColumn<T> = {
  header: string;
  accessor: keyof T | "actions";
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  component: string;
  refetchData: () => void;
};

type ActionType = "view" | "edit" | "delete";

const ReusableTable = <T extends { id?: number }>({
  columns,
  data,
  component,
  refetchData
}: TableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedID, setSelectedID] = useState<number | undefined>();
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();

  const openModal = (row: T, action: ActionType, id: number | undefined) => {
    setSelectedRow(row);
    setActionType(action);
    setSelectedID(id);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setActionType(null);
    setSelectedID(undefined);
  };

  const handlePrint = (id: number | undefined) => {
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
      .post(
        `/api/dashboard/users/activate_user/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response);
        refetchData();
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
            <tr key={rowIndex} className="border-b hover:bg-gray-200">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4">
                  {column.accessor === "actions" ? (
                    <div className="flex">
                      <div className="flex gap-x-2">
                        {component === "DeActiveUsers" && (
                          <button
                            className="p-1 text-blue-500 hover:text-blue-700"
                            onClick={() => handleClick(row.id)}
                          >
                            <CheckCircle height={20} width={20}/>
                          </button>
                        )}
                        {component === "ActiveUsers" && (
                          <button
                            className="p-1 text-blue-500 hover:text-blue-700"
                            onClick={() => handlePrint(row.id)}
                          >
                            <Printer height={20} width={20}/>
                          </button>
                        )}
                        <button
                          onClick={() => openModal(row, "view", row.id)}
                          className="text-green-600 p-1 hover:text-green-800"
                        >
                          <View height={20} width={20}/>
                        </button>
                        <button
                          onClick={() => openModal(row, "edit", row.id)}
                          className="text-yellow-600 p-1 hover:text-yellow-800"
                        >
                          <Edit height={20} width={20}/>
                        </button>
                        <button
                          onClick={() => openModal(row, "delete", row.id)}
                          className="text-red-400 p-1 hover:text-red-600"
                        >
                          <Trash height={20} width={20} />
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
        <ViewModal
          selectedRow={selectedRow}
          closeModal={closeModal}
          id={selectedID}
          component={component}
        />
      )}
      {selectedRow && actionType === "edit" && (
        <EditModal
          selectedRow={selectedRow}
          closeModal={closeModal}
          id={selectedID}
          component={component}
        />
      )}
      {selectedRow && actionType === "delete" && (
        <DeleteModal
          selectedRow={selectedRow}
          closeModal={closeModal}
          itemId={selectedID}
          component={component}
          refetchData={refetchData}
        />
      )}
      {openPrintModal && (
        <PrintModal closeModal={closePrintModal} id={userId} />
      )}
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

