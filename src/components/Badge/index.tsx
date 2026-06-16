import type { ReactNode } from 'react';
import '@/src/styles.css';

interface BadgePropsBase {
  /** Background style: two-tone (tinted bg, colored text) or solid (filled). @default 'solid' */
  type?: 'twoTone' | 'solid';
  /** Color palette applied to the badge. @default 'primary' */
  color?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'success'
    | 'error'
    | 'warning'
    | 'sky'
    | 'violet'
    | 'flamingo';
  /** Controls padding and typography scale. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** `'text'` shows full content with optional icons; `'number'` uses compact pill style. @default 'text' */
  valueType?: 'text' | 'number';
  /** Text or numeric content displayed inside the badge. */
  value: string | number;
  /** Fixed width override; defaults to `'auto'`. */
  width?: string | number;
  /** Additional class names on the badge element. */
  className?: string;
}

interface BadgePropsWithIcon extends BadgePropsBase {
  valueType?: 'text';
  /** @deprecated Use leftIcon or rightIcon instead */
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

interface BadgePropsWithoutIcon extends Omit<BadgePropsBase, 'icon' | 'leftIcon' | 'rightIcon'> {
  valueType: 'number';
}

export type BadgeProps = BadgePropsWithIcon | BadgePropsWithoutIcon;

function styleBadge(
  options: Omit<Required<BadgeProps>, 'value' | 'icon' | 'width' | 'leftIcon' | 'rightIcon'>,
) {
  const defaultClassName =
    'crow:inline-flex crow:items-center crow:justify-center crow:rounded-[20px]';

  const typeClassName: Record<
    Required<BadgeProps>['type'],
    Record<Required<BadgeProps>['color'], string>
  > = {
    twoTone: {
      primary: 'crow:bg-primary-50 crow:text-primary-600',
      secondary: 'crow:bg-secondary-100 crow:text-secondary-700',
      gray: 'crow:bg-gray-100 crow:text-gray-600',
      success: 'crow:bg-success-50 crow:text-success-800',
      error: 'crow:bg-error-50 crow:text-error-600',
      warning: 'crow:bg-warning-50 crow:text-warning-700',
      sky: 'crow:bg-sky-50 crow:text-sky-700',
      violet: 'crow:bg-violet-50 crow:text-violet-800',
      flamingo: 'crow:bg-flamingo-50 crow:text-flamingo-700',
    },
    solid: {
      primary: 'crow:bg-primary-500 crow:text-white',
      secondary: 'crow:bg-secondary-600 crow:text-white',
      gray: 'crow:bg-gray-600 crow:text-white',
      success: 'crow:bg-success-600 crow:text-white',
      error: 'crow:bg-error-500 crow:text-white',
      warning: 'crow:bg-warning-500 crow:text-black',
      sky: 'crow:bg-sky-600 crow:text-white',
      violet: 'crow:bg-violet-500 crow:text-white',
      flamingo: 'crow:bg-flamingo-500 crow:text-white',
    },
  };

  const textSizeClassName: Record<Required<BadgeProps>['size'], string> = {
    small: 'crow:font-oveline-demibold crow:py-1 crow:px-2 crow:gap-[2px]',
    medium: 'crow:font-caption-demibold crow:py-1 crow:px-[10px] crow:gap-1',
    large: 'crow:font-button-small crow:py-2 crow:px-4 crow:gap-[6px]',
  };

  const numberSizeClassName: Record<Required<BadgeProps>['size'], string> = {
    small: 'crow:font-caption-demibold crow:py-[2px] crow:px-[6px] crow:min-w-5',
    medium: 'crow:font-p3-medium crow:px-[6px] crow:min-w-6',
    large: 'crow:font-h5-bold crow:py-[2px] crow:px-2 crow:min-w-8',
  };

  return [
    defaultClassName,
    typeClassName[options.type][options.color],
    options.valueType === 'text'
      ? textSizeClassName[options.size]
      : numberSizeClassName[options.size] + ' crow:ss02',
    options.className.length > 0 ? options.className : '',
  ]
    .slice()
    .join(' ');
}

function getIconSize(badgSize: Required<BadgeProps>['size']) {
  if (badgSize === 'small') return 'crow:w-3 crow:h-3';
  if (badgSize === 'medium') return 'crow:w-[14px] crow:h-[14px]';
  return 'crow:w-4 crow:h-4';
}

const Badge = (props: BadgeProps) => {
  const {
    type = 'solid',
    color = 'primary',
    size = 'medium',
    valueType = 'text',
    value,
    width,
    className = '',
  } = props;

  const { icon, leftIcon, rightIcon } = props as BadgePropsWithIcon;

  if (icon) {
    console.error(
      '[Deprecated Prop Warning] ❗ The "icon" prop in <Badge /> is deprecated and will be removed in a future update. Please use "leftIcon" or "rightIcon" instead.',
    );
  }

  return (
    <div
      className={styleBadge({ type, color, size, valueType, className })}
      style={{ width: width ?? 'auto' }}
    >
      {leftIcon && valueType === 'text' && <span className={getIconSize(size)}>{leftIcon}</span>}
      {icon && valueType === 'text' && <span className={getIconSize(size)}>{icon}</span>}
      {value}
      {rightIcon && valueType === 'text' && <span className={getIconSize(size)}>{rightIcon}</span>}
    </div>
  );
};

export default Badge;
