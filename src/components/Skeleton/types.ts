export interface SkeletonProps {
  /** Width of the skeleton (number = px, string = CSS value). */
  width?: string | number;
  /** Height of the skeleton (number = px, string = CSS value). */
  height?: string | number;
  /** Shape: full-width text `'line'`, rounded rectangle `'block'`, or circular `'circle'`. @default 'block' */
  variant?: 'line' | 'block' | 'circle';
  /** Enables the pulse animation. @default true */
  animate?: boolean;
  /** Extra class names on the skeleton element. */
  className?: string;
}
