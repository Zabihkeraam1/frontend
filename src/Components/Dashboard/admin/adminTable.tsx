import { Trash } from "lucide-react"
import type React from "react"

interface Admin {
  id: number
  name: string
  email: string
}

interface AdminListProps {
  admins: Admin[]
  onDeleteAdmin: (id: number) => void
}

export const AdminTable: React.FC<AdminListProps> = ({ admins, onDeleteAdmin }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="">
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              نام
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ایمیل
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{admin.name}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{admin.email}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button onClick={() => onDeleteAdmin(admin.id)} className="text-red-600 hover:text-red-900 mr-2">
                  <Trash height={20} width={20}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

