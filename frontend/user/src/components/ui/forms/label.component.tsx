import { ReactNode } from "react";

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = ({ children, className, ...props }: LabelProps) => (
  <label
    {...props}
    className={`block text-sm/6 font-medium text-gray-900 ${className}`}
  >
    {children}
  </label>
);
