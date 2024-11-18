
// import React, { useState } from 'react';
// import BookCard from './BookCard';
// import axios from 'axios';
// import Navbar from './Navbar';

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   publisher: string;
//   image: string;
// }

// interface BookCategoryProps {
//   categoryId: number;
//   category: string;
//   books: Book[];
// }

// const Category: React.FC<BookCategoryProps> = ({categoryId, category, books }) => {
//   const [viewMode, setViewMode] = useState(true);
//   const [ allBooks, setAllBooks] = useState<Book[]>([]);
//   const toggleView = () => {
//     axios.get(`http://localhost:8000/api/category/books/${categoryId}`).then((response) => {
//       setAllBooks(response.data.data.books);
//     });
//     setViewMode(!viewMode);
//   };

//   return (
//     <>
    
//     <div className="p-4 bg-gray-200">
      
//       {
//         <div className="flex justify-between items-center bg-gray-100 px-4 py-1 rounded">
//         <button
//           onClick={toggleView}
//           className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {viewMode ? 'Show All Books' : 'Hide Books'}
//         </button>
//         <h2 className="text-xl font-semibold">{category}</h2>
//       </div>
//       }

//       {viewMode ? (
//         <div className="">
//           <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5  justify-center gap-3 mt-2">
//             {books.map((book) => (
//               <BookCard key={book.title} book={book} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {allBooks.map((book) => (
//             <BookCard key={book.title} book={book} />
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Category;
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BookCard from './BookCard';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  image: string;
}

interface BookCategoryProps {
  categoryId: number;
  category: string;
  books: Book[];
}

const Category = ({ categoryId, category, books, setReservedAmount, setReservedCount, reservedCount }: BookCategoryProps) => {
  const [isCarousel, setIsCarousel] = useState(true);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/category/books/${categoryId}`).then((response) => {
      setAllBooks(response.data.data.books);
      console.log('responseNew:', response.data.data);
    });
  }, [categoryId]);

  const toggleView = () => {
    setIsCarousel(!isCarousel);
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className="container ">
      {/* دکمه تغییر حالت نمایش */}
      <div className="flex items-center justify-between px-7">
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isCarousel ? "نمایش همه" : "حالت کاروسل"}
        </button>
        <p className='min-w-fit min-h-fit p-2 rounded-md border border-gray-300'> کتگوری: {category}</p>
      </div>

      <div className="relative mt-5">
        {isCarousel ? (
          <div className="relative">
            {/* دکمه قبلی */}
            <button
              onClick={handleScrollLeft}
              className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-10 hover:bg-blue-700 transition duration-300"
            >
              <FaArrowLeft size={20} />
            </button>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 py-5 px-3 relative bg-green-200 scrollbar-hide flex-nowrap"
              style={{ scrollBehavior: 'smooth' }}
            >
              {allBooks.map((book) => (
                <BookCard key={book.id} book={book} setReservedAmount={setReservedAmount}
                setReservedCount={setReservedCount}
                reservedCount={reservedCount}/>
              ))}
            </div>

            {/* دکمه بعدی */}
            <button
              onClick={handleScrollRight}
              className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-10 hover:bg-blue-700 transition duration-300"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-5 bg-green-200 justify-items-center">
            {allBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;