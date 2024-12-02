import React, { useState, useEffect } from 'react';
import Category from '../Components/Hom/Category';
import axios from 'axios';
import Navbar from '../Components/Hom/navbar/Navbar';
import HeroSection from '../Components/Hom/HeroSection';
import AmountOfThings from '../Components/Hom/AmountOfThings';
import CategoryAmount from '../Components/Hom/CategoryAmount';
import { HashLoader } from 'react-spinners';
import { useSearchStore } from '../Store/searchStore';
import { div } from 'framer-motion/client';

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
  const [loading, setLoading] = useState<boolean>(true);
 

  const searchQuery = useSearchStore((state) => state.searchQuery);
  console.log(searchQuery)

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

  const filteredCategories = categories.filter((category) =>
    category.books.some((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#3498db" size={60} />
        </div>
      ) : (
        <div className="container mx-auto flex flex-col gap-10 w-full bg-orange-50 rounded-lg shadow-lg">
          <div>
            <Navbar />
          </div>
          <div className="mt-3">
            <HeroSection />
          </div>
          {searchQuery && (
            <div>
              {filteredCategories.map((category) => (
                <div key={category.id} className='flex flex-col justify-center items-center w-full'>
                  <p className='font-bold text-2xl'>Search Result</p>
                  
                  {category.books
                    .filter((book) =>
                      book.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((book) => (
                      
                      <Category
                        key={category.id}
                        categoryId={category.id}
                        categoryName={category.name}
                      />
                    ))}
                </div>
              ))}
            </div>
          )}
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
