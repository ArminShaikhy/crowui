import clsx from 'clsx';
import { Children, cloneElement, isValidElement, type FC, type ReactElement } from 'react';
import type { AvatarGroupProps, AvatarProps } from './types';
import { avatarShapeStyle, avatarSizeStyle } from './variants';

import '@/src/styles.css';

const ringClass =
  'crow:ring-2 crow:ring-surface crow:dark:ring-gray-900 crow:transition-transform crow:duration-300 crow:hover:-translate-y-0.5 crow:hover:z-10';

const AvatarGroup: FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  shape = 'round',
  className,
}) => {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];

  const visibleItems = typeof max === 'number' ? items.slice(0, max) : items;
  const overflowCount = typeof max === 'number' ? items.length - visibleItems.length : 0;

  return (
    <div className={clsx('crow:flex crow:items-center crow:-space-x-3', className)}>
      {visibleItems.map((child, index) =>
        cloneElement(child, {
          key: child.key ?? index,
          size,
          shape,
          className: clsx(ringClass, child.props.className),
        }),
      )}

      {overflowCount > 0 && (
        <span
          className={clsx(
            'crow:relative crow:inline-flex crow:shrink-0 crow:items-center crow:justify-center crow:bg-gray-200 crow:text-gray-700 crow:font-p3-medium crow:select-none crow:dark:bg-gray-600 crow:dark:text-gray-100',
            ringClass,
            avatarSizeStyle[size],
            avatarShapeStyle[shape],
          )}
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
};

export default AvatarGroup;
export { AvatarGroup };
