import type { ReactNode } from 'react';
import type { ButtonProps } from '../Button';

export interface BannerActionProps
  extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {
  text: string;
}

export interface BannerProps {
  /** Visual severity style. @default 'info' */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Main banner message (required). */
  text: ReactNode;
  /** Optional bold heading rendered before `text`. */
  title?: string;
  /** Action button rendered at the end of the banner. Omit to hide. */
  action?: BannerActionProps;
  /** Renders a dismiss (✕) button that animates the banner out. @default false */
  closable?: boolean;
  /** Hides the leading status icon. @default false */
  hideIcon?: boolean;
  /** Pins the banner to the top of its container via `position: sticky`. @default false */
  sticky?: boolean;
  /** Called after the dismiss animation finishes and the banner has unmounted. */
  onClose?: () => void;
  /** Extra class names on the root element. */
  className?: string;
}
