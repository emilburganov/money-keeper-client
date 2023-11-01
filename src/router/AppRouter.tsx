import useStores from "@/hooks/useStores";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Routes";

const AppRouter: FC = observer(() => {
    const {authStore} = useStores();

    if (authStore.isAuth) {
        return (
            <Routes>
                {privateRoutes.map((route) =>
                    <Route key={route.path} {...route}/>,
                )}
                <Route path="*" element={<Profile/>}/>
            </Routes>
        );
    }

    return (
        <Routes>
            {publicRoutes.map((route) =>
                <Route key={route.path} {...route}/>,
            )}
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
});

export default AppRouter;