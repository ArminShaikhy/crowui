import type { ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icon or illustration rendered above the title. Falls back to a default illustration when omitted. */
  icon?: ReactNode;
  /** Main heading text (required). */
  title: string;
  /** Supporting copy rendered below the title. */
  description?: string;
  /** Action slot rendered below the description, e.g. a `<Button />`. */
  action?: ReactNode;
  /** Controls spacing and typography scale. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Extra class names on the root element. */
  className?: string;
}
