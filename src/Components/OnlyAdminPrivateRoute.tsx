import React from "react";
import { Outlet } from "react-router";

const OnlyAdminPrivateRoute: React.FC = () => {
  return (
            <Outlet/>
  )
}
export default OnlyAdminPrivateRoute;