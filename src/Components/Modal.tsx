import React from 'react';

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
  description: string;
}

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  bookdetails: BookDetails | null;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, bookdetails }) => {
  if (!showModal || !bookdetails) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-[90%] lg:w-3/4 xl:w-2/3 max-h-[85vh] overflow-y-auto">
        {/* تصویر کتاب در بالا و مشخصات کتاب در پایین در صفحات بزرگ‌تر */}
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* تصویر کتاب */}
          <div className="lg:w-1/2">
            <img
              src={bookdetails.image_url}
              alt={bookdetails.title}
              className="w-full h-auto lg:max-h-[50vh] object-cover rounded-md shadow-md"
            />
          </div>

          {/* جزئیات کتاب */}
          <div className="lg:w-1/2 mt-4 lg:mt-0 overflow-y-auto max-h-[70vh]">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4">{bookdetails.title}</h2>
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
              {/* توضیحات کتاب */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">توضیحات:</h3>
                <p className="text-gray-700">{bookdetails.description}</p>
              </div>
            </div>
            {/* دکمه بستن */}
            <button 
              onClick={() => setShowModal(false)} 
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 w-full lg:w-auto"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
