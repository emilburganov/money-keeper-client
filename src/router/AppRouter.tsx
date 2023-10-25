import useStores from "@/hooks/useStores";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Routes";

const AppRouter: FC = observer(() => {
    const {authStore} = useStores();

    return (
        <Routes>
            {authStore.isAuth
                ?
                <>
                    {privateRoutes.map((route) =>
                        <Route
                            {...route}
                            key={route.path}
                        />,
                    )}
                    <Route path="*" element={<Profile/>}></Route>
                </>
                :
                <>
                    {publicRoutes.map((route) =>
                        <Route
                            {...route}
                            key={route.path}
                        />,
                    )}
                    <Route path="*" element={<Home/>}></Route>
                </>
            }
        </Routes>
    );
});

export default AppRouter;