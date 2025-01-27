import type React from "react"
import { useState } from "react"
import { AddAdmin } from "./addAdmin"
import { AdminTable } from "./adminTable"

interface Admin {
  id: number
  name: string
  email: string
  role: string
}

const Admin: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Super Admin" },
  ])

  const handleAddAdmin = (newAdmin: { name: string; email: string; role: string }) => {
    const admin: Admin = {
      ...newAdmin,
      id: admins.length + 1,
    }
    setAdmins([...admins, admin])
  }

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="w-full">
          <AddAdmin onAddAdmin={handleAddAdmin} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">لیست ادمین</h2>
          <AdminTable admins={admins} onDeleteAdmin={handleDeleteAdmin} />
        </div>
      </div>
    </div>
  )
}
export default Admin;
