'use client';
import clsx from 'clsx';
import { useState } from 'react';
import type { FC } from 'react';
import type { TableHeaderProps } from './types';
import Badge from '../Badge';
import Select from '../Form/Select';

const TableHeader: FC<TableHeaderProps & { total?: number }> = (props) => {
  const { title, extraElement, showTotal, total, className, pageCountSelector } = props;

  const initialPageCount =
    pageCountSelector?.defaultValue ?? pageCountSelector?.options?.[0]?.value ?? 0;
  const [pageCount, setPageCount] = useState<number>(initialPageCount);

  function handlePageCountChange(value: number) {
    setPageCount(value);
    pageCountSelector?.onPageCountChange?.(value);
  }

  return (
    <div
      className={clsx(
        'crow:p-4 crow:flex crow:items-center crow:space-x-1 crow:border-b crow:border-solid crow:border-gray-200',
        className,
      )}
    >
      <div className="crow:font-h4-bold crow:text-gray-700 crow:w-full">{title}</div>
      {pageCountSelector && (
        <div className="crow:flex  crow:ml-2 crow:items-center crow:gap-2 crow:shrink-0 crow:mr-2">
          <span className="crow:font-p2-regular crow:text-gray-700 crow:whitespace-nowrap">
            تعداد نمایش:
          </span>
          <Select<number>
            {...pageCountSelector.selectProps}
            wrapperClassName={clsx('crow:w-20', pageCountSelector.selectProps?.wrapperClassName)}
            popoverClassName={clsx(
              'crow:!min-w-0',
              pageCountSelector.selectProps?.popoverClassName,
            )}
            inputProps={{
              size: 1,
              containerClassName: clsx(
                'crow:!p-2 crow:!gap-x-1',
                pageCountSelector.selectProps?.inputProps?.containerClassName,
              ),
              ...pageCountSelector.selectProps?.inputProps,
            }}
            mode="single"
            options={pageCountSelector.options}
            value={pageCount}
            searchable={false}
            onChange={handlePageCountChange}
          />
        </div>
      )}
      {showTotal && (
        <div className="crow:flex crow:items-center crow:shrink-0">
          <span className="crow:font-p2-regular crow:text-gray-700 crow:ml-1">تعداد نتایج:</span>
          <Badge
            value={total ?? 0}
            valueType="number"
            size="large"
            color="primary"
            type="twoTone"
          />
        </div>
      )}
      {extraElement}
    </div>
  );
};

export default TableHeader;
