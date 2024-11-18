

// interface Book {
//   translator: ReactNode;
//   year: ReactNode;
//   isbn: ReactNode;
//   id: string;
//   title: string;
//   author: string;
//   publisher: string;
//   image_url: string;
// }
// interface Category{
//   name: string;
// }

// interface BookDetails{
//   image_url: string;
//   title: string;
//   edition: string;
//   author: string;
//   category: Category;
//   format: number;
//   id: number;
//   lang: string;
//   isbn: string;
//   publicationYear: string;
//   publisher: string;
//   translator: string;
//   barrow: boolean;
//   code:string;
// }
// interface BookCardProps {
//   book: Book;
// }


// const BookCard : React.FC<BookCardProps> =  ({ book,setReservedAmount ,setReservedCount,reservedCount}) => {


// const onAddToCard=(bookpro)=>{
//   setReservedAmount({bookpro})
//   setReservedCount(reservedCount+1)

// }
//   const { title,image_url, author, publisher, id,translator } = book;
//   return (
//     <>

//       <div className="  bg-green-200">

//         <div
//           key={book.id}
//           className="relative w-56  bg-white rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105 group"
//         >
//           {/* عکس کتاب */}
//           <div className='w-full p-[3px]'>
//             <img
//               src={image_url}
//               alt={title}
//               className="w-full h-40 md:h-48 lg:h-56 object-cover mb-2 rounded-md transition-all duration-300"
//             />
//           </div>

//           {/* عنوان، نویسنده و دکمه رزرو در حالت عادی */}
//           <div className="text-center mt-2 p-2">
//             <h2 className="text-lg font-bold mb-1">{book.title}</h2>
//             <p className="text-gray-600 mb-1">توسط {book.author}</p>
//             <button onClick={()=>{onAddToCard({id,title,author,publisher})}}
//              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300">
//               رزرو
//             </button>
//           </div>

//           {/* جزئیات کامل کتاب با انیمیشن در حالت هاور */}
//           <div className="absolute inset-0 bg-white p-3 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-0 group-hover:scale-100">
//             <h2 className="text-lg font-bold mb-1">title:{title}</h2>
//             <p className="text-gray-600 mb-1">توسط {author}</p>
//             <p className="text-gray-600 mb-1">{translator}</p>
//             <p className="text-gray-500 mb-1">publisher:{publisher}</p>
//             <button onClick={()=>{onAddToCard({id,title,author,publisher})}}
//              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300">
//               رزرو
//             </button>
//           </div>
//         </div>

//       </div>

    
      
//     </>
//   );
// };

// export default BookCard;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

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

const BookCard: React.FC<BookCardProps> = ({ book, setReservedAmount, setReservedCount, reservedCount }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookdetails,setBookdetails]=useState()
  const onAddToCard = (bookpro) => {
    setReservedAmount({ bookpro });
    setReservedCount(reservedCount + 1);
  };

  const { title, image_url, author, publisher, id, translator, year, isbn } = book;
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/book/detials/${id}`).then((response) => {
      // console.log('book_detail:', response.data.data);
      setBookdetails(response.data.data)
    });
  }, [id]);
  
  return (
    <>
      <div className="bg-green-200">
        <div
          key={book.id}
          className="relative w-56 bg-white rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105 group"
        >
          {/* عکس کتاب */}
          <div className='w-full p-[3px]'>
            <img
              src={image_url}
              alt={title}
              className="w-full h-40 md:h-48 lg:h-56 object-cover mb-2 rounded-md transition-all duration-300"
            />
          </div>
          {/* عنوان، نویسنده و دکمه رزرو در حالت عادی */}
          <div className="text-center mt-2 p-2">
            <h2 className="text-lg font-bold mb-1">{book.title}</h2>
            <p className="text-gray-600 mb-1">توسط {book.author}</p>
            <button 
              onClick={() => { onAddToCard({ id, title, author, publisher }) }}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300"
            >
              رزرو
            </button>
          </div>
          {/* جزئیات کامل کتاب با انیمیشن در حالت هاور */}
          <div className="absolute inset-0 bg-white p-3 rounded-lg flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-0 group-hover:scale-100">
            <h2 className="text-lg font-bold mb-1">title: {title}</h2>
            <p className="text-gray-600 mb-1">توسط {author}</p>
            <p className="text-gray-600 mb-1">{translator}</p>
            <p className="text-gray-500 mb-1">publisher: {publisher}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => { onAddToCard({ id, title, author, publisher }) }}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md transition duration-300"
              >
                رزرو
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md transition duration-300"
              >
                جزئیات بیشتر
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
