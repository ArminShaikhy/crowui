import clsx from 'clsx';
import type { FC } from 'react';
import type { ProgressDoughnutProps } from './types';

const COLORS_CLASSES: Record<
  Required<ProgressDoughnutProps>['color'],
  { empty: string; filled: string }
> = {
  primary: {
    empty: 'crow:stroke-primary-100',
    filled: 'crow:stroke-primary-500',
  },
  secondary: {
    empty: 'crow:stroke-secondary-100',
    filled: 'crow:stroke-secondary-600',
  },
  gray: {
    empty: 'crow:stroke-gray-400',
    filled: 'crow:stroke-gray-50',
  },
  warning: {
    empty: 'crow:stroke-warning-100',
    filled: 'crow:stroke-warning-500',
  },
};

const ProgressDoughnut: FC<ProgressDoughnutProps> = (props) => {
  const {
    color = 'primary',
    current,
    total,
    size = 48,
    showText,
    strokeSize = 6,
    svgProps,
    textClassName,
  } = props;
  const protectedCurrent = Math.min(Math.max(current, 0), total);
  const percentage = (protectedCurrent / total) * 100;
  const radius = (size - strokeSize) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...svgProps}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className={COLORS_CLASSES[color].empty}
        strokeWidth={strokeSize}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className={clsx(COLORS_CLASSES[color].filled, 'crow:transition-all')}
        strokeWidth={strokeSize}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {showText && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={clsx('crow:font-caption-regular crow:text-gray-600 crow:ss02', textClassName)}
        >
          {protectedCurrent} از {total}
        </text>
      )}
    </svg>
  );
};

export default ProgressDoughnut;
