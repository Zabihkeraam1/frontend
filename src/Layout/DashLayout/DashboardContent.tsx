import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashProfile from "../../Components/Dashboard/DashProfile";
import DashBooks from "../../Components/Dashboard/books/DashBooks";
import DashUsers from "../../Components/Dashboard/users/DashUsers";
import DashMonographs from "../../Components/Dashboard/monograph/DashMonographs";
import DashArticles from "../../Components/article/DashArticles";
import DashBookRegistration from "../../Components/Dashboard/books/DashBookRegistration";
import DashboardComp from "../../Components/Dashboard/DashboardComp";
import DashDeActiveUsers from "../../Components/Dashboard/users/DashDeActiveUsers";
import DashActiveUsers from "../../Components/Dashboard/users/DashActiveUsers";
import DashFaculty from "../../Components/Dashboard/faculty/DashFaculty";
import DashDepartment from "../../Components/Dashboard/department/DashDepartment";
import DashSectionRegistration from "../../Components/Dashboard/section/DashSectionRegistration";
import DashCategoryRegistration from "../../Components/Dashboard/category/DashCategoryRegistration";
import UserRegistration from "../../Pages/UserRegistration";
import DashDeActiveEmp from "../../Components/Dashboard/employee/DashDeactiveEmp";
import DashActiveEmp from "../../Components/Dashboard/employee/DashActiveEmp";
import DashEmp from "../../Components/Dashboard/employee/DashEmp";
import DashReservedBooks from "../../Components/Dashboard/books/DashReservedBooks";
import DashReserves from "../../Components/Dashboard/borrow/DashBorrows";
import DashRequests from "../../Components/Dashboard/borrow/DashRequests";
import DashReturned from "../../Components/Dashboard/borrow/DashReturned";
import Teachers from "../../Components/Dashboard/users/teachers";
import Admin from "../../Components/Dashboard/admin/admin";

const DashboardContent: React.FC = () => {
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
      {/* Reserved Books */}
      {tab === "reserve-books" && <DashReservedBooks />}
      {/* Borrow */}
      {tab === "borrow" && <DashReserves />}
      {/* Requests */}
      {tab === "requests" && <DashRequests />}
      {/* Returned books */}
      {tab === "returned-books" && <DashReturned />}
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
      {/* All employee */}
      {tab === "employees" && <DashEmp />}
      {/* DeActive users */}
      {tab === "deactive-users" && <DashDeActiveUsers />}
      {/* DeActive employees */}
      {tab === "deactive-employees" && <DashDeActiveEmp />}
      {/* Active employees */}
      {tab === "active-employees" && <DashActiveEmp />}
      {/* Teachers list */}
      {tab === "teachers-list" && <Teachers />}
      {/* Admin list */}
      {tab === "admin-list" && <Admin />}
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
