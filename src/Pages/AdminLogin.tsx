
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useAdminAuthStore } from '../Store/useAdminAuthStore';

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  type: z.string()
});

type SignInFormData = z.infer<typeof signInSchema>;

const AdminLogin: React.FC = () => {
  const { setUser, token } = useAdminAuthStore();
  console.log("Admin login", token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const [response, setResponse] = useState<string>('');

  // const { isLoggedIn, token } = useAuthStore();

  // useEffect(() => {
  //   if (isLoggedIn && token) {
  //     console.log("User is logged in with token:", token);
  //     // You can make authenticated requests here
  //     // For example:
  //     axios.get('/api/protected-route', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then(response => {
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.error('Authentication failed:', error);
  //     });
  //   } else {
  //     console.log("User is not logged in.");
  //   }
  // }, [isLoggedIn, token]);

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    axios.post('http://localhost:8000/api/admin/login', data).then((response) => {
      if(response.status === 200) {
        const employee = response.data.employee?.type === 'employee';
        if(employee){
          const loggedInUser = { email: response.data.employee.email, status: response.data.
            employee.status, type: response.data.employee.type };
          const userToken = response.data.token;
          const userIsAdmin = true;
          const type = response.data.employee.type
          setUser(loggedInUser, userToken, userIsAdmin, type);
          setResponse(response.data.message);
          }
        else {
          const loggedInUser = { email: response.data.$assistant
            .email, status: response.data.
            $assistant
              .status, type: response.data.$assistant
              .type };
          const userToken = response.data.token;
          const userIsAdmin = true;
          const type = response.data.$assistant
          .type
          setUser(loggedInUser, userToken, userIsAdmin, type);
          setResponse(response.data.message);  
        }
       
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold my-12 text-center text-blue-600">ورود به حساب</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 border border-gray-300 shadow-md rounded-lg">
        
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
          <label
            htmlFor="email"
            className="login-label"
          >
            ایمیل آدرس
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="login-label"
          >
            رمز عبور
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col">
                        <label htmlFor="role" className="login-label">نقش شما</label>
                        <select {...register("type")} id="role" className="input rounded-md">
                            <option value="">نقش خود را انتخاب کنید</option>
                            <option value="assistant">Assistant</option>
                            <option value="employee">Employee</option>
                        </select>
                        {errors.type && <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>}
                    </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
        >
          ورود
        </button>
        {response && <p className="text-red-500 text-center mt-2">{response}</p>}
        <p className="text-center">
          قبلا حساب نداشته اید؟ <Link to="/user-registration" className="text-blue-500 hover:underline">ثبت نام</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
