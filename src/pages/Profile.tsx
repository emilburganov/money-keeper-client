import ProfileCard from "@/components/Profile/ProfileCard";
import Container from "@/components/UI/Container/Container";
import {Flex} from "@chakra-ui/react";
import {FC} from "react";

const Profile: FC = () => {
    return (
        <Container as={Flex} justify={"center"}>
            <ProfileCard/>
        </Container>
    );
};

export default Profile;