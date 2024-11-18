import { IoMdArrowRoundBack } from "react-icons/io"
import { IoCameraOutline } from "react-icons/io5"
import { TiArrowLeft } from "react-icons/ti"
import { Link, Outlet } from "react-router-dom"


const UserProfile = () => {
  return (
    <div className="flex justify-center items-center gap-4 bg-gray-300  w-full ">
      
        
        {/* <div className="w-[15%] min-h-fit bg-white flex flex-col justify-center items-center py-5">
            
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-20 h-20 rounded-full flex justify-center items-center border border-gray-300">
                    <div className="object-cover rounded-full h-full">

                    <img src="../../../public/3.jpg" alt="" className="rounded-full h-full w-full"/>
                    </div>
                    <span className="absolute -bottom-[6px] right-2 h-5 w-5  border-2 border-white rounded-full flex justify-center items-center bg-red-300">
                    <IoCameraOutline />
                    </span>
                </div>
                <h4 className="font-semibold font-sans">Musa Ahmadeyan</h4>
                <p className="text-gray-400">student</p>
            </div>
            <div className="flex flex-col justify-center items-end w-full px-4">

              <Link to={'edit-profile'} className="font-serif font-semibold flex  justify-center items-center">ویرایش پروفایل</Link>
              <Link to={'resrved-books'} className="font-serif font-semibold flex  justify-center items-center">کتاب های رزرو شده</Link>
              <Link to={'/'} className="font-serif font-semibold flex  justify-center items-center">برگشت <IoMdArrowRoundBack /></Link>
            </div>
        </div> */}
        <div className="w-full  min-h-fit bg-white ">
          <div className="h-10 border border-b-black">
            <ul className="flex justify-start items-center px-4 py-2 gap-7">
              <li>
                
              <Link to={'edit-profile'} className="font-serif font-semibold flex  justify-center items-center">ویرایش پروفایل</Link>
              </li>
              <li>
              <Link to={'resrved-books'} className="font-serif font-semibold flex  justify-center items-center">کتاب های رزرو شده</Link>
              </li>
              <li>
              <Link to={'/'} className="font-serif font-semibold flex  justify-center items-center">بازگشت</Link>
              </li>
            </ul>
          </div>
          <Outlet/>
          
        </div>
    </div>
  )
}

export default UserProfile
