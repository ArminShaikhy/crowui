import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconArrowLeft2 from '../../icons/IconArrowLeft2';
import IconArrowRight2 from '../../icons/IconArrowRight2';

import Button from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Button from 'crow-ui/Button';\nOr\nimport { Button } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    children: { control: 'object', table: { type: { summary: 'ReactNode' } } },
    rightIcon: { control: 'object', table: { type: { summary: 'ReactNode' } } },
    leftIcon: { control: 'object', table: { type: { summary: 'ReactNode' } } },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text', 'ghost', 'link'],
      table: {
        type: { summary: 'primary, secondary, outline, text, ghost, link' },
      },
    },
    color: {
      options: ['primary', 'gray', 'success', 'error', 'warning', 'sky', 'violet', 'flamingo'],
      control: 'select',
      table: {
        type: { summary: 'primary, gray, success, error, warning, sky, violet, flamingo' },
      },
    },
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: 'select',
      table: {
        type: { summary: 'small, medium, large, xlarge' },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'عنوان',
    rightIcon: <IconArrowRight2 />,
    leftIcon: <IconArrowLeft2 />,
  },
};
