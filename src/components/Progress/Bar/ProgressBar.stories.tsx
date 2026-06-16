import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from './index';

const meta = {
  title: 'Components/Progress/Bar',
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport ProgressBar from 'crow-ui/Progress/Bar';\nOr\nimport { ProgressBar } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'error', 'warning'],
      control: { type: 'select' },
      table: {
        type: { summary: 'primary, secondary, success, error, warning' },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      options: ['thin', 'medium', 'thick'],
      control: { type: 'select' },
      table: {
        type: { summary: 'thin, medium, thick' },
        defaultValue: { summary: 'thin' },
      },
    },
    striped: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    animated: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    currentShowType: {
      options: ['percentage', 'value'],
      control: { type: 'select' },
      table: {
        type: { summary: 'percentage, value' },
        defaultValue: {
          summary: 'percentage',
        },
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'عنوان',
    current: 50,
    total: 100,
    color: 'primary',
    currentShowType: 'percentage',
    className: 'crow:w-[400px]',
  },
};
