import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Divider from './index';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Divider from 'crow-ui/Divider';\nOr\nimport { Divider } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['thin', 'thick'],
      table: {
        defaultValue: { summary: 'thin' },
      },
    },
    color: {
      control: 'select',
      options: ['white', 'gray', 'primary', 'success', 'error', 'warning'],
      table: {
        defaultValue: { summary: 'gray' },
        type: { summary: 'white, gray, primary, success, error, warning' },
      },
    },
    style: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      table: {
        defaultValue: { summary: 'solid' },
        type: { summary: 'solid, dashed, dotted' },
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'vertical',
    size: 'thin',
    color: 'gray',
  },
  render: (args) => (
    <div className="crow:w-[100px] crow:h-[100px] crow:flex crow:justify-center crow:items-center">
      <Divider {...args} />
    </div>
  ),
};
