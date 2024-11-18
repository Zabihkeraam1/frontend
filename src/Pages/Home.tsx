import React, { useState, useEffect } from 'react';
import Category from '../Components/Hom/Category';
import axios from 'axios';
import Navbar from '../Components/Hom/navbar/Navbar';
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
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    axios.get('http://localhost:8000/api/home')
      .then((response) => {
        setCategories(response.data.categories_with_books);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);



  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col gap-[80px] w-full bg-orange-50">
          <div>
            <Navbar  /> {/* Pass setSearchQuery to Navbar */}
          </div>
          <div className="mt-3">
            <HeroSection />
          </div>
          <div>
            <CategoryAmount />
          </div>

        

          {/* Display categories */}
          {categories.map((category) => (
            <Category
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
            />
          ))}
          <div>
            <AmountOfThings />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
