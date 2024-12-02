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
  categoryName: string;
}

const Category: React.FC<BookCategoryProps> = ({ categoryId, categoryName }) => {
  const [isCarousel, setIsCarousel] = useState<boolean>(true);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories/books/${categoryId}`).then((response) => {
      setAllBooks(response.data.data.books);
      console.log('categeandbook', response.data.books);
    }).catch(error => {
      console.error("Error fetching data:", error);
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
    <div className="container">
      {/* دکمه تغییر حالت نمایش */}
      <div className="flex items-center justify-between px-7">
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isCarousel ? "نمایش همه" : "نمایش کمتر"}
        </button>
        <p className='min-w-fit min-h-fit p-2 rounded-md border border-gray-300'> کتگوری: {categoryName}</p>
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
              className="flex overflow-x-auto gap-4 py-5 px-3 relative scrollbar-hide flex-nowrap"
              style={{ scrollBehavior: 'smooth' }}
            >
              {allBooks.map((book: Book) => (
                <BookCard key={book.id} book={book} />
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
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-5 justify-items-center">
            {allBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
