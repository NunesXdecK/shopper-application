import { ReactNode } from "react";

interface SecondaryProps extends React.HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
}

export const Secondary = ({
  children,
  className,
  ...props
}: SecondaryProps) => (
  <h2
    {...props}
    className={`text-2xl/9 font-bold tracking-tight text-gray-900 ${className}`}
  >
    {children}
  </h2>
);
