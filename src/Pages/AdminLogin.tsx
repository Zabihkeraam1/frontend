import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../axiosInstance";
import { useState } from "react";
import { useAdminAuthStore } from "../Store/useAdminAuthStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  type: z.string(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const AdminLogin: React.FC = () => {
  const { setUser } = useAdminAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const [response, setResponse] = useState<string>("");

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    setLoading(true);
    axios
      .post("/api/admin/login", data)
      .then((response) => {
        if (response.status === 200) {
          const employee = response.data.employee?.type === "employee";
          console.log(response.data);
          setLoading(false);
          if (employee) {
            const loggedInUser = {
              email: response.data.employee.email,
              status: response.data.employee.status,
              type: response.data.employee.type,
            };
            const userToken = response.data.token;
            const userIsAdmin = true;
            const type = response.data.employee.type;
            const permission = response.data.employee.permission;
            setUser(loggedInUser, userToken, userIsAdmin, type, permission);
            setResponse(response.data.message);
          } else {
            const loggedInUser = {
              email: response.data.$assistant.email,
              status: response.data.$assistant.status,
              type: response.data.$assistant.type,
            };
            const userToken = response.data.token;
            const userIsAdmin = true;
            const type = response.data.$assistant.type;
            const permission = response.data.$assistant.permission;
            setUser(loggedInUser, userToken, userIsAdmin, type, permission);
            setResponse(response.data.message);
          }
          navigate("?tab=dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setResponse("نام کاربری یا رمز عبور اشتباه است");
      })
      .finally(() => {
        setLoading(false);
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
            {...register("email")}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
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
            type="password"
            {...register("password")}
            className={`peer w-full px-4 py-2 border-2 rounded-md focus:border-blue-500 outline-none transition-all ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder=" "
          />
          <label htmlFor="password" className="login-label">
            رمز عبور
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="login-label">
            نقش شما
          </label>
          <select {...register("type")} id="role" className="input rounded-md">
            <option value="">نقش خود را انتخاب کنید</option>
            <option value="employee">کتابخانه</option>
            <option value="assistant">معاونیت تحقیقات</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center text-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
        >
          {loading ? (
            <Loader size={25} className="animate-spin text-white" />
          ) : (
            "ورود"
          )}
        </button>
        {response && (
          <p className="text-red-500 text-center mt-2">{response}</p>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
