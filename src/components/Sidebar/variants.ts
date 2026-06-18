import type { SidebarProps } from './types';

export const sidebarVariantStyle: Record<Required<SidebarProps>['variant'], string> = {
  filled: 'crow:bg-surface crow:shadow-md crow:border-transparent',
  bordered: 'crow:bg-surface crow:border crow:border-gray-200 crow:shadow-none',
  ghost: 'crow:bg-transparent crow:border-transparent crow:shadow-none',
};

export const sidebarItemSizeStyle: Record<
  Required<SidebarProps>['itemSize'],
  { secondLevel: string; thirdLevel: string }
> = {
  comfortable: {
    secondLevel: 'crow:min-h-12',
    thirdLevel: 'crow:h-10 crow:py-2',
  },
  compact: {
    secondLevel: 'crow:min-h-9',
    thirdLevel: 'crow:h-8 crow:py-1',
  },
};
