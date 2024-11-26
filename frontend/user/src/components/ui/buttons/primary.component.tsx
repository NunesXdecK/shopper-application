import { Button, ButtonProps } from "./button.component";

export const Primary = ({ children, className, ...props }: ButtonProps) => (
  <Button
    {...props}
    className={`text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 ${className}`}
  >
    {children}
  </Button>
);
