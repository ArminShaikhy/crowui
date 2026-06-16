import clsx from 'clsx';
import { type FC } from 'react';

import '@/src/styles.css';

export interface ProgressBarProps {
  /** Label text rendered above the bar. */
  title: string;
  /** Fill color of the progress bar. @default 'primary' */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /** Current progress value. */
  current: number;
  /** Maximum (total) value. Used to compute the fill percentage. */
  total: number;
  /** Whether to display the current value as a `'percentage'` or the raw `'value'`. @default 'percentage' */
  currentShowType?: 'percentage' | 'value';
  /** Bar height. @default 'medium' */
  size?: 'thin' | 'medium' | 'thick';
  /** Applies a diagonal stripe pattern to the fill. @default false */
  striped?: boolean;
  /** Animates the stripe pattern. Requires `striped` to be true. @default false */
  animated?: boolean;
  /** Extra class names on the root wrapper. */
  className?: string;
}

const BAR_COLORS: Record<
  NonNullable<ProgressBarProps['color']>,
  { track: string; fill: string; text: string }
> = {
  primary: {
    track: 'crow:bg-primary-100',
    fill: 'crow:bg-primary-500',
    text: 'crow:text-primary-500',
  },
  secondary: {
    track: 'crow:bg-secondary-100',
    fill: 'crow:bg-secondary-500',
    text: 'crow:text-secondary-500',
  },
  success: {
    track: 'crow:bg-success-100',
    fill: 'crow:bg-success-500',
    text: 'crow:text-success-600',
  },
  error: {
    track: 'crow:bg-error-100',
    fill: 'crow:bg-error-500',
    text: 'crow:text-error-500',
  },
  warning: {
    track: 'crow:bg-warning-100',
    fill: 'crow:bg-warning-500',
    text: 'crow:text-warning-700',
  },
};

const SIZE_CLASS: Record<NonNullable<ProgressBarProps['size']>, string> = {
  thin: 'crow:h-1',
  medium: 'crow:h-2',
  thick: 'crow:h-4',
};

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    title,
    current,
    total = 100,
    color = 'primary',
    currentShowType = 'percentage',
    size = 'thin',
    striped = false,
    animated = false,
    className,
  } = props;

  const percentage = (current / total) * 100;
  const colors = BAR_COLORS[color];

  return (
    <div className={clsx('crow:flex crow:flex-col crow:gap-2', className)}>
      <div
        className={clsx(
          'crow:flex crow:items-center crow:justify-between crow:font-p2-regular',
          colors.text,
        )}
      >
        <span>{title}</span>
        <span className="crow:ss02">
          {currentShowType === 'percentage'
            ? `${Math.floor(percentage)}%`
            : `${current} از ${total}`}
        </span>
      </div>
      <div
        className={clsx(
          'crow:rounded-sm crow:relative crow:overflow-hidden',
          SIZE_CLASS[size],
          colors.track,
        )}
      >
        <div
          className={clsx(
            'crow:rounded-sm crow:absolute crow:right-0 crow:h-full crow:top-0 crow:transition-all crow:duration-300',
            colors.fill,
            striped &&
              'crow:[background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_1px,transparent_0,transparent_50%)] crow:[background-size:1rem_1rem]',
            animated && striped && 'crow:animate-pulse',
          )}
          style={{
            width: current > total ? '100%' : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
