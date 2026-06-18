import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { themeContext } from './context';
import type { ColorMode, ResolvedColorMode, ThemeProviderProps } from './types';

import '@/src/styles.css';

const DEFAULT_STORAGE_KEY = 'crow-theme-mode';

function getSystemMode(): ResolvedColorMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredMode(storageKey: string): ColorMode | undefined {
  if (typeof window === 'undefined') return undefined;
  const stored = window.localStorage.getItem(storageKey);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : undefined;
}

function resolveTarget(attachTo: ThemeProviderProps['attachTo']): HTMLElement | undefined {
  if (typeof document === 'undefined') return undefined;
  if (!attachTo || attachTo === 'documentElement') return document.documentElement;
  return attachTo.current ?? undefined;
}

/**
 * Optional sugar over the library's raw dark-mode mechanism: adding a
 * `.dark` class to any ancestor element is sufficient on its own (that's
 * exactly what this component does under the hood). Use ThemeProvider when
 * you want React-managed system-preference detection, persistence, and a
 * `useTheme()` hook for building a toggle UI.
 *
 * To avoid a flash of the wrong theme on first paint, set the `.dark` class
 * (read from your own persisted storage) via an inline script in <head>
 * before React hydrates - ThemeProvider can't run early enough to prevent it.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  mode: controlledMode,
  defaultMode = 'system',
  onModeChange,
  brand,
  storageKey = DEFAULT_STORAGE_KEY,
  attachTo,
}) => {
  const [uncontrolledMode, setUncontrolledMode] = useState<ColorMode>(
    () => readStoredMode(storageKey) ?? defaultMode,
  );
  const [internalBrand, setInternalBrand] = useState(brand);

  const mode = controlledMode ?? uncontrolledMode;

  const resolvedMode: ResolvedColorMode = useMemo(
    () => (mode === 'system' ? getSystemMode() : mode),
    [mode],
  );
  const [systemMode, setSystemMode] = useState<ResolvedColorMode>(getSystemMode);

  useEffect(() => {
    if (mode !== 'system' || typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setSystemMode(media.matches ? 'dark' : 'light');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [mode]);

  const effectiveMode: ResolvedColorMode = mode === 'system' ? systemMode : resolvedMode;

  useEffect(() => {
    const target = resolveTarget(attachTo);
    if (!target) return;
    target.classList.toggle('dark', effectiveMode === 'dark');
    onModeChange?.(effectiveMode);
  }, [effectiveMode, attachTo, onModeChange]);

  useEffect(() => {
    const target = resolveTarget(attachTo);
    if (!target) return;
    if (internalBrand) target.setAttribute('data-brand', internalBrand);
    else target.removeAttribute('data-brand');
  }, [internalBrand, attachTo]);

  useEffect(() => {
    setInternalBrand(brand);
  }, [brand]);

  const setMode = useCallback(
    (next: ColorMode) => {
      setUncontrolledMode(next);
      if (typeof window !== 'undefined') window.localStorage.setItem(storageKey, next);
    },
    [storageKey],
  );

  const setBrand = useCallback((next: string | undefined) => {
    setInternalBrand(next);
  }, []);

  const value = useMemo(
    () => ({ mode: effectiveMode, setMode, brand: internalBrand, setBrand }),
    [effectiveMode, setMode, internalBrand, setBrand],
  );

  return <themeContext.Provider value={value}>{children}</themeContext.Provider>;
};

export { useTheme } from './context';
export type { ColorMode, ResolvedColorMode, ThemeProviderProps } from './types';
export default ThemeProvider;
