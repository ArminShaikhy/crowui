import type { FileType } from './types';

export const DEFAULT_SIZE_CLASS = 'crow:h-[190px] crow:w-[330px]';
export const DEFAULT_GRID_SIZE_CLASS = 'crow:size-[120px]';
export const DEFAULT_COMPACT_SIZE_CLASS = 'crow:size-[96px]';
export const ABSOLUTE_CENTER =
  'crow:!absolute crow:top-1/2 crow:left-1/2 crow:-translate-y-1/2 crow:-translate-x-1/2';
export const FOCUS_CLASS =
  'crow:ring-offset-1 crow:ring-offset-transparent crow:has-[:focus]:ring-offset-white crow:ring-[3px] crow:ring-transparent crow:has-[:focus]:ring-primary-300';
export const ERROR_CLASS = 'crow:!border-error-500 crow:ring-4 crow:!ring-error-50';
export const DRAG_CLASS =
  'crow:!border-primary-500 crow:ring-4 crow:!ring-gray-100 crow:!bg-gray-50';
export const DISABLED_CLASS = 'crow:has-[:disabled]:opacity-50';
export const TITLE_CLASS: Record<Required<FileType>['status'] | 'loading', string> = {
  default: 'crow:bg-primary-50 crow:text-primary-500',
  loading: 'crow:bg-gray-500 crow:text-white',
  error: 'crow:bg-error-50 crow:text-error-500',
  warning: 'crow:bg-warning-50 crow:text-warning-700',
};

export const COMPACT_TITLE_CLASS: Record<Required<FileType>['status'] | 'loading', string> = {
  default: 'crow:bg-gray-800/60',
  loading: 'crow:bg-gray-800/60',
  error: 'crow:bg-red-500/60',
  warning: 'crow:bg-warning-500/60',
};

export const DEFAULT_LAYOUT_CLASS =
  'crow:space-y-4 crow:p-4 crow:flex crow:flex-col crow:justify-center crow:items-center';

export const COMPACT_LAYOUT_CLASS =
  'crow:p-2 crow:pb-6 crow:pt-4 crow:flex crow:flex-col crow:gap-1 crow:justify-between crow:items-center';
