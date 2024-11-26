import { ReactNode } from "react";

interface HolderProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const Holder = ({ children, className, ...props }: HolderProps) => (
  <div {...props} className={`sm:mx-auto sm:w-full sm:max-w-sm ${className}`}>
    {children}
  </div>
);
