import type { ReactNode } from 'react';
import type { InputProps } from '../Input';
import type { PickerWrapperProps } from '../Wrappers/PickerWrapper/type';

export type Option<T> = {
  /** Underlying value used for selection and comparison. */
  value: T;
  /** Human-readable label shown in the dropdown. */
  label: string;
  /** When true, the option is shown but cannot be selected. @default false */
  disabled?: boolean;
};
type SelectPropsBase<T> = {
  /** List of selectable options. */
  options: Option<T>[];
  /** Pass `true` for a default search input, or an `InputProps` object to customise it. @default false */
  searchable?: boolean | Omit<InputProps, 'onChange'>;
  /** Custom render function for each option row. Receives the option and whether it is currently active. */
  optionCell?: (option: Option<T>, isActive: boolean) => ReactNode;
  /** Extra class names on each option cell wrapper. */
  optionCellClassName?: string;
  /** Content rendered above the options list inside the dropdown. */
  beforeOptions?: ReactNode;
  /** Content rendered below the options list inside the dropdown. */
  afterOptions?: ReactNode;
  /** Shown when `options` is empty. */
  emptyContent?: ReactNode;
  /** Shows a "clear" button when no option is selected. @default false */
  showClearButtonOnEmpty?: boolean;
};

export type SelectWithSingleMode<T> = {
  mode?: 'single';
  value: T;
  onChange: (value: T) => void;
  optionsTitle?: never;
  separateSelectedOptions?: never;
};

export type SelectWithMultipleMode<T> = {
  mode: 'multiple';
  value: T[];
  onChange: (value: T[]) => void;
  optionsTitle?: string;
  separateSelectedOptions?: boolean;
};

export type SelectProps<T> = SelectPropsBase<T> &
  PickerWrapperProps &
  (SelectWithSingleMode<T> | SelectWithMultipleMode<T>);
