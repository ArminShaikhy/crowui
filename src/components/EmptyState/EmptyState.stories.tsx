import type { Meta, StoryObj } from '@storybook/react';
import IconSearch from '@/src/icons/IconSearch';
import Button from '../Button';
import EmptyState from './index';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport EmptyState from 'crow-ui/EmptyState';\nOr\nimport { EmptyState } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    description: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      table: {
        type: { summary: 'sm, md, lg' },
        defaultValue: { summary: 'md' },
      },
    },
    icon: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    action: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No data found',
    description: 'There is nothing to show here yet.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No results',
    description: 'Try adjusting your filters or search terms.',
    icon: <IconSearch className="crow:w-full crow:h-full" />,
    action: <Button variant="primary">Clear filters</Button>,
  },
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="crow:flex crow:flex-col crow:gap-8">
      <EmptyState
        size="sm"
        title="Small"
        description="Compact empty state for tight spaces."
      />
      <EmptyState
        size="md"
        title="Medium"
        description="Default empty state size."
      />
      <EmptyState
        size="lg"
        title="Large"
        description="Spacious empty state for full-page placeholders."
      />
    </div>
  ),
};
