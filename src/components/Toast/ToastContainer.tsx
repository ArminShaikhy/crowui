'use client';
import clsx from 'clsx';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import type { ToastItem, ToastPosition } from './types';

const POSITION_STYLES: Record<ToastPosition, string> = {
  'top-right': 'crow:top-4 crow:right-4 crow:items-end',
  'top-left': 'crow:top-4 crow:left-4 crow:items-start',
  'top-center': 'crow:top-4 crow:left-1/2 crow:-translate-x-1/2 crow:items-center',
  'bottom-right': 'crow:bottom-4 crow:right-4 crow:items-end',
  'bottom-left': 'crow:bottom-4 crow:left-4 crow:items-start',
  'bottom-center': 'crow:bottom-4 crow:left-1/2 crow:-translate-x-1/2 crow:items-center',
};

interface Props {
  toasts: ToastItem[];
}

const ToastContainer: FC<Props> = ({ toasts }) => {
  if (typeof document === 'undefined') return null;

  const byPosition = toasts.reduce<Record<ToastPosition, ToastItem[]>>(
    (acc, t) => {
      acc[t.position] = [...(acc[t.position] ?? []), t];
      return acc;
    },
    {} as Record<ToastPosition, ToastItem[]>,
  );

  return createPortal(
    <>
      {(Object.entries(byPosition) as [ToastPosition, ToastItem[]][]).map(([position, items]) => (
        <div
          key={position}
          aria-label="Notifications"
          className={clsx(
            'crow:fixed crow:z-50 crow:flex crow:flex-col crow:gap-2 crow:pointer-events-none',
            POSITION_STYLES[position],
          )}
        >
          {items.map((t) => (
            <div
              key={t.id}
              className="crow:pointer-events-auto"
            >
              <Toast toast={t} />
            </div>
          ))}
        </div>
      ))}
    </>,
    document.body,
  );
};

export default ToastContainer;
