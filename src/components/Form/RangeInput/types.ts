import type { ReactNode } from 'react';

export type RangeValueType = number | number[];

export type TooltipSize = 'small' | 'medium' | 'large' | 'xLarge';

export interface RangeInputProps<T extends RangeValueType> {
  /** Current value. Pass a single `number` for a single thumb, or `number[]` for a range slider. */
  value: T;
  /** Called with the updated value when the user moves the thumb(s). */
  onChange: (value: T) => void;
  /** Minimum allowed value. */
  min: number;
  /** Maximum allowed value. */
  max: number;
  /** Track and thumb color. @default 'primary' */
  color?: 'primary' | 'secondary';
  /** Pass `true` for a default value tooltip, or a `ReactNode` for a custom tooltip. @default false */
  tooltip?: boolean | ReactNode;
  /** Tooltip panel size when using the default tooltip. @default 'medium' */
  tooltipSize?: TooltipSize;
  /** Extra class names on the tooltip. */
  tooltipClassName?: string;
  /** Step increment between thumb positions. @default 1 */
  step?: number;
  /** Dims the slider and blocks interaction. @default false */
  disabled?: boolean;
  /** Label rendered at the start (minimum) end of the track. */
  startTitle?: string;
  /** Label rendered at the end (maximum) end of the track. */
  endTitle?: string;
  /** Extra class names on the root wrapper. */
  wrapperClassName?: string;
}
