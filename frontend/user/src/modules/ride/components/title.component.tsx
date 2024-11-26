import { ReactNode } from "react";

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const Title = ({ children, className, ...props }: TitleProps) => (
  <div {...props} className={`sm:mx-auto sm:w-full ${className}`}>
    {children}
  </div>
);
