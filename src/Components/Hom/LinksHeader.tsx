import React, { useState, useEffect } from 'react';
import { IoBookSharp } from 'react-icons/io5';
import { FaNewspaper, FaBook } from 'react-icons/fa';

const LinksHeader = () => {
  // حالت برای مدیریت نمایش مودال و نمایش یا عدم نمایش ناوبار
  const [activeLink, setActiveLink] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  // مدیریت نمایش و عدم نمایش ناوبار هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > lastScrollPos) {
        setShowNavbar(false); // اسکرول به پایین، ناوبار مخفی می‌شود
      } else {
        setShowNavbar(true); // اسکرول به بالا، ناوبار نمایش داده می‌شود
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    // حذف لیسنر هنگام خروج کامپوننت
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  return (
    <>
      {/* ناوبار برای حالت دسکتاپ */}
      <div className='relative w-full lg:h-12 lg:pr-20 font-sans bg-white shadow-md lg:block hidden'>
        {/* لیست لینک‌ها */}
        <ul className='flex justify-start items-center gap-10 px-8'>
          {/* Container برای لینک و مودال Books */}
          <div
            className='relative group'
            onMouseEnter={() => setActiveLink(1)}
            onMouseLeave={() => setActiveLink(null)}
          >
            <li className='relative text-black cursor-pointer'>
              <span className='flex gap-1 justify-center items-center'>
                <IoBookSharp />
                <p>کتاب‌ها</p>
              </span>
              {/* باردر سبز رنگ */}
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100' />
            </li>
            {/* مودال زیر لینک */}
            {activeLink === 1 && (
              <div
                className='absolute top-7 -right-2 w-56 p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10'
                onMouseEnter={() => setActiveLink(1)}
                onMouseLeave={() => setActiveLink(null)}
              >
                <p className='text-sm font-semibold'>کتاب‌های جدید</p>
                <ul className='mt-2'>
                  <li className='cursor-pointer'>ادبیات</li>
                  <li className='cursor-pointer'>علمی</li>
                  <li className='cursor-pointer'>کودکان</li>
                  <li className='cursor-pointer'>تاریخی</li>
                </ul>
              </div>
            )}
          </div>

          {/* Container برای لینک و مودال Articles */}
          <div
            className='relative group'
            onMouseEnter={() => setActiveLink(2)}
            onMouseLeave={() => setActiveLink(null)}
          >
            <li className='relative text-black cursor-pointer'>
              <span className='flex gap-1 justify-center items-center'>
                <FaNewspaper />
                <p>مقالات</p>
              </span>
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100' />
            </li>
            {activeLink === 2 && (
              <div
                className='absolute top-7 -right-9 w-56 p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10'
                onMouseEnter={() => setActiveLink(2)}
                onMouseLeave={() => setActiveLink(null)}
              >
                <p className='text-sm font-semibold'>مقالات</p>
                <ul className='mt-2'>
                  <li className='cursor-pointer'>مقالات علمی</li>
                  <li className='cursor-pointer'>پژوهشی</li>
                  <li className='cursor-pointer'>دانشگاهی</li>
                  <li className='cursor-pointer'>مطالعات اجتماعی</li>
                </ul>
              </div>
            )}
          </div>

          {/* Container برای لینک و مودال Monograph */}
          <div
            className='relative group'
            onMouseEnter={() => setActiveLink(3)}
            onMouseLeave={() => setActiveLink(null)}
          >
            <li className='relative text-black cursor-pointer'>
              <span className='flex gap-1 justify-center items-center'>
                <FaBook />
                <p>مونوگراف</p>
              </span>
              <span className='absolute left-0 right-0 bottom-0 h-[2px] bg-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100' />
            </li>
            {activeLink === 3 && (
              <div
                className='absolute top-7 -left-3 w-56 p-4 bg-white shadow-lg rounded-lg border border-gray-200 z-10'
                onMouseEnter={() => setActiveLink(3)}
                onMouseLeave={() => setActiveLink(null)}
              >
                <p className='text-sm font-semibold'>مونograf‌ها</p>
                <ul className='mt-2'>
                  <li className='cursor-pointer'>پروژه‌های دانشگاهی</li>
                  <li className='cursor-pointer'>پایان‌نامه‌ها</li>
                  <li className='cursor-pointer'>تحقیقات نهایی</li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>

      {/* ناوبار برای حالت موبایل و متوسط */}
      <div
        className={`fixed bottom-0 w-full h-12 bg-white shadow-md flex justify-around items-center z-50 transition-transform duration-300 ${
          showNavbar ? 'transform translate-y-0' : 'transform translate-y-full'
        } lg:hidden`}
      >
        <span className='text-black cursor-pointer flex flex-col items-center'>
          <IoBookSharp />
          <p className='text-xs'>کتاب‌ها</p>
        </span>
        <span className='text-black cursor-pointer flex flex-col items-center'>
          <FaNewspaper />
          <p className='text-xs'>مقالات</p>
        </span>
        <span className='text-black cursor-pointer flex flex-col items-center'>
          <FaBook />
          <p className='text-xs'>مونograf‌ها</p>
        </span>
      </div>
    </>
  );
};

export default LinksHeader;