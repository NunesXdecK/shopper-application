import React, { ReactElement, useMemo } from "react";
import { Step, StepProps } from "./step.component";

interface HolderProps extends React.HTMLProps<HTMLDivElement> {
  activeId: number;
  children: ReactElement<StepProps>[];
}

export const Holder = ({
  children,
  activeId,
  className,
  ...props
}: HolderProps) => {
  const steps: ReactElement<StepProps>[] = useMemo(
    () =>
      children
        .filter(
          (element: ReactElement<StepProps>) =>
            React.isValidElement(element) && element.type === Step
        )
        .map(
          (element: ReactElement<StepProps>) =>
            React.cloneElement(
              element,
              {}
            ) as unknown as ReactElement<StepProps>
        ),
    [children]
  );
  const stepHeader = useMemo(
    () =>
      steps.map((element) => {
        const { stepId, name } = element.props;
        return (
          <span
            id={`step-header-${stepId}`}
            className={stepId === activeId ? "is-active" : ""}
          >
            {name}
          </span>
        );
      }),
    [steps, activeId]
  );
  const step = useMemo(
    () => steps.find((element) => element.props.stepId === activeId),
    [steps, activeId]
  );
  return (
    <div {...props} className={`sm:mx-auto sm:w-full ${className}`}>
      <div className="flex justify-stretch">
        {stepHeader.map((element, index) => {
          const { id } = element.props;
          return (
            <div
              key={`headers-${id}`}
              className="flex-1 flex flex-col items-center"
            >
              <div className="relative flex w-full place-content-center">
                <div
                  className={`${
                    index === 0 || index === stepHeader.length - 1
                      ? "w-1/2"
                      : "w-full"
                  }${
                    index === 0 ? " left-1/2 " : ""
                  }${
                    index === stepHeader.length - 1 ? " right-1/2 " : ""
                  } absolute h-[2px] rounded-full top-1/2 ${index <= activeId ? 'bg-blue-400' : 'bg-gray-400'}`}
                ></div>
                <div className={`w-3 h-3 rounded-full ${index <= activeId ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
              </div>
              {element}
            </div>
          );
        })}
      </div>
      {step}
    </div>
  );
};
