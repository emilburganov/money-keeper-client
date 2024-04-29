import { Button as ChakraButton } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";

interface HideButtonProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const HideButton = ({ show, setShow }: HideButtonProps) => {
  return (
    <ChakraButton
      onClick={() => setShow(show => !show)}
      variant="ghost"
      _hover={{
        bg: "transparent",
      }}
    >
      {show ? <ViewIcon /> : <ViewOffIcon />}
    </ChakraButton>
  );
};
