
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-8 md:mb-5 sm:mb-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Social Media Section */}
        <div dir="auto">
          <h3 className="text-xl font-bold mb-4">ما را دنبال کنید </h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i> فسیوک
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i> تیویتر
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i> انستاگرام
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div dir="auto">
          <h3 className="text-xl font-bold mb-4">ارتباط با ما</h3>
          <p className="text-gray-400">
            آدرس: کابل افغانستان
            <br />
            شماره تلفون:00000000002
            <br />
            ایمیل: library@gmail.com
          </p>
        </div>
        {/* Quick Links Section */}
        <div dir="auto">
          <h3 className="text-xl font-bold mb-4">لینک ها</h3>
          <ul className="text-gray-400">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#books" className="hover:text-white">
                Books
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Logo and About Section */}
        <div dir="auto">
          <img
            src={'logo.png'}
            alt="Library Logo"
            className="h-16 md:h-20 lg:h-24 mb-4 object-contain"
          />
          <h3 className="text-xl font-bold mb-4">در باره این کتاب خانه</h3>
          <p className="text-gray-400">
            خوش آمدید یه کتاب خانه ما دانش یگانه راه شما با جهان است. ما برای
            شما بهترین کتاب ها و منابع را پشنهاد می کنیم
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div dir="auto" className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 کتابخانه پولی تخنیک کابل</p>
      </div>
    </footer>
  );
};

export default Footer;
