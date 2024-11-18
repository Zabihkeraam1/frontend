// import React, { useState } from 'react';

// interface EditModalProps {
//     item: any;
//     closeModal: () => void;
//     onSave: (updatedItem: string) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ item, closeModal, onSave }) => {
//     const [editedItem, setEditedItem] = useState({ ...item });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
//     };

//     const handleSave = () => {
//         onSave(editedItem);
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-4 rounded-lg w-96">
//                 <h2 className="text-xl mb-4">ویرایش اطلاعات</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     value={editedItem.title}
//                     onChange={handleChange}
//                     className="w-full p-2 mb-4 border"
//                 />
//                 <input
//                     type="text"
//                     name="author"
//                     value={editedItem.author}
//                     onChange={handleChange}
//                     className="w-full p-2 mb-4 border"
//                 />
//                 <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded-lg mr-2">ذخیره</button>
//                 <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded-lg">لغو</button>
//             </div>
//         </div>
//     );
// };

// export default EditModal;


type EditModalProps<T> = {
  selectedRow: T;
  closeModal: () => void;
};

const EditModal = <T,>({ selectedRow, closeModal }: EditModalProps<T>) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
      <p>Edit form content goes here for the selected row.</p>
      <button onClick={closeModal} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Save
      </button>
      <button onClick={closeModal} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded">
        Cancel
      </button>
    </div>
  </div>
);

export default EditModal;
