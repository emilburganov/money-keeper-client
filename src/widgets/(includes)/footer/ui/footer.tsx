import { SocialNetworkButton } from "@/shared/ui/(button)/social-network-button";
import { Logo } from "@/shared/ui/(logo)/logo";
import { Box, Flex, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  return (
    <Box
      borderTop={1}
      borderStyle="solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.900"}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
    >
      <Flex
        bg={colorMode === "light" ? "gray.50" : "gray.700"}
        color={colorMode === "light" ? "gray.600" : "gray.50"}
        minH="60px"
        p={4}
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
        maxW="container.xl"
        margin="auto"
        gap={4}
      >
        <Logo />
        <Text fontWeight={500} fontSize="sm" align="center">
          {t("footer.copyright")}
        </Text>
        <Stack direction="row" spacing={6}>
          <SocialNetworkButton label="Twitter" href="#">
            <FaTwitter />
          </SocialNetworkButton>
          <SocialNetworkButton label="YouTube" href="#">
            <FaYoutube />
          </SocialNetworkButton>
          <SocialNetworkButton label="Instagram" href="#">
            <FaInstagram />
          </SocialNetworkButton>
        </Stack>
      </Flex>
    </Box>
  );
};
