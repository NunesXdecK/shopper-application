import { AlertProps, BaseAlert } from "./base-alert.component";

export const ErrorAlert = ({ message = "", ...props }: AlertProps) => {
  return <BaseAlert {...props} message={message} />;
};
