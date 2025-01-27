import type React from "react"
import { useState } from "react"
import axios from "../../../axiosInstance";
import { useAdminAuthStore } from "../../../Store/useAdminAuthStore";

interface AddAdminProps {
  onAddAdmin: (admin: { name: string; email: string; password: string; type: string }) => void
}

export const AddAdmin: React.FC<AddAdminProps> = ({ onAddAdmin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const token = useAdminAuthStore();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post("/api/dashboard/admin/account/new/create", {name, email, password, type}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    onAddAdmin({ name, email, password, type })
    setName("")
    setEmail("")
    setPassword("")
    setType("")
  }

  return (
    <div className="bg-white w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">افزودن ادمین</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            نام
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            ایمیل
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            پسورد
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="پسورد"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            نوعیت
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">انتخاب نوعیت ادمین</option>
            <option value="employee">کتابخانه</option>
            {/* <option value="Super Admin">معاونیت تحقیقات</option> */}
          </select>
        </div>
        </div>
        <div className="mt-7 mr-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            افزودن
          </button>
        </div>
      </form>
    </div>
  )
}

