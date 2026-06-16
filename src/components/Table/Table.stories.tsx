import type { Meta, StoryObj } from '@storybook/react';
import React, { FC, useState } from 'react';
import IconRefreshLeft from '../../icons/IconRefreshLeft';
import Button from '../Button';
import Table, { type ColumnsType } from './index';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Table from 'crow-ui/Table';\nOr\nimport { Table } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      table: {
        type: {
          summary: 'T[]',
        },
      },
    },
    columns: {
      control: 'object',
      table: {
        type: {
          summary: 'ColumnsType<T>',
          detail: `{
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
      // clicking the sort icon cycles ascend -> descend -> null
      active?: 'ascend' | 'descend' | null;
      onSort: (value: 'ascend' | 'descend' | null) => void;
    };
  filter?: ReactNode; // optional column filter slot, e.g. a text input
  key?: string;
  dataIndex?: string | string[]; (you should pass one of key or dataIndex)
}`,
        },
      },
    },
    header: {
      control: 'object',
      table: {
        type: {
          summary: 'TableHeaderProps',
          detail: `{
            title?: string;
            showTotal?: boolean;
              extraElement?: ReactNode;
            className?: string;
}`,
        },
      },
    },
    stickyTableHeader: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: "It only works if the wrapper element has height and the layout isn't fixed.",
    },
    pagination: {
      control: 'object',
      table: {
        type: {
          summary: 'PaginationProps',
        },
      },
    },
    rowKey: {
      description: "it's required if you want to use rowSelection",
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    rowSelection: {
      control: 'object',
      table: {
        type: {
          summary: 'RowSelectionProps<T>',
          detail: `Pick<ColumnsType, 'align' | 'sticky' | 'className'> & {
  onSelectRow: (e: React.ChangeEvent<HTMLInputElement>, key: string | string[], record?: T) => void;
  selectedRowKeys: string[];
}`,
        },
      },
    },
    wrapperClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    containerClassName: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    layout: {
      control: 'select',
      options: ['auto', 'fixed'],
      table: {
        type: {
          summary: 'auto, fixed',
        },
        defaultValue: {
          summary: 'auto',
        },
      },
      description: 'The table should have a width for the layout to work.',
    },
    loading: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean | {size: number}' },
      },
    },
    emptyContent: {
      control: 'object',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    getRowClassName: {
      control: 'object',
      table: {
        type: {
          summary: '(record: T) => string | undefined',
        },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const dataSource = [
  {
    id: '1',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
  {
    id: '2',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
  {
    id: '3',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
  {
    id: '4',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
  {
    id: '5',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
  {
    id: '6',
    title: 'نام محصول',
    price: 320000,
    details:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
  },
];

type RowData = (typeof dataSource)[0];

const columns: ColumnsType<RowData>[] = [
  {
    title: 'نام محصول',
    key: 'title',
    dataIndex: 'title',
    sort: {
      onSort() {},
    },
  },
  {
    title: 'قیمت',
    dataIndex: 'price',
    key: 'price',
    tooltip: {
      content: 'قیمت به تومان است.',
    },
  },
  {
    title: 'جزئیات',
    dataIndex: 'details',
    key: 'details',
    ellipsis: true,
  },
  {
    title: 'عملیات',
    key: 'actions',
    align: 'center',
    render: () => (
      <Button
        color="error"
        variant="outline"
        size="small"
      >
        حذف محصول
      </Button>
    ),
  },
];

const defaultArgs: Story['args'] = {
  data: dataSource,
  // @ts-expect-error: Column type (DeepPathName) doesn't work in storybook
  columns,
  className: 'crow:w-[800px]',
  layout: 'fixed',
  rowKey: 'id',
};

export const Default: Story = {
  args: defaultArgs,
};

export const WithHeaderAndPagination: Story = {
  args: {
    ...defaultArgs,
    header: {
      title: 'جدول محصولات',
      showTotal: true,
      extraElement: (
        <Button
          size="small"
          variant="text"
          rightIcon={<IconRefreshLeft />}
        />
      ),
    },
    pagination: {
      pageSize: 6,
      totalCount: 120,
    },
  },
};

export const WithPageCountSelector: Story = {
  args: {
    ...defaultArgs,
    header: {
      title: 'جدول محصولات',
      showTotal: true,
      pageCountSelector: {
        options: [
          { value: 10, label: '10' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 100, label: '100' },
        ],
        defaultValue: 10,
        onPageCountChange: (value) => console.error('page count changed:', value),
      },
    },
    pagination: {
      pageSize: 6,
      totalCount: 120,
    },
  },
};

const TableWithSelectionExample: FC<Story['args']> = (props) => {
  const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);

  return (
    <Table
      rowSelection={{
        selectedRowKeys,
        sticky: 'right',
        onSelectRow(e, key) {
          const isKeyArray = Array.isArray(key);
          if (isKeyArray) setselectedRowKeys(key);
          else if (e.target.checked) setselectedRowKeys((state) => [...state, key]);
          else setselectedRowKeys(selectedRowKeys.filter((rowKey) => rowKey !== key));
        },
      }}
      {...props}
    />
  );
};

export const WithSelection: Story = {
  args: defaultArgs,
  render: (args) => <TableWithSelectionExample {...args} />,
};

export const LongTable: Story = {
  args: {
    ...defaultArgs,
    data: Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      title: 'نام محصول',
      price: 320000,
      details:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    })),
    stickyTableHeader: true,
  },
};

const sortableData = [
  { id: '1', title: 'موز', price: 120000 },
  { id: '2', title: 'سیب', price: 80000 },
  { id: '3', title: 'پرتقال', price: 95000 },
  { id: '4', title: 'انگور', price: 210000 },
  { id: '5', title: 'هندوانه', price: 60000 },
];

type SortableRowData = (typeof sortableData)[0];

/**
 * Clicking a sortable header's icon cycles `ascend` -> `descend` -> `null` (not sorted).
 * The icon rotates with a CSS transition to reflect the current direction, and a
 * simple text filter is rendered next to the "نام محصول" header via `column.filter`.
 */
const TableWithSortAndFilterExample: FC = () => {
  const [sortState, setSortState] = useState<{
    key: string;
    direction: 'ascend' | 'descend' | null;
  } | null>(null);
  const [titleFilter, setTitleFilter] = useState('');

  const filteredData = sortableData.filter((row) =>
    row.title.toLowerCase().includes(titleFilter.trim().toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortState?.direction) return 0;

    const result =
      (a as SortableRowData)[sortState.key as keyof SortableRowData] >
      (b as SortableRowData)[sortState.key as keyof SortableRowData]
        ? 1
        : -1;

    return sortState.direction === 'ascend' ? result : -result;
  });

  const sortableColumns: ColumnsType<SortableRowData>[] = [
    {
      title: 'نام محصول',
      key: 'title',
      dataIndex: 'title',
      sort: {
        active: sortState?.key === 'title' ? sortState.direction : null,
        onSort: (value) => setSortState(value ? { key: 'title', direction: value } : null),
      },
      filter: (
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          placeholder="فیلتر نام..."
          className="crow:font-p2-regular crow:w-24 crow:rounded-lg crow:border crow:border-solid crow:border-gray-200 crow:bg-surface crow:px-2 crow:py-1 crow:text-gray-700 crow:outline-none crow:focus:border-primary-500"
        />
      ),
    },
    {
      title: 'قیمت',
      key: 'price',
      dataIndex: 'price',
      sort: {
        active: sortState?.key === 'price' ? sortState.direction : null,
        onSort: (value) => setSortState(value ? { key: 'price', direction: value } : null),
      },
    },
  ];

  return (
    <Table
      data={sortedData}
      columns={sortableColumns}
      rowKey="id"
      className="crow:w-[600px]"
      layout="fixed"
    />
  );
};

export const SortableWithFilter: Story = {
  render: () => <TableWithSortAndFilterExample />,
};
