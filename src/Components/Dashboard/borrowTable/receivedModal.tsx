import type React from "react";
import { XIcon } from "lucide-react";

interface ReceivedModalProps {
  closeModal: () => void
  onSubmit: () => void
}

const ReceivedModal: React.FC<ReceivedModalProps> = ({ closeModal, onSubmit }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit();
    closeModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      dir="rtl"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">تایید بازگشت کتاب</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex justify-start space-x-4 space-x-reverse">
            <button
              type="submit"
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              تایید دریافت 
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReceivedModal;

