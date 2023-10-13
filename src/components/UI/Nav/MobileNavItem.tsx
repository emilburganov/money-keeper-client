import {NavItem} from "@/components/UI/Nav/DesktopNav";
import {Box, Stack, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const MobileNavItem = ({label, href}: NavItem) => {
    const {onToggle} = useDisclosure();

    return (
        <Stack spacing={4} onClick={onToggle}>
            <Box
                py={2}
                as={Link}
                to={href}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
                    {label}
                </Text>
            </Box>
        </Stack>
    );
};

export default MobileNavItem;