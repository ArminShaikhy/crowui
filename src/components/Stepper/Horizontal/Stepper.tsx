'use client';
import clsx from 'clsx';
import React, { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { StepperContext } from './context';
import type { HorizontalStepProps } from './Step';
import type { HorizontalStepperSize, HorizontalStepperStepOrientation } from './type';

export interface HorizontalStepperProps {
  /** Layout of each step's icon + label. @default 'horizontal' */
  stepOrientation?: HorizontalStepperStepOrientation;
  /** Size variant controlling icon and font dimensions. @default 'medium' */
  size?: HorizontalStepperSize;
  /** Zero-based index of the currently active step. @default 0 */
  activeStep?: number;
  /** Extra class names on the stepper row container. */
  classname?: string;
}

const HorizontalStepper: FC<PropsWithChildren<HorizontalStepperProps>> = (props) => {
  const {
    stepOrientation = 'horizontal',
    size = 'medium',
    activeStep = 0,
    children,
    classname,
  } = props;

  const childrenArray = React.Children.toArray(children).filter(React.isValidElement);

  const currentStepIndex = activeStep ?? 0;

  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      ...(step as ReactElement<HorizontalStepProps>).props,
    });
  });

  return (
    <StepperContext.Provider value={{ activeStep: currentStepIndex, stepOrientation, size }}>
      <div
        className={clsx(
          classname,
          'crow:flex crow:flex-row crow:gap-5 crow:no-scrollbar crow:overflow-x-auto',
        )}
      >
        {steps}
      </div>
    </StepperContext.Provider>
  );
};

export default HorizontalStepper;
