import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../Store/useAuthStore";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  issueDate: string;
  returnDate: string;
  image: string;
}

const ReservedBooks: React.FC = () => {
  // لیست نمونه از کتاب‌ها
  // const books: Book[] = [
  //   {
  //     id: 1,
  //     title: "کتاب اول",
  //     author: "نویسنده اول",
  //     issueDate: "1402/01/15",
  //     returnDate: "1402/02/15",
  //     image: "../../../public/3.jpg", // آدرس نمونه برای تصویر کتاب
  //   },
  //   {
  //     id: 2,
  //     title: "کتاب دوم",
  //     author: "نویسنده دوم",
  //     issueDate: "1402/03/10",
  //     returnDate: "1402/04/10",
  //     image: "https://via.placeholder.com/100",
  //   },
  // ];
  const [books, setBooks] = useState([]); // ذخیره اطلاعات کاربر


  const { token } = useAuthStore();
  
  useEffect(() => {
    console.log('token',token)
    axios.get('http://localhost:8000/api/account/profile',
      
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      console.log('userbooks',response.data);
      
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  }, [token]);

  return (
    <div className="w-full h-auto flex justify-center items-center py-8 px-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 w-full">
        {books.map((book) => (
          <li
            
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 group"
            style={{ maxWidth: "18rem" }} // عرض کارت افزایش یافته است
          >
            {/* تصویر کتاب */}
            <div className="relative w-36 h-36 mb-4"> {/* اندازه تصویر کمی افزایش یافت */}
              <img
                src={''}
                alt={''}
                className="w-full h-full object-cover rounded-lg border border-gray-300 shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* جزئیات کتاب */}
            <div className="text-center font-sans">
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                
              </h3>
              <p className="text-sm text-gray-600 mb-3">نویسنده: {book.author}</p>
              <div className="text-sm text-gray-500 space-y-1">
              
                <p>
                  تاریخ برگشت:{" "}
                  <span className="font-semibold text-red-500">
                    
                  </span>
                </p>
              </div>
            </div>

            {/* دکمه مشاهده جزئیات */}
            <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              مشاهده جزئیات
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservedBooks;
