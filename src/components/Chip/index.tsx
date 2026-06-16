import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode } from 'react';
import omitObject from '@/src/utils/omitObjects';
import Badge, { type BadgeProps } from '../Badge';

import '@/src/styles.css';

interface ChipPropsBase {
  /** Chip label content. */
  label: string | ReactNode;
  /** Controls padding and font size. @default 'small' */
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /** Icon rendered to the right of the label. */
  rightIcon?: ReactNode;
  /** Icon rendered to the left of the label (trailing in RTL). */
  leftIcon?: ReactNode;
  /** When true, uses a tinted background instead of a transparent one. @default false */
  filled?: boolean;
  /** Renders a numeric Badge on the chip. */
  badgeNumber?: number;
  /** Applies an active/selected border highlight. @default false */
  isActive?: boolean;
  /** Visually dims the chip and blocks interaction. @default false */
  disabled?: boolean;
  /** Color palette. @default 'primary' */
  color?: 'primary' | 'gray' | 'success' | 'error' | 'warning' | 'sky' | 'violet' | 'flamingo';
  /** Renders a remove (✕) button and fires this callback when clicked. */
  onRemove?: () => void;
}

export type ChipProps = ChipPropsBase &
  (
    | ({ clickable: true } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ clickable?: false } & HTMLAttributes<HTMLDivElement>)
  );

const colorVariants: Record<
  NonNullable<ChipPropsBase['color']>,
  { filled: string; base: string; active: string }
> = {
  primary: {
    filled:
      'crow:text-primary-500 crow:hover:text-primary-500 crow:border-primary-100 crow:bg-primary-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-primary-500 crow:border-gray-200 crow:hover:border-gray-300',
    active: 'crow:!border-primary-500 crow:!text-primary-500',
  },
  gray: {
    filled: 'crow:text-gray-600 crow:hover:text-gray-600 crow:border-gray-200 crow:bg-gray-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-gray-600 crow:border-gray-200 crow:hover:border-gray-300',
    active: 'crow:!border-gray-500 crow:!text-gray-600',
  },
  success: {
    filled:
      'crow:text-success-600 crow:hover:text-success-600 crow:border-success-100 crow:bg-success-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-success-600 crow:border-gray-200 crow:hover:border-success-200',
    active: 'crow:!border-success-500 crow:!text-success-600',
  },
  error: {
    filled: 'crow:text-error-500 crow:hover:text-error-500 crow:border-error-100 crow:bg-error-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-error-500 crow:border-gray-200 crow:hover:border-error-200',
    active: 'crow:!border-error-500 crow:!text-error-500',
  },
  warning: {
    filled:
      'crow:text-warning-700 crow:hover:text-warning-700 crow:border-warning-100 crow:bg-warning-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-warning-700 crow:border-gray-200 crow:hover:border-warning-200',
    active: 'crow:!border-warning-500 crow:!text-warning-700',
  },
  sky: {
    filled: 'crow:text-sky-600 crow:hover:text-sky-600 crow:border-sky-100 crow:bg-sky-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-sky-600 crow:border-gray-200 crow:hover:border-sky-200',
    active: 'crow:!border-sky-500 crow:!text-sky-600',
  },
  violet: {
    filled:
      'crow:text-violet-600 crow:hover:text-violet-600 crow:border-violet-100 crow:bg-violet-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-violet-600 crow:border-gray-200 crow:hover:border-violet-200',
    active: 'crow:!border-violet-500 crow:!text-violet-600',
  },
  flamingo: {
    filled:
      'crow:text-flamingo-600 crow:hover:text-flamingo-600 crow:border-flamingo-100 crow:bg-flamingo-50',
    base: 'crow:bg-white crow:text-gray-700 crow:hover:text-flamingo-600 crow:border-gray-200 crow:hover:border-flamingo-200',
    active: 'crow:!border-flamingo-500 crow:!text-flamingo-600',
  },
};

const disabledClass = 'crow:opacity-40 crow:cursor-not-allowed';

const sizeClass: Record<NonNullable<ChipPropsBase['size']>, string> = {
  xsmall: 'crow:gap-0.5 crow:py-0.5 crow:px-2 crow:font-p3-medium crow:[&_svg]:size-4',
  small: 'crow:gap-1 crow:py-1 crow:px-3 crow:font-p2-medium crow:[&_svg]:size-4',
  medium: 'crow:gap-1.5 crow:py-1.5 crow:px-4 crow:font-p2-medium crow:[&_svg]:size-4',
  large: 'crow:gap-2 crow:py-2.5 crow:px-5 crow:font-p1-medium crow:[&_svg]:size-5',
};

const badgeSizeMap: Record<NonNullable<ChipPropsBase['size']>, BadgeProps['size']> = {
  xsmall: 'small',
  small: 'small',
  medium: 'small',
  large: 'medium',
};

function styleChip({
  size = 'small',
  filled,
  color = 'primary',
  className,
  disabled,
  isActive,
}: ChipProps) {
  const defaultClass =
    'crow:border crow:border-solid crow:rounded-full crow:transition crow:hover:ring-4 crow:ring-gray-100 crow:flex crow:items-center';

  const variantClass = filled ? colorVariants[color].filled : colorVariants[color].base;

  return clsx(
    defaultClass,
    sizeClass[size],
    variantClass,
    disabled && disabledClass,
    isActive && colorVariants[color].active,
    className,
  );
}

const RemoveButton: FC<{ size: NonNullable<ChipPropsBase['size']>; onClick: () => void }> = ({
  size,
  onClick,
}) => {
  const iconSize = size === 'large' ? 'crow:size-4' : 'crow:size-3.5';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        'crow:flex crow:items-center crow:justify-center crow:rounded-full crow:opacity-60 crow:hover:opacity-100 crow:transition-opacity crow:ml-0.5',
        iconSize,
      )}
      aria-label="Remove"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          d="M4 4l8 8M12 4l-8 8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

const Chip: FC<ChipProps> = (props) => {
  const {
    label,
    rightIcon = null,
    leftIcon = null,
    badgeNumber,
    clickable,
    onRemove,
    ...rest
  } = props;

  const Wrapper = clickable ? ('button' as 'div') : 'div';
  const containerRestProps = omitObject(rest, ['filled', 'size', 'isActive', 'color']);

  return (
    <Wrapper
      {...(containerRestProps as HTMLAttributes<HTMLDivElement | HTMLButtonElement>)}
      className={clsx(styleChip(props), '')}
    >
      {rightIcon}
      {label}
      {badgeNumber && (
        <Badge
          value={badgeNumber}
          valueType="number"
          color={
            props.color === 'success' ||
            props.color === 'error' ||
            props.color === 'warning' ||
            props.color === 'sky' ||
            props.color === 'violet' ||
            props.color === 'flamingo'
              ? 'primary'
              : props.color
          }
          size={badgeSizeMap[props.size || 'small']}
        />
      )}
      {leftIcon}
      {onRemove && !props.disabled && (
        <RemoveButton
          size={props.size || 'small'}
          onClick={onRemove}
        />
      )}
    </Wrapper>
  );
};

export default Chip;
