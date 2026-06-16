import type { ReactNode } from 'react';
import type { DeepNamePath } from '@/src/utils/types/deepNamePath';
import type { SelectProps } from '../Form/Select/types';
import type { PaginationProps } from '../Pagination';
import type { TooltipProps } from '../Tooltip';

type NonTypeSafeDataIndex = string | string[];
type TypeSafeDataIndex<T> = keyof T | DeepNamePath<T>;
type DataIndexPath<T> = [keyof T] extends [never] ? NonTypeSafeDataIndex : TypeSafeDataIndex<T>;

export type UnknownRecord = Record<string, unknown>;

export type SortValues = 'ascend' | 'descend';
interface ColumnsTypeBase<T> {
  title?: string;
  align?: 'start' | 'center' | 'end';
  className?: string;
  tooltip?: Omit<TooltipProps, 'children'> & {
    anchorIcon?: ReactNode;
  };
  sticky?: 'left' | 'right';
  ellipsis?:
    | boolean
    | {
        hideTooltip?: boolean;
      };
  render?: (record: T, index: number) => ReactNode;
  sort?: {
    active?: SortValues;
    onSort: (value: SortValues) => void;
  };
}

interface ColumnsTypeWithKey<T> {
  key: string;
  dataIndex?: DataIndexPath<T>;
}

interface ColumnsTypeWithDataIndex<T> {
  key?: string;
  dataIndex: DataIndexPath<T>;
}

export type ColumnsType<T extends UnknownRecord = UnknownRecord> = ColumnsTypeBase<T> &
  (ColumnsTypeWithKey<T> | ColumnsTypeWithDataIndex<T>);

export interface PageCountSelectorProps {
  options: SelectProps<number>['options'];
  defaultValue?: number;
  onPageCountChange?: (value: number) => void;
  selectProps?: Omit<
    SelectProps<number>,
    | 'options'
    | 'value'
    | 'onChange'
    | 'mode'
    | 'customInput'
    | 'dropdownType'
    | 'drawerProps'
    | 'optionsTitle'
    | 'separateSelectedOptions'
  >;
}

export interface TableHeaderProps {
  /** Heading text displayed above the table. */
  title?: string;
  /** Shows the total row count next to the title. @default false */
  showTotal?: boolean;
  /** Extra content rendered in the header's trailing area. */
  extraElement?: ReactNode;
  /** Extra class names on the header bar. */
  className?: string;
  /** Inline page-size selector configuration. */
  pageCountSelector?: PageCountSelectorProps;
}

export interface RowSelectionProps<T> extends Pick<ColumnsType, 'align' | 'sticky' | 'className'> {
  /** Called when a row's checkbox is toggled. Receives the event, the row key(s), and the row record. */
  onSelectRow: (e: React.ChangeEvent<HTMLInputElement>, key: string | string[], record?: T) => void;
  /** Array of currently selected row keys. */
  selectedRowKeys: string[];
}

export interface TableProps<T extends UnknownRecord = UnknownRecord> {
  /** Array of row data objects. */
  data: T[];
  /** Column definitions controlling headers, data access, and rendering. */
  columns: ColumnsType<T>[];
  /** Property on each row object used as the unique row key. */
  rowKey: [keyof T] extends [never] ? string : keyof T;
  /** Returns extra class names for a given row. */
  getRowClassName?: (record: T) => string | undefined;
  /** Optional table header bar configuration. */
  header?: TableHeaderProps;
  /** Keeps the `<thead>` visible while scrolling the table body. @default false */
  stickyTableHeader?: boolean;
  /** Enables row checkboxes for multi-selection. */
  rowSelection?: RowSelectionProps<T>;
  /** Pagination bar configuration. Omit to hide pagination. */
  pagination?: PaginationProps;
  /** Extra class names on the outermost wrapper. */
  wrapperClassName?: string;
  /** Extra class names on the scrollable container. */
  containerClassName?: string;
  /** Extra class names on the `<table>` element. */
  className?: string;
  /** Pass `true` for a default spinner overlay, or `{ size }` to customise the spinner size. @default false */
  loading?:
    | boolean
    | {
        size: number;
      };
  /** Content shown when `data` is empty. */
  emptyContent?: ReactNode;
  /** CSS `table-layout` value. @default 'auto' */
  layout?: 'fixed' | 'auto';
}
