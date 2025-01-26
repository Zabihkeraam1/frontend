import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  department: string;
  description: string;
  edition: number;
  faculty: string;
  isbn: string;
  translator: string;
  lang: string;
  borrow: string;
  category: string;
  code: string;
}

const BookDetails: React.FC<{ book: Book; onClose: () => void }> = ({
  book,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto">
        <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-2">
            <p>
              <strong>عنوان:</strong> {book.title}
            </p>
            <p>
              <strong>نویسنده:</strong> {book.author}
            </p>
            <p>
              <strong>ناشر:</strong> {book.publisher}
            </p>
            <p>
              <strong>مترجم:</strong> {book.translator || 'ندارد'}
            </p>
            <p>
              <strong>سال انتشار:</strong> {book.publicationYear}
            </p>
            <p>
              <strong>پوهنځی:</strong> {book.faculty}
            </p>
            <p>
              <strong>دیپارتمنت:</strong> {book.department}
            </p>
            <p>
              <strong>ویرایش:</strong> {book.edition}
            </p>
            <p>
              <strong>شابک:</strong> {book.isbn}
            </p>
            <p>
              <strong>زبان:</strong> {book.lang}
            </p>
            <p>
              <strong>امانت:</strong> {book.borrow}
            </p>
            <p>
              <strong>دسته‌بندی:</strong> {book.category}
            </p>
            <p>
              <strong>کد:</strong> {book.code}
            </p>
            <p>
              <strong>توضیحات:</strong> {book.description}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default BookDetails;