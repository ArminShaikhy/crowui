import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconHome from '../../icons/IconHome';
import Card from './index';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Card from 'crow-ui/Card';\nOr\nimport { Card } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    header: {
      table: {
        type: {
          summary: 'Partial<CardHeaderProps>',
          detail: `CardHeaderProps {
          color: CardColor;
          title: string;
          icon: ReactNode;
          variant: CardTitleVariant;
          Element: ReactNode;
          className?: string;
        }`,
        },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'warning', 'error', 'success', 'gray', 'white', 'ghost'],
      table: {
        type: {
          summary: `'primary' | 'warning' | 'error' | 'success' | 'gray' | 'white' | 'ghost'`,
        },
        defaultValue: { summary: 'white' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      table: {
        type: { summary: `'small' | 'medium'` },
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: { summary: `'none' | 'sm' | 'md' | 'lg'` },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'crow:w-[400px]',
    header: {
      icon: <IconHome />,
      title: 'عنوان',
      color: 'gray',
      variant: 'primary',
    },
    color: 'white',
    size: 'medium',
    children: <div>بدنه</div>,
  },
};
