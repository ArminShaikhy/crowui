'use client';
import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import { ToastContext } from './context';
import ToastContainer from './ToastContainer';
import type { ToastItem, ToastOptions } from './types';

export { useToast } from './context';
export type { ToastOptions, ToastPosition, ToastVariant, ToastItem } from './types';

interface Props {
  children: ReactNode;
  defaultPosition?: ToastOptions['position'];
  defaultDuration?: number;
}

const ToastProvider: FC<Props> = ({
  children,
  defaultPosition = 'top-right',
  defaultDuration = 4000,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const item: ToastItem = {
        id,
        message: options.message,
        variant: options.variant ?? 'info',
        duration: options.duration ?? defaultDuration,
        position: options.position ?? defaultPosition,
      };
      setToasts((prev) => [...prev, item]);
      return id;
    },
    [defaultPosition, defaultDuration],
  );

  const clear = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ toasts, add, remove, clear }), [toasts, add, remove, clear]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
