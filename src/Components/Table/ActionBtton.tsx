import React, { useState } from "react";
import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onEdit, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center">
       {!isOpen && (
      <button
        onClick={toggleMenu}
        className="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white"
      >
        <AiOutlineArrowLeft/>
      </button>
)}
      {isOpen && (
        <div className="absolute flex -top-0 bg-gray-200 shadow-lg z-10">
          <button
            onClick={() => {
              toggleMenu();
            }}
            className="block px-4 py-2 hover:bg-gray-400 text-blue-600"
          >
            <AiOutlineArrowRight /> 
          </button>
          <button
            onClick={() => {
              onEdit();
            }}
            className="block px-4 py-2 hover:bg-gray-400 text-blue-600"
          >
            <AiFillEdit /> 
          </button>
          <button
            onClick={() => {
              onView();
            }}
            className="block px-4 py-2 hover:bg-gray-400 text-gray-700"
          >
            <AiFillEye /> 
          </button>
          <button
            onClick={() => {
              onDelete();
            }}
            className="block px-4 py-2 hover:bg-gray-400 text-red-600"
          >
            <AiFillDelete /> 
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
