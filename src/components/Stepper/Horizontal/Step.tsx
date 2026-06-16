'use client';

import clsx from 'clsx';
import { useEffect, useRef, type FC, type ReactNode } from 'react';
import isNullish from '@/src/utils/isNullish';
import Connector from './Connector';
import { useStepperContext } from './context';
import StepIcon from './StepIcon';
import type {
  HorizontalStepperSize,
  HorizontalStepperStepOrientation,
  HorizontalStepperStepStatus,
} from './type';
import { getStepStatus } from './utils';

export interface HorizontalStepProps {
  /** Default label shown when the step is incomplete. */
  title: string;
  /** Label shown when this step is the active step. Defaults to `title`. */
  activeTitle?: string;
  /** Label shown when this step is complete. Defaults to `title`. */
  completeTitle?: string;
  /** Secondary label rendered below the title. */
  subTitle?: string;
  /** Icon for the incomplete state. */
  icon: ReactNode;
  /** Icon for the complete state. Defaults to a checkmark. */
  completeIcon?: ReactNode;
  /** Icon for the active state. Defaults to `icon`. */
  activeIcon?: ReactNode;
  /** Zero-based position injected automatically by `HorizontalStepper`. */
  index?: number;
  /** Extra class names on the step container. */
  classname?: string;
}

const stepStatusClassnameMap: Record<HorizontalStepperStepStatus, string> = {
  complete: 'crow:text-secondary-500',
  current: 'crow:text-primary-500 crow:font-medium crow:font-semibold',
  incomplete: 'crow:text-gray-400',
};

const stepSizeClassnameMap: Record<HorizontalStepperSize, string> = {
  small: 'crow:text-sm',
  medium: 'crow:text-base',
};

const stepOrientationClassnameMap: Record<HorizontalStepperStepOrientation, string> = {
  horizontal: 'crow:flex crow:items-center crow:gap-2',
  vertical: 'crow:flex crow:items-center crow:gap-2 crow:flex-col',
};

const HorizontalStep: FC<HorizontalStepProps> = (props) => {
  const {
    index,
    title,
    activeTitle,
    completeTitle,
    subTitle,
    icon,
    activeIcon,
    completeIcon,
    classname,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { size, activeStep, stepOrientation } = useStepperContext();

  if (isNullish(index))
    throw new Error(
      `expected index to be a number but instead got: ${index}, you are probably rendering <Step /> component outside of <Stepper />`,
    );

  const status = getStepStatus(activeStep, index);

  const titleMap: Record<HorizontalStepperStepStatus, string | undefined> = {
    current: activeTitle,
    incomplete: title,
    complete: completeTitle,
  };

  const stepTitle = titleMap[status] ?? title;

  const containerClassname = clsx(
    'crow:flex crow:flex-grow crow:min-w-max',
    classname,
    stepStatusClassnameMap[status],
    stepSizeClassnameMap[size],
    stepOrientationClassnameMap[stepOrientation],
  );

  useEffect(() => {
    if (status === 'current') {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [status]);

  return (
    <>
      {index !== 0 && <Connector index={index} />}
      <div
        className={containerClassname}
        ref={ref}
      >
        <StepIcon
          status={status}
          icon={icon}
          activeIcon={activeIcon}
          completeIcon={completeIcon}
        />

        <div
          className={clsx(
            'crow:flex crow:flex-col crow:gap-1 crow:mt-0',
            stepOrientation === 'vertical' && 'crow:items-center',
          )}
        >
          {index === activeStep && (
            <p className="crow:font-normal crow:text-gray-400">{subTitle}</p>
          )}
          <p className="crow:text-center">{stepTitle}</p>
        </div>
      </div>
    </>
  );
};

export default HorizontalStep;
