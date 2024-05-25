import { LoginSchema } from "@/entities/auth";
import { LoginButton } from "@/features/(auth)";
import { LoginCredentials } from "@/shared/api/auth";
import { HideButton } from "@/shared/ui/(button)/hide-input-button";
import { LinkButton } from "@/shared/ui/(button)/link-button";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(LoginSchema),
  });

  return (
    <Box
      as="form"
      rounded="lg"
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      boxShadow="lg"
      p={5}
    >
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>{t("pages.login.form.fields.email")}:</FormLabel>
          <Input
            {...register("email")}
            type="text"
            placeholder="Example@gmail.com"
            focusBorderColor={colorMode === "light" ? "green.500" : "green.200"}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password?.message}>
          <FormLabel>{t("pages.login.form.fields.password")}:</FormLabel>
          <InputGroup>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              focusBorderColor={
                colorMode === "light" ? "green.500" : "green.200"
              }
            />
            <InputRightElement h="full">
              <HideButton show={showPassword} setShow={setShowPassword} />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Stack spacing={10} pt={2}>
          <LoginButton handleSubmit={handleSubmit} />
        </Stack>
        <Flex pt={6} align="center" wrap="wrap" gap={1}>
          <Text>{t("pages.login.form.redirect")}</Text>
          <LinkButton as={Link} to="/registration">
            {t("pages.registration.form.button")}
          </LinkButton>
        </Flex>
      </Stack>
    </Box>
  );
};
