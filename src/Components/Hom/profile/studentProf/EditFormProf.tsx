import React, { useState } from "react";
import { IoCameraOutline, IoPersonOutline, IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

const EditForm: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>("../../../public/3.jpg");

  // هندل انتخاب تصویر
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col mt-5 items-center justify-center min-h-screen bg-orange-50 py-4">
      {/* فرم اصلی */}
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
        dir="rtl"
      >
        {/* بخش تصویر */}
        <div className="flex justify-center mb-7 relative">
          <div
            className="relative w-28 h-28 rounded-full flex justify-center items-center border-4 border-gradient-to-r from-purple-500 to-indigo-500 shadow-2xl"
          >
            {/* نمایش تصویر انتخاب شده */}
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full h-full w-full object-cover hover:opacity-90 transition-opacity duration-300"
            />

            {/* آیکون دوربین برای آپلود */}
            <label
              htmlFor="imageUpload"
              className="absolute bottom-1 right-1 h-10 w-10 bg-gradient-to-r from-pink-400 to-purple-500 border-2 border-white rounded-full flex justify-center items-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform duration-200"
            >
              <IoCameraOutline className="text-white text-2xl" />
            </label>

            {/* ورودی فایل */}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* عنوان فرم */}
        <h2 className="mb-7 text-4xl font-extrabold text-center text-gray-700 animate-fade-in">
          ویرایش پروفایل
        </h2>

        {/* فرم */}
        <form className="grid grid-cols-2 gap-4">
          {/* فیلدهای ورودی */}
          {[
            { id: "first-name", label: "نام", icon: <IoPersonOutline /> },
            { id: "last-name", label: "تخلص", icon: <IoPersonOutline /> },
            { id: "email", label: "ایمیل", type: "email", icon: <IoMailOutline /> },
            { id: "password", label: "پسورد", type: "password", icon: <IoLockClosedOutline /> },
          ].map(({ id, label, type = "text", icon }) => (
            <div
              key={id}
              className="relative col-span-2 md:col-span-1 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-3 right-3 text-gray-400 text-xl">{icon}</div>
              <input
                type={type}
                id={id}
                className="block w-full pr-10 py-3 text-base text-gray-800 bg-transparent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 peer"
                placeholder=" "
              />
              <label
                htmlFor={id}
                className="absolute mr-3 text-base text-gray-600 duration-300 transform -translate-y-4 scale-75 top-3 right-12 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
              >
                {label}
              </label>
            </div>
          ))}
        </form>

        {/* دکمه ثبت */}
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="w-full md:w-1/2 px-5 py-3 font-medium text-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
