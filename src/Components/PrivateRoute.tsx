import React from 'react'
import { Outlet } from 'react-router';
import AdminLogin from '../Pages/AdminLogin';
import { useAdminAuthStore } from '../store/useAdminAuthStore';

const PrivateRoute:React.FC = () => {
    const { type } = useAdminAuthStore();
  const isAdmin = type === 'employee';
  console.log("type", type);
  return (
        isAdmin ? <Outlet/> : <AdminLogin/>
  )
}
export default PrivateRoute;