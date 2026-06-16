'use client';

import clsx from 'clsx';
import type { FC } from 'react';
import IconArrowDown2 from '@/src/icons/IconArrowDown2';
import IconInfoCircleOutline from '@/src/icons/IconInfoCircleOutline';
import { isArraysEqual } from '@/src/utils/isArraysEqual';
import TabelCell from './Cell';
import { useTableContext } from './context';
import type { ColumnsType, TableProps, UnknownRecord } from './types';
import {
  getAlingmentClass,
  getColumnKey,
  getNextSortValue,
  isSelectionAvailable,
  renderRowSelectCheckbox,
} from './utils';
import Divider from '../Divider';
import Tooltip from '../Tooltip';

interface THeadProps {
  haveHeader: boolean;
}

const ICON_SIZE = 16;
const TH_CLASS =
  'crow:p-4 crow:pl-0 crow:text-gray-500 crow:bg-gray-50 crow:border-b crow:border-solid crow:border-gray-200';
const DIVIDER_CLASS = 'crow:!h-8 crow:shrink-0 crow:mr-2';

function renderSortButton(sort: Required<ColumnsType>['sort'], columnTitle?: string) {
  const active = sort.active ?? null;

  return (
    <button
      type="button"
      onClick={() => sort.onSort(getNextSortValue(active))}
      aria-label={columnTitle ? `Sort by ${columnTitle}` : 'Sort column'}
      aria-sort={active === 'ascend' ? 'ascending' : active === 'descend' ? 'descending' : 'none'}
      className="crow:flex crow:items-center crow:justify-center"
    >
      <IconArrowDown2
        width={ICON_SIZE}
        height={ICON_SIZE}
        className={clsx('crow:transition-transform crow:duration-300 crow:ease-in-out', {
          'crow:rotate-180 crow:text-primary-500': active === 'ascend',
          'crow:rotate-0 crow:text-primary-500': active === 'descend',
          'crow:rotate-0 crow:text-gray-500': active === null,
        })}
      />
    </button>
  );
}

function getThContent(title: ColumnsType['title'], tooltip?: ColumnsType['tooltip']) {
  return (
    <div className="crow:font-p1-medium crow:flex crow:items-center crow:space-x-1">
      <span>{title}</span>
      {tooltip &&
        (tooltip.anchorIcon ?? (
          <IconInfoCircleOutline
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        ))}
    </div>
  );
}

function getAllDataKey<T extends UnknownRecord>(
  data: TableProps<T>['data'],
  rowKey: TableProps<T>['rowKey'],
) {
  return data.map((record) => record[rowKey] as string);
}

const THead: FC<THeadProps> = (props) => {
  const { haveHeader } = props;
  const { columns, rowKey, rowSelection, data, stickyTableHeader } = useTableContext();

  return (
    <thead>
      <tr>
        {isSelectionAvailable(rowSelection) && (
          <TabelCell
            type="th"
            className={clsx(
              TH_CLASS,
              { 'crow:rounded-tr-2xl': !haveHeader },
              rowSelection?.className,
            )}
            sticky={rowSelection?.sticky}
            stuckToTop={stickyTableHeader}
          >
            <div className="crow:flex crow:items-center crow:justify-between">
              {renderRowSelectCheckbox(rowSelection?.align, {
                checked: rowSelection!.selectedRowKeys.length > 0,
                isIndeterminate: !isArraysEqual(
                  getAllDataKey(data, rowKey),
                  rowSelection!.selectedRowKeys,
                ),
                onChange: (e) =>
                  rowSelection?.onSelectRow(e, e.target.checked ? getAllDataKey(data, rowKey) : []),
              })}
              <Divider
                type="vertical"
                className={DIVIDER_CLASS}
              />
            </div>
          </TabelCell>
        )}
        {columns.map((column, index) => (
          <TabelCell
            type="th"
            sticky={column.sticky}
            key={getColumnKey(column.key, column.dataIndex)}
            className={clsx(
              TH_CLASS,
              {
                'crow:first:rounded-tr-2xl crow:last:rounded-tl-2xl': !haveHeader,
              },
              column.className,
            )}
            stuckToTop={stickyTableHeader}
          >
            <div className="crow:flex crow:justify-between crow:items-center">
              <div
                className={clsx(
                  'crow:flex crow:items-center crow:space-x-2 crow:w-full',
                  getAlingmentClass(column.align),
                )}
              >
                {column.tooltip?.content ? (
                  <Tooltip
                    {...column.tooltip}
                    attachToBody
                  >
                    {getThContent(column.title, column.tooltip)}
                  </Tooltip>
                ) : (
                  getThContent(column.title)
                )}
                {typeof column.sort?.onSort === 'function' &&
                  renderSortButton(column.sort, column.title)}
                {column.filter && (
                  <div className="crow:flex crow:items-center">{column.filter}</div>
                )}
              </div>
              {index !== columns.length - 1 && (
                <Divider
                  type="vertical"
                  className={DIVIDER_CLASS}
                />
              )}
            </div>
          </TabelCell>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
