import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // ایمپورت SweetAlert
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // ایمپورت آیکون‌ها

const signInSchema = z.object({
  email: z.string().min(1, 'ایمیل الزامی است').email('فرمت ایمیل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const Login: React.FC = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // مدیریت نمایش رمز عبور
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data: SignInFormData) => {
    axios
      .post('http://localhost:8000/api/login', data)
      .then((response) => {
        if (response.status === 200) {
          const loggedInUser = {
            email: response.data.user.email,
            status: response.data.user.status,
            type: response.data.user.type,
          };
          const userToken = response.data.token;
          const isLoggedIn = true;

          setUser(loggedInUser, userToken, isLoggedIn);

          Swal.fire({
            title: 'ورود موفق!',
            text: response.data.message,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: 'center',
            showConfirmButton: false,
          });

          navigate('/');
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || 'خطا در اتصال به سرور';

        Swal.fire({
          title: 'ورود ناموفق!',
          text: errorMessage,
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          position: 'center',
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold my-12 text-center text-blue-600">
        ورود به حساب
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 border border-gray-300 shadow-md rounded-lg"
      >
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
          />
          <label htmlFor="email" className="login-label">
            ایمیل آدرس
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'} // تغییر نوع ورودی
            {...register('password')}
            className={`peer w-full px-4 py-2 pr-10 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
          />
          <label htmlFor="password" className="login-label">
            رمز عبور
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
        >
          ورود
        </button>
        <p className="text-center">
          قبلا حساب نداشته اید؟{' '}
          <Link to="/user-registration" className="text-blue-500 hover:underline">
            ثبت نام
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
