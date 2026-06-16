export interface SpinnerProps {
  /** Controls the spinner's diameter and stroke width. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Color palette applied to the spinner's active arc. @default 'primary' */
  color?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'success'
    | 'error'
    | 'warning'
    | 'sky'
    | 'violet'
    | 'flamingo';
  /** Accessible label exposed to assistive tech (the spinner has no visible text). @default 'Loading' */
  label?: string;
  /** Extra class names on the spinner element. */
  className?: string;
}
