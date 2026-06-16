import type { ListItemProps } from './types';

export const listItemSizeStyle: Record<Required<ListItemProps>['size'], string> = {
  comfortable: 'crow:gap-3 crow:px-3 crow:py-3 crow:min-h-12 crow:text-sm',
  compact: 'crow:gap-2 crow:px-2 crow:py-2 crow:min-h-9 crow:text-xs',
};

export const listItemStateStyle = {
  active: 'crow:bg-primary-50 crow:text-primary-600',
  default: 'crow:text-gray-700 crow:hover:bg-gray-50 crow:active:bg-gray-100',
  disabled: 'crow:opacity-50 crow:cursor-not-allowed crow:text-gray-400',
};
