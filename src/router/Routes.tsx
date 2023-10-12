import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile.jsx";

export const publicRoutes = [
    {path: "/", element: <Home/>},
];

export const guestRoutes = [
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
];

export const authRoutes = [
    {path: "/profile", element: <Profile/>},
];