import { FaFacebookF, FaInstagram, FaTwitter, FaTelegramPlane, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-amber-100 text-gray-800 py-10 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Social Media Section */}
        <div dir="auto">
          <h3 className="text-2xl font-semibold mb-4 text-orange-700">ما را دنبال کنید</h3>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:scale-110 transition-all duration-300">
              <FaFacebookF className="text-2xl text-blue-600" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:scale-110 transition-all duration-300">
              <FaTelegramPlane className="text-2xl text-blue-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:scale-110 transition-all duration-300">
              <FaLinkedinIn className="text-2xl text-blue-700" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 hover:scale-110 transition-all duration-300">
              <FaInstagram className="text-2xl text-pink-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:scale-110 transition-all duration-300">
              <FaTwitter className="text-2xl text-blue-400" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div dir="auto">
          <h3 className="text-2xl font-semibold mb-4 text-orange-700">ارتباط با ما</h3>
          <p className="text-gray-700 leading-relaxed">
            آدرس: کابل، افغانستان
            <br />
            شماره تلفن: 00000000002
            <br />
            ایمیل: library@gmail.com
          </p>
        </div>

        {/* Quick Links Section */}
        <div dir="auto">
          <h3 className="text-2xl font-semibold mb-4 text-orange-700">لینک‌ها</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-orange-600 transition duration-300">
                خانه
              </a>
            </li>
            <li>
              <a href="#books" className="hover:text-orange-600 transition duration-300">
                کتاب‌ها
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-600 transition duration-300">
                تماس با ما
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-orange-600 transition duration-300">
                پرسش‌های متداول
              </a>
            </li>
          </ul>
        </div>

        {/* Logo and About Section */}
        <div dir="auto">
          <img
            src={'logo.png'}
            alt="Library Logo"
            className="h-20 w-auto mb-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          />
          <h3 className="text-2xl font-semibold mb-4 text-orange-700">درباره کتابخانه</h3>
          <p className="text-gray-700 leading-relaxed">
            خوش آمدید به کتابخانه ما. دانش یگانه راه شما به جهان است. ما بهترین کتاب‌ها و منابع را به شما پیشنهاد می‌کنیم.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div dir="auto" className="mt-10 text-center text-gray-500 border-t border-orange-200 pt-5">
        <p>&copy; 2024 کتابخانه پولی‌تخنیک کابل</p>
      </div>
    </footer>
  );
};

export default Footer;
