import { createBrowserRouter, Navigate } from "react-router-dom";
import UserRegisteration from "../Pages/UserRegistration";
import Layout from "../Layout/Layout";
import Home from '../Pages/Home';
import Login from "../Pages/Login";
import OnlyAdminPrivateRoute from "../Components/OnlyAdminPrivateRoute";
import PrivateRoute from "../Components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import UserProfile from "../Components/Hom/profile/studentProf/UserProfile";
import EditForm from "../Components/Hom/profile/studentProf/EditFormProf";
import ReservedBooks from "../Components/Hom/profile/studentProf/ReservedBooks";
import PDFViewer from "../Components/pdf/PDFViewer";
import Contact from "../Components/Hom/contactUs/ContactUs";
import AboutUs from "../Components/Hom/aboutUs/AboutUs";
import UserRegistration from "../Pages/UserRegistration";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'about-us',
                element: <AboutUs/>
            },
            {
                path: "/profile",
                element: <UserProfile/>,
                children: [
                    // روت پیش‌فرض که به کتاب‌های رزرو شده هدایت می‌کند
                    {
                        index: true,
                        element: <Navigate to="reserved-books" replace />
                    },
                    {
                        path: 'edit-profile',
                        element: <EditForm/>
                    },
                    {
                        path: 'reserved-books',
                        element: <ReservedBooks/>
                    }
                ]
            },
            {
                element: <PrivateRoute/>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard/>
                    }
                ]
            },
            {
                element: <OnlyAdminPrivateRoute/>,
                children: [
                    {
                        path: '/user-registration',
                        element: <UserRegistration/>
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <UserRegisteration/>
    },
    {
        path: '/pdf',
        element: <PDFViewer fileUrl={"public/2.pdf"} />
    }
]);

