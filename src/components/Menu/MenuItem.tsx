import clsx from 'clsx';
import React from 'react';

import IconArrowLeft2 from '@/src/icons/IconArrowLeft2';

import { useMenu } from './context';
import type { MenuItemProps } from './types';

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  icon,
  endElement,
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
      className={clsx(
        'crow:flex crow:w-full crow:items-center crow:p-3 crow:my-0.5 crow:text-right crow:text-sm crow:rounded-lg crow:transition-colors crow:duration-150 crow:min-h-12',
        disabled
          ? 'crow:opacity-50 crow:cursor-not-allowed crow:text-gray-400'
          : 'crow:text-gray-600 crow:hover:bg-gray-50 crow:hover:text-gray-900 crow:cursor-pointer crow:focus:bg-gray-100 crow:focus:outline-none',
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
        <IconArrowLeft2 className="crow:h-4 crow:w-4 crow:shrink-0" />
      ) : (
        endElement
      )}
    </button>
  );
};

export default MenuItem;
