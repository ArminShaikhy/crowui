import clsx from 'clsx';
import type { ColumnsType, SortValues, TableProps, UnknownRecord } from './types';
import type { CheckboxProps } from '../Form/Checkbox';
import Checkbox from '../Form/Checkbox';

/** Cycles a column's sort state: ascend -> descend -> none (null) -> ascend ... */
export function getNextSortValue(active: SortValues | null): SortValues | null {
  if (active === 'ascend') return 'descend';
  if (active === 'descend') return null;
  return 'ascend';
}

export function getAlingmentClass(align: ColumnsType['align']) {
  switch (align) {
    case 'center':
      return 'crow:justify-center';
    case 'start':
      return 'crow:justify-start';
    case 'end':
      return 'crow:justify-end';
    default:
      return undefined;
  }
}

export function getColumnKey(
  key: ColumnsType['key'],
  dataIndex: ColumnsType<UnknownRecord>['dataIndex'],
) {
  if (key) return key;

  if (Array.isArray(dataIndex))
    return (dataIndex as Array<string>)[(dataIndex as Array<string>).length - 1];

  return dataIndex as string;
}

export function isSelectionAvailable<T extends UnknownRecord>(
  rowSelection: TableProps<T>['rowSelection'],
) {
  return Boolean(
    (rowSelection && rowSelection.selectedRowKeys.length > 1) ||
      typeof rowSelection?.onSelectRow === 'function',
  );
}

export function renderRowSelectCheckbox(
  alingment: ColumnsType['align'],
  checkboxProps?: CheckboxProps,
) {
  return (
    <div
      className={clsx(
        'crow:w-full crow:flex crow:items-center',
        getAlingmentClass(alingment ?? 'center'),
      )}
    >
      <Checkbox {...checkboxProps} />
    </div>
  );
}

export function getStickyClass(sticky: ColumnsType['sticky'], addBeforeBorderTop?: boolean) {
  if (!sticky) return;

  return clsx(
    'crow:sticky crow:z-10',
    'crow:after:content[""] crow:after:absolute crow:after:top-0 crow:after:h-full crow:after:w-[30px] crow:after:transition-shadow', // sticky shadow class
    {
      'crow:right-[-1px] crow:pr-[calc(1em+1px)] crow:after:left-0 crow:after:-translate-x-full crow:after:shadow-[inset_-10px_0_8px_-8px] crow:after:shadow-transparent':
        sticky === 'right',
      'crow:left-[-1px] crow:pl-[calc(1em+1px)] crow:after:right-0 crow:after:translate-x-full crow:after:shadow-[inset_10px_0_8px_-8px] crow:after:shadow-transparent':
        sticky === 'left',
      'crow:before:content-[""] crow:before:absolute crow:before:top-0 crow:before:right-0 crow:before:w-full crow:before:border-t crow:before:md:border-t-0 crow:before:border-solid crow:before:border-gray-200':
        addBeforeBorderTop,
    },
  );
}
