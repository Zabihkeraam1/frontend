import React from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  current_residence: string;
  original_residence: string;
  phone: string;
  type: string;
  department: string;
  faculty: string;
  nic: string;
  nin: string;
}

const UserDetails: React.FC<{ user: User; onClose: () => void }> = ({
  user,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto">
        <h2 className="text-3xl font-bold mb-4">مشخصات کاربر</h2>
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-2">
            <p>
              <strong>آی‌دی:</strong> {user.id}
            </p>
            <p>
              <strong>نام:</strong> {user.firstName}
            </p>
            <p>
              <strong>تخلص:</strong> {user.lastName}
            </p>
            <p>
              <strong>ایمیل:</strong> {user.email}
            </p>
            <p>
              <strong>سکونت فعلی:</strong> {user.current_residence}
            </p>
            <p>
              <strong>سکونت قبلی:</strong> {user.original_residence}
            </p>
            <p>
              <strong>نوعیت حساب:</strong> {user.type}
            </p>
            <p>
              <strong>پوهنځی:</strong> {user.faculty}
            </p>
            <p>
              <strong>دیپارتمنت:</strong> {user.department}
            </p>
            <p>
              <strong>نمبر تذکره:</strong> {user.nic}
            </p>
            <p>
              <strong>آی‌دی پوهنتون:</strong> {user.nin}
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

export default UserDetails;
