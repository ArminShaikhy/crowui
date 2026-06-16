import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useStepperContext } from './context';
import type { HorizontalStepperStepStatus, HorizontalStepperSize } from './type';

interface StepIconProps {
  status: HorizontalStepperStepStatus;
  icon: ReactNode;
  activeIcon?: ReactNode;
  completeIcon?: ReactNode;
}

const stepIconSizeClassNameMap: Record<HorizontalStepperStepStatus, string> = {
  complete: 'crow:text-secondary-400 crow:rounded-lg',
  current: 'crow:bg-primary-50 crow:text-primary-400 crow:rounded-lg',
  incomplete: 'crow:bg-gray-50 crow:text-gray-400 crow:rounded-lg',
};

const stepIconStatusClassNameMap: Record<HorizontalStepperSize, string> = {
  medium: 'crow:w-10 crow:h-10 crow:text-xl',
  small: 'crow:w-10 crow:h-10 crow:text-lg',
};

const StepIcon: FC<StepIconProps> = (props) => {
  const { status, icon, activeIcon, completeIcon } = props;

  const { size } = useStepperContext();

  const iconComponentMap: Record<HorizontalStepperStepStatus, ReactNode> = {
    incomplete: icon,
    current: activeIcon,
    complete: completeIcon,
  };

  const IconComponent = iconComponentMap[status] ?? icon;

  const classnames = clsx(
    stepIconSizeClassNameMap[status],
    stepIconStatusClassNameMap[size],
    'crow:flex crow:items-center crow:justify-center crow:min-w-10',
  );

  return <div className={classnames}>{IconComponent}</div>;
};

export default StepIcon;
