import clsx from 'clsx';
import '@/src/styles.css';

interface DividerProps {
  /** Orientation of the divider line. */
  type: 'horizontal' | 'vertical';
  /** Line weight. @default 'thin' */
  size?: 'thin' | 'thick';
  /** Border color. @default 'gray' */
  color?: 'white' | 'gray' | 'primary' | 'success' | 'error' | 'warning';
  /** Border style. @default 'solid' */
  style?: 'solid' | 'dashed' | 'dotted';
  /** Extra class names on the divider element. */
  className?: string;
}

const COLOR_CLASS: Record<Required<DividerProps>['color'], string> = {
  white: 'crow:border-gray-100',
  gray: 'crow:border-gray-200',
  primary: 'crow:border-primary-300',
  success: 'crow:border-success-400',
  error: 'crow:border-error-300',
  warning: 'crow:border-warning-400',
};

const STYLE_CLASS: Record<Required<DividerProps>['style'], string> = {
  solid: 'crow:border-solid',
  dashed: 'crow:border-dashed',
  dotted: 'crow:border-dotted',
};

const SIZE_CLASS: Record<
  Required<DividerProps>['type'],
  Record<Required<DividerProps>['size'], string>
> = {
  horizontal: {
    thin: 'crow:w-full crow:border-t crow:border-t-[1px]',
    thick: 'crow:w-full crow:border-t crow:border-t-4',
  },
  vertical: {
    thin: 'crow:h-full crow:border-l crow:border-l-[1px]',
    thick: 'crow:h-full crow:border-l crow:border-l-4',
  },
};

const Divider = ({
  type,
  size = 'thin',
  color = 'gray',
  style = 'solid',
  className,
}: DividerProps) => {
  return (
    <div
      className={clsx(SIZE_CLASS[type][size], COLOR_CLASS[color], STYLE_CLASS[style], className)}
    />
  );
};

export default Divider;
