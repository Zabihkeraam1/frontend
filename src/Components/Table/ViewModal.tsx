// import React from 'react';

// interface ViewModalProps {
//     item: any;
//     closeModal: () => void;
// }

// const ViewModal: React.FC<ViewModalProps> = ({ item, closeModal }) => {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-4 rounded-lg w-96">
//                 <h2 className="text-xl mb-4">مشاهده اطلاعات</h2>
//                 <p><strong>عنوان:</strong> {item.title}</p>
//                 <p><strong>نویسنده:</strong> {item.author}</p>
//                 <p><strong>وضعیت:</strong> {item.status}</p>
//                 <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded-lg mt-4">بستن</button>
//             </div>
//         </div>
//     );
// };

// export default ViewModal;



type ViewModalProps<T> = {
  selectedRow: T;
  closeModal: () => void;
};

const ViewModal = <T,>({ selectedRow, closeModal }: ViewModalProps<T>) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">View Details</h2>
      <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(selectedRow, null, 2)}</pre>
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Close
      </button>
    </div>
  </div>
);

export default ViewModal;
