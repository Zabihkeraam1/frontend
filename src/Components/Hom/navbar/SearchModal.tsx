import React, { useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiShoppingBag4Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SearchModal = ({closeSearchModal ,profile ,toggleProfileModal}) => {
  const profileRef = useRef(null); 
  return (
    <div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-gray-900 bg-opacity-30 blur-sm" onClick={closeSearchModal}></div>
    <div className="absolute top-0 w-full bg-white p-6 shadow-lg">
      <div className="flex justify-between items-center">
      <div className="h-11 w-11">
            <img src="image.png" alt="logo" className="object-cover" />
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
      </div>
    </div>
  </div>
  )
}

export default SearchModal
