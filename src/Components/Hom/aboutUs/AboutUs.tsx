import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100">
      {/* Hero Image */}
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?library,books')", // Replace with your library image URL
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">درباره ما</h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">کتابخانه دیجیتال ما</h2>
        <p className="text-lg text-gray-700 leading-8 text-justify">
          کتابخانه دیجیتال ما مکانی برای دسترسی آسان به مجموعه‌ای گسترده از کتاب‌های علمی، ادبی، هنری و تاریخی است.
          هدف اصلی ما فراهم آوردن منابع غنی برای علاقه‌مندان به دانش و تحقیق است. با این کتابخانه، شما به‌سادگی می‌توانید
          از هر نقطه از جهان به کتاب‌های مورد علاقه‌تان دسترسی داشته باشید و آن‌ها را به صورت آنلاین مطالعه کنید.
        </p>
        <p className="text-lg text-gray-700 leading-8 text-justify mt-4">
          کتابخانه دیجیتال ما با استفاده از جدیدترین تکنولوژی‌های دیجیتال ساخته شده است تا بتواند تجربه‌ای بی‌نظیر و کاربرپسند
          را برای شما فراهم کند. ما در تلاش هستیم تا مجموعه‌ای متنوع و به‌روز از کتاب‌ها و منابع مختلف را گردآوری کرده و
          همیشه به‌روز نگه داریم. همچنین، شما می‌توانید از خدمات عضویت ما برای دسترسی بیشتر به کتاب‌ها و مقالات علمی استفاده کنید.
        </p>
        <p className="text-lg text-gray-700 leading-8 text-justify mt-4">
          تیم ما متشکل از متخصصان و کتابداران باتجربه است که با عشق و علاقه به کتاب‌ها و منابع علمی، این کتابخانه را به بهترین نحو
          ممکن مدیریت می‌کنند و همواره در تلاش‌اند تا به جامعه علمی و علاقه‌مندان به مطالعه کمک کنند.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
