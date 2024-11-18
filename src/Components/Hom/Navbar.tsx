// import { MdShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
// import React, { useState } from "react";
// import { IoIosSearch } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { PiShoppingBagOpenLight } from "react-icons/pi";
// import { Link } from "react-router-dom";

// const Navbar: React.FC = ({ reservedAmount, reservedCount }) => {
//   const [showReservModal, setShowResevModal] = useState(false);
//   const [profile,setProfile]=useState(true)

//   return (
//     <>
//       <div className="w-full h-auto lg:h-20 flex flex-col lg:flex-row justify-center items-center gap-3 fixed bg-white mb-0 z-50">
//         {/* Row 1 - Logo, Cart, and User Section for small screens */}
//         <div className="w-full lg:hidden flex justify-between items-center px-3 py-2">
//           {/* Logo for small screens */}
//           <div className="flex justify-start items-center">
//             <h2 className="text-xl font-bold">Logo</h2>
//           </div>

//           {/* Cart */}
//           <div className="relative cursor-pointer ml-4">
//             <PiShoppingBagOpenLight className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-[16px] h-[16px] flex justify-center items-center">
//               {reservedCount}
//             </span>
//           </div>

//           {/* User Login */}
//           <div className="flex items-center gap-2 cursor-pointer">
//             <FaUserCircle className="text-xl" />
//             <span className="text-sm font-medium">ورود / ثبت نام</span>
//           </div>
//         </div>

//         {/* Search Bar and Logo - Responsive for all screens */}
//         <div className="w-full lg:w-[70%] flex flex-col lg:flex-row-reverse justify-center items-center py-2 lg:py-0 lg:gap-5 lg:pr-7">
//           {/* Search Container */}
//           <div className="relative w-[90%] lg:w-full flex items-center">
//             {/* Input field with right padding */}
//             <input
//               type="text"
//               className="w-full h-9 border border-gray-300 rounded-r-full outline-none pr-10 pl-4 bg-gray-100"
//               placeholder="جستجو..."
//             />
//             {/* Search Icon with absolute positioning */}
//             <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

//             {/* Selection Box for Books */}
//             <select className="ml-3 h-9 rounded-l-full font-sans bg-gray-100 border border-gray-300 text-gray-700 pl-4 pr-10 outline-none">
//               <option value="">کتاب‌ها</option>
//               <option value="book1">کتاب 1</option>
//               <option value="book2">کتاب 2</option>
//               <option value="book3">کتاب 3</option>
//             </select>
//           </div>

//           {/* Logo for large screens */}
//           <div className="hidden lg:block w-auto h-full flex justify-center items-center">
//             <h2 className="text-2xl font-bold">Logo</h2>
//           </div>
//         </div>

//         {/* Row 3 - User and Cart for large screens */}
//         <div className="hidden lg:flex w-[30%] h-full items-center justify-center  lg:gap-9 pr-2"> {/* تغییر مقدار `gap-4` به `gap-2` */}

//                     {/* Cart Icon */}
//           <div className="relative cursor-pointer">
//             {showReservModal && (
//               <div className="h-80 w-72 bg-slate-200 absolute left-2 top-12 rounded-lg px-2 py-1">
//                 {/* Modal for reserved items */}
//               </div>
//             )}
//             <PiShoppingBagOpenLight className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-[16px] h-[16px] flex justify-center items-center">
//               {reservedCount}
//             </span>
//           </div>
//           {/* User Login and Register */}
//           {profile ?(
//             <div className="h-11 w-11 rounded-full border border-gray-300 
//             flex justify-center items-center">
//               <Link to={'/profile'}>
//               <img src="./vite.svg" alt="" />
//               </Link>
//             </div>
//           ):(
//           <div className="flex justify-center items-center gap-2 rounded-md border border-b border-gray-400 px-3 py-1"> {/* کاهش `px-4 py-2` به `px-3 py-1` */}
//             <FaUserCircle />
//             <p className="font-semibold font-sans cursor-pointer">ورود</p>
//             <p className="font-semibold font-sans cursor-pointer">/ ثبت نام</p>
//           </div>)}


//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



// import { MdShoppingCart, MdShoppingCartCheckout } from "react-icons/md";
// import React, { useState } from "react";
// import { IoIosLogOut, IoIosSearch } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { PiShoppingBagOpenLight } from "react-icons/pi";
// import { Link } from "react-router-dom";
// import { CiLogout } from "react-icons/ci";
// import LinksHeader from "./LinksHeader";

// const Navbar: React.FC = ({ reservedCount }) => {
//   const [showReservModal, setShowResevModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profile,setProfile]=useState(true)

