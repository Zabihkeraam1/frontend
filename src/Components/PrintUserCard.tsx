import { useRef } from 'react';

interface Props {
  name: string;
  lastName: string;
  image: File;
  id: number;
  role: string;
  showModal: boolean;
  setShowModal: boolean;
}

const PrintUserCard = ({ showModal, setShowModal, name, lastName, image, id, role }: Props) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  if (!showModal) return null;

  const handlePrint = () => {
    const printContent = componentRef.current;
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Library Card</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                h1 {
                  color: #333;
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-3/4 lg:w-2/3 xl:w-1/2">
      <h1>Library Card</h1>
      <div ref={componentRef}>
        <div>
          <h1>{name}</h1>
          <h1>{lastName}</h1>
          <h1>{id}</h1>
          <h1>{role}</h1>
          <img src={URL.createObjectURL(image)} alt={`${name}'s profile`} />
        </div>
      </div>
      <button onClick={handlePrint}>Print this card</button>
      <button onClick={()=> setShowModal(false)}></button>
    </div>
    </div>
  );
};

export default PrintUserCard;
