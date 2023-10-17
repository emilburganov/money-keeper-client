import SocialButton from "@/components/UI/Button/SocialButton";
import Logo from "@/components/UI/Logo/Logo";
import {Box, Flex, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";


const Footer = () => {


    return (
        <Box
            borderTop={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
        >
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{base: 4, md: 2}}
                px={{base: 4}}

                direction={{base: "column", md: "row"}}
                spacing={4}
                justify={{base: "center", md: "space-between"}}
                align={{base: "center", md: "center"}}
                maxW={"container.xl"}
                margin={"auto"}
                gap={4}
            >
                <Logo/>
                <Text align={"center"}>
                    © 2023 MoneyKeeper. All rights reserved
                </Text>
                <Stack direction={"row"} spacing={6}>
                    <SocialButton label={"Twitter"} href={"#"}>
                        <FaTwitter/>
                    </SocialButton>
                    <SocialButton label={"YouTube"} href={"#"}>
                        <FaYoutube/>
                    </SocialButton>
                    <SocialButton label={"Instagram"} href={"#"}>
                        <FaInstagram/>
                    </SocialButton>
                </Stack>
            </Flex>
        </Box>
    );
};

export default Footer;