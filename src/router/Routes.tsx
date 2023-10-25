import Login from "@/pages/Auth/Login";
import Registration from "@/pages/Auth/Registration";
import Categories from "@/pages/Categories";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile.jsx";

export const publicRoutes = [
    {path: "/", element: <Home/>},
    {path: "/login", element: <Login/>},
    {path: "/registration", element: <Registration/>},
];

export const privateRoutes = [
    {path: "/profile", element: <Profile/>},
    {path: "/categories", element: <Categories/>},
];