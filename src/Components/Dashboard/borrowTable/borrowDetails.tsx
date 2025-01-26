import React from "react";

interface Request {
  id: number;
  title: string;
  author: string;
  publisher: string;
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
              <strong>نام:</strong> {request.title}
            </p>
            <p>
              <strong>تخلص:</strong> {request.author}
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
