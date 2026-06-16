'use client';
import clsx from 'clsx';
import { useId, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import IconArrowDown2 from '@/src/icons/IconArrowDown2';
import type { CollapseProps } from './types';

import '@/src/styles.css';

const Collapse: FC<PropsWithChildren<CollapseProps>> = (props) => {
  const {
    children,
    trigger,
    open,
    defaultOpen = false,
    onOpenChange,
    hideArrow = false,
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const reactUseId = useId();
  const contentId = `${reactUseId}-content`;

  function toggleOpen() {
    if (disabled) return;
    const nextOpen = !isOpen;
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <div className={clsx('crow:bg-surface', className)}>
      <button
        type="button"
        className={clsx(
          'crow:flex crow:justify-between crow:items-center crow:w-full',
          isOpen ? 'crow:text-primary-500' : 'crow:text-gray-600',
          disabled && 'crow:opacity-50 crow:cursor-not-allowed',
          triggerClassName,
        )}
        onClick={toggleOpen}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <div className={isOpen ? 'crow:font-h5-bold' : 'crow:font-p1-medium'}>{trigger}</div>
        {!hideArrow && (
          <IconArrowDown2
            className={clsx(
              'crow:transition-transform crow:duration-300 crow:shrink-0 crow:w-auto crow:h-auto',
              isOpen && 'crow:rotate-180',
            )}
            aria-hidden="true"
            width={20}
            height={20}
          />
        )}
      </button>
      <div
        id={contentId}
        role="region"
        className={clsx(
          'crow:grid crow:font-p1-regular crow:text-gray-600 crow:overflow-hidden crow:transition-all crow:duration-300 crow:ease-in-out',
          isOpen
            ? 'crow:grid-rows-[1fr] crow:opacity-100 crow:mt-3'
            : 'crow:grid-rows-[0fr] crow:opacity-0',
          contentClassName,
        )}
      >
        <div className="crow:overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
