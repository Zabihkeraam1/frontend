// import React from 'react';

// const ReservedBooks = () => {
//   // لیست نمونه از کتاب‌ها
//   const books = [
//     {
//       id: 1,
//       title: 'کتاب اول',
//       author: 'نویسنده اول',
//       issueDate: '1402/01/15',
//       returnDate: '1402/02/15',
//       image: '../../../public/3.jpg' // آدرس نمونه برای تصویر کتاب
//     },
//     {
//       id: 2,
//       title: 'کتاب دوم',
//       author: 'نویسنده دوم',
//       issueDate: '1402/03/10',
//       returnDate: '1402/04/10',
//       image: 'https://via.placeholder.com/100'
//     },
//     {
//       id: 3,
//       title: 'کتاب سوم',
//       author: 'نویسنده سوم',
//       issueDate: '1402/05/05',
//       returnDate: '1402/06/05',
//       image: 'https://via.placeholder.com/100'
//     },
//     {
//       id: 4,
//       title: 'کتاب چهارم',
//       author: 'نویسنده چهارم',
//       issueDate: '1402/07/10',
//       returnDate: '1402/08/10',
//       image: 'https://via.placeholder.com/100'
//     },
//     {
//       id: 5,
//       title: 'کتاب پنجم',
//       author: 'نویسنده پنجم',
//       issueDate: '1402/09/15',
//       returnDate: '1402/10/15',
//       image: 'https://via.placeholder.com/100'
//     },
//     {
//       id: 6,
//       title: 'کتاب ششم',
//       author: 'نویسنده ششم',
//       issueDate: '1402/11/01',
//       returnDate: '1402/12/01',
//       image: 'https://via.placeholder.com/100'
//     }
//   ];

//   return (
//     <div className='w-full h-[80%] flex justify-center items-center overflow-y-auto hide-scrollbar shadow-lg shadow-gray-400 rounded-lg py-4 px-5 mx-4 bg-gradient-to-r from-gray-100 to-gray-200'>
//       <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 w-full'>
//         {books.map((book) => (
//           <li key={book.id} className='bg-white shadow-md rounded-xl p-4 flex items-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300'>
//             {/* تصویر کتاب */}
//             <img
//               src={book.image}
//               alt={book.title}
//               className='w-24 h-24 object-cover rounded-lg mr-4 border border-gray-300 shadow-sm'
//             />
            
//             {/* جزئیات کتاب */}
//             <div className='flex-1 mr-2 font-sans'>
//               <h3 className='font-bold text-md mb-2 text-gray-800'>{book.title}</h3>
//               <p className='text-sm text-gray-600 mb-1'>نویسنده: {book.author}</p>
//               <div className='text-sm text-gray-500'>
//                 <p>تاریخ اخذ: <span className='font-semibold text-gray-600'>{book.issueDate}</span></p>
//                 <p>تاریخ برگشت: <span className='font-semibold text-red-500'>{book.returnDate}</span></p>
//               </div>
//             </div>

//             {/* دکمه رزرو */}
//             <button className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200'>
//               رزرو
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReservedBooks;

import React from 'react';

const ReservedBooks = () => {
  // لیست نمونه از کتابها
  const books = [
    {
      id: 1,
      title: 'کتاب اول',
      author: 'نویسنده اول',
      issueDate: '1402/01/15',
      returnDate: '1402/02/15',
      image: '../../../public/3.jpg' // آدرس نمونه برای تصویر کتاب
    },
    {
      id: 2,
      title: 'کتاب دوم',
      author: 'نویسنده دوم',
      issueDate: '1402/03/10',
      returnDate: '1402/04/10',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      title: 'کتاب سوم',
      author: 'نویسنده سوم',
      issueDate: '1402/05/05',
      returnDate: '1402/06/05',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 4,
      title: 'کتاب چهارم',
      author: 'نویسنده چهارم',
      issueDate: '1402/07/10',
      returnDate: '1402/08/10',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 5,
      title: 'کتاب پنجم',
      author: 'نویسنده پنجم',
      issueDate: '1402/09/15',
      returnDate: '1402/10/15',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 6,
      title: 'کتاب ششم',
      author: 'نویسنده ششم',
      issueDate: '1402/11/01',
      returnDate: '1402/12/01',
      image: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <div className='w-full h-auto flex justify-center items-center overflow-y-auto shadow-lg shadow-gray-400 py-4 px-5 bg-gradient-to-r from-gray-100 to-gray-200'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 w-full'>
        {books.map((book) => (
          <li key={book.id} className='bg-white shadow-md rounded-xl p-4 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300 w-full md:max-w-[12.5rem] lg:max-w-[13rem] sm:max-w-[9rem]'>
            {/* تصویر کتاب */}
            <img
              src={book.image}
              alt={book.title}
              className='w-32 h-32 object-cover rounded-lg mb-4 border border-gray-300 shadow-sm'
            />
            {/* جزئیات کتاب */}
            <div className='text-center font-sans'>
              <h3 className='font-bold text-sm mb-2 text-gray-800'>{book.title}</h3>
              <p className='text-xs text-gray-600 mb-1'>نویسنده: {book.author}</p>
              <div className='text-xs text-gray-500'>
                <p>تاریخ اخذ: <span className='font-semibold text-gray-600'>{book.issueDate}</span></p>
                <p>تاریخ برگشت: <span className='font-semibold text-red-500'>{book.returnDate}</span></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservedBooks;
