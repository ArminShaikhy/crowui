'use client';
import clsx from 'clsx';
import { useEffect, useRef, type FC } from 'react';
import { useToast } from './context';
import type { ToastItem } from './types';

const VARIANT_STYLES: Record<ToastItem['variant'], string> = {
  info: 'crow:bg-primary-50 crow:border-primary-200 crow:text-primary-800',
  success: 'crow:bg-success-50 crow:border-success-200 crow:text-success-800',
  warning: 'crow:bg-warning-50 crow:border-warning-200 crow:text-warning-800',
  error: 'crow:bg-error-50 crow:border-error-200 crow:text-error-800',
};

const ICON: Record<ToastItem['variant'], string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

interface Props {
  toast: ToastItem;
}

const Toast: FC<Props> = ({ toast }) => {
  const { remove } = useToast();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (toast.duration > 0) {
      timerRef.current = setTimeout(() => remove(toast.id), toast.duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, remove]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(
        'crow:flex crow:items-start crow:gap-2 crow:px-4 crow:py-3',
        'crow:rounded-lg crow:border crow:shadow-md crow:min-w-64 crow:max-w-sm',
        'crow:font-p2-regular crow:animate-in crow:fade-in crow:slide-in-from-top-2',
        VARIANT_STYLES[toast.variant],
      )}
    >
      <span
        className="crow:text-base crow:leading-none crow:mt-0.5"
        aria-hidden="true"
      >
        {ICON[toast.variant]}
      </span>
      <span className="crow:flex-1">{toast.message}</span>
      <button
        onClick={() => remove(toast.id)}
        aria-label="Dismiss notification"
        className="crow:ml-1 crow:opacity-60 crow:hover:opacity-100 crow:transition-opacity crow:text-current"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
