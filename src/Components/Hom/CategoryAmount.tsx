import { motion } from 'framer-motion';
import {
  FaLaptop,
  FaMountain,
  FaBuilding,
  FaCogs,
  FaWater,
  FaRoad,
  FaDraftingCompass,
  FaIndustry,
  FaQuran,
  FaCalculator,
} from 'react-icons/fa';

const CategoryAmount = () => {
  const cards = [
    { id: 1, icon: FaLaptop, color: 'text-orange-500', title: 'کامپیوتر', amount: '1345' },
    { id: 2, icon: FaMountain, color: 'text-green-500', title: 'جیولوجی و معادن', amount: '1345' },
    { id: 3, icon: FaBuilding, color: 'text-blue-500', title: 'ساختمانی', amount: '1345' },
    { id: 4, icon: FaCogs, color: 'text-purple-500', title: 'الکترومیخانیک', amount: '1345' },
    { id: 5, icon: FaWater, color: 'text-red-500', title: 'آب و محیط زیست', amount: '1345' },
    { id: 6, icon: FaRoad, color: 'text-yellow-500', title: 'ساختمان های ترانسپورتی', amount: '1345' },
    { id: 7, icon: FaDraftingCompass, color: 'text-teal-500', title: 'جیوماتیک', amount: '1345' },
    { id: 8, icon: FaIndustry, color: 'text-pink-500', title: 'صنایع کیمیاوی', amount: '1345' },
    { id: 9, icon: FaQuran, color: 'text-indigo-500', title: 'ثقافت اسلامی', amount: '1345' },
    { id: 10, icon: FaCalculator, color: 'text-lime-500', title: 'ریاضی و هندسه ترسیمی', amount: '1345' },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // فاصله زمانی بین کارت‌ها
      },
    },
  };

  const cardAnimation = {
    hidden: (index) => ({
      x: index % 2 === 0 ? '-100vw' : '100vw', // کارت‌های زوج از چپ و فرد از راست
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2, // مدت زمان بیشتر برای ورود آرام
        ease: 'easeOut', // پایان روان
      },
    },
  };
  

  return (
    <motion.div
      className="flex flex-col justify-center items-center sm:px-6 xl:px-28 lg:px-16 md:px-10 mt-10 overflow-x-auto"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <span className="font-sans mb-4 text-2xl font-semibold text-gray-800">کتگوری ها</span>

      <div className="w-full py-6 px-4 mb-6 rounded-3xl bg-orange-100 shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className="flex flex-col justify-center items-center p-3 rounded-xl bg-white shadow-lg transition-transform transform hover:scale-105"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardAnimation}
              >
                <Icon className={`text-2xl ${card.color} mb-2 hidden sm:flex`} />
                <p className="font-semibold text-gray-700 text-base sm:text-lg">{card.title}</p>
                <span className={`font-bold ${card.color} text-sm sm:text-md`}>{card.amount}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryAmount;
