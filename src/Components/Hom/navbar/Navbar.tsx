import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import BurgarModal from './BurgarModal';
import SearchModal from './SearchModal';
import BottomNavbar from './BottomNavbar';
import CollectionModal from './CollectionModal';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import CartModal from './CartModal';
import ProfileModal from './ProfileModal';
import { useAuthStore } from '../../../Store/useAuthStore';

interface BottomNavbarProps {
  showCartModal: boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCartModal: () => void;
}

const Navbar: React.FC = () => {
  const [showNav, setShowNav] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [profile, setProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);
  const CartRef = useRef<HTMLDivElement | null>(null);

  const { token } = useAuthStore();

  useEffect(() => {
    setProfile(!!token); // اگر توکن وجود داشته باشد، پروفایل را به true تنظیم می‌کند
  }, [token]);

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

  const toggleCollectionModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={`fixed top-0 w-full bg-white shadow-lg z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="h-11 w-11">
            <img src="image.png" alt="logo" className="object-cover" />
          </div>

          <div className="lg:flex hidden space-x-6 gap-2 font-sans">
            <a href="/" className="nav-link text-gray-800 hover:text-indigo-600 ml-2">کتاب‌ها</a>
            <a href="/articles" className="nav-link text-gray-800 hover:text-indigo-600">مقالات</a>
            <a href="/about-us" className="nav-link text-gray-800 hover:text-indigo-600">درباره ما</a>
            <a href="/contact" className="nav-link text-gray-800 hover:text-indigo-600">تماس با ما</a>
            <a href="/contact" className="nav-link text-gray-800 hover:text-indigo-600 flex justify-center items-center"
               onClick={(e) => { e.preventDefault(); toggleCollectionModal(); }}>
              مجموعه ما
              {showCollectionModal ? <HiChevronUp /> : <HiChevronDown />}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <FaSearch className="cursor-pointer text-gray-700 ml-3" onClick={handleSearchClick} />

            <div className="md:block hidden relative cursor-pointer"
                 ref={CartRef}
                 onClick={toggleCartModal}>
              <RiShoppingBag4Line size={25} className="text-gray-700" />
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full h-[19px] w-[19px] flex justify-center items-center">
                <span className="text-white text-xs font-bold">07</span>
              </div>
            </div>

            {profile ? (
              <div
                ref={profileRef}
                onClick={toggleProfileModal}
                className="w-11 h-11 border border-gray-400 rounded-full flex justify-center items-center cursor-pointer relative"
              >
                <img src="vite.svg" alt="prof" className="object-cover" />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2 border border-gray-400 rounded-md p-2 transition-transform duration-300 hover:bg-orange-100 hover:border-orange-300 hover:scale-105">
                <FaUser className="text-gray-700 transition-colors duration-300 hover:text-orange-500" />
                <span className="font-sans text-gray-700 transition-colors duration-300 hover:text-orange-500">
                  <Link to="login" className="hover:underline">ورود</Link>
                  <Link to="register" className="hover:underline"> / ثبت نام</Link>
                </span>
              </div>
            )}
          </div>

          <FaBars className="lg:hidden block text-gray-700 cursor-pointer" size={25} onClick={toggleMenuModal} />
        </div>
      </nav>

      {showProfileModal && <ProfileModal toggleProfileModal={toggleProfileModal} />}
      {showCartModal && <CartModal toggleCartModal={toggleCartModal} />}
      {showMenuModal && <BurgarModal showMenuModal={showMenuModal} setShowMenuModal={setShowMenuModal} toggleMenuModal={toggleMenuModal} />}
      {showCollectionModal && <CollectionModal />}
      {isSearching && <SearchModal closeSearchModal={closeSearchModal} profile={profile} toggleProfileModal={toggleProfileModal} />}
      <BottomNavbar showCartModal={showCartModal} setShowCartModal={setShowCartModal} toggleCartModal={toggleCartModal} />
    </>
  );
};

export default Navbar;
