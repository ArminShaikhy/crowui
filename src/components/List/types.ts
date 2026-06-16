import type React from 'react';

export interface ListProps {
  /** List content, typically `<ListItem>` elements. */
  children: React.ReactNode;
  /** Extra class names on the list container. */
  className?: string;
  /** Renders a divider between consecutive items. @default false */
  divided?: boolean;
}

export interface ListItemProps {
  /** Item label or content. */
  children: React.ReactNode;
  /** Called when the item is clicked. Renders the item as an interactive `button`. */
  onClick?: () => void;
  /** Extra class names on the item row. */
  className?: string;
  /** Dims the item and prevents click. @default false */
  disabled?: boolean;
  /** Leading slot rendered before the content (e.g. icon or avatar). */
  leading?: React.ReactNode;
  /** Trailing slot rendered after the content (e.g. action button or badge). */
  trailing?: React.ReactNode;
  /** Marks the item as the current selection. @default false */
  active?: boolean;
  /** Visual density of the item. @default 'comfortable' */
  size?: 'compact' | 'comfortable';
}
