import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    { id: 1, text: 'کتاب‌هایی که باید پیش از ترک بخوانیم!', bgColor: 'bg-red-600' },
    { id: 2, text: '50% تخفیف روی کتاب‌های صوتی!', bgColor: 'bg-blue-600' },
    { id: 3, text: 'دوره‌های رایگان برای دانشجویان!', bgColor: 'bg-green-600' },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Slide change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle previous slide click
  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    }
  };

  // Handle next slide click
  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }
  };

  // Reset animation state after animation ends
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Wait for animation duration

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center transition-all duration-1000 ease-in-out">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full flex justify-center items-center text-center transition-all duration-1000 ease-in-out transform ${
              index === currentSlide
                ? 'opacity-100 translate-x-0' // Active slide
                : index > currentSlide
                ? 'opacity-0 translate-x-full' // Right slide out
                : 'opacity-0 -translate-x-full' // Left slide out
            } ${slide.bgColor}`}
          >
            <h2 className="text-white text-3xl font-bold">{slide.text}</h2>
          </div>
        ))}
      </div>

      {/* Left and Right buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-30"
        disabled={isAnimating} // Disable button during animation
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-30"
        disabled={isAnimating} // Disable button during animation
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default HeroSection;
