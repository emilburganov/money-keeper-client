import {useAuthStore} from "@/entities/auth";
import {Box, Stack, Text, useColorMode} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface MobileNavigationProps {
  onToggle: () => void;
}

export const MobileNavigation = observer(
  ({ onToggle }: MobileNavigationProps) => {
    const { t } = useTranslation();
    const { isAuth, logout } = useAuthStore();
    const { colorMode } = useColorMode();

    const PRIVATE_NAV_ITEMS = [
      {
        label: t("header.navigation.categories"),
        to: "/categories",
      },
      {
        label: t("header.navigation.incomes"),
        to: "/incomes",
      },
      {
        label: t("header.navigation.expenses"),
        to: "/expenses",
      },
      {
        label: t("header.navigation.transfers"),
        to: "/transfers",
      },
      {
        label: t("header.navigation.accounts"),
        to: "/accounts",
      },
    ];

    return (
      <Stack
        fontSize="sm"
        bg={colorMode === "light" ? "gray.50" : "gray.700"}
        p={4}
        display={{ xl: "none" }}
      >
        <Stack spacing={0} onClick={onToggle}>
          {!isAuth && (
            <Stack spacing={0}>
              <Box
                as={Link}
                py={2}
                to="/login"
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Text
                  fontWeight={600}
                  color={colorMode === "light" ? "gray.600" : "gray.200"}
                >
                  {t("header.buttons.auth.login")}
                </Text>
              </Box>

              <Box
                as={Link}
                py={2}
                to="/registration"
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Text
                  fontWeight={600}
                  color={colorMode === "light" ? "gray.600" : "gray.200"}
                >
                  {t("header.buttons.auth.registration")}
                </Text>
              </Box>
            </Stack>
          )}

          {isAuth &&
            PRIVATE_NAV_ITEMS.map(({ label, to }) => (
              <Stack key={label} spacing={4} onClick={onToggle}>
                <Box
                  as={Link}
                  py={2}
                  to={to}
                  justifyContent="space-between"
                  alignItems="center"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Text
                    fontWeight={600}
                    color={colorMode === "light" ? "gray.600" : "gray.200"}
                  >
                    {label}
                  </Text>
                </Box>
              </Stack>
            ))}

          {isAuth && (
            <Stack>
              <Box
                onClick={logout}
                py={2}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Text
                  fontWeight={600}
                  color={colorMode === "light" ? "gray.600" : "gray.200"}
                >
                  {t("header.buttons.auth.logout")}
                </Text>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  },
);
