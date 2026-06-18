import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

export interface MenuContextType {
  close: () => void;
}

export interface MenuProps {
  /** Render-prop that returns the trigger element. Receives `toggle`, a `ref` to attach to the trigger, and `isOpen`. */
  trigger: (toggle: () => void, ref: React.Ref<HTMLElement>, isOpen: boolean) => React.ReactNode;
  /** Menu item content (typically `<MenuItem>` elements). */
  children: React.ReactNode;
  /** Extra class names on the dropdown panel. */
  className?: string;
  /** Extra class names on the popover wrapper. */
  popoverClassName?: string;
  /** Preferred display position of the dropdown relative to the trigger. @default 'bottom-right' */
  position?: PopperPosition;
  /** Visual style of the dropdown panel. @default 'default' */
  panelVariant?: 'default' | 'minimal';
}

export interface MenuTitleProps {
  /** Section heading text or node. */
  children: React.ReactNode;
  /** Extra class names on the title element. */
  className?: string;
}

export interface MenuItemProps {
  /** Item label or content. */
  children: React.ReactNode;
  /** Called when the item is clicked. */
  onClick?: () => void;
  /** Extra class names on the item row. */
  className?: string;
  /** Dims the item and prevents click. @default false */
  disabled?: boolean;
  /** Leading icon rendered before the label. */
  icon?: React.ReactNode;
  /** Trailing element rendered after the label (e.g. keyboard shortcut badge). */
  endElement?: React.ReactNode;
  /** Color palette applied to the item. @default 'default' */
  color?: 'default' | 'danger';
  /** Controls item height and padding. @default 'comfortable' */
  size?: 'compact' | 'comfortable';
  /** Marks the item as the current selection; shows a check mark by default. @default false */
  active?: boolean;
}
