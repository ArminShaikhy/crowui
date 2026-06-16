'use client';

import { useRef, useState } from 'react';

const DEFAULT_REMOVE_TIMEOUT = 400;

export interface UsePopoverOptions {
  removeTimeout?: number;
  disabled?: boolean;
}

export interface UsePopoverReturn {
  isVisible: boolean;
  isInDom: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function usePopover({
  removeTimeout = DEFAULT_REMOVE_TIMEOUT,
  disabled = false,
}: UsePopoverOptions = {}): UsePopoverReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [isInDom, setIsInDom] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function open() {
    if (disabled) return;
    clearTimer();
    setIsInDom(true);
    timer.current = setTimeout(() => {
      setIsVisible(true);
      timer.current = null;
    }, 0);
  }

  function close() {
    clearTimer();
    setIsVisible(false);
    timer.current = setTimeout(() => {
      setIsInDom(false);
      timer.current = null;
    }, removeTimeout);
  }

  function toggle() {
    if (isInDom) close();
    else open();
  }

  return { isVisible, isInDom, open, close, toggle };
}
