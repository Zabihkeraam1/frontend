import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 mt-[45px]">
      <div className=" w-screen bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">ما مشتاقانه منتظر شنیدن از شما هستیم.</h2>
          <p className="text-gray-600 mb-6">
            اگر محصولات فوق‌العاده‌ای دارید یا به دنبال همکاری با ما هستید، پیام خود را ارسال کنید.
          </p>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="نام شما"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="ایمیل شما"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="پیام شما"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            ></textarea>
            <div className="flex items-center">
              <input type="checkbox" id="saveInfo" className="mr-2" />
              <label htmlFor="saveInfo" className="text-gray-600">
                ذخیره نام، ایمیل و وبسایت من برای دفعه بعد
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              ارسال پیام
            </button>
          </form>
        </div>
        <div className="flex flex-col space-y-4 text-gray-700">
          <div>
            <h3 className="text-xl font-bold mb-1">آدرس</h3>
            <p>کارته مامورین ، پوهنتون پولی تخنیک</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">اطلاعات تماس</h3>
            <p>تلفن: +93 (0) 78 5959 504</p>
            <p>ایمیل: info@example.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">رسانه‌های اجتماعی</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">ساعات کاری</h3>
            <p>ساعات کار ما در روزهای رسمی از ساعت ۸ صبح تا ۴ عصر است.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
