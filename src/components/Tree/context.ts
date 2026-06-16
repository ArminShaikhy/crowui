import { createContext, useContext } from 'react';
import { ROOT_DEPTH } from './constants';
import type { TreeContextValue } from './types';

export const treeContext = createContext<TreeContextValue>({
  selectedKey: null,
  selectNode: () => {},
});

export const useTreeContext = () => useContext(treeContext);

/** Tracks how deeply nested the current `TreeNode` is, for indentation. */
export const treeDepthContext = createContext<number>(ROOT_DEPTH);

export const useTreeDepth = () => useContext(treeDepthContext);
