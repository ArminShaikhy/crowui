import type { JSX, ReactNode } from 'react';

export interface CommandItem {
  /** Stable unique identifier for the command. */
  id: string;
  /** Primary label shown in the list and matched against the search query. */
  label: string;
  /** Optional secondary text shown under/next to the label (not matched against by default). */
  description?: string;
  /** Optional leading icon/element. */
  icon?: JSX.Element;
  /** Optional group/category key used to cluster items under a heading. */
  group?: string;
  /** Optional keywords matched against the search query in addition to `label`. */
  keywords?: string[];
  /** Optional trailing node (e.g. a shortcut hint). */
  shortcut?: ReactNode;
  /** Disables selection/activation for this item. @default false */
  disabled?: boolean;
  /** Called when the item is activated (Enter or click). */
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  /** Whether the palette is open. Omit to let the component manage its own open state via the trigger shortcut. */
  open?: boolean;
  /** Called whenever the open state changes (trigger shortcut, Escape, backdrop click, or item selection). */
  onOpenChange?: (open: boolean) => void;
  /** Commands available to search and select. */
  items: CommandItem[];
  /** Called when an item is activated (Enter or click), after its own `onSelect`. */
  onSelect?: (item: CommandItem) => void;
  /** Placeholder text for the search input. @default 'Search commands…' */
  placeholder?: string;
  /** Text shown when no items match the query. @default 'No results found.' */
  emptyMessage?: string;
  /** Disables the built-in Cmd/Ctrl+K shortcut that toggles the palette. @default false */
  disableShortcut?: boolean;
  /** Closes the palette automatically after an item is selected. @default true */
  closeOnSelect?: boolean;
  /** Extra class names on the panel surface. */
  className?: string;
  /** Aria-label for the dialog. @default 'Command palette' */
  ariaLabel?: string;
}
