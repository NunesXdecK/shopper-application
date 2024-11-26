import { ReactNode } from "react";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    type="button"
    {...props}
    className={`rounded-md  px-3 py-1.5 text-sm/6 font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
  >
    {children}
  </button>
);

/**
 * Definition of colors on buttons
 * text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600
 *
 */
