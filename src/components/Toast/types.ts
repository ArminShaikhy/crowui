export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastOptions {
  /** Text content of the toast notification. */
  message: string;
  /** Visual style conveying the notification type. @default 'info' */
  variant?: ToastVariant;
  /** Auto-dismiss delay in milliseconds. Uses `ToastProvider` default when omitted. */
  duration?: number;
  /** Screen corner where the toast appears. Uses `ToastProvider` default when omitted. */
  position?: ToastPosition;
}

export interface ToastItem extends Required<ToastOptions> {
  id: string;
}
