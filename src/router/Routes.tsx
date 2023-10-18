import Login from "@/pages/Auth/Login";
import Registration from "@/pages/Auth/Registration";
import Categories from "@/pages/Categories";
import Hero from "@/pages/Hero";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile.jsx";

export const publicRoutes = [
    {path: "/", element: <Hero/>},
    {path: "/login", element: <Login/>},
    {path: "/registration", element: <Registration/>},
];

export const privateRoutes = [
    {path: "/", element: <Home/>},
    {path: "/profile", element: <Profile/>},
    {path: "/categories", element: <Categories/>},
];