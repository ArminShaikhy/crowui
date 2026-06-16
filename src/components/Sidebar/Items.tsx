'use client';

import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useRef, useState, type FC } from 'react';
import { debounce } from '@/src/utils/debounce';
import {
  ACTIVE_CLASS,
  DISABLED_CLASS,
  ITEMS_SHARED_CLASS,
  SECOND_LEVEL_ACTIVE_CLASS,
} from './constants';
import { useSidebarContext } from './context';
import SidebarSearchInput from './SearchInput';
import type { FirstLevelSidebarItem, SecondLevelSidebarItem } from './types';
import { getSecondLevelItemContent, searchItems, showItemsClass } from './utils';
import { AccordionGroup, AccordionItem } from '../Accordion';
import Badge from '../Badge';
import Divider from '../Divider';

function findSecondLevelItemWithActiveChild(
  items: FirstLevelSidebarItem[],
): SecondLevelSidebarItem | null {
  let foundedItem: SecondLevelSidebarItem | null = null;

  items.some((FLevel) => {
    return FLevel.children?.some((SLevel) => {
      if (SLevel.children?.some((TLevel) => TLevel.active)) {
        foundedItem = SLevel;
        return true;
      }
      return false;
    });
  });

  return foundedItem;
}

const SidebarItems: FC = () => {
  const { isOpen, searchInput = true, items } = useSidebarContext();
  const [search, setSearch] = useState('');
  const [innerItems, setInnerItems] = useState(items ?? []);
  const secondLevelItemWithActiveChild = findSecondLevelItemWithActiveChild(innerItems);

  const itemsRef = useRef(items ?? []);
  useEffect(() => {
    itemsRef.current = items ?? [];
  }, [items]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      setInnerItems(searchItems(itemsRef.current, searchValue) as FirstLevelSidebarItem[]);
    }, 800),
    [],
  );

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    setSearch(searchValue);
    debouncedSearch(searchValue);
  }

  function handleSearchClear() {
    setSearch('');
    setInnerItems(items ?? []);
  }

  useEffect(() => {
    if (search) handleSearchClear();
  }, [isOpen]);

  return (
    <div className="crow:overflow-y-auto crow:overflow-x-hidden crow:-mx-4 crow:h-3/4 crow:no-scrollbar">
      {Boolean(searchInput) && (
        <SidebarSearchInput
          value={search}
          onChange={handleSearchChange}
        />
      )}
      <div className="crow:space-y-6 crow:px-4">
        {innerItems.map((item, index) => (
          <Fragment key={item.title}>
            <div
              className={clsx('crow:font-p2-regular crow:text-gray-400', showItemsClass(isOpen))}
            >
              {item.title}
            </div>
            <AccordionGroup
              defaultActiveKey={
                secondLevelItemWithActiveChild
                  ? secondLevelItemWithActiveChild.link || secondLevelItemWithActiveChild.title
                  : undefined
              }
              className="crow:mt-4 crow:space-y-2"
            >
              {item.children?.map((secondLevelItem) =>
                secondLevelItem.link ? (
                  <a
                    key={secondLevelItem.link}
                    href={secondLevelItem.link}
                    className={clsx(
                      'crow:pr-3',
                      secondLevelItem.disabled && DISABLED_CLASS,
                      secondLevelItem.active && SECOND_LEVEL_ACTIVE_CLASS,
                      isOpen ? 'crow:pl-9' : 'crow:pl-3',
                      ITEMS_SHARED_CLASS,
                    )}
                  >
                    {getSecondLevelItemContent(secondLevelItem, isOpen)}
                  </a>
                ) : (
                  <AccordionItem
                    key={secondLevelItem.link ?? secondLevelItem.title}
                    accordionKey={secondLevelItem.link ?? secondLevelItem.title}
                    className={clsx('crow:!p-0', secondLevelItem.disabled && DISABLED_CLASS)}
                    title={getSecondLevelItemContent(secondLevelItem, isOpen)}
                    hideDivider
                    hideArrow={!isOpen || secondLevelItem.disabled}
                    disable={!isOpen || secondLevelItem.disabled}
                    titleClassName={clsx(
                      'crow:[&_>div:first-child]:flex-1 crow:[&_>div:first-child]:pl-1',
                      isOpen ? 'crow:px-3' : 'crow:!justify-center',
                      ((secondLevelItemWithActiveChild?.link &&
                        secondLevelItemWithActiveChild?.link === secondLevelItem.link) ||
                        secondLevelItemWithActiveChild?.title === secondLevelItem.title) &&
                        SECOND_LEVEL_ACTIVE_CLASS,
                      ITEMS_SHARED_CLASS,
                    )}
                  >
                    {secondLevelItem.children?.map((thirdLevelItem) => (
                      <a
                        key={thirdLevelItem.link}
                        href={thirdLevelItem.link}
                        className={clsx(
                          'crow:flex crow:justify-between crow:h-10 crow:pl-9 crow:pr-11 crow:py-2 crow:mt-1 crow:first:mt-0',
                          thirdLevelItem.disabled && DISABLED_CLASS,
                          thirdLevelItem.active && ACTIVE_CLASS,
                          ITEMS_SHARED_CLASS,
                        )}
                      >
                        <p>{thirdLevelItem.title}</p>
                        {thirdLevelItem.badgeCount && (
                          <Badge
                            valueType="number"
                            value={thirdLevelItem.badgeCount}
                            color="error"
                            type="twoTone"
                            size="small"
                          />
                        )}
                      </a>
                    ))}
                  </AccordionItem>
                ),
              )}
            </AccordionGroup>
            {index !== innerItems.length - 1 && <Divider type="horizontal" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
