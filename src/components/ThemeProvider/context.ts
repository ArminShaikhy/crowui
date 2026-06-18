import { createContext, useContext } from 'react';
import type { ThemeContextValue } from './types';

export const themeContext = createContext<ThemeContextValue>({
  mode: 'light',
  setMode: () => {},
  setBrand: () => {},
});

export const useTheme = () => useContext(themeContext);
