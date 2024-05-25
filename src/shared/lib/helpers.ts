import { ErrorsResponse } from "@/shared/api";
import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

const { toast } = createStandaloneToast();

/**
 * Helper for displaying success notification
 * @param title
 * @param description
 */
export const sendSuccessNotification = (
  title: string,
  description?: string,
) => {
  toast({
    title: title,
    description: description,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom-left",
  });
};

/**
 * Helper for displaying error notification
 * @param title
 * @param description
 */
export const sendErrorNotification = (title: string, description?: string) => {
  toast({
    title: title,
    description: description,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-left",
  });
};

/**
 * Helper for displaying errors from axios request
 * @param axiosError
 */
export const sendValidationErrors = (
  axiosError: AxiosError<ErrorsResponse>,
) => {
  const message: string = String(axiosError?.response?.data?.message);
  const errors: string[] | undefined = axiosError.response?.data?.errors;

  if (errors) {
    Object.values(errors).forEach(error => {
      if (Array.isArray(error)) {
        sendErrorNotification(message, error[0]);
      } else {
        sendErrorNotification(message, error);
      }
    });
  } else {
    sendErrorNotification(message);
  }
};
