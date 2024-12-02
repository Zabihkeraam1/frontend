import React, { useEffect, useState, ReactNode } from "react";

import axios from "axios";
import Table from "../Table/Table";
import { FaSearch } from "react-icons/fa";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";

interface Book {
  id: number;
  title: string;
  author: string;
  publisher: string;
}

const columns = [
  { header: "عنوان", accessor: "title" },
  { header: "نویسنده", accessor: "author" },
  { header: "ناشر", accessor: "publisher" },
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

const DashBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAdminAuthStore();
  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard/books", {
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
        <h1 className="text-3xl font-bold">لیست کتابها</h1>
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
      <div>{books && <Table columns={columns} data={tableData} component="Books" />}</div>
    </div>
  );
};

export default DashBooks;
