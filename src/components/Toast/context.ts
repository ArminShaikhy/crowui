import { createContext, useContext } from 'react';
import type { ToastItem, ToastOptions } from './types';

export interface ToastContextValue {
  toasts: ToastItem[];
  add: (options: ToastOptions) => string;
  remove: (id: string) => void;
  clear: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
