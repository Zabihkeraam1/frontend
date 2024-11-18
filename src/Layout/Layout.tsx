import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Hom/navbar/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
// import DashNavbar from "../Components/Dashboard/DashNavbar";

export default function Layout() {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/dashboard')) {
      setIsDashboard(true); 
    } else {
      setIsDashboard(false);
    }
  }, [location.pathname]);

  return (
    <>
      {
        isDashboard ? (
          <div>
            <Outlet />
          </div>
        ) : (
          <div >
            <Navbar />
            <Outlet/>
            <Footer />
          </div>
        )
      }
    </>
  );
}
