import clsx from 'clsx';
import React from 'react';
import { TableContextProvider } from './context';
import TableHeader from './Header';
import TBody from './TBody';
import THead from './THead';
import type { TableProps, UnknownRecord } from './types';
import Pagination from '../Pagination';

import '@/src/styles.css';

function Table<T extends UnknownRecord>(props: Readonly<TableProps<T>>) {
  const {
    header,
    wrapperClassName,
    className,
    data,
    pagination,
    layout = 'auto',
    containerClassName,
  } = props;

  const haveHeader = (header && Object.values(header).length > 0) ?? false;
  const havePagination = Boolean(pagination?.totalCount && pagination?.pageSize);
  const ContainerElement = layout !== 'fixed' ? 'div' : React.Fragment;

  return (
    <div
      className={clsx(
        'crow:relative crow:bg-white crow:border crow:border-gray-200 crow:border-solid crow:rounded-2xl',
        wrapperClassName,
      )}
    >
      {haveHeader && (
        <TableHeader
          {...header}
          total={pagination?.totalCount ?? data.length}
        />
      )}
      <ContainerElement
        {...(layout !== 'fixed'
          ? { className: clsx('crow:overflow-x-auto crow:h-full', containerClassName) }
          : {})}
      >
        <TableContextProvider {...props}>
          <table
            className={className}
            style={{ tableLayout: layout }}
          >
            <THead haveHeader={haveHeader} />
            <TBody havePagination={havePagination} />
          </table>
        </TableContextProvider>
      </ContainerElement>
      {havePagination && (
        <Pagination
          className={clsx('crow:py-4 crow:!px-0', pagination?.className)}
          {...pagination!}
        />
      )}
    </div>
  );
}

export default Table;
export * from './types';
