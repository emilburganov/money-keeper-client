import {Box, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {MouseEventHandler} from "react";
import {Link, To} from "react-router-dom";

interface MobileNavItemProps {
    label: string;
    to?: To;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onToggle: () => void;
}

const MobileNavItem = ({label, to, onClick, onToggle}: MobileNavItemProps) => {
    return (
        <Stack spacing={4} onClick={onToggle}>
            <Box
                onClick={onClick}
                py={2}
                as={Link}
                to={to}
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