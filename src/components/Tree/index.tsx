'use client';
import '@/src/styles.css';
import clsx from 'clsx';
import { Children, isValidElement, useId, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import IconArrowDown2 from '@/src/icons/IconArrowDown2';
import { TREE_INDENT_PX } from './constants';
import { treeContext, treeDepthContext, useTreeContext, useTreeDepth } from './context';
import type { TreeNodeProps, TreeProps } from './types';

const Tree: FC<TreeProps> = (props) => {
  const { children, className, selectable = false, defaultSelectedKey, onSelect } = props;
  const [selectedKey, setSelectedKey] = useState<string | null>(defaultSelectedKey ?? null);

  function selectNode(key: string) {
    if (!selectable) return;
    setSelectedKey(key);
    onSelect?.(key);
  }

  return (
    <div
      role="tree"
      className={clsx('crow:flex crow:flex-col crow:font-p1-regular crow:text-gray-600', className)}
    >
      <treeContext.Provider
        value={{
          selectedKey: selectable ? selectedKey : null,
          selectNode,
        }}
      >
        {children}
      </treeContext.Provider>
    </div>
  );
};

export const TreeNode: FC<PropsWithChildren<TreeNodeProps>> = (props) => {
  const {
    children,
    label,
    icon,
    nodeKey,
    defaultExpanded = false,
    disabled = false,
    className,
    labelClassName,
    contentClassName,
  } = props;
  const { selectedKey, selectNode } = useTreeContext();
  const depth = useTreeDepth();
  const reactUseId = useId();
  const treeNodeKey = nodeKey ?? reactUseId;
  const hasChildren = Children.toArray(children).some((child) => isValidElement(child));
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isSelected = selectedKey === treeNodeKey;
  const contentId = `${treeNodeKey}-content`;

  function handleToggle() {
    if (disabled) return;
    if (hasChildren) setIsExpanded((previous) => !previous);
    selectNode(treeNodeKey);
  }

  return (
    <div
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className={clsx('crow:flex crow:flex-col', className)}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-controls={hasChildren ? contentId : undefined}
        style={{ paddingInlineStart: depth * TREE_INDENT_PX }}
        className={clsx(
          'crow:flex crow:items-center crow:gap-1.5 crow:w-full crow:py-1.5 crow:pr-2 crow:rounded-md crow:transition-colors crow:duration-150 crow:text-start',
          disabled
            ? 'crow:opacity-50 crow:cursor-not-allowed crow:text-gray-400'
            : clsx(
                'crow:cursor-pointer crow:hover:bg-gray-50',
                isSelected ? 'crow:bg-primary-50 crow:text-primary-600' : 'crow:text-gray-600',
              ),
        )}
      >
        <span className="crow:flex crow:items-center crow:justify-center crow:w-4 crow:h-4 crow:shrink-0">
          {hasChildren && (
            <IconArrowDown2
              className={clsx(
                'crow:transition-transform crow:duration-300 crow:w-3.5 crow:h-3.5',
                isExpanded && 'crow:rotate-180',
              )}
              aria-hidden="true"
            />
          )}
        </span>
        {icon && (
          <span className="crow:flex crow:items-center crow:justify-center crow:w-4 crow:h-4 crow:shrink-0">
            {icon}
          </span>
        )}
        <span className={clsx('crow:truncate', labelClassName)}>{label}</span>
      </button>
      {hasChildren && (
        <div
          id={contentId}
          role="group"
          className={clsx(
            'crow:grid crow:overflow-hidden crow:transition-all crow:duration-300 crow:ease-in-out',
            isExpanded
              ? 'crow:grid-rows-[1fr] crow:opacity-100'
              : 'crow:grid-rows-[0fr] crow:opacity-0',
            contentClassName,
          )}
        >
          <div className="crow:overflow-hidden">
            <treeDepthContext.Provider value={depth + 1}>{children}</treeDepthContext.Provider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tree;
