import type { ReactNode } from 'react';
import type { DrawerProps } from '@/src/components/Drawer';
import type { InputProps } from '../../Input';

export type PopperPosition =
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface PickerWrapperPropsBase {
  /** Shows a loading state on the trigger input. @default false */
  isLoading?: boolean;
  /** Prevents the dropdown from opening. @default false */
  disabled?: boolean;
  /** Extra class names on the outer wrapper element. */
  wrapperClassName?: string;
}

interface PickerWrapperWithCustomInput {
  /** Custom trigger render function. Receives `isOpen` to reflect open state. Mutually exclusive with `inputProps`. */
  customInput?: (isOpen: boolean) => ReactNode;
  inputProps?: never;
}

interface PickerWrapperWithoutCustomInput {
  /** Props forwarded to the default Input trigger (excluding `leftIcon`). Mutually exclusive with `customInput`. */
  inputProps?: Omit<InputProps, 'leftIcon'>;
  customInput?: never;
}

interface PickerWrapperWithDrawerContainer {
  /** How the dropdown is rendered: `'popover'` (positioned overlay) or `'drawer'` (bottom sheet). @default 'popover' */
  dropdownType: 'drawer';
  /** Props forwarded to the Drawer when `dropdownType` is `'drawer'`. */
  drawerProps?: Omit<DrawerProps, 'children' | 'onClose' | 'open'>;
  popoverClassName?: never;
  popoverPosition?: never;
}

interface PickerWrapperWithPopoverContainer {
  /** How the dropdown is rendered: `'popover'` (positioned overlay) or `'drawer'` (bottom sheet). @default 'popover' */
  dropdownType?: 'popover';
  /** Extra class names on the popover panel. */
  popoverClassName?: string;
  drawerProps?: never;
  /** Preferred popover position relative to the trigger. Auto-flips if there is insufficient space. @default 'bottom-left' */
  popoverPosition?: PopperPosition;
}

export type PickerWrapperProps = PickerWrapperPropsBase &
  (PickerWrapperWithCustomInput | PickerWrapperWithoutCustomInput) &
  (PickerWrapperWithDrawerContainer | PickerWrapperWithPopoverContainer);
