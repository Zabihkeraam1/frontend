import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaBook, FaUserCircle } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import { MdContactPhone } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BurgarModal = ({ setShowMenuModal, showMenuModal, toggleMenuModal }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-end">
      <div className="bg-white w-2/3 md:w-1/2 h-full p-6 shadow-lg relative">
        
        {/* دکمه بستن مودال */}
        <button
          onClick={toggleMenuModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
        >
          <IoCloseSharp size={24} />
        </button>
        
        {/* منو لینک‌ها با آیکون‌ها */}
        <nav className="space-y-6 mt-10 text-right font-medium">
          <Link
            to="/books"
            className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            <FaBook size={20} className="text-orange-500" />
            کتاب‌ها
          </Link>
          <Link
            to="/articles"
            className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            <RiArticleLine size={20} className="text-blue-500" />
            مقالات
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            <FaUserCircle size={20} className="text-green-500" />
            درباره ما
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            <MdContactPhone size={20} className="text-purple-500" />
            تماس با ما
          </Link>
          <Link
            to="/collection"
            className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors duration-200"
          >
            <HiOutlineShoppingCart size={20} className="text-red-500" />
            مجموعه ما
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default BurgarModal;
