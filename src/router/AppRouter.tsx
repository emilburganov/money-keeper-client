import {useStores} from "@/hooks/useStores";
import Home from "@/pages/Home";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {authRoutes, guestRoutes, publicRoutes} from "./Routes";

const AppRouter: FC = observer(() => {
    const {authStore} = useStores();

    return (
        <Routes>
            {authStore.isAuth
                ?
                authRoutes.map((route) =>
                    <Route
                        {...route}
                        key={route.path}
                    />,
                )
                :
                guestRoutes.map((route) =>
                    <Route
                        {...route}
                        key={route.path}
                    />,
                )
            }
            {publicRoutes.map((route) =>
                <Route
                    {...route}
                    key={route.path}
                />,
            )}
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
});

export default AppRouter;