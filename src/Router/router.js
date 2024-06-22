// router.js
import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateJob from "../Pages/CreateJob";
import Home from "../Pages/home";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from '../components/firebase/ProtectedRoutes';
import { AuthProvider } from '../components/firebase/AuthContex';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider><App /></AuthProvider>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post-job", element: <PrivateRoute element={CreateJob} /> },
            { path: "/my-job", element: <PrivateRoute element={MyJobs} /> },
            { path: "/salary", element: <PrivateRoute element={SalaryPage} /> },
            { path: "/edit-job/:id", 
              element: <PrivateRoute element={UpdateJob} />, 
              loader: ({ params }) => fetch(`http://localhost:5000/all-jobs/${params.id}`) 
            },
        ]
    },
    {
        path: "/login",
        element: <AuthProvider><Login /></AuthProvider>
    },
    {
        path: "/signup",
        element: <AuthProvider><Register /></AuthProvider>
    }
]);

export default router;
