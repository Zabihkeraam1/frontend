import React from 'react';
import { FaBook, FaUser } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';

const BottomNavbar = ({ toggleCartModal, showCartModal }) => {
  return (
    <>
      <nav className="fixed bottom-0 w-full bg-orange-400 shadow-lg z-50 lg:hidden rounded-t-lg">
        <div className="flex justify-around items-center py-3">
          <Link
            to="/books"
            className="text-white flex flex-col items-center hover:text-yellow-100 transition-transform transform hover:scale-110"
          >
            <FaBook size={24} />
            <span className="text-xs mt-1">کتاب‌ها</span>
          </Link>
          <Link
            to="/articles"
            className="text-white flex flex-col items-center hover:text-yellow-100 transition-transform transform hover:scale-110"
          >
            <RiArticleLine size={24} />
            <span className="text-xs mt-1">مقالات</span>
          </Link>
          <button
            onClick={toggleCartModal}
            className="text-white flex flex-col items-center relative hover:text-yellow-100 transition-transform transform hover:scale-110"
          >
            <HiOutlineShoppingCart size={24} />
            <span className="text-xs mt-1">سبد</span>
            <span className="absolute -top-2 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
          </button>
          <Link
            to="/about"
            className="text-white flex flex-col items-center hover:text-yellow-100 transition-transform transform hover:scale-110"
          >
            <FaUser size={24} />
            <span className="text-xs mt-1">درباره ما</span>
          </Link>
        </div>
      </nav>

      {/* cart modal */}
      {showCartModal && <CartModal toggleCartModal={toggleCartModal} />}
    </>
  );
};

export default BottomNavbar;
