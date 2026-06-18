import clsx from 'clsx';
import React from 'react';

import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';
import IconCheckmark from '@/src/icons/IconCheckmark';

import { useMenu } from './context';
import type { MenuItemProps } from './types';
import { menuItemColorStyle, menuItemSizeStyle } from './variants';

const ACTIVE_CLASS = 'crow:bg-primary-50 crow:text-primary-600';

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  icon,
  endElement,
  color = 'default',
  size = 'comfortable',
  active = false,
}) => {
  const { close } = useMenu();
  const handleClick = () => {
    if (!disabled && onClick && typeof onClick === 'function') {
      onClick();
      close();
    }
  };

  return (
    <button
      role="menuitem"
      aria-current={active ? 'true' : undefined}
      className={clsx(
        'crow:flex crow:w-full crow:items-center crow:my-0.5 crow:text-right crow:rounded-lg crow:transition-colors crow:duration-150',
        menuItemSizeStyle[size],
        disabled
          ? 'crow:opacity-50 crow:cursor-not-allowed crow:text-gray-400'
          : clsx(
              'crow:cursor-pointer crow:focus:outline-none',
              active ? ACTIVE_CLASS : menuItemColorStyle[color],
            ),
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {icon && (
        <span className="crow:ml-3 crow:flex crow:justify-center crow:items-center crow:flex-shrink-0 crow:w-6 crow:h-6">
          {icon}
        </span>
      )}

      <div className="crow:font-medium crow:text-ellipsis crow:w-full crow:h-full">{children}</div>

      {endElement === undefined ? (
        active ? (
          <IconCheckmark className="crow:h-4 crow:w-4 crow:shrink-0" />
        ) : (
          <IconArrowLeft2 className="crow:h-4 crow:w-4 crow:shrink-0" />
        )
      ) : (
        endElement
      )}
    </button>
  );
};

export default MenuItem;
