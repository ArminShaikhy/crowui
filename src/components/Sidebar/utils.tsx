import clsx from 'clsx';
import { DURATION_CLASS } from './constants';
import type {
  FirstLevelSidebarItem,
  SecondLevelSidebarItem,
  SidebarProps,
  ThirdLevelSidebarItem,
} from './types';
import Badge from '../Badge';

export const showItemsClass = (isOpen: SidebarProps['isOpen']) =>
  clsx(
    'crow:transition-opacity crow:whitespace-pre crow:overflow-hidden',
    isOpen ? 'crow:opacity-100' : 'crow:opacity-0',
    DURATION_CLASS,
  );

export function getSecondLevelItemContent(
  item: SecondLevelSidebarItem,
  isOpen: SidebarProps['isOpen'],
) {
  return (
    <div
      className={clsx(
        'crow:flex crow:items-center crow:[&_svg]:size-6 crow:[&_svg]:shrink-0 crow:min-h-12 crow:text-start',
        isOpen ? 'crow:space-x-2' : 'crow:justify-center',
      )}
    >
      {item.icon}
      <div
        className={clsx(
          'crow:font-p2-regular crow:line-clamp-1 crow:!transition-[width,opacity]',
          isOpen ? 'crow:w-full' : 'crow:w-0',
          showItemsClass,
        )}
      >
        {item.title}
      </div>
      {item.badgeCount && (
        <Badge
          className={clsx('crow:shrink-0', {
            'crow:!absolute crow:top-0 crow:left-0': !isOpen,
          })}
          value={item.badgeCount}
          valueType="number"
          color="error"
          size="small"
        />
      )}
    </div>
  );
}

type ItemsUnionType = FirstLevelSidebarItem | SecondLevelSidebarItem | ThirdLevelSidebarItem;
export function searchItems(items: ItemsUnionType[], searchValue: string): ItemsUnionType[] {
  return items
    .map((item) => {
      if ('children' in item && item.children) {
        const filteredChildren = searchItems(item.children, searchValue);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
      }

      if (item.title.includes(searchValue)) {
        return { ...item };
      }

      return null;
    })
    .filter((item): item is ItemsUnionType => Boolean(item));
}
