import type { ReactNode } from 'react';

export interface SegmentedControlOption<Value extends string = string> {
  /** Unique value identifying this segment. */
  value: Value;
  /** Visible label for the segment. */
  label: ReactNode;
  /** Optional leading icon rendered before the label. */
  icon?: ReactNode;
  /** Disables this specific segment. @default false */
  disabled?: boolean;
}

export interface SegmentedControlProps<Value extends string = string> {
  /** The list of segments to render. */
  options: SegmentedControlOption<Value>[];
  /** Currently selected segment value. */
  value: Value;
  /** Called with the newly selected segment value. */
  onChange: (value: Value) => void;
  /** Visual style of the control. @default 'default' */
  variant?: 'default' | 'outline';
  /** Size of the control, affecting padding and font size. @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** Stretches the control to fill its container width, distributing segments evenly. @default false */
  fullWidth?: boolean;
  /** Disables the entire control. @default false */
  disabled?: boolean;
  /** Extra class names on the root container. */
  className?: string;
  /** Extra class names applied to each segment button. */
  segmentClassName?: string;
  /** Accessible label for the control (`aria-label` on the `radiogroup`). */
  'aria-label'?: string;
}
