'use client';
import clsx from 'clsx';
import { useState } from 'react';
import IconCheckCircleBold from '@/src/icons/IconCheckCircleBold';
import IconCloseRemove from '@/src/icons/IconCloseRemove';
import IconDangerBold from '@/src/icons/IconDangerBold';
import IconInfoCircleBold from '@/src/icons/IconInfoCircleBold';
import type { BannerProps } from './types';
import { bannerVariantClassNames } from './variants';
import Button from '../Button';

import '@/src/styles.css';

export type { BannerProps, BannerActionProps } from './types';

const ANIMATION_DURATION = 300;

function getBannerIcon(variant: Required<BannerProps>['variant']) {
  let IconComponent = IconInfoCircleBold;
  if (variant === 'error') IconComponent = IconDangerBold;
  else if (variant === 'warning') IconComponent = IconDangerBold;
  else if (variant === 'success') IconComponent = IconCheckCircleBold;

  return (
    <IconComponent
      className={clsx('crow:shrink-0', bannerVariantClassNames.icon[variant])}
      width={20}
      height={20}
    />
  );
}

const Banner = (props: BannerProps) => {
  const {
    variant = 'info',
    text,
    title,
    action,
    closable = false,
    hideIcon = false,
    sticky = false,
    onClose,
    className,
  } = props;
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, ANIMATION_DURATION);
  };

  return (
    <div
      className={clsx(
        isLeaving ? 'banner-collapse' : undefined,
        sticky && 'crow:sticky crow:top-0 crow:z-10',
      )}
    >
      <div
        role="alert"
        className={clsx(
          'crow:w-full crow:flex crow:items-start crow:gap-x-3 crow:rounded-xl crow:border crow:border-solid crow:p-3',
          !isLeaving && 'crow:[animation:banner-fade-slide-in_0.3s_ease-in-out]',
          bannerVariantClassNames.container[variant],
          className,
        )}
      >
        {!hideIcon && getBannerIcon(variant)}
        <div className="crow:flex crow:flex-col crow:flex-1 crow:gap-y-1 crow:sm:flex-row crow:sm:items-center crow:sm:gap-x-3">
          <div className="crow:flex-1">
            {Boolean(title) && (
              <div
                className={clsx(
                  'crow:font-h6-bold crow:mb-1',
                  bannerVariantClassNames.title[variant],
                )}
              >
                {title}
              </div>
            )}
            <p className={clsx('crow:font-p3-regular', bannerVariantClassNames.text[variant])}>
              {text}
            </p>
          </div>
          {Boolean(action?.text) && (
            <Button
              variant="outline"
              color={variant === 'info' ? 'primary' : variant}
              size="small"
              className="crow:shrink-0"
              {...action}
            >
              {action?.text}
            </Button>
          )}
        </div>
        {closable && (
          <button
            type="button"
            aria-label="Dismiss"
            className="crow:shrink-0 crow:my-[2px] crow:h-fit"
            onClick={handleDismiss}
          >
            <IconCloseRemove
              className={clsx(bannerVariantClassNames.close[variant])}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
