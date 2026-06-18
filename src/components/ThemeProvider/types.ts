import type { ReactNode, RefObject } from 'react';

export type ColorMode = 'light' | 'dark' | 'system';
export type ResolvedColorMode = 'light' | 'dark';

export interface ThemeProviderProps {
  children: ReactNode;
  /** Controlled color mode. Omit to let the provider manage its own state. */
  mode?: ColorMode;
  /** Initial color mode when uncontrolled. Defaults to 'system'. */
  defaultMode?: ColorMode;
  onModeChange?: (mode: ResolvedColorMode) => void;
  /** Sets a `data-brand` attribute on the target element, the hook future brand/preset CSS can key off. */
  brand?: string;
  /** localStorage key used to persist the resolved mode. Defaults to 'crow-theme-mode'. */
  storageKey?: string;
  /** Where the `.dark` class (and `data-brand` attribute) is applied. Defaults to `document.documentElement`. */
  attachTo?: 'documentElement' | RefObject<HTMLElement | null>;
}

export interface ThemeContextValue {
  mode: ResolvedColorMode;
  setMode: (mode: ColorMode) => void;
  brand?: string;
  setBrand: (brand: string | undefined) => void;
}
