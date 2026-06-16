import clsx from 'clsx';
import React, { Children, Fragment, type FC } from 'react';

import '@/src/styles.css';

import ListItem from './ListItem';
import type { ListProps } from './types';
import Divider from '../Divider';

const ListComponent: FC<ListProps> = ({ children, className = '', divided = false }) => {
  const items = Children.toArray(children);

  return (
    <div
      role="list"
      className={clsx('crow:flex crow:w-full crow:flex-col crow:gap-0.5', className)}
    >
      {divided
        ? items.map((child, index) => (
            <Fragment key={(child as { key?: React.Key }).key ?? index}>
              {index > 0 && (
                <Divider
                  type="horizontal"
                  className="crow:!w-auto"
                />
              )}
              {child}
            </Fragment>
          ))
        : items}
    </div>
  );
};

interface IListComponent extends FC<ListProps> {
  Item: typeof ListItem;
}

const List = ListComponent as IListComponent;
List.Item = ListItem;

export default List;
export { ListItem };
export * from './types';
