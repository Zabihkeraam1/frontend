import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    { id: 1, text: ' کتاب‌هایی که باید پیش از ترک بخوانیم! ', bgColor: 'bg-red-600', image: 'public/images/1.jpg' },
    { id: 2, text: ' 50% تخفیف روی کتاب‌های صوتی!', bgColor: 'bg-blue-600', image: 'public/images/2.jpg' },
    { id: 3, text: ' دوره‌های رایگان برای دانشجویان!', bgColor: 'bg-green-600', image: 'public/images/5.jpg' },
  ];

  const intervalRef = useRef<number | null>(null);
  const typingIndexRef = useRef(0);

  // Function to type out text letter by letter
  const typeText = (text: string) => {
    setDisplayedText('');
    typingIndexRef.current = 0;

    clearInterval(intervalRef.current!);
    intervalRef.current = window.setInterval(() => {
      setDisplayedText((prev) => prev + (text[typingIndexRef.current] || ''));
      typingIndexRef.current += 1;

      if (typingIndexRef.current >= text.length) {
        clearInterval(intervalRef.current!);
      }
    }, 70); // Typing speed
  };

  // Update typing text on slide change
  useEffect(() => {
    typeText(slides[currentSlide].text);
  }, [currentSlide]);

  useEffect(() => {
    const autoSlide = window.setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(autoSlide);
  }, []);

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      <div className="relative w-full h-full flex transition-all duration-1000 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full flex transition-all duration-1000 ease-in-out transform ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index > currentSlide
                ? 'opacity-0 translate-x-full'
                : 'opacity-0 -translate-x-full'
            }`}
          >
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className={`w-1/2 h-full flex justify-center items-center text-center ${slide.bgColor}`}>
              <motion.h2
                className="text-white text-3xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1.5 }}
              >
                {displayedText}
              </motion.h2>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-30" disabled={isAnimating}>
        <FaChevronLeft />
      </button>
      <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-30" disabled={isAnimating}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default HeroSection;
