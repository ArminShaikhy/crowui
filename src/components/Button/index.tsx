import clsx from 'clsx';
import React, { type JSX, type ReactNode } from 'react';
import type { PolymorphicProps } from '@/src/types';
import { iconOnlyButtonSizeStyle, sizeStyle, variantStyle } from './variants';

import '@/src/styles.css';

/** Custom (non-HTML) props for the Button component. */
export interface ButtonOwnProps {
  /** Visual style of the button. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'ghost' | 'link';
  /** Color palette applied to the button. @default 'primary' */
  color?: 'primary' | 'warning' | 'error' | 'success' | 'gray' | 'sky' | 'violet' | 'flamingo';
  /** Stretches the button to fill its container width. @default false */
  isFullWidth?: boolean;
  /** Controls button height and padding. @default 'medium' */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Icon rendered to the right of the label (leading position in RTL layouts). */
  rightIcon?: JSX.Element;
  /** Icon rendered to the left of the label (trailing position in RTL layouts). */
  leftIcon?: JSX.Element;
  /** Shows a loading animation and disables interaction while true. @default false */
  isLoading?: boolean;
  children?: ReactNode;
}

export type ButtonProps<C extends React.ElementType = 'button'> = PolymorphicProps<
  C,
  ButtonOwnProps
>;

const REMOVE_OPACITY_CLASS = 'crow:opacity-0';

function styleButton({
  variant = 'primary',
  color = 'primary',
  isFullWidth,
  className,
  size = 'medium',
  children,
}: ButtonOwnProps & { className?: string }) {
  const defaultClassName =
    'crow:border crow:border-solid crow:relative crow:rounded-lg crow:min-w-max crow:h-fit crow:disabled:cursor-not-allowed crow:transition-all duration-300 crow:flex crow:items-center crow:disabled:opacity-40';

  return clsx(
    defaultClassName,
    isFullWidth ? 'crow:w-full crow:justify-center' : 'crow:w-fit',
    variantStyle[variant][color],
    children ? sizeStyle[size] : iconOnlyButtonSizeStyle[size],
    className,
  );
}

const Button = <C extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  color = 'primary',
  isFullWidth,
  className,
  size,
  leftIcon,
  rightIcon,
  isLoading,
  children,
  ...rest
}: ButtonProps<C>) => {
  const Component = (as ?? 'button') as React.ElementType;
  return (
    <Component
      className={styleButton({ variant, color, isFullWidth, className, size, children })}
      {...(rest as object)}
    >
      {rightIcon && (
        <span
          className={clsx(
            'crow:block icon-button crow:[&_svg]:size-full',
            { 'crow:ml-2': children },
            { [REMOVE_OPACITY_CLASS]: isLoading },
          )}
        >
          {rightIcon}
        </span>
      )}
      {children && <div className={clsx({ [REMOVE_OPACITY_CLASS]: isLoading })}>{children}</div>}
      {isLoading && (
        <div className="crow:absolute crow:top-0 crow:left-0 crow:w-full crow:h-full crow:flex crow:items-center crow:justify-center">
          <div className="dot-flashing" />
        </div>
      )}
      {leftIcon && (
        <span
          className={clsx(
            'crow:block icon-button crow:[&_svg]:size-full',
            { 'crow:mr-2': children },
            { [REMOVE_OPACITY_CLASS]: isLoading },
          )}
        >
          {leftIcon}
        </span>
      )}
    </Component>
  );
};

export default Button;
