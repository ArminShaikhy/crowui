import type { ReactNode } from 'react';
import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';

export interface PopconfirmProps {
  /** Render-prop that returns the trigger element. Receives `toggle`, a `ref` to attach to the trigger, and `isOpen`. */
  trigger: (toggle: () => void, ref: React.Ref<HTMLElement>, isOpen: boolean) => ReactNode;
  /** Bold heading inside the popover panel. */
  title?: ReactNode;
  /** Body copy explaining the action being confirmed. */
  description?: ReactNode;
  /** Label for the confirm (primary) button. @default 'تایید' */
  confirmLabel?: ReactNode;
  /** Label for the cancel (outline) button. @default 'انصراف' */
  cancelLabel?: ReactNode;
  /** Called when the user clicks the confirm button. */
  onConfirm?: () => void;
  /** Called when the user clicks the cancel button. */
  onCancel?: () => void;
  /** Shows a loading spinner on the confirm button and disables it. @default false */
  confirmLoading?: boolean;
  /** Prevents the popover from opening. @default false */
  disabled?: boolean;
  /** Preferred display position relative to the trigger. Auto-flips if there is insufficient space. @default 'top-center' */
  position?: PopperPosition;
  /** Extra class names on the popover panel. */
  className?: string;
  /** Extra class names on the trigger wrapper element. */
  wrapperClassName?: string;
}
