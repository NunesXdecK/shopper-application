import { ReactNode } from "react";

interface HolderProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const Holder = ({ children, className, ...props }: HolderProps) => (
  <div
    {...props}
    className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${className}`}
  >
    {children}
  </div>
);
