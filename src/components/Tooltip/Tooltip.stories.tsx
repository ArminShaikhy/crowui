import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconInfoCircleOutline from '../../icons/IconInfoCircleOutline';
import { fullWidthStory } from '../../utils/storybook/helpers';

import Tooltip from './index';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Tooltip from 'crow-ui/Tooltip';\nOr\nimport { Tooltip } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    children: {
      description: 'The element to hover on',
    },
    position: {
      table: {
        type: {
          summary: 'top-right, top-center, top-left, bottom-right, bottom-center, bottom-left',
        },
        defaultValue: {
          summary: 'top-center',
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'small, medium, large' },
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      table: {
        type: { summary: 'dark, light' },
        defaultValue: { summary: 'dark' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () =>
    fullWidthStory({
      height: '400px',
    }),
  args: {
    children: <span>hover me</span>,
    title: 'عنوان پیام',
    icon: <IconInfoCircleOutline />,
    content:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.',
    footer: (
      <div className="crow:flex crow:gap-1 crow:justify-end crow:font-p3-medium crow:text-gray-300 crow:ss02">
        <span>۱۴:۳۴</span>
        <span>.</span>
        <span className="crow:[direction:ltr]">۱۴۰۲ \ ۰۹ \ ۲۲</span>
      </div>
    ),
  },
};
