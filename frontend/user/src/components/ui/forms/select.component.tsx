import { forwardRef } from "react";

export type Options = {
  label: string;
  value: string;
};

type SelectProps = React.HTMLProps<HTMLSelectElement> & {
  options?: Options[];
  loading?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, className, loading, options, ...props }: SelectProps, ref) => (
    <select
      ref={ref}
      disabled={loading}
      {...props}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${className}${
        loading ? " animate-pulse" : ""
      }`}
    >
      <option value="0">Selecione um motorista...</option>
      {options?.map((option, index) => (
        <option
          key={`select-option-${id}-${option.value}-${index}`}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
);
