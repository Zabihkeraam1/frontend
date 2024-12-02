import React, { ReactNode } from 'react';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  children: ReactNode;
}

const PdfModal: React.FC<ModalProps> = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl relative">
        {/* دکمه بستن */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {/* محتوای مودال */}
        <div className="overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

export default PdfModal;
