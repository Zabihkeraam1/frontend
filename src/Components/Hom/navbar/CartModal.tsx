import axios from 'axios';
import { header } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { TiEyeOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';


const CartModal = ({ toggleCartModal }) => {


  const [cartBooks,setCartBooks]=useState([])
  const { token } = useAuthStore();

  useEffect(() => {
    axios.get('http://localhost:8000/api/cart/books',
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    ).then((response)=>{
      console.log(response)
      setCartBooks(response.data.data);
    })
  }, []);

  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="fixed left-0 bottom-0 mr-[69%] z-50 bg-white h-screen lg:w-96 w-80 rounded-tl-3xl shadow-xl overflow-y-scroll transition-all duration-300">
        
        {/* دکمه بستن مودال کوچکتر شده */}
        <button
          onClick={() => toggleCartModal()}
          className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-110"
        >
          <GrFormClose size={18} />
        </button>
        
        <div className="w-full lg:px-6 px-4 pt-6">
          <ul className="flex flex-col gap-6">
            {cartBooks.map((book)=>(
              <li className="flex justify-start items-start gap-4 hover:bg-gray-100 p-4 rounded-md transition-all duration-200">
              <div className="w-32 h-44 overflow-hidden rounded-md">
                <img
                  src={book.image_url}
                  alt="Book"
                  className="block"
                />
              </div>
              <div className="flex-1">
                {/* برداشتن افکت هاور از نام کتاب */}
                <Link to={''} className="font-sans text-xl text-gray-800">
                  {book.title}
                </Link>
                <div className="flex justify-between items-center mt-4">
                  {/* دکمه مشاهده با آیکن چشم در وسط */}
                  <Link
                    to={''}
                    className="w-10 h-10 p-2 flex justify-center items-center border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-transform duration-300 transform hover:scale-110"
                  >
                    <TiEyeOutline className="text-lg" />
                  </Link>
                  <button className="border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110">
                    رزرو
                  </button>
                </div>
                <button className="mr-7 mt-6 text-sm text-red-500 hover:text-red-600 font-sans hover:underline">
                  حذف از سبد
                </button>
              </div>
            </li>
            ))}
            <li className="flex justify-start items-start gap-4 hover:bg-gray-100 p-4 rounded-md transition-all duration-200">
              <div className="w-32 h-44 overflow-hidden rounded-md">
                <img
                  src="image.png"
                  alt="Book"
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                {/* برداشتن افکت هاور از نام کتاب */}
                <Link to={''} className="font-sans text-xl text-gray-800">
                  نام کتاب
                </Link>
                <div className="flex justify-between items-center mt-4">
                  {/* دکمه مشاهده با آیکن چشم در وسط */}
                  <Link
                    to={''}
                    className="w-10 h-10 p-2 flex justify-center items-center border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-transform duration-300 transform hover:scale-110"
                  >
                    <TiEyeOutline className="text-lg" />
                  </Link>
                  <button className="border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110">
                    رزرو
                  </button>
                </div>
                <button 
                className="mr-7 mt-6 text-sm text-red-500 hover:text-red-600 font-sans hover:underline">
                  حذف از سبد
                </button>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartModal;



