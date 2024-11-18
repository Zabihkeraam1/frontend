


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

