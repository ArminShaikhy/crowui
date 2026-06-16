import type { Meta, StoryObj } from '@storybook/react';

import Spinner from './index';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Spinner from 'crow-ui/Spinner';\nOr\nimport { Spinner } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      table: {
        type: { summary: 'sm, md, lg' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      options: [
        'primary',
        'secondary',
        'gray',
        'success',
        'error',
        'warning',
        'sky',
        'violet',
        'flamingo',
      ],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'primary, secondary, gray, success, error, warning, sky, violet, flamingo',
        },
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Colors: StoryObj = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-4">
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="gray" />
      <Spinner color="success" />
      <Spinner color="error" />
      <Spinner color="warning" />
      <Spinner color="sky" />
      <Spinner color="violet" />
      <Spinner color="flamingo" />
    </div>
  ),
};

export const InButtonLikeContext: StoryObj = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-2 crow:bg-primary-500 crow:text-white crow:px-4 crow:py-2 crow:rounded-md crow:w-fit">
      <Spinner
        size="sm"
        color="primary"
        className="crow:border-white/40 crow:border-t-white"
      />
      <span className="crow:font-button-small">Loading…</span>
    </div>
  ),
};
