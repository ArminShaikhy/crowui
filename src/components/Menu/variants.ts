import type { MenuItemProps, MenuProps } from './types';

export const menuPanelStyle: Record<Required<MenuProps>['panelVariant'], string> = {
  default: 'crow:bg-surface crow:shadow-lg crow:ring-1 crow:ring-gray-200',
  minimal: 'crow:bg-surface crow:border crow:border-gray-100',
};

export const menuItemColorStyle: Record<Required<MenuItemProps>['color'], string> = {
  default:
    'crow:text-gray-600 crow:hover:bg-gray-50 crow:hover:text-gray-900 crow:focus:bg-gray-100',
  danger:
    'crow:text-error-500 crow:hover:bg-error-50 crow:hover:text-error-500 crow:focus:bg-error-50',
};

export const menuItemSizeStyle: Record<Required<MenuItemProps>['size'], string> = {
  comfortable: 'crow:p-3 crow:min-h-12 crow:text-sm',
  compact: 'crow:p-2 crow:min-h-9 crow:text-xs',
};
