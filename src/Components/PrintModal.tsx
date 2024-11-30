import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAdminAuthStore } from "../Store/useAdminAuthStore";
import { useReactToPrint } from "react-to-print";

interface Props {
  id: number | undefined;
  closeModal: () => void;
}
interface User {
  firstName: string;
  lastName: string;
  image: string;
  id: string;
  department: string;
  faculty: string;
  phone: string;
}

const PrintModal = ({ closeModal, id }: Props) => {
  const { token } = useAdminAuthStore();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/dashboard/users/activated_users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user data");
        setLoading(false);
        console.log(error);
      });
  }, [id, token]);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    // content: () => contentRef.current,
    // documentTitle: 'Library Card',
    // onBeforeGetContent: () => {
    //   if (contentRef.current) {
    //     contentRef.current.style.width = '100%';
    //     contentRef.current.style.height = '100%';
    //   }
    //   return new Promise<void>((resolve) => {
    //     resolve();
    //   });
    // },
    // onAfterPrint: () => {
    //   if (contentRef.current) {
    //     contentRef.current.style.width = '';
    //     contentRef.current.style.height = '';
    //   }
    // },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-30">
      {user && (
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-3/4 lg:w-2/3 xl:w-1/2">
          <h1 className="text-center text-2xl mb-4">Library Card</h1>
          <div
            ref={contentRef}
            className="border py-2 px-2 bg-blue-400 rounded-md w-80 h-48"
          >
            {/* <div className=''>
              <div className='flex flex-col text-sm justify-center items-center'>
                <h1>logo</h1>
                <h2>Polytechnic university</h2>
                <h3>Library</h3>
              </div>
            </div> */}
            <div className="flex mt-5 justify-between items-center">
              <div className="text-sm">
                <h1 className="">آی‌دی: {user.id}</h1>
                <h1 className="">نام: {user.firstName}</h1>
                <h1 className="">تخلص: {user.lastName}</h1>
                <h1 className="">پوهنزی: {user.faculty}</h1>
                <h1 className="">دیپارتمنت: {user.department}</h1>
                <h1 className="">نمبر تیلفون: {user.phone}</h1>
              </div>
              <div>
              <img
                className="h-[100px] w-[100px] border"
                src={
                  typeof user.image === "string"
                    ? user.image
                    : URL.createObjectURL(user.image)
                }
                alt={`${user.firstName}'s profile`}
              />
              <div className="h-8 w-18 border mt-1">امضا</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={closeModal}
              className="py-1 px-4 bg-rose-500 text-white rounded hover:bg-rose-600 ml-5"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="py-1 px-4 bg-slate-400 text-white rounded hover:bg-slate-500"
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintModal;
