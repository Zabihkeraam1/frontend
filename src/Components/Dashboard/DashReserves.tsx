import React, { useEffect, useState, ReactNode } from "react";
import axios from "../../axiosInstance";
import Table from "../Table/ReserveTable";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
}

const columns = [
  { header: "عنوان کتاب", accessor: "title" },
  { header: "نویسنده", accessor: "author" },
  { header: " نام امانت گیرنده", accessor: "publisher" },
  { header: "تخلص امانت گیرنده", accessor: "publisher" },
  { header: "عملیات", accessor: "actions" },
];

const convertBooksToRecords = (books: Book[]): Record<string, ReactNode>[] => {
  return books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    publisher: book.publisher,
  }));
};

const DashReserves: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAdminAuthStore();
  useEffect(() => {
    axios.get("/api/dashboard/books", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      setBooks(response.data.data);
      console.log(response);
    });
  }, []);
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.publisher}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const tableData = convertBooksToRecords(filteredBooks);
  return (
    <div className="px-2 min-h-screen ">
      <header className="flex justify-between mt-4 mb-2 relative">
        <h1 className="text-2xl font-bold">لیست امانات</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-300 pr-2 text-xl py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-xl text-gray-500 absolute hover:text-blue-500 hover:cursor-pointer top-3 left-2" />
        </div>
      </header>
      <div>{books && <Table columns={columns} data={tableData} component="Reserves" />}</div>
    </div>
  );
};

export default DashReserves;
