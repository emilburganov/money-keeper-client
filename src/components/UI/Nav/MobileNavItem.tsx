import {Box, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {Link} from "react-router-dom";

interface MobileNavItemProps {
    label: string,
    href?: string,
    onClick?: void,
    onToggle: void,
}

const MobileNavItem = ({label, href, onClick, onToggle}: MobileNavItemProps) => {
    return (
        <Stack spacing={4} onClick={onToggle}>
            <Box
                onClick={onClick}
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