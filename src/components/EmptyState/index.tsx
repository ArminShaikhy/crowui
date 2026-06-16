import clsx from 'clsx';
import type { FC } from 'react';
import IconFolderFileImage from '@/src/icons/IconFolderFileImage';
import type { EmptyStateProps } from './types';
import { sizeClassNames } from './variants';

import '@/src/styles.css';

export type { EmptyStateProps } from './types';

const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
}) => {
  const styles = sizeClassNames[size];

  return (
    <div
      role="status"
      className={clsx(
        'crow:flex crow:flex-col crow:items-center crow:text-center crow:max-w-md crow:mx-auto',
        styles.container,
        className,
      )}
    >
      <span className={clsx('crow:text-gray-400 crow:dark:text-gray-500', styles.icon)}>
        {icon ?? <IconFolderFileImage className="crow:w-full crow:h-full" />}
      </span>
      <div className="crow:flex crow:flex-col crow:gap-1">
        <p className={clsx('crow:text-gray-900 crow:dark:text-gray-50', styles.title)}>{title}</p>
        {description && (
          <p className={clsx('crow:text-gray-500 crow:dark:text-gray-400', styles.description)}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="crow:mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
