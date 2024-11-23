import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../Modal';
import { useAuthStore } from '../../Store/useAuthStore';

interface Book {
  translator: ReactNode;
  year: ReactNode;
  isbn: ReactNode;
  id: string;
  title: string;
  author: string;
  publisher: string;
  image_url: string;
}

interface Category {
  name: string;
}

interface BookDetails {
  image_url: string;
  title: string;
  edition: string;
  author: string;
  category: Category;
  format: number;
  id: number;
  lang: string;
  isbn: string;
  publicationYear: string;
  publisher: string;
  translator: string;
  barrow: boolean;
  code: string;
}

interface BookCardProps {
  book: Book;
  setReservedAmount: (bookpro: any) => void;
  setReservedCount: (count: number) => void;
  reservedCount: number;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bookdetails, setBookdetails] = useState<BookDetails | null>(null);
  const { title, image_url, author, publisher, id, translator } = book;
  const { token } = useAuthStore();

  const onAddToCard = () => {
    axios.post(`http://localhost:8000/api/cart/books/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'موفقیت',
        text: response.data.message || 'کتاب با موفقیت رزرو شد!',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#3085d6',
        backdrop: true,
        width: '300px',
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: error.response?.data?.message || 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#d33',
        backdrop: true,
        width: '300px',
      });
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/details/${id}`).then((response) => {
      setBookdetails(response.data.data);
    }).catch(error => {
      console.error("Error fetching book details:", error);
    });
  }, [id]);

  return (
    <>
      <div className="">
        <div
          key={book.id}
          className="relative w-56 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105 group"
        >
          <div className='w-full'>
            <img
              src={image_url}
              alt={title}
              className="w-full h-40 md:h-48 lg:h-56 object-cover mb-2 rounded-md transition-all duration-300"
            />
          </div>
          <div className="text-center mt-2 p-2">
            <h2 className="text-lg font-bold mb-1">{book.title}</h2>
            <p className="text-gray-600 mb-1">توسط {book.author}</p>
            <div className='flex justify-center items-center w-full gap-2'>
              <button onClick={onAddToCard}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300">
                رزرو
              </button>
              <button 
              onClick={() => setShowModal(true)}
              className="mt-2  md:block lg:hidden bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md transition duration-300">جزئیات</button>
            </div>
          </div>
          <div className="absolute inset-0 bg-white p-3 rounded-md flex flex-col justify-center items-center opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out transform scale-0 group-hover:scale-100">
            <h2 className="text-lg font-bold mb-1">عنوان: {title}</h2>
            <p className="text-gray-600 mb-1">نویسنده: {author}</p>
            <p className="text-gray-600 mb-1">مترجم: {translator}</p>
            <p className="text-gray-500 mb-1">ناشر: {publisher}</p>
            <div className="flex gap-2">
              <button 
                onClick={onAddToCard}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300"
              >
                رزرو
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md transition duration-300"
              >
                جزئیات 
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} bookdetails={bookdetails} />
    </>
  );
};

export default BookCard;
