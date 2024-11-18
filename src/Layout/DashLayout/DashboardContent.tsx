import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashProfile from "../../Components/Dashboard/DashProfile";
import DashBooks from "../../Components/Dashboard/DashBooks";
import DashUsers from "../../Components/Dashboard/DashUsers";
import DashMonographs from "../../Components/Dashboard/DashMonographs";
import DashArticles from "../../Components/Dashboard/DashArticles";
import DashBookRegistration from "../../Components/Dashboard/DashBookRegistration";
import DashboardComp from "../../Components/Dashboard/DashboardComp";
import DashDeActiveUsers from "../../Components/Dashboard/DashDeActiveUsers";
import DashActiveUsers from "../../Components/Dashboard/DashActiveUsers";
import DashFaculty from "../../Components/Dashboard/DashFaculty";
import DashDepartment from "../../Components/Dashboard/DashDepartment";
import DashSectionRegistration from "../../Components/Dashboard/DashSectionRegistration";
import DashCategoryRegistration from "../../Components/Dashboard/DashCategoryRegistration";
import UserRegistration from "../../Pages/UserRegistration";

const DashboardContent:React.FC = () => {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="p-2 text-right">
      {/* Profile... */}
      {tab === "profile" && <DashProfile />}
      {/* Books */}
      {tab === "books" && <DashBooks />}
      {/* Users */}
      {tab === "users" && <DashUsers />}
      {/* Monographs */}
      {tab === "monographs" && <DashMonographs />}
      {/* Articles */}
      {tab === "articles" && <DashArticles />}
      {/* Articles */}
      {tab === "book-registration" && <DashBookRegistration />}
      {/* Dashboard comp */}
      {tab === "dashboard" && <DashboardComp />}
      {/* DeActive users */}
      {tab === "deactive-users" && <DashDeActiveUsers />}
      {/* Active users */}
      {tab === "active-users" && <DashActiveUsers />}
      {/* Register users */}
      {tab === "user-registration" && <UserRegistration />}
      {/* Faculty */}
      {tab === "faculty" && <DashFaculty />}
      {/* Department */}
      {tab === "department" && <DashDepartment />}
      {/* Section */}
      {tab === "section" && <DashSectionRegistration />}
      {/* Category */}
      {tab === "category" && <DashCategoryRegistration />}
    </div>
  );
};

export default DashboardContent;
