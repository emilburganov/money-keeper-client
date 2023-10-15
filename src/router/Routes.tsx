import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Hero from "@/pages/Hero";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile.jsx";

export const publicRoutes = [
    {path: "/", element: <Hero/>},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
];

export const privateRoutes = [
    {path: "/", element: <Home/>},
    {path: "/profile", element: <Profile/>},
];