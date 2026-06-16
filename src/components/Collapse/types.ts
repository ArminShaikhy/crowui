import type { ReactNode } from 'react';

export interface CollapseProps {
  /** Trigger content shown in the header row. */
  trigger: ReactNode;
  /** Controlled open state. Omit for uncontrolled usage with `defaultOpen`. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state whenever the trigger is toggled. */
  onOpenChange?: (open: boolean) => void;
  /** Hides the expand/collapse chevron icon. @default false */
  hideArrow?: boolean;
  /** Prevents the trigger from being toggled. @default false */
  disabled?: boolean;
  /** Extra class names on the root element. */
  className?: string;
  /** Extra class names on the trigger button. */
  triggerClassName?: string;
  /** Extra class names on the collapsible content area. */
  contentClassName?: string;
}
