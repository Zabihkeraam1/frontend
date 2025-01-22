import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
}

interface BookTableProps {
  books: Book[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loadingDelete: number | null;
}

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete, loadingDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-right">عنوان</th>
            <th className="py-3 px-6 text-right">نویسنده</th>
            <th className="py-3 px-6 text-right">ناشر</th>
            <th className="py-3 px-6 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {books.map((book) => (
            <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-right whitespace-nowrap">
                <div className="font-medium">{book.title}</div>
              </td>
              <td className="py-3 px-6 text-right">{book.author}</td>
              <td className="py-3 px-6 text-right">{book.publisher}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    onClick={() => onEdit(book.id)}
                    className="w-8 h-8 mr-2 transform text-blue-400 hover:text-blue-500 hover:scale-110 flex items-center justify-center"
                    
                  >
                      <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="w-8 h-8 mr-2 transform text-red-400 hover:text-red-500 hover:scale-110 flex items-center justify-center"
                    disabled={loadingDelete === book.id}
                  >
                    {loadingDelete === book.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;

