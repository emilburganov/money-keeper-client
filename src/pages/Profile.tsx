import {Context} from "@/main";
import {Button} from "@chakra-ui/react";
import {useContext} from "react";

const Profile = () => {
    const {store} = useContext(Context);

    const logout = async() => {
        await store.logout();
    }

    return (
        <div>
            Profile
            <Button onClick={logout}>
                Logout
            </Button>
        </div>
    );
};

export default Profile;