'use client';

import clsx from 'clsx';
import { Fragment, useEffect, type FC } from 'react';
import IconLogout from '@/src/icons/IconLogout';
import { isBrowser } from '@/src/utils/isBrowser';
import { DURATION_CLASS } from './constants';
import { sidebarContext } from './context';
import SidebarItems from './Items';
import SidebarLogoImage from './LogoImage';
import SidebarProfile from './Profile';
import SidebarToggleButton from './ToggleButton';
import type { SidebarProps, SidebarPropsWithoutHideOnClose } from './types';
import { sidebarVariantStyle } from './variants';
import Button from '../Button';
import Divider from '../Divider';

const Sidebar: FC<SidebarProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    className,
    logo,
    items,
    extraComponent,
    userProfile,
    logOutButtonProps,
    onLogout,
    showMask,
    hideOnClose,
    variant = 'filled',
    position = 'right',
  } = props;

  const openOnHover = (props as SidebarPropsWithoutHideOnClose).openOnHover;

  const MaskElement = showMask ? 'div' : Fragment;

  useEffect(() => {
    if (hideOnClose || !isBrowser()) return;

    const documentElement = document?.documentElement;
    const paddingClass = position === 'left' ? 'crow:pl-[80px]' : 'crow:pr-[80px]';
    documentElement.classList.add(paddingClass);

    return () => {
      documentElement.classList.remove(paddingClass);
    };
  }, [hideOnClose, position]);

  useEffect(() => {
    if (!showMask || !isBrowser()) return;

    const documentElement = document?.documentElement;
    const overflowClass = 'crow:overflow-hidden';

    if (isOpen) documentElement.classList.add(overflowClass);
    else documentElement.classList.remove(overflowClass);

    return () => {
      documentElement.classList.remove(overflowClass);
    };
  }, [showMask, isOpen]);

  return (
    <sidebarContext.Provider value={props}>
      <MaskElement
        {...(MaskElement === 'div'
          ? {
              className: clsx(
                'crow:fixed crow:top-0 crow:left-0 crow:z-40 crow:overflow-hidden crow:transition-[background-color] crow:ease-linear',
                isOpen ? 'crow:size-full crow:bg-black/40' : 'crow:size-0 crow:bg-transparent',
                DURATION_CLASS,
              ),
              onClick: (e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
              },
            }
          : {})}
      >
        <div
          className={clsx(
            className,
            'crow:flex crow:flex-col crow:fixed crow:top-0 crow:h-full crow:p-4 crow:pt-6 crow:transition-[width,max-width,opacity]',
            position === 'left' ? 'crow:left-0' : 'crow:right-0',
            sidebarVariantStyle[variant],
            {
              'crow:w-[280px] crow:max-w-full': isOpen,
              'crow:w-[80px] crow:max-w-[80px]': !isOpen && !hideOnClose,
              'crow:w-0 crow:opacity-0': !isOpen && hideOnClose,
            },
            DURATION_CLASS,
          )}
          onMouseEnter={() => {
            if (openOnHover && !isOpen) setIsOpen(true);
          }}
          onMouseLeave={() => {
            if (openOnHover && isOpen) setIsOpen(false);
          }}
        >
          <SidebarToggleButton />
          {Boolean(logo?.open ?? logo?.close) && <SidebarLogoImage />}
          {items && items.length > 0 && <SidebarItems />}
          <div className="crow:shrink-0 crow:flex-1">
            {extraComponent}
            <Divider
              className="crow:mt-6 crow:mb-4"
              type="horizontal"
            />
            {Boolean(userProfile?.image) && <SidebarProfile />}
            <Button
              color="error"
              variant="secondary"
              rightIcon={<IconLogout />}
              isFullWidth
              onClick={onLogout}
              {...logOutButtonProps}
            >
              {isOpen ? 'خروج' : ''}
            </Button>
          </div>
        </div>
      </MaskElement>
    </sidebarContext.Provider>
  );
};

export default Sidebar;
export * from './types';
