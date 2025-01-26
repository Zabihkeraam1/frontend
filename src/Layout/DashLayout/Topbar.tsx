import { Bell, User } from "lucide-react";
import React from "react";
import { FaBars } from "react-icons/fa";
type Props = {
  toggleSidebar: () => void;
};

const TopBar: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md h-14 px-6 flex md:justify-end items-center sticky top-0 z-30">
      <button className="sm:hidden" onClick={toggleSidebar}>
        <FaBars className="h-6 w-6" />
      </button> 
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
        </button>
        <button
          className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="user-menu"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <User className="h-8 w-8 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
