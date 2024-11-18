import React from 'react';
import { FaRegFilePdf } from 'react-icons/fa';
import { GiEvilBook } from 'react-icons/gi';
import { IoBookOutline } from 'react-icons/io5';
import { LiaGraduationCapSolid } from 'react-icons/lia';
import { PiArticleMediumLight } from 'react-icons/pi';

const AmountOfThings = () => {
  return (
    <div className='flex justify-center items-center sm:px-6 xl:px-28 lg:px-16 md:px-10 mt-10'>
      <div className='w-full py-5 mb-4 rounded-3xl bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-6 shadow-md shadow-gray-400'>
        
        {/* Column 1: Total Books */}
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center'>
            <IoBookOutline size={36} />
          </div>
          <span className='font-bold text-orange-400'>1345</span>
          <p className='font-semibold'>کل کتاب ها</p>
        </div>

        {/* Column 2: Soft Books */}
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center'>
            <FaRegFilePdf size={36} />
          </div>
          <span className='font-bold text-orange-400'>1345</span>
          <p className='font-semibold'>کتاب های سافت</p>
        </div>

        {/* Column 3: Hard Books */}
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center'>
            <GiEvilBook size={36} />
          </div>
          <span className='font-bold text-orange-400'>1345</span>
          <p className='font-semibold'>کتاب های کتبی</p>
        </div>

        {/* Column 4: Total Articles */}
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center'>
            <PiArticleMediumLight size={36} />
          </div>
          <span className='font-bold text-orange-400'>1345</span>
          <p className='font-semibold'>کل مقالات</p>
        </div>

        {/* Column 5: Total Monographs */}
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center'>
            <LiaGraduationCapSolid size={36} />
          </div>
          <span className='font-bold text-orange-400'>1345</span>
          <p className='font-semibold'>کل مونوگراف ها</p>
        </div>

      </div>
    </div>
  );
};

export default AmountOfThings;
