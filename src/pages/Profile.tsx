import Button from "@/components/UI/Button/Button";
import {useStores} from "@/hooks/useStores";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Profile = observer(() => {
    const {authStore} = useStores();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);

    const logout = async (): Promise<void> => {
        setLoading(true);
        await authStore.logout();
        navigate("/login");
        setLoading(false);
    };

    const getUser = async (): Promise<void> => {
        await authStore.me();
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <p>{JSON.stringify(authStore.user, null, 2)}</p>
            <Button isLoading={isLoading} onClick={logout}>
                Logout
            </Button>
        </div>
    );
});

export default Profile;