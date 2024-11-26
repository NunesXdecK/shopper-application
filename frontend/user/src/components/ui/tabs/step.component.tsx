import { ReactNode } from "react";

export interface StepProps extends React.HTMLProps<HTMLDivElement> {
  stepId: number;
  children: ReactNode;
}

export const Step = ({ children, className, stepId, ...props }: StepProps) => (
  <div {...props} step-id={stepId} className={`sm:mx-auto sm:w-full pt-10 ${className}`}>
    {children}
  </div>
);
