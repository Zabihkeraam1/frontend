import React, { useState } from "react";
import { FaBook, FaChevronDown, FaCog, FaFile, FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import unicon from "./image.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiArrowSmRight, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { BiPencil } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import axios from "axios";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const { type } = useAdminAuthStore();
  const isActive = (path:string) => location.search === path;
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const isAssistant =  type === "assistant";
  const isEmployee = type === "employee";
  
  
  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  const { clearUser, token } = useAdminAuthStore();
  const handleSignout = () =>{
    console.log(token);
    clearUser();
    axios.post("http://localhost:8000/api/dashboard/admin/logout",{}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.data.message === "Logged out successfully"){
      }
    })
  }

  return (
    <div
      dir="auto"
      className={`bg-blue-900 text-white w-52 ${isOpen ? "block" : "hidden sm:block"} sticky h-screen top-0 right-0`}
    >
      <div className="flex h-14 items-center bg-blue-800 justify-center w-full shadow-sm">
        <img src={unicon} className="rounded-full h-12 w-12" alt="logo" />
      </div>

      <nav
        className="flex flex-col h-screen overflow-y-scroll"
        style={{ scrollbarWidth: "none", height: "calc(100vh - 4rem)" }}
      >
        <ul>
          <NavLink to="/dashboard?tab=dashboard">
            <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=dashboard") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
              <RxDashboard className="ml-2" /> داشبورد
            </li>
          </NavLink>
          <Link to="/dashboard?tab=profile">
            <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=profile") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
              <span>{<HiUser />}</span>
              پروفایل
            </li>
          </Link>

          {/* Books Menu */}
          { isEmployee &&
          (
            <>
            <li
            className="pr-2 hover:bg-blue-900 flex items-center justify-between cursor-pointer"
            onClick={() => toggleMenu("books")}
          >
            <div className="flex items-center hover:bg-blue-600 cursor-pointer w-full p-1">
              <FaChevronDown
                className={`ml-2 text-xs transition-transform ${openMenus.books ? "rotate-180" : ""}`}
              />
              کتاب‌ها
            </div>
          </li>
          {openMenus.books && (
            <ul className="mr-8 space-y-2">
              <Link to="/dashboard?tab=books">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=books") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<FaBook />}</span>
                  لیست کتاب‌ها
                </li>
              </Link>
              <Link to="/dashboard?tab=book-registration">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=book-registration") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<BiPencil />}</span>
                  اضافه کردن کتاب
                </li>
              </Link>
              <Link to="/dashboard?tab=monographs">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=monographs") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<MdDescription />}</span>
                  مونوگراف‌ها
                </li>
              </Link>
              <Link to="/dashboard?tab=articles">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=articles") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<FaFile />}</span>
                  مقاله‌ها
                </li>
              </Link>
            </ul>
          )}

          {/* Users Menu */}
          <li
            className="pr-2 hover:bg-blue-900 flex items-center justify-between cursor-pointer"
            onClick={() => toggleMenu("users")}
          >
            <div className="flex items-center hover:bg-blue-600 cursor-pointer w-full p-1">
              <FaChevronDown
                className={`ml-2 text-xs transition-transform ${openMenus.users ? "rotate-180" : ""}`}
              />
              کاربران
            </div>
          </li>
          {openMenus.users && (
            <ul className="mr-8 space-y-2">
              <Link to="/dashboard?tab=users">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  تمام کاربران
                </li>
              </Link>
              <Link to="/dashboard?tab=user-registration">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=user-registration") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  اضافه کردن کاربر
                </li>
              </Link>
              <Link to="/dashboard?tab=deactive-users">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=deactive-users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  کاربران غیرفعال
                </li>
              </Link>
              <Link to="/dashboard?tab=active-users">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=active-users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  کاربران فعال
                </li>
              </Link>
            </ul>
          )}

          {/* Library Menu */}
          <li
            className="pr-2 hover:bg-blue-900 flex items-center justify-between cursor-pointer"
            onClick={() => toggleMenu("library")}
          >
            <div className="flex items-center hover:bg-blue-600 cursor-pointer w-full p-1">
              <FaChevronDown
                className={`ml-2 text-xs transition-transform ${openMenus.library ? "rotate-180" : ""}`}
              />
              کتابخانه
            </div>
          </li>
          {openMenus.library && (
            <ul className="mr-8 space-y-2">
              <Link to="/dashboard?tab=faculty">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=faculty") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  پوهنزی
                </li>
              </Link>
              <Link to="/dashboard?tab=department">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=department") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  دیپارتمنت
                </li>
              </Link>
              <Link to="/dashboard?tab=category">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=category") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  کتگوری
                </li>
              </Link>
              <Link to="/dashboard?tab=section">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=section") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  الماری
                </li>
              </Link>
            </ul>
          )}

          {/* Professors Menu */}
          <li
            className="pr-2 hover:bg-blue-900 flex items-center justify-between cursor-pointer"
            onClick={() => toggleMenu("professors")}
          >
            <div className="flex items-center hover:bg-blue-600 cursor-pointer w-full p-1">
              <FaChevronDown
                className={`ml-2 text-xs transition-transform ${openMenus.professors ? "rotate-180" : ""}`}
              />
              استادان
            </div>
          </li>
          {openMenus.professors && (
            <ul className="mr-8 space-y-2">
              <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=teachers-list") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                لیست استاد
              </li>
              <li className="flex gap-1 p-1 items-center hover:bg-blue-600 cursor-pointer">
                اضافه کاری
              </li>
            </ul>
          )}
          </>
          )}
          {/* Assistant side bar option */}
          {
            isAssistant &&
              (
                <>
                            <li
            className="pr-2 hover:bg-blue-900 flex items-center justify-between cursor-pointer"
            onClick={() => toggleMenu("users")}
          >
            <div className="flex items-center hover:bg-blue-600 cursor-pointer w-full p-1">
              <FaChevronDown
                className={`ml-2 text-xs transition-transform ${openMenus.users ? "rotate-180" : ""}`}
              />
              کاربران
            </div>
          </li>
          {openMenus.users && (
            <ul className="mr-8 space-y-2">
              <Link to="/dashboard?tab=employees">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  تمام کاربران
                </li>
              </Link>
              <Link to="/dashboard?tab=user-registration">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=user-registration") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  اضافه کردن کاربر
                </li>
              </Link>
              <Link to="/dashboard?tab=deactive-employees">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=deactive-users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  کاربران غیرفعال
                </li>
              </Link>
              <Link to="/dashboard?tab=active-employees">
                <li className={`pr-2 py-2 flex items-center cursor-pointer ${isActive("?tab=active-users") ? "bg-blue-700 font-bold" : "hover:bg-blue-600"}`}>
                  <span>{<HiOutlineUserGroup />}</span>
                  کاربران فعال
                </li>
              </Link>
            </ul>
          )}
                </>
              )
          }
          {/* Employees Link */}
          <li className="pr-2 py-2 hover:bg-blue-600 flex items-center cursor-pointer gap-2">
            <FaUsers />
            کارمندان
          </li>

          {/* Settings Link */}
          <li className="pr-2 py-2 hover:bg-blue-600 flex items-center cursor-pointer gap-2">
            <FaCog />
            تنظیمات
          </li>

          {/* Logout */}
          <li
            className="pr-2 py-2 hover:bg-blue-600 flex items-center cursor-pointer gap-2"
            onClick={handleSignout}
          >
            <HiArrowSmRight />
            خروج
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
