import React, { useState } from "react";
import Sidebar from "../Layout/DashLayout/Sidebar";
import TopBar from "../Layout/DashLayout/TopBar";
import DashboardContent from "../Layout/DashLayout/DashboardContent";
const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex">
        <Sidebar isOpen={isSidebarOpen}/>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar toggleSidebar={toggleSidebar} />
        <DashboardContent/>
      </div>
    </div>
  );
};
export default Dashboard;
