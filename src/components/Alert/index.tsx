'use client';
import clsx from 'clsx';
import { useState, type ReactNode } from 'react';
import IconCheckCircleBold from '@/src/icons/IconCheckCircleBold';
import IconCloseRemove from '@/src/icons/IconCloseRemove';
import IconDangerBold from '@/src/icons/IconDangerBold';
import IconInfoCircleBold from '@/src/icons/IconInfoCircleBold';
import { alertVariantClassNames, alertSizeClassNames } from './variants';
import Button, { type ButtonProps } from '../Button';

import '@/src/styles.css';

interface AlertButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  text: string;
}

export interface AlertProps {
  /** Visual severity style. @default 'primary' */
  variant?: 'warning' | 'primary' | 'error' | 'success' | 'gray';
  /** Controls padding and font size. @default 'small' */
  size?: 'large' | 'small';
  /** Bold heading rendered above `text`. */
  title?: string;
  /** Main alert body content (required). */
  text: ReactNode;
  /** Primary (filled) action button. Omit to hide. */
  primaryButton?: AlertButtonProps;
  /** Secondary (outline) action button. Omit to hide. */
  outlineButton?: AlertButtonProps;
  /** Renders a dismiss (✕) button. @default false */
  closable?: boolean;
  /** Shows the leading status icon beside the title. @default true */
  showTitleIcon?: boolean;
  /** Extra class names on the root element. */
  className?: string;
}

function getAlertIcon(
  variant: Required<AlertProps>['variant'],
  size: Required<AlertProps>['size'],
) {
  let IconComponent = IconInfoCircleBold;
  if (variant === 'error') IconComponent = IconDangerBold;
  else if (variant === 'success') IconComponent = IconCheckCircleBold;

  return (
    <IconComponent
      className={clsx('crow:shrink-0 crow:my-[2px]', alertVariantClassNames.icon[variant])}
      width={alertSizeClassNames.icon[size]}
      height={alertSizeClassNames.icon[size]}
    />
  );
}

const Alert = (props: AlertProps) => {
  const {
    variant = 'primary',
    size = 'small',
    title,
    text,
    primaryButton,
    outlineButton,
    closable,
    showTitleIcon = true,
    className,
  } = props;
  const [show, setShow] = useState(true);

  if (show)
    return (
      <div
        className={clsx(
          'crow:w-full crow:flex crow:gap-x-3 crow:rounded-xl crow:border crow:border-solid',
          alertVariantClassNames.container[variant],
          alertSizeClassNames.container[size],
          className,
        )}
      >
        {showTitleIcon && getAlertIcon(variant, size)}
        <div className="crow:flex crow:flex-col crow:flex-1">
          {Boolean(title) && (
            <div
              className={clsx(
                alertVariantClassNames.title[variant],
                alertSizeClassNames.title[size],
              )}
            >
              {title}
            </div>
          )}
          <p className={clsx(alertVariantClassNames.text[variant], alertSizeClassNames.text[size])}>
            {text}
          </p>
          {(Boolean(primaryButton?.text) || Boolean(outlineButton?.text)) && (
            <div
              className={clsx(
                'crow:flex crow:gap-x-2 crow:items-center',
                size === 'large' ? 'crow:mt-4' : 'crow:mt-3',
              )}
            >
              {Boolean(primaryButton?.text) && (
                <Button
                  variant="primary"
                  color={variant}
                  size="small"
                  {...primaryButton}
                >
                  {primaryButton?.text}
                </Button>
              )}
              {Boolean(outlineButton?.text) && (
                <Button
                  variant="outline"
                  color={variant}
                  size="small"
                  {...outlineButton}
                >
                  {outlineButton?.text}
                </Button>
              )}
            </div>
          )}
        </div>
        {closable && (
          <button
            className="crow:shrink-0 crow:my-[2px] crow:h-fit"
            onClick={() => setShow(false)}
          >
            <IconCloseRemove
              className={clsx(alertVariantClassNames.close[variant])}
              width={alertSizeClassNames.close[size]}
              height={alertSizeClassNames.close[size]}
            />
          </button>
        )}
      </div>
    );

  return null;
};

export default Alert;
