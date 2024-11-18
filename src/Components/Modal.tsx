// import React, { ReactNode } from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
//   title?: string;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  
//   if (!isOpen) return null; // Render nothing if the modal is not open
   
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
//       <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-screen p-6 overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">{title || 'Modal Title'}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             &#10005; {/* Close icon */}
//           </button>
//         </div>
//         <div className="mb-6 font-thin max-h-[60vh] overflow-y-auto">
//           {children}
          
//         </div>
//         <div className="flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React from 'react';

const Modal = ({ showModal, setShowModal, bookdetails }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* جزئیات کتاب در دو ستون در سمت چپ */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-semibold">نویسنده:</span> {bookdetails.author}</p>
                <p className="mb-2"><span className="font-semibold">مترجم:</span> {bookdetails.translator}</p>
                <p className="mb-2"><span className="font-semibold">ناشر:</span> {bookdetails.publisher}</p>
                <p className="mb-2"><span className="font-semibold">سال انتشار:</span> {bookdetails.publicationYear}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-semibold">چاپ:</span> {bookdetails.edition}</p>
                <p className="mb-2"><span className="font-semibold">فرمت:</span> {bookdetails.format}</p>
                <p className="mb-2"><span className="font-semibold">کتگوری:</span> {bookdetails.category.name}</p>
                <p className="mb-2"><span className="font-semibold">شابک:</span> {bookdetails.isbn}</p>
                <p className="mb-2"><span className="font-semibold">امانت:</span> {bookdetails.barrow ? "بله" : "خیر"}</p>
              </div>
            </div>
          </div>

          {/* تصویر کتاب در سمت راست */}
          <div className="flex justify-center items-center">
            <img
              src={bookdetails.image_url}
              alt={bookdetails.title}
              className="w-full h-auto max-w-[250px] object-cover rounded-md shadow-md"
            />
          </div>
        </div>

        {/* توضیحات کتاب */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">توضیحات:</h3>
          <p className="text-gray-700">{bookdetails.description}</p>
        </div>

        {/* دکمه بستن */}
        <button 
          onClick={() => setShowModal(false)} 
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default Modal;
