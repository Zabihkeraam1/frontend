import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import axios from "../../axiosInstance";
import { ChevronDown, Settings, Users, LogOut, Menu, BookOpen, GraduationCap, Library, ClipboardList } from 'lucide-react';
import logo  from './image.png';
import { RiAdminFill } from "react-icons/ri";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar?: () => void;
}

interface MenuItem {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
}

interface MenuGroup {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { type, clearUser, token } = useAdminAuthStore();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const isActive = (path: string): boolean => location.search === path;
  const isAssistant: boolean = type === "assistant";
  const isEmployee: boolean = type === "employee";
  const toggleMenu = (menu: string): void => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleSignout = (): void => {
    axios.post(
      "api/dashboard/admin/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.data.message === "Logged out successfully") {
        clearUser();
        navigate(`?tab=adminLogin`);
      }
    });
  };

  const MenuItemComponent: React.FC<MenuItem> = ({ to, icon: Icon, label, isActive }) => (
    <NavLink to={to}>
      <li className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
        isActive ? "bg-white bg-opacity-10 text-white" : "text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white"
      }`}>
        <Icon className="w-4 h-4 ml-1" />
        <span>{label}</span>
      </li>
    </NavLink>
  );

  const MenuGroupComponent: React.FC<MenuGroup> = ({ icon: Icon, label, items }) => {
    const isOpen = openMenus[label];
    return (
      <>
        <li 
          className="flex items-center justify-between p-2 text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
          onClick={() => toggleMenu(label)}
        >
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 ml-1" />
            <span>{label}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </li>
        {isOpen && (
          <ul className="ml-4 mt-2 border-l border-gray-700">
            {items.map((item, index) => (
              <MenuItemComponent key={index} {...item} />
            ))}
          </ul>
        )}
      </>
    );
  };

  const employeeMenuGroups: MenuGroup[] = [
    {
      icon: BookOpen,
      label: "کتاب‌ها",
      items: [
        { to: "/dashboard?tab=books", icon: BookOpen, label: "کتاب‌ها", isActive: isActive("?tab=books") },
        { to: "/dashboard?tab=reserve-books", icon: BookOpen, label: "کتابهای ثبت شده", isActive: isActive("?tab=reserve-books") },
        { to: "/dashboard?tab=book-registration", icon: BookOpen, label: "اضافه کردن کتاب", isActive: isActive("?tab=book-registration") },
        // { to: "/dashboard?tab=monographs", icon: BookOpen, label: "مونوگراف‌ها", isActive: isActive("?tab=monographs") },
        // { to: "/dashboard?tab=articles", icon: BookOpen, label: "مقاله‌ها", isActive: isActive("?tab=articles") },
      ],
    },
    {
      icon: Users,
      label: "کاربران",
      items: [
        { to: "/dashboard?tab=users", icon: Users, label: "تمام کاربران", isActive: isActive("?tab=users") },
        { to: "/dashboard?tab=user-registration", icon: Users, label: "اضافه کردن کاربر", isActive: isActive("?tab=user-registration") },
        { to: "/dashboard?tab=deactive-users", icon: Users, label: "کاربران غیرفعال", isActive: isActive("?tab=deactive-users") },
        { to: "/dashboard?tab=active-users", icon: Users, label: "کاربران فعال", isActive: isActive("?tab=active-users") },
      ],
    },
    {
      icon: ClipboardList,
      label: "امانات",
      items: [
        { to: "/dashboard?tab=borrow", icon: ClipboardList, label: "لیست امانات", isActive: isActive("?tab=borrow") },
        { to: "/dashboard?tab=requests", icon: ClipboardList, label: "درخواستی‌ها", isActive: isActive("?tab=requests") },
        { to: "/dashboard?tab=returned-books", icon: ClipboardList, label: "بازگشتی", isActive: isActive("?tab=returned-books") },
      ],
    },
    {
      icon: Library,
      label: "کتابخانه",
      items: [
        { to: "/dashboard?tab=faculty", icon: Library, label: "پوهنځی", isActive: isActive("?tab=faculty") },
        { to: "/dashboard?tab=department", icon: Library, label: "دیپارتمنت", isActive: isActive("?tab=department") },
        { to: "/dashboard?tab=category", icon: Library, label: "کتگوری", isActive: isActive("?tab=category") },
        { to: "/dashboard?tab=section", icon: Library, label: "الماری", isActive: isActive("?tab=section") },
      ],
    },
    {
      icon: GraduationCap,
      label: "استادان",
      items: [
        { to: "/dashboard?tab=teachers-list", icon: GraduationCap, label: "لیست استاد", isActive: isActive("?tab=teachers-list") },
      ],
    },
    {
      icon: RiAdminFill,
      label: "ادمین",
      items: [
        { to: "/dashboard?tab=admin-list", icon: RiAdminFill, label: "لیست ادمین‌ها", isActive: isActive("?tab=admin-list") },
      ],
    },
  ];

  const assistantMenuGroups: MenuGroup[] = [
    {
      icon: Users,
      label: "کاربران",
      items: [
        { to: "/dashboard?tab=employees", icon: Users, label: "تمام کاربران", isActive: isActive("?tab=employees") },
        { to: "/dashboard?tab=user-registration", icon: Users, label: "اضافه کردن کاربر", isActive: isActive("?tab=user-registration") },
        { to: "/dashboard?tab=deactive-employees", icon: Users, label: "کاربران غیرفعال", isActive: isActive("?tab=deactive-employees") },
        { to: "/dashboard?tab=active-employees", icon: Users, label: "کاربران فعال", isActive: isActive("?tab=active-employees") },
      ],
    },
  ];

  return (
    <div className={`sticky h-screen top-0 right-0 inset-y-0 z-50 w-56 bg-gradient-to-br from-blue-900 to-indigo-800 text-white transition-all duration-300 ease-in-out transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center p-2 border-b border-blue-700">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto"
         style={{ scrollbarWidth: "none", height: "calc(100vh - 4rem)" }}>
          <nav className="px-4 py-6 space-y-4">
            <MenuItemComponent to="/dashboard?tab=dashboard" icon={Menu} label="داشبورد" isActive={isActive("?tab=dashboard")} />
            {/* <MenuItemComponent to="/dashboard?tab=profile" icon={User} label="پروفایل" isActive={isActive("?tab=profile")} /> */}

            {isEmployee && employeeMenuGroups.map((group, index) => (
              <MenuGroupComponent key={index} {...group} />
            ))}

            {isAssistant && assistantMenuGroups.map((group, index) => (
              <MenuGroupComponent key={index} {...group} />
            ))}

            {/* <MenuItemComponent to="/dashboard?tab=employee" icon={Users} label="کارمندان" isActive={isActive("?tab=employee")} /> */}
            <MenuItemComponent to="/dashboard?tab=settings" icon={Settings} label="تنظیمات" isActive={isActive("?tab=settings")} />
          </nav>
        </div>

        <div className="p-4 border-t border-blue-700">
          <button 
            onClick={handleSignout}
            className="flex items-center space-x-2 w-full p-2 rounded-lg text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="pr-1">خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;