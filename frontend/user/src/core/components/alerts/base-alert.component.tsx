import { HTMLProps } from "react";

export interface AlertProps extends HTMLProps<HTMLDivElement> {
  message: string;
}

export const BaseAlert = ({ message = "" }: AlertProps) => {
  return (
    <p className="m-4 p-4 rounded font-medium text-sm text-red-800 bg-red-200 animate-fade">
      {message}
    </p>
  );
};
