import clsx from 'clsx';
import { type FC, type RefObject } from 'react';
import type { PopperPosition } from '../Form/Wrappers/PickerWrapper/type';
import type { TooltipProps } from '.';

interface TooltipContentProps
  extends Pick<
    TooltipProps,
    'content' | 'footer' | 'title' | 'icon' | 'className' | 'position' | 'size' | 'theme'
  > {
  open: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const TAIL_POSITION_CLASS_NAME: Record<PopperPosition, string> = {
  bottom:
    'crow:right-4 crow:top-0 crow:-translate-y-1/2 crow:border-t crow:border-l crow:rounded-tl',
  'bottom-right':
    'crow:left-4 crow:top-0 crow:-translate-y-1/2 crow:border-t crow:border-l crow:rounded-tl',
  'bottom-center':
    'crow:left-1/2 crow:-translate-x-1/2 crow:top-0 crow:-translate-y-1/2 crow:border-t crow:border-l crow:rounded-tl',
  'bottom-left':
    'crow:right-4 crow:top-0 crow:-translate-y-1/2 crow:border-t crow:border-l crow:rounded-tl',
  top: 'crow:right-4 crow:bottom-0 crow:translate-y-1/2 crow:border-b crow:border-r crow:rounded-br',
  'top-right':
    'crow:left-4 crow:bottom-0 crow:translate-y-1/2 crow:border-b crow:border-r crow:rounded-br',
  'top-center':
    'crow:left-1/2 crow:-translate-x-1/2 crow:bottom-0 crow:translate-y-1/2 crow:border-b crow:border-r crow:rounded-br',
  'top-left':
    'crow:right-4 crow:bottom-0 crow:translate-y-1/2 crow:border-b crow:border-r crow:rounded-br',
};

const POSITION_CLASS_NAMES: Record<PopperPosition, string> = {
  bottom: 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:right-0',
  'bottom-right': 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:left-0',
  'bottom-center':
    'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:left-1/2 crow:-translate-x-1/2',
  'bottom-left': 'crow:bottom-0 crow:translate-y-[calc(100%+8px)] crow:right-0',
  top: 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:right-0',
  'top-right': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:left-0',
  'top-center': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:left-1/2 crow:-translate-x-1/2',
  'top-left': 'crow:top-0 crow:-translate-y-[calc(100%+8px)] crow:right-0',
};

const SIZE_CLASS: Record<NonNullable<TooltipProps['size']>, string> = {
  small: 'crow:p-2 crow:gap-1.5',
  medium: 'crow:p-4 crow:gap-2',
  large: 'crow:p-5 crow:gap-3',
};

const FONT_CLASS: Record<NonNullable<TooltipProps['size']>, string> = {
  small: 'crow:font-p3-regular',
  medium: 'crow:font-p2-regular',
  large: 'crow:font-p1-regular',
};

const THEME_CLASS: Record<
  NonNullable<TooltipProps['theme']>,
  { container: string; tail: string }
> = {
  dark: {
    container: 'crow:bg-gray-700 crow:text-white crow:border-gray-300',
    tail: 'crow:bg-gray-700 crow:border-gray-300',
  },
  light: {
    container: 'crow:bg-white crow:text-gray-800 crow:border-gray-200 crow:shadow-lg',
    tail: 'crow:bg-white crow:border-gray-200',
  },
};

const TooltipContent: FC<TooltipContentProps> = (props) => {
  const {
    content,
    footer,
    title,
    icon,
    className,
    position = 'top-center',
    open,
    ref,
    size = 'medium',
    theme = 'dark',
  } = props;

  const themeClasses = THEME_CLASS[theme];

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'crow:absolute crow:flex crow:max-w-[400px] crow:rounded-lg crow:border crow:shadow-md crow:transition crow:duration-300 crow:w-max crow:z-50',
        SIZE_CLASS[size],
        themeClasses.container,
        open ? 'crow:opacity-100 crow:scale-100' : 'crow:opacity-0 crow:scale-0',
        POSITION_CLASS_NAMES[position],
      )}
    >
      {icon && <span className="crow:shrink-0 crow:[&_svg]:size-5 crow:pt-1">{icon}</span>}

      <div className={clsx('crow:flex crow:flex-col crow:gap-1', FONT_CLASS[size])}>
        {title && <div className="crow:font-h5-bold">{title}</div>}
        {content}
        {footer}
      </div>
      <div
        className={clsx(
          'crow:w-4 crow:h-4 crow:absolute crow:rotate-45',
          themeClasses.tail,
          TAIL_POSITION_CLASS_NAME[position],
        )}
      />
    </div>
  );
};

export default TooltipContent;
