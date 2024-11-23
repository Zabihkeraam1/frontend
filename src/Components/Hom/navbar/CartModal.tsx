import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { TiEyeOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../../../Store/useAuthStore";
import { HashLoader } from "react-spinners";
import Modal from "../../Modal";

interface Book {
  id: number;
  title: string;
  image_url: string;
}

interface BookDetails {
  image_url: string;
  title: string;
  edition: string;
  author: string;
  category: { name: string };
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

interface CartModalProps {
  toggleCartModal: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ toggleCartModal }) => {
  const [cartBooks, setCartBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bookdetails, setBookdetails] = useState<BookDetails | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cart/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart books:", error);
        setLoading(false);
      });
  }, [token]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "بعد از حذف، این کتاب دیگر در سبد شما وجود نخواهد داشت!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "لغو",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/cart/books/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setCartBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            Swal.fire("کتاب با موفقیت حذف شد!", "", "success");
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
            Swal.fire("خطا در حذف کتاب", "لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.", "error");
          });
      }
    });
  };

  const onReserve = (id: number) => {
    axios
      .post(
        `http://localhost:8000/api/reserve/books/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("رزرو موفقیت‌آمیز بود!", response.data.message, "success");
      })
      .catch((error) => {
        console.error("Error reserving book:", error);
        const errorMessage = error.response?.data?.message || "مشکلی در رزرو وجود دارد.";
        Swal.fire("خطا در رزرو", errorMessage, "error");
      });
  };

  const handleDetails = (id: number) => {
    axios.get(`http://localhost:8000/api/books/details/${id}`).then((response) => {
      setBookdetails(response.data.data);
      setShowModal(true);
    }).catch(error => {
      console.error("Error fetching book details:", error);
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="fixed left-0 bottom-0 lg:mr-[69%] mr-[5%] z-50 bg-white h-screen lg:w-96 w-80   shadow-xl overflow-y-scroll transition-all duration-300">
        {/* Close Modal Button */}
        <button
          onClick={toggleCartModal}
          className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-125"
          aria-label="Close Modal"
        >
          <GrFormClose size={20} />
        </button>

        <div className="w-full lg:px-6 px-4 pt-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <HashLoader color="#4fa94d" size={50} />
            </div>
          ) : (
            <>
              {cartBooks.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  سبد خرید شما خالی است.
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {cartBooks.map((book) => (
                    <li
                      key={book.id}
                      className="flex justify-start items-start gap-4 hover:bg-gray-100 p-4 rounded-md transition-all duration-300"
                    >
                      <div className="w-32 h-44 overflow-hidden rounded-lg shadow-md">
                        <img
                          src={book.image_url}
                          alt={book.title}
                          className="block object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <Link to={`/books/${book.id}`} className="font-sans text-xl text-gray-800 hover:text-gray-900 transition-colors duration-200">
                          {book.title}
                        </Link>
                        <div className="flex justify-between items-center mt-4">
                          <button
                            onClick={() => handleDetails(book.id)}
                            className="w-10 h-10 p-2 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 transform hover:scale-110"
                          >
                            <TiEyeOutline className="text-lg" />
                          </button>
                          <button onClick={() => onReserve(book.id)}
                           className="border border-gray-300 rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110">
                            رزرو
                          </button>
                        </div>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="mr-7 mt-6 text-sm text-red-500 hover:text-red-600 font-sans hover:underline"
                        >
                          حذف از سبد
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} bookdetails={bookdetails} />
    </div>
  );
};

export default CartModal;
