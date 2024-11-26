import { forwardRef } from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  loading?: boolean
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, loading, ...props }: InputProps, ref) => (
    <input
      ref={ref}
      disabled={loading}
      {...props}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${className}${loading ? ' animate-pulse' : ''}`}
    />
  )
);
