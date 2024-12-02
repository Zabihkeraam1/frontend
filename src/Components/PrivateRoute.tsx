import React from 'react'
import { Outlet } from 'react-router';
import AdminLogin from '../Pages/AdminLogin';
import { useAdminAuthStore } from '../Store/useAdminAuthStore';

const PrivateRoute:React.FC = () => {
  const { type } = useAdminAuthStore();
  const isAdmin = type === 'assistant' || type === 'employee';
  return (
        isAdmin ? <Outlet/> : <AdminLogin/>
  )
}
export default PrivateRoute;