import { createBrowserRouter } from "react-router";
import Home from '../pages/Home/Home'
import MainLayout from '../layouts/MainLayout'
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    
]);