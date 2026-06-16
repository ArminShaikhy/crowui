import clsx from 'clsx';
import type { FC } from 'react';
import { humanize } from '@/src/utils/humanize';
import { THUMB_SIZE, TOOLTIP_SIZES } from './constants';
import type { RangeInputProps, RangeValueType } from './types';

interface RangeThumbProps
  extends Pick<
    RangeInputProps<RangeValueType>,
    'tooltip' | 'color' | 'tooltipSize' | 'tooltipClassName'
  > {
  percent: number;
  disabled?: boolean;
  icon?: React.ReactNode;
  value: number;
}
function getThumbColor(
  color: RangeInputProps<RangeValueType>['color'],
  disabled: RangeThumbProps['disabled'],
) {
  if (disabled) {
    return 'crow:bg-gray-300';
  }
  return color === 'primary'
    ? 'crow:bg-primary-500 crow:group-hover:bg-primary-400 crow:group-active:bg-primary-600'
    : 'crow:bg-secondary-600 crow:group-hover:bg-secondary-500 crow:group-active:bg-secondary-700';
}
const RangeThumb: FC<RangeThumbProps> = (props) => {
  const {
    percent,
    disabled,
    icon,
    tooltip,
    value,
    color,
    tooltipSize = 'medium',
    tooltipClassName,
  } = props;

  return (
    <div
      className={clsx(
        'crow:rounded-full crow:absolute crow:top-1/2 crow:-translate-y-1/2 crow:text-white crow:flex crow:items-center crow:justify-center',
        getThumbColor(color, disabled),
        disabled &&
          'crow:group-hover:ring-4 crow:ring-gray-300 crow:group-active:ring-0 crow:transition-[background-color,box-shadow]', // state classes
      )}
      style={{
        right: `${percent}%`,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
      }}
    >
      {icon}
      {tooltip && (
        <div className="crow:absolute crow:bottom-full crow:left-1/2 crow:-translate-x-1/2 crow:flex crow:flex-col crow:items-center crow:opacity-0 crow:group-hover:opacity-100 crow:transition-opacity crow:z-10 crow:mb-2.5">
          <div
            className={clsx(
              'crow:flex crow:rounded-lg crow:bg-gray-700 crow:shadow-md crow:text-white crow:font-p2-regular crow:border crow:border-gray-300 crow:ss02',
              TOOLTIP_SIZES[tooltipSize],
              tooltipClassName,
            )}
          >
            {typeof tooltip === 'boolean' ? humanize(value) : tooltip}
          </div>
          <div className="crow:w-4 crow:h-4 crow:bg-gray-700 crow:border-gray-300 crow:absolute crow:rotate-45 crow:left-1/2 crow:-translate-x-1/2 crow:bottom-0 crow:translate-y-1/2 crow:border-b crow:border-r crow:rounded-br" />
        </div>
      )}
    </div>
  );
};

export default RangeThumb;