//   const handleProfileClick = () => {
//     setShowProfileModal(!showProfileModal);
//   };

//   return (
//     <>
//       <div className="w-full h-auto lg:h-20 flex flex-col lg:flex-row justify-center items-center gap-3 fixed bg-white mb-0 z-50">
//         {/* Row 1 - Logo, Cart, and User Section for small screens */}
//         <div className="w-full lg:hidden flex justify-between items-center px-3 py-2">
//           {/* Logo for small screens */}
//           <div className="flex justify-start items-center">
//             <h2 className="text-xl font-bold">Logo</h2>
//           </div>

//           {/* Cart */}
//           <div className="relative cursor-pointer ml-4">
//             <PiShoppingBagOpenLight className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-[16px] h-[16px] flex justify-center items-center">
//               {reservedCount}
//             </span>
//           </div>

//           {/* User Login */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
//             <FaUserCircle className="text-xl" />
//             <span className="text-sm font-medium">پروفایل</span>
//           </div>
//         </div>

//         {/* Search Bar and Logo - Responsive for all screens */}
//         <div className="w-full lg:w-[70%] flex flex-col lg:flex-row-reverse justify-center items-center py-2 lg:py-0 lg:gap-5 lg:pr-7">
//           {/* Search Container */}
//           <div className="relative w-[90%] lg:w-full flex items-center">
//             {/* Input field with right padding */}
//             <input
//               type="text"
//               className="w-full h-9 border border-gray-300 rounded-r-full outline-none pr-10 pl-4 bg-gray-100"
//               placeholder="جستجو..."
//             />
//             {/* Search Icon with absolute positioning */}
//             <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

//             {/* Selection Box for Books */}
//             <select className="ml-3 h-9 rounded-l-full font-sans bg-gray-100 border border-gray-300 text-gray-700 pl-4 pr-10 outline-none">
//               <option value="">کتاب‌ها</option>
//               <option value="book1">کتاب 1</option>
//               <option value="book2">کتاب 2</option>
//               <option value="book3">کتاب 3</option>
//             </select>
//           </div>

//           {/* Logo for large screens */}
//           <div className="hidden lg:block w-auto h-full flex justify-center items-center">
//             <h2 className="text-2xl font-bold">Logo</h2>
//           </div>
//         </div>

//         {/* Row 3 - User and Cart for large screens */}
//         <div className="hidden lg:flex w-[30%] h-full items-center justify-center lg:gap-9 pr-2">
//           {/* Cart Icon */}
//           <div className="relative cursor-pointer">
//             {showReservModal && (
//               <div className="h-80 w-72 bg-slate-200 absolute left-2 top-12 rounded-lg px-2 py-1">
//                 {/* Modal for reserved items */}
//               </div>
//             )}
//             <PiShoppingBagOpenLight className="text-2xl" />
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-[16px] h-[16px] flex justify-center items-center">
//               {reservedCount}
//             </span>
//           </div>
//           {/* User Profile */}
//           {profile ?(
//           <div className="h-11 w-11 rounded-full border border-gray-300 flex justify-center items-center cursor-pointer relative" onClick={handleProfileClick}>
//             <img src="./vite.svg" alt="Profile" />
            
//             {/* Profile Modal */}
//             {showProfileModal && (
//               <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-52">
//                 <Link to={'/profile'} className="flex items-center mb-3">
//                   <img src="./vite.svg" alt="Profile" className="w-7 h-7 rounded-full mr-2" />
//                   <p className="font-bold">نام کاربر</p>
//                 </Link>
//                 <div className="border-t border-gray-300 my-2" />
//                 <div className="flex justify-start items-start flex-col">
//                   <Link to="/profile/resrved-books" className="py-2 text-blue-500 ">کتاب‌های رزرو شده</Link>
//                   <button className="py-2 text-red-500  flex justify-center items-center gap-2">خروج<IoIosLogOut size={20}/></button>
//                 </div>
//               </div>
//             )}
//           </div>
//             ):(
//               <div className="flex justify-center items-center gap-2 rounded-md border border-b border-gray-400 px-3 py-1"> {/* کاهش `px-4 py-2` به `px-3 py-1` */}
//                 <FaUserCircle />
//                 <p className="font-semibold font-sans cursor-pointer">ورود</p>
//                 <p className="font-semibold font-sans cursor-pointer">/ ثبت نام</p>
//               </div>
//             )} 
//         </div>
        
