import { createBrowserRouter } from "react-router-dom";
import UserRegistration from "../Pages/UserRegistration";
import Layout from "../Layout/Layout";
import Home from '../Pages/Home';
import Login from "../Pages/Login";
import OnlyAdminPrivateRoute from "../Components/OnlyAdminPrivateRoute";
import PrivateRoute from "../Components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import UserProfile from "../Components/Hom/profile/studebtProf/UserProfile";
import EditForm from "../Components/Hom/profile/studebtProf/EditFormProf";
import ReservedBooks from "../Components/Hom/profile/studebtProf/ReservedBooks";
import PDFViewer from "../Components/pdf/PDFViewer";
import AdminLogin from "../Pages/AdminLogin";

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
                path:"/profile",
                element:<UserProfile/>,
                children:[
                    {
                        
                        path:'edit-profile',
                        element:<EditForm/>
                    },
                    {
                        path:'resrved-books',
                        element:<ReservedBooks/>
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
        path: '/admin-login',
        element: <AdminLogin/>
    },
    {
        path:'/pdf',
        element:<PDFViewer fileUrl={"public/2.pdf"} />
    }
]);

