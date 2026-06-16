import type { Meta, StoryObj } from '@storybook/react';

import Banner from './index';

const meta = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Banner from 'crow-ui/Banner';\nOr\nimport { Banner } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'select' },
      table: {
        type: { summary: 'info, success, warning, error' },
        defaultValue: { summary: 'info' },
      },
    },
    closable: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hideIcon: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    sticky: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    action: {
      table: {
        type: {
          detail:
            "interface BannerActionProps extends Omit<ButtonProps, 'variant' | 'color' | 'size' | 'children'> {\ntext: string;\n}",
        },
      },
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'New version available',
    text: 'A new version of the app is ready. Refresh the page to update.',
    closable: true,
    action: { text: 'Refresh' },
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    text: 'This is an informational banner.',
    closable: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    text: 'Your changes have been saved successfully.',
    closable: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    text: 'Your subscription is about to expire.',
    closable: true,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    text: 'We could not process your request. Please try again.',
    closable: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    text: 'A banner without a leading icon.',
    hideIcon: true,
    closable: true,
  },
};

export const NotClosable: Story = {
  args: {
    variant: 'warning',
    text: 'This banner cannot be dismissed.',
    closable: false,
  },
};

export const Sticky: Story = {
  args: {
    variant: 'info',
    title: 'Sticky banner',
    text: 'This banner stays pinned to the top of its scroll container.',
    sticky: true,
    closable: true,
  },
  decorators: [
    (Story) => (
      <div className="crow:h-64 crow:overflow-y-auto crow:border crow:border-gray-200 crow:rounded-lg">
        <Story />
        <div className="crow:p-4 crow:space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>Scrollable content row {i + 1}</p>
          ))}
        </div>
      </div>
    ),
  ],
};
