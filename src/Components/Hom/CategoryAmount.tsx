import React from 'react';
import { FaBook, FaDatabase, FaBookOpen, FaFileAlt, FaScroll } from 'react-icons/fa';

const CategoryAmount = () => {
  return (
    <div className='flex flex-col justify-center items-center sm:px-6 xl:px-28 lg:px-16 md:px-10 mt-10 overflow-x-auto'>
        <span className='font-sans mb-2 font-medium'>کتگوری ها</span>
      <div className='w-full py-5 px-4 mb-4 rounded-3xl bg-gradient-to-r from-blue-100 to-indigo-200 flex justify-center items-center gap-4 shadow-lg'>
        
        {/* Column 1: Computer Books */}
        <div className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
          <FaBook className='text-2xl text-orange-500 mb-1'/>
          <p className='font-semibold text-gray-700 text-sm'>کامپیوتر</p>
          <span className='font-bold text-orange-500 text-md'>1345</span>
        </div>
        
        {/* Column 2: Database Books */}
        <div className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
          <FaDatabase className='text-2xl text-green-500 mb-1'/>
          <p className='font-semibold text-gray-700 text-sm'>دیتابیس</p>
          <span className='font-bold text-green-500 text-md'>1345</span>
        </div>
        
        {/* Column 3: Hard Books */}
        <div className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
          <FaBookOpen className='text-2xl text-blue-500 mb-1'/>
          <p className='font-semibold text-gray-700 text-sm'>کتاب‌های سخت</p>
          <span className='font-bold text-blue-500 text-md'>1345</span>
        </div>
        
        {/* Column 4: Articles */}
        <div className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
          <FaFileAlt className='text-2xl text-purple-500 mb-1'/>
          <p className='font-semibold text-gray-700 text-sm'>کل مقالات</p>
          <span className='font-bold text-purple-500 text-md'>1345</span>
        </div>
        
        {/* Column 5: Monographs */}
        <div className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
          <FaScroll className='text-2xl text-red-500 mb-1'/>
          <p className='font-semibold text-gray-700 text-sm'>کل مونوگراف‌ها</p>
          <span className='font-bold text-red-500 text-md'>1345</span>
        </div>

        {/* اضافه کردن چندین کارت بیشتر */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className='flex flex-col justify-center items-center p-2 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105 w-40'>
            <FaBook className='text-2xl text-orange-500 mb-1'/>
            <p className='font-semibold text-gray-700 text-sm'>کتاب بیشتر</p>
            <span className='font-bold text-orange-500 text-md'>1345</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAmount;
