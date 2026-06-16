import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './index';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Pagination from 'crow-ui/Pagination';\nOr\nimport { Pagination } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    siblingCount: {
      table: {
        defaultValue: { summary: '1' },
      },
    },
    navigationButtonsWithText: {
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    defaultCurrent: {
      table: {
        defaultValue: { summary: '1' },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 100,
    pageSize: 8,
  },
};
