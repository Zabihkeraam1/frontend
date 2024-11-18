
import React, { useState, useEffect } from 'react';
import Category from '../Components/Hom/Category';
import axios from 'axios';
import Navbar from '../Components/Hom/Navbar';
import LinksHeader from '../Components/Hom/LinksHeader';
import HeroSection from '../Components/Hom/HeroSection';
import AmountOfThings from '../Components/Hom/AmountOfThings';
import CategoryAmount from '../Components/Hom/CategoryAmount';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  books: Book[];
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [reservedAmount,setReservedAmount]=useState([{}])
  const [reservedCount,setReservedCount]=useState(0);
  console.log('reservedBooks',reservedAmount)

  useEffect(() => {
    axios.get('http://localhost:8000/api/home').then((response) => {
      console.log('response',response);
      setCategories(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  return (
    <>
    
    <div className="container mx-auto flex flex-col gap-[80px]">
      <div>
        <Navbar reservedAmount={reservedAmount} reservedCount={reservedCount}/>
      </div>
      {/* <div>
        <LinksHeader/>
      </div> */}
      <div>
        <HeroSection/>
      </div>
      <div>
        <CategoryAmount/>
      </div>
         {/* Add a check here to avoid calling map on undefined */}
         {categories && (
        categories.map((category) => (
          <React.Fragment key={category.id}>
            <Category 
              categoryId={category.id} 
              category={category.name} 
              books={category.books} 
              setReservedAmount={setReservedAmount} 
              setReservedCount={setReservedCount} 
              reservedCount={reservedCount} 
            />
          </React.Fragment>
        ))
      )}
      <div>
        <AmountOfThings/>
      </div>
    </div>
    </>
  );
};

export default Home;

