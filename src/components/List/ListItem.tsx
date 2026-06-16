import clsx from 'clsx';
import React from 'react';

import '@/src/styles.css';

import type { ListItemProps } from './types';
import { listItemSizeStyle, listItemStateStyle } from './variants';

const ListItem: React.FC<ListItemProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  leading,
  trailing,
  active = false,
  size = 'comfortable',
}) => {
  const isInteractive = typeof onClick === 'function';

  const handleClick = () => {
    if (!disabled && isInteractive) {
      onClick?.();
    }
  };

  const content = (
    <>
      {leading && (
        <span className="crow:flex crow:items-center crow:justify-center crow:flex-shrink-0">
          {leading}
        </span>
      )}

      <div className="crow:flex-1 crow:min-w-0 crow:text-right">{children}</div>

      {trailing && (
        <span className="crow:flex crow:items-center crow:justify-center crow:flex-shrink-0">
          {trailing}
        </span>
      )}
    </>
  );

  const sharedClassName = clsx(
    'crow:flex crow:w-full crow:items-center crow:rounded-lg crow:transition-colors crow:duration-300 crow:ease-in-out',
    listItemSizeStyle[size],
    disabled
      ? listItemStateStyle.disabled
      : active
        ? listItemStateStyle.active
        : listItemStateStyle.default,
    className,
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={clsx(sharedClassName, 'crow:text-right crow:focus:outline-none', {
          'crow:cursor-pointer': !disabled,
          'crow:cursor-not-allowed': disabled,
        })}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={disabled}
        aria-current={active ? 'true' : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={sharedClassName}
      aria-current={active ? 'true' : undefined}
    >
      {content}
    </div>
  );
};

export default ListItem;
