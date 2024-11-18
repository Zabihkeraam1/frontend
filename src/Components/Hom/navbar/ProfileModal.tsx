import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { GrFormClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

const ProfileModal = ({ toggleProfileModal }) => {
  const modalRef = useRef(null);

  const [userImage,setUserImage] = useState();

  // بستن مودال هنگام کلیک خارج از محدوده آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleProfileModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleProfileModal]);

  const { token, clearUser } = useAuthStore();

  const handleSignout = () => {
    axios.post(
      'http://localhost:8000/api/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      if (response.status === 204) {
        console.log(response);
        console.log("log  out")
        clearUser();
        console.log("Log out was successful!");
      }
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };
  useEffect(()=>{
    axios.get('http://localhost:8000/api/account/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response)=>{
      console.log(response)
      setUserImage(response.data.data.image)
    })

  },[])

  return (
    <div
      ref={modalRef}
      className="left-8 top-[70px] w-48 bg-white shadow-lg border border-gray-300 fixed rounded-lg z-50 p-6 transition-all duration-300"
    >
      {/* دکمه بستن مودال */}
      <button
        onClick={toggleProfileModal}
        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110"
      >
        <GrFormClose size={16} />
      </button>

      <div className="flex flex-col items-center mt-4">
        <Link to={'profile/reserved-books'}
        className="flex items-center w-full gap-3 pb-4 border-b border-gray-200">
          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-400 shadow-md">
            <img
              src={userImage}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            
            onClick={toggleProfileModal}
            className="text-gray-800 font-semibold hover:text-indigo-500 transition-all duration-200"
          >
            نام کاربر
          </div>
        </Link>
        <Link
          to={'profile/reserved-books'}
          onClick={toggleProfileModal}
          className="mt-3 text-gray-600 hover:text-indigo-500 transition-all duration-200"
        >
          کتاب‌های رزرو شده
        </Link>
        <button
          onClick={() => {
            toggleProfileModal();
            handleSignout();
          }}
          className="flex items-center text-red-500 hover:text-red-600 mt-6 transition-colors duration-200"
        >
          خروج <CiLogout className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
