import axios from 'axios';
import React, { useEffect } from 'react';
import { FaLaptop, FaMountain, FaBuilding, FaCogs, FaWater, FaRoad, FaDraftingCompass, FaIndustry, FaQuran, FaCalculator } from 'react-icons/fa';

const CategoryAmount = () => {
  useEffect(() => {
    axios.get('http://localhost:8000/api/home')
      .then((res) => {
        // Data fetching logic
      });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center sm:px-6 xl:px-28 lg:px-16 md:px-10 mt-10 overflow-x-auto'>
      <span className='font-sans mb-4 text-2xl font-semibold text-gray-800'>کتگوری ها</span>

      {/* Grid Container */}
      <div className='w-full py-6 px-4 mb-6 rounded-3xl bg-orange-100 shadow-lg'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          
          {/* Column 1: Computer Books */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaLaptop className='text-2xl text-orange-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>کامپیوتر</p>
            <span className='font-bold text-orange-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 2: Geology */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaMountain className='text-2xl text-green-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>جیولوجی و معادن</p>
            <span className='font-bold text-green-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 3: Construction */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaBuilding className='text-2xl text-blue-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>ساختمانی</p>
            <span className='font-bold text-blue-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 4: Electromechanics */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaCogs className='text-2xl text-purple-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>الکترومیخانیک</p>
            <span className='font-bold text-purple-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 5: Environment */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaWater className='text-2xl text-red-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>آب و محیط زیست</p>
            <span className='font-bold text-red-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 6: Transportation */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaRoad className='text-2xl text-yellow-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>ساختمان های ترانسپورتی</p>
            <span className='font-bold text-yellow-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 7: Geomatics */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaDraftingCompass className='text-2xl text-teal-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>جیوماتیک</p>
            <span className='font-bold text-teal-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 8: Chemical Industry */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaIndustry className='text-2xl text-pink-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>صنایع کیمیاوی</p>
            <span className='font-bold text-pink-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 9: Islamic Culture */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaQuran className='text-2xl text-indigo-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>ثقافت اسلامی</p>
            <span className='font-bold text-indigo-500 text-sm sm:text-md'>1345</span>
          </div>

          {/* Column 10: Mathematics */}
          <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105'>
            <FaCalculator className='text-2xl text-lime-500 mb-2 hidden sm:flex'/>
            <p className='font-semibold text-gray-700 text-base sm:text-lg'>ریاضی و هندسه ترسیمی</p>
            <span className='font-bold text-lime-500 text-sm sm:text-md'>1345</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CategoryAmount;
