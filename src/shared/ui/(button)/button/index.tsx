import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;

  [props: string]: unknown;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraButton w="fit-content" size="md" colorScheme="green" {...props}>
      {children}
    </ChakraButton>
  );
};
