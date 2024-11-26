import { ReactNode } from "react";

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, className, ...props }: FormProps) => (
  <form {...props} className={`sm:mx-auto sm:w-full sm:max-w-sm ${className}`}>
    {children}
  </form>
);
