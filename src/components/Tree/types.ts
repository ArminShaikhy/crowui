import type { ReactNode } from 'react';

export interface TreeContextValue {
  /** Currently selected node key, if selection is enabled. */
  selectedKey?: string | null;
  /** Selects a node. */
  selectNode: (key: string) => void;
}

export interface TreeNodeProps {
  /** Unique key identifying this node within the tree. Defaults to React's `useId` value. */
  nodeKey?: string;
  /** Label content shown next to the expand/collapse chevron. */
  label: ReactNode;
  /** Optional leading icon rendered before the label. */
  icon?: ReactNode;
  /** Whether this node starts expanded. @default false */
  defaultExpanded?: boolean;
  /** Prevents this node's toggle/select interactions. @default false */
  disabled?: boolean;
  /** Extra class names on the node row. */
  className?: string;
  /** Extra class names on the label text wrapper. */
  labelClassName?: string;
  /** Extra class names on the children container. */
  contentClassName?: string;
  /** Child `TreeNode` elements, if any. */
  children?: ReactNode;
}

export interface TreeProps {
  /** `TreeNode` elements composing the tree. */
  children: ReactNode;
  /** Extra class names on the tree root. */
  className?: string;
  /** Enables single-node selection highlighting. @default false */
  selectable?: boolean;
  /** Key of the node selected on initial render (only relevant when `selectable`). */
  defaultSelectedKey?: string;
  /** Called when a node is selected (only relevant when `selectable`). */
  onSelect?: (key: string) => void;
}
