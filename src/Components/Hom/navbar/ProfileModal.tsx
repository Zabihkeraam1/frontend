import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { GrFormClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../Store/useAuthStore';

interface ProfileModalProps {
  toggleProfileModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ toggleProfileModal }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [userImage, setUserImage] = useState<string>('');

  // بستن مودال هنگام کلیک خارج از محدوده آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleProfileModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleProfileModal]);

  const { token, clearUser } = useAuthStore();

  const handleSignout = () =>{
    console.log('token',token);
    axios.post("http://localhost:8000/api/logout",{}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.data.message === "Logged out successfully"){
        clearUser();
      }
    })
  }
  

  useEffect(() => {
    console.log('token',token)
    axios.get('http://localhost:8000/api/account/profile',
      
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      console.log('userProfile',response.data.user);
      // setUserImage(response.data.data.image);
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  }, [token]);

  return (
    <div
      ref={modalRef}
      className="left-8 top-[70px] w-48 bg-white shadow-lg border border-gray-300 fixed rounded-lg z-50 p-6 transition-all duration-300"
    >
      {/* دکمه بستن مودال */}
      <button
        onClick={toggleProfileModal}
        className="absolute top-2 right-2 p-1.5 text-red-500 rounded-full hover:text-red-700 transition-all duration-300 transform hover:scale-110"
      >
        <GrFormClose size={22} />
      </button>

      <div className="flex flex-col items-center mt-4">
        <Link to={'profile/reserved-books'}
        className="flex items-center w-full gap-3 pb-4 border-b border-gray-200">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-400 shadow-md">
            <img
              src={userImage} // URL کامل عکس را ایجاد می‌کند
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
            // toggleProfileModal();
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
