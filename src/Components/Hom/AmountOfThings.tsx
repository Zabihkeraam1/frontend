import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaRegFilePdf } from 'react-icons/fa';
import { GiEvilBook } from 'react-icons/gi';
import { IoBookOutline } from 'react-icons/io5';
import { LiaGraduationCapSolid } from 'react-icons/lia';
import { PiArticleMediumLight } from 'react-icons/pi';

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // در ابتدا نامرئی و پایین‌تر از جایگاه
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.2,
      ease: 'easeOut',
    },
  }),
};

const AmountOfThings = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // انیمیشن فقط یک بار اجرا می‌شود

  const items = [
    { icon: <IoBookOutline size={36} />, title: 'کل کتاب ها', amount: '1345' },
    { icon: <FaRegFilePdf size={36} />, title: 'کتاب های سافت', amount: '1345' },
    { icon: <GiEvilBook size={36} />, title: 'کتاب های کتبی', amount: '1345' },
    { icon: <PiArticleMediumLight size={36} />, title: 'کل مقالات', amount: '1345' },
    { icon: <LiaGraduationCapSolid size={36} />, title: 'کل مونوگراف ها', amount: '1345' },
  ];

  return (
    <div ref={ref} className='flex justify-center items-center sm:px-6 xl:px-28 lg:px-16 md:px-10 mt-10'>
      <div className='w-full py-5 mb-4 rounded-3xl bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-6 shadow-md shadow-gray-400'>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className='flex flex-col justify-center items-center'
            custom={index}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'} // انیمیشن فقط در صورت مشاهده اجرا می‌شود
            variants={cardVariants}
          >
            <div className='h-[80px] w-[80px] rounded-full bg-gradient-to-r from-sky-700 to-teal-500 flex justify-center items-center hidden sm:flex'>
              {item.icon}
            </div>
            <span className='font-bold text-orange-400 text-lg sm:text-xl'>{item.amount}</span>
            <p className='font-semibold text-gray-700 text-sm sm:text-base'>{item.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmountOfThings;
