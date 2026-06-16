import clsx from 'clsx';
import type { ReactNode } from 'react';
import IconInfoCircleOutline from '@/src/icons/IconInfoCircleOutline';

export interface FieldBottomInfoProps {
  disabled?: boolean;
  errorMessage?: ReactNode;
  hintMessage?: ReactNode;
  extraHelper?: ReactNode;
  className?: string;
}

const FieldBottomInfo = (props: FieldBottomInfoProps) => {
  const { errorMessage, hintMessage, extraHelper, disabled, className } = props;
  return (
    <div
      className={clsx(
        'crow:flex crow:font-p3-regular',
        {
          'crow:justify-between': (errorMessage ?? hintMessage) && extraHelper,
          'crow:justify-start': (errorMessage ?? hintMessage) && !extraHelper,
          'crow:justify-end': !(errorMessage ?? hintMessage) && extraHelper,
          'crow:text-gray-400': disabled,
        },
        errorMessage ? 'crow:text-error-500' : 'crow:text-primary-500',
        className,
      )}
    >
      {(errorMessage || hintMessage) && (
        <div
          className={clsx('crow:flex crow:items-center crow:gap-2 crow:font-light', {
            'crow:text-gray-400': disabled,
          })}
        >
          <IconInfoCircleOutline
            width={16}
            height={16}
          />
          <span>{errorMessage ?? hintMessage}</span>
        </div>
      )}
      {extraHelper}
    </div>
  );
};

export default FieldBottomInfo;
