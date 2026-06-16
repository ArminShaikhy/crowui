'use client';

import { useEffect, useMemo, useRef } from 'react';
import { debounce } from '@/src/utils/debounce';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debounced = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        fnRef.current(...args);
      }, wait) as unknown as T & { cancel: () => void },
    [wait],
  );

  useEffect(() => () => debounced.cancel(), [debounced]);

  return debounced;
}
