import React from "react";
import { FaBars } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md h-14 px-6 flex justify-between items-center sticky top-0 z-30">
      {" "}
      {/* Sticky header */}
      <button className="sm:hidden" onClick={toggleSidebar}>
        <FaBars className="h-6 w-6"/>
      </button>
      <IoNotificationsSharp />
      <div className="flex items-center">
        <span className="ml-4 p-2 rounded-3xl bg-blue-500">ادمین</span>
      </div>
    </div>
  );
};

export default Topbar;
