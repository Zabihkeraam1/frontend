import axios from "axios";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { TbUserEdit } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../../Store/useAuthStore";

const UserProfile = () => {

  const { token } = useAuthStore();
  axios.get('http://localhost:8000/api/account/profile',
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  ).then((res)=>{
    console.log(res)
  })
  return (
    <div className="flex flex-col lg:flex-row h-full bg-orange-50">
      {/* منوی ریسپانسیو - موبایل در بالای صفحه و دسکتاپ در وسط */}
      <div className="lg:flex-1 px-5 py-24">
        <ul className="flex flex-row lg:flex-col sm:flex-col md:flex-row sm:h-fit sm:my-0 sm:mx-0 gap-4 items-center justify-around text-center">
          <li>
            <Link
              to="edit-profile"
              className="font-serif font-semibold flex flex-col items-center hover:text-blue-500 transition-colors duration-200"
            >
              <TbUserEdit size={25} />
              <span className="text-xs mt-1">ویرایش پروفایل</span>
            </Link>
          </li>
          <li>
            <Link
              to="reserved-books"
              className="font-serif font-semibold flex flex-col items-center hover:text-blue-500 transition-colors duration-200"
            >
              <IoBookOutline size={22} />
              <span className="text-xs mt-1">کتاب‌های رزرو شده</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-serif font-semibold flex flex-col items-center text-red-600 lg:text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <IoIosArrowRoundBack size={25} />
              <span className="text-xs mt-1">بازگشت</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* دیو دوم - محتوای صفحه */}
      <div className="flex-3 w-full lg:w-5/ h-full p-4 lg:mt-7 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