//       </div>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaBook, FaBars } from 'react-icons/fa'; // FaBars برای آیکون منوی همبرگری اضافه شد
import { RiArticleLine, RiShoppingBag4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    setLastScrollY(window.scrollY);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const closeSearchModal = () => {
    setIsSearching(false);
  };

  const toggleMenuModal = () => {
    setShowMenuModal(!showMenuModal);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* ناوبار بالا */}
      <nav className={`fixed top-0 w-full bg-white shadow-lg z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
          

          <div className="text-right">
            <a href="/" className="text-lg font-bold">کتابخانه دیجیتالی</a>
          </div>

          <div className="lg:flex hidden space-x-6 gap-2 font-sans">
            <a href="/books" className="nav-link text-gray-700">کتاب‌ها</a>
            <a href="/articles" className="nav-link text-gray-700">مقالات</a>
            <a href="/about" className="nav-link text-gray-700">درباره ما</a>
            <a href="/contact" className="nav-link text-gray-700">تماس با ما</a>
            <a href="/collection" className="nav-link text-gray-700">مجموعه ما</a>
          </div>

          <div className="flex items-center space-x-4">
            <FaSearch className="cursor-pointer text-gray-700 ml-3" onClick={handleSearchClick} />
            <div className="md:block hidden relative cursor-pointer">
              <RiShoppingBag4Line size={25} className="text-gray-700" />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-[19px] w-[19px] flex justify-center items-center">
                <span className="text-white text-xs font-bold">07</span>
              </div>
            </div>

            <div className='flex justify-center items-center gap-2 border border-gray-400 rounded-md p-2'>
              <FaUser className="text-gray-700" />
              <span className='font-sans'>
                <Link to={''}> ورود</Link>
                <Link to={''}> / ثبت نام </Link>
              </span>
            </div>
          </div>
          {/* آیکون منوی همبرگری */}
          <FaBars className="lg:hidden block text-gray-700 cursor-pointer" size={25} onClick={toggleMenuModal} />
        </div>
      </nav>

      {/* مودال منوی همبرگری */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-end">
          <div className="bg-white w-2/3 md:w-1/2 h-full p-6 shadow-lg">
            <button onClick={toggleMenuModal} className="text-gray-700 text-xl mb-6">X</button>
            <nav className="space-y-4">
              <Link to="/books" className="block text-gray-700">کتاب‌ها</Link>
              <Link to="/articles" className="block text-gray-700">مقالات</Link>
              <Link to="/about" className="block text-gray-700">درباره ما</Link>
              <Link to="/contact" className="block text-gray-700">تماس با ما</Link>
              <Link to="/collection" className="block text-gray-700">مجموعه ما</Link>
            </nav>
          </div>
        </div>
      )}

      {/* مودال سرچ */}
      {isSearching && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-30 blur-sm" onClick={closeSearchModal}></div>
          <div className="absolute top-0 w-full bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-right hidden md:block">
                <a href="/" className="text-lg font-bold">کتابخانه دیجیتالی</a>
              </div>
              <div className="flex-grow flex justify-center items-center mx-4">
                <input type="text" className="md:w-[55%] sm:w-[100%] px-4 py-2 h-9 border rounded-r-3xl" placeholder="جستجو کنید..." />
                <select className="border border-gray-300 h-9 rounded-l-3xl px-4 py-2">
                  <option value="books" className='mr-12'>کتاب‌ها</option>
                  <option value="articles" className='mr-12'>مقالات</option>
                  <option value="authors" className='mr-12'>نویسندگان</option>
                </select>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative cursor-pointer ml-2">
                  <RiShoppingBag4Line size={25} className="text-gray-700" />
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-[19px] w-[19px] flex justify-center items-center">
                    <span className="text-white text-xs font-bold">07</span>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-2 border border-gray-400 rounded-md p-2'>
                  <FaUser className="text-gray-700" />
                  <span className='font-sans'>
                    <Link to={''}> ورود</Link>
                    <Link to={''}> / ثبت نام </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نوار ناوبری پایین صفحه */}
      <nav className="fixed bottom-0 w-full bg-white shadow-lg z-50 lg:hidden">
        <div className="flex justify-around items-center py-3">
          <Link to="/books" className="text-gray-700 flex flex-col items-center">
            <FaBook size={25} />
            <span className="text-xs">کتاب‌ها</span>
          </Link>
          <Link to="/articles" className="text-gray-700 flex flex-col items-center">
            <RiArticleLine size={25} />
            <span className="text-xs">مقالات</span>
          </Link>
          <Link to="/collection" className="text-gray-700 flex flex-col items-center">
            <RiShoppingBag4Line size={25} />
            <span className="text-xs">مونوگراف‌ها</span>
          </Link>
          <Link to="/about" className="text-gray-700 flex flex-col items-center">
            <FaUser size={25} />
            <span className="text-xs">درباره ما</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
