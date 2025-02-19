import React, { useEffect, useState } from "react";
import axios from "../../../axiosInstance";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";
import BookTable from "../bookTable/bookTable";
import BookDetails from "../bookTable/bookDetails";
import Pagination from "../pagination/pagination";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DashBookRegistration from "./DashBookRegistration";
import { Loader } from "lucide-react";

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

const DashBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const { token } = useAdminAuthStore();
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      Swal.fire("Error", "Failed to fetch books", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    setEditingBookId(id);
  };
  const handleView = (id: number) => {
    const bookToView = books.find((book) => book.id === id);
    if (bookToView) {
      setSelectedBook(bookToView);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "آیا مطمعن هستید؟",
        text: "دیتای هذف شده قابل بازیافت نمیباشد!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "نخیر",
        confirmButtonText: "بلی",
      });

      if (result.isConfirmed) {
        setLoadingDelete(id);
        // Implement delete functionality
        axios.delete(`/api/dashboard/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(books.filter((book) => book.id !== id));
        Swal.fire("حذف شد", "موفقانه حذف گردید.", "success");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      Swal.fire("Error", "Failed to delete book", "error");
    } finally {
      setLoadingDelete(null);
    }
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.publisher}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  if (editingBookId !== null) {
    return <DashBookRegistration bookId={editingBookId} />;
  }
  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">لیست کتابها</h1>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-white border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Link to={"/dashboard?tab=book-registration"}>
            <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105">
              <FaPlus className="mr-2" />
              افزودن کتاب
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size={32} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <BookTable
            books={currentBooks}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            loadingDelete={loadingDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={filteredBooks.length}
            itemsPerPage={booksPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default DashBooks;
