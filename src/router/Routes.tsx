import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from '@/pages/Home.jsx';
import Profile from '@/pages/Profile.jsx';

export const publicRoutes = [
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
]

export const privateRoutes = [
    {path: '/profile', element: <Profile/>},
]