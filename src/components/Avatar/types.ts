import type { HTMLAttributes, ReactNode } from 'react';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Image URL. Falls back to initials/icon if missing or if it fails to load. */
  src?: string;
  /** Alt text for the image; also used to derive fallback initials. */
  alt?: string;
  /** Explicit initials to show as a fallback (overrides initials derived from `alt`). */
  initials?: string;
  /** Icon rendered as a fallback when no `src`/`initials`/`alt` is usable. */
  icon?: ReactNode;
  /** Controls the avatar's diameter. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Shape of the avatar. @default 'round' */
  shape?: 'round' | 'square';
  /** Presence/status indicator dot. Omit to render no dot. */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Extra class names on the root element. */
  className?: string;
}

export interface AvatarGroupProps {
  /** `Avatar` elements to stack. */
  children: ReactNode;
  /** Maximum number of avatars shown before collapsing into a "+N" indicator. */
  max?: number;
  /** Size applied to every avatar in the group (overrides each child's own `size`). @default 'md' */
  size?: AvatarProps['size'];
  /** Shape applied to every avatar in the group (overrides each child's own `shape`). @default 'round' */
  shape?: AvatarProps['shape'];
  /** Extra class names on the root element. */
  className?: string;
}
