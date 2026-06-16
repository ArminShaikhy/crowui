'use client';

import clsx from 'clsx';
import { useCallback, type FC, type KeyboardEvent, type ReactNode } from 'react';
import Badge from '../Badge';
import '@/src/styles.css';

interface ITabItem {
  key: string | number;
  title: string;
  icon?: ReactNode;
  badgeNumber?: number;
  disabled?: boolean;
}

interface TabsPropsBase {
  activeKey: ITabItem['key'];
  onChange: (key: ITabItem['key']) => void;
  items: ITabItem[];
  className?: string;
  tabItemClassName?: string;
  fullWidth?: boolean;
  variant?: 'underline' | 'pills' | 'card';
  orientation?: 'horizontal' | 'vertical';
}

interface TabsPropsFullWidth extends TabsPropsBase {
  fullWidth: true;
  fullWidthButtons?: boolean;
}

interface TabsPropsAutoWidth extends Omit<TabsPropsBase, 'fullWidthButtons'> {
  fullWidth?: false;
}

type TabsProps = TabsPropsFullWidth | TabsPropsAutoWidth;

const Tabs: FC<TabsProps> = (props) => {
  const {
    activeKey,
    onChange,
    items,
    className,
    tabItemClassName,
    fullWidth,
    variant = 'underline',
    orientation = 'horizontal',
  } = props;

  const fullWidthButtons = (props as TabsPropsFullWidth).fullWidthButtons;
  const isVertical = orientation === 'vertical';

  const enabledItems = items.filter((t) => !t.disabled);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = enabledItems.findIndex((t) => t.key === activeKey);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = enabledItems[(currentIndex + 1) % enabledItems.length];
        if (next) onChange(next.key);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length];
        if (prev) onChange(prev.key);
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (enabledItems[0]) onChange(enabledItems[0].key);
      } else if (e.key === 'End') {
        e.preventDefault();
        const last = enabledItems[enabledItems.length - 1];
        if (last) onChange(last.key);
      }
    },
    [activeKey, enabledItems, onChange],
  );

  const containerClass = clsx(
    'crow:flex',
    isVertical ? 'crow:flex-col' : 'crow:flex-row',
    variant === 'underline' &&
      !isVertical &&
      'crow:border-b crow:border-gray-200 crow:border-solid',
    variant === 'underline' && isVertical && 'crow:border-r crow:border-gray-200 crow:border-solid',
    variant === 'pills' && 'crow:gap-1 crow:p-1 crow:bg-gray-100 crow:rounded-xl',
    variant === 'card' && !isVertical && 'crow:border-b crow:border-gray-200 crow:border-solid',
    variant === 'card' && isVertical && 'crow:border-r crow:border-gray-200 crow:border-solid',
    fullWidth && !isVertical ? 'crow:w-full' : !isVertical ? 'crow:w-fit' : '',
    className,
  );

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={containerClass}
    >
      {items.map((tab) => {
        const isActive = activeKey === tab.key;

        if (variant === 'pills') {
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && onChange(tab.key)}
              disabled={tab.disabled}
              className={clsx(
                'crow:flex crow:items-center crow:gap-2 crow:px-4 crow:py-2 crow:rounded-lg crow:transition crow:font-p2-medium',
                {
                  'crow:bg-surface crow:shadow-sm crow:text-primary-600': isActive,
                  'crow:text-gray-500 crow:hover:text-gray-700': !isActive,
                  'crow:cursor-not-allowed crow:opacity-40': tab.disabled,
                  'crow:flex-1 crow:justify-center': fullWidth && fullWidthButtons,
                },
                tabItemClassName,
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.title}</span>
              {typeof tab.badgeNumber === 'number' && (
                <Badge
                  valueType="number"
                  value={tab.badgeNumber}
                  size="small"
                  color={isActive ? 'primary' : 'gray'}
                  className={clsx({ 'crow:opacity-60': !isActive })}
                />
              )}
            </button>
          );
        }

        if (variant === 'card') {
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && onChange(tab.key)}
              disabled={tab.disabled}
              className={clsx(
                'crow:flex crow:items-center crow:gap-2 crow:px-4 crow:py-2.5 crow:border crow:border-solid crow:transition crow:font-p2-medium crow:-mb-px',
                isVertical && 'crow:-mr-px crow:mb-0',
                {
                  'crow:bg-surface crow:border-gray-200 crow:border-b-surface crow:text-primary-600':
                    isActive && !isVertical,
                  'crow:bg-surface crow:border-gray-200 crow:border-r-surface crow:text-primary-600':
                    isActive && isVertical,
                  'crow:bg-gray-50 crow:border-transparent crow:text-gray-500 crow:hover:text-gray-700 crow:hover:bg-gray-100':
                    !isActive,
                  'crow:cursor-not-allowed crow:opacity-40': tab.disabled,
                  'crow:flex-1 crow:justify-center': fullWidth && fullWidthButtons,
                  'crow:rounded-t': !isVertical,
                  'crow:rounded-l': isVertical,
                },
                tabItemClassName,
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.title}</span>
              {typeof tab.badgeNumber === 'number' && (
                <Badge
                  valueType="number"
                  value={tab.badgeNumber}
                  size="small"
                  color={isActive ? 'primary' : 'gray'}
                  className={clsx({ 'crow:opacity-60': !isActive })}
                />
              )}
            </button>
          );
        }

        // underline (default)
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => !tab.disabled && onChange(tab.key)}
            disabled={tab.disabled}
            className={clsx(
              'crow:group crow:flex',
              isVertical ? 'crow:flex-row-reverse' : 'crow:flex-col',
              {
                'crow:flex-1': fullWidth && fullWidthButtons,
              },
            )}
          >
            <div
              className={clsx(
                'crow:flex crow:items-center crow:space-x-2 crow:px-3 crow:py-4 crow:transition',
                {
                  'crow:text-primary-500': isActive,
                  'crow:text-gray-500 crow:group-hover:text-gray-600': !isActive,
                  'crow:cursor-not-allowed crow:opacity-40': tab.disabled,
                  'crow:justify-center': fullWidth && fullWidthButtons,
                },
                tabItemClassName,
              )}
            >
              {tab.icon ? (
                <div
                  className={clsx('crow:transition', {
                    'crow:text-gray-400 crow:group-hover:text-gray-500': !isActive,
                  })}
                >
                  {tab.icon}
                </div>
              ) : null}
              <div>{tab.title}</div>
              {typeof tab.badgeNumber === 'number' && (
                <Badge
                  valueType="number"
                  value={tab.badgeNumber}
                  size="small"
                  className={clsx({
                    'crow:opacity-60': !isActive,
                    'crow:!opacity-100': tab.disabled,
                  })}
                  color={isActive ? 'primary' : 'gray'}
                />
              )}
            </div>
            <div
              className={clsx('crow:transition crow:rounded-t', {
                'crow:w-full crow:h-1': !isVertical,
                'crow:h-full crow:w-1 crow:rounded-l crow:rounded-tr-none': isVertical,
                'crow:bg-gray-300 crow:opacity-0 crow:group-hover:opacity-100':
                  !isActive && !tab.disabled,
                'crow:bg-primary-500': isActive,
              })}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
