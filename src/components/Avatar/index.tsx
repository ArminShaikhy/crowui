import clsx from 'clsx';
import { useState, type FC } from 'react';
import IconUser from '@/src/icons/IconUser';
import type { AvatarProps } from './types';
import {
  avatarIconSizeStyle,
  avatarShapeStyle,
  avatarSizeStyle,
  avatarStatusSizeStyle,
  avatarStatusStyle,
} from './variants';

import '@/src/styles.css';

export type { AvatarProps } from './types';

function getInitials(value?: string) {
  if (!value) return '';
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return (parts[0] ?? '').slice(0, 2).toUpperCase();
  const first = parts[0] ?? '';
  const last = parts[parts.length - 1] ?? '';
  return ((first[0] ?? '') + (last[0] ?? '')).toUpperCase();
}

const Avatar: FC<AvatarProps> = ({
  src,
  alt = '',
  initials,
  icon,
  size = 'md',
  shape = 'round',
  status,
  className,
  ...rest
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = Boolean(src) && !imageFailed;
  const resolvedInitials = initials ?? getInitials(alt);

  return (
    <span
      {...rest}
      className={clsx(
        'crow:relative crow:inline-flex crow:shrink-0 crow:items-center crow:justify-center crow:overflow-hidden crow:bg-gray-100 crow:text-gray-600 crow:select-none crow:dark:bg-gray-700 crow:dark:text-gray-200 crow:transition-colors crow:duration-300',
        avatarSizeStyle[size],
        avatarShapeStyle[shape],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageFailed(true)}
          className="crow:size-full crow:object-cover crow:animate-in crow:fade-in crow:duration-300"
        />
      ) : resolvedInitials ? (
        <span className="crow:uppercase crow:leading-none">{resolvedInitials}</span>
      ) : (
        <span className={avatarIconSizeStyle[size]}>
          {icon ?? <IconUser className="crow:size-full" />}
        </span>
      )}

      {status && (
        <span
          aria-label={status}
          className={clsx(
            'crow:absolute crow:right-0 crow:bottom-0 crow:rounded-full crow:ring-2 crow:ring-surface crow:dark:ring-gray-900',
            avatarStatusStyle[status],
            avatarStatusSizeStyle[size],
          )}
        />
      )}
    </span>
  );
};

export default Avatar;
export { AvatarGroup } from './Group';
export type { AvatarGroupProps } from './types';
