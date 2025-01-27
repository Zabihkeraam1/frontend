import React from "react";

interface Request {
  id: number;
  book: string;
  book_code: string;
  book_status: string;
  firstName: string;
  lastName: string;
  nic: string;
  nin: string;
  remain_book: number;
  section: string;
  shelf: number;
  total_book: number;
  user_status: string;
}

const RequestDetails: React.FC<{ request: Request; onClose: () => void }> = ({
  request,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto">
        <h2 className="text-3xl font-bold mb-4">مشخصات امانت</h2>
        <div className="overflow-y-auto max-h-96">
          <div className="space-y-2">
            <p>
              <strong>آی‌دی:</strong> {request.id}
            </p>
            <p>
              <strong>نام کتاب:</strong> {request.book}
            </p>
            <p>
              <strong>نویسنده:</strong> {request.firstName}
            </p>
            <p>
              <strong>کد نمبر کتاب:</strong> {request.book_code}
            </p>
            <p>
              <strong>حالت کتاب:</strong> {request.book_status}
            </p>
            <p>
              <strong>تعداد کل کتاب:</strong> {request.total_book}
            </p>
            <p>
              <strong>تعداد کتاب باقیمانده:</strong> {request.remain_book}
            </p>
            <p>
              <strong>بخش:</strong> {request.section}
            </p>
            <p>
              <strong>نمبر الماری:</strong> {request.shelf}
            </p>
            <p>
              <strong>نام امانت گیرنده:</strong> {request.firstName}
            </p>
            <p>
              <strong>تخلص امانت گیرنده:</strong> {request.lastName}
            </p>
            <p>
              <strong>نمبر تذکره:</strong> {request.nic}
            </p>
            <p>
              <strong>آی‌دی پوهنتون:</strong> {request.nin}
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

export default RequestDetails;
