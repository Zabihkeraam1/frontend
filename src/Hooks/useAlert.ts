
import Swal, { SweetAlertOptions } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type AlertOptions = SweetAlertOptions;

const useAlert = () => {
  const showAlert = (options: AlertOptions) => {
    Swal.fire({
      ...options,
      customClass: {
        popup: 'bg-white rounded-lg shadow-md p-4',
        title: 'text-2xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600',
      },
      buttonsStyling: false,
    });
  };

  return { showAlert };
};

export default useAlert;

// usage


// import React, { useState } from 'react';
// import axios from 'axios';
// import useAlert from './hooks/useAlert'; // Adjust the path as necessary

// const MyComponent: React.FC = () => {
//   const { showAlert } = useAlert();
//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('/api/data'); // Replace with your API endpoint
//       setData(response.data);
//       showAlert({
//         title: 'Success!',
//         text: 'Data fetched successfully.',
//         icon: 'success',
//         confirmButtonText: 'Cool',
//       });
//     } catch (error) {
//       showAlert({
//         title: 'Error',
//         text: 'Failed to fetch data.',
//         icon: 'error',
//         confirmButtonText: 'Okay',
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded">
//         Fetch Data
//       </button>
//       {data && (
//         <div className="mt-4">
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyComponent;
