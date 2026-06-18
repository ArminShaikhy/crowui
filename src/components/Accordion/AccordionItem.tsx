'use client';
import clsx from 'clsx';
import { useId } from 'react';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import IconArrowDown2 from '@/src/icons/IconArrowDown2';
import { useAccordionContext } from './context';
import Divider from '../Divider';

interface AccordionItemProps {
  /** Header content shown in the collapsed trigger row. */
  title: ReactNode;
  /** Unique key used to track open/closed state. Defaults to React's `useId` value. */
  accordionKey?: string;
  /** Extra class names on the item root. */
  className?: string;
  /** Extra class names on the collapsible content area. */
  contentClassName?: string;
  /** Hides the separator line between items. @default false */
  hideDivider?: boolean;
  /** Hides the expand/collapse chevron icon. @default false */
  hideArrow?: boolean;
  /** Extra class names on the title row. */
  titleClassName?: string;
  /** Prevents this item from being opened. @default false */
  disable?: boolean;
}

const AccordionItem: FC<PropsWithChildren<AccordionItemProps>> = (props) => {
  const {
    children,
    title,
    accordionKey,
    className,
    contentClassName,
    hideDivider = false,
    hideArrow = false,
    titleClassName,
    disable,
  } = props;
  const { activeKey, setActiveKey } = useAccordionContext();
  const reactUseId = useId();
  const accordionItemKey = accordionKey ?? reactUseId;
  const isAccordionDisable = Array.isArray(activeKey);

  function checkIsItemActive() {
    if (disable) return false;

    if (isAccordionDisable) {
      return activeKey.includes(accordionItemKey);
    }
    return accordionItemKey === activeKey;
  }

  const isItemActive = checkIsItemActive();

  function toggleItemVisibility() {
    if (isItemActive) {
      if (isAccordionDisable) setActiveKey(activeKey.filter((key) => key !== accordionItemKey));
      else setActiveKey(null);
    } else if (isAccordionDisable) {
      setActiveKey([...activeKey, accordionItemKey]);
    } else setActiveKey(accordionItemKey);
  }

  const contentId = `${accordionItemKey}-content`;

  return (
    <div className={clsx('crow:bg-surface crow:px-4 crow:pt-4', className)}>
      <button
        className={clsx(
          'crow:flex crow:justify-between crow:items-center crow:w-full',
          isItemActive ? 'crow:text-primary-500' : 'crow:text-gray-600',
          titleClassName,
        )}
        onClick={toggleItemVisibility}
        disabled={disable}
        aria-expanded={isItemActive}
        aria-controls={contentId}
      >
        <div className={isItemActive ? 'crow:font-h5-bold' : 'crow:font-p1-medium'}>{title}</div>
        {!hideArrow && (
          <IconArrowDown2
            className={clsx(
              'crow:transition-transform crow:duration-300 crow:shrink-0 crow:w-auto crow:h-auto',
              isItemActive && 'crow:rotate-180',
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
          isItemActive
            ? 'crow:grid-rows-[1fr] crow:opacity-100 crow:mt-3'
            : 'crow:grid-rows-[0fr] crow:opacity-0',
          contentClassName,
        )}
      >
        <div className="crow:overflow-hidden">{children}</div>
      </div>
      {!hideDivider && (
        <Divider
          type="horizontal"
          color="white"
          className="crow:mt-4"
        />
      )}
    </div>
  );
};

export default AccordionItem;
