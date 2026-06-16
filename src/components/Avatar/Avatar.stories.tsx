import type { Meta, StoryObj } from '@storybook/react';
import Avatar, { AvatarGroup } from './index';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Avatar, { AvatarGroup } from 'crow-ui/Avatar';\nOr\nimport { Avatar, AvatarGroup } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    initials: {
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
      table: {
        type: { summary: 'sm, md, lg, xl' },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      options: ['round', 'square'],
      control: { type: 'select' },
      table: {
        type: { summary: 'round, square' },
        defaultValue: { summary: 'round' },
      },
    },
    status: {
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      control: { type: 'select' },
      table: {
        type: { summary: 'online, offline, busy, away' },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Jane Doe',
    size: 'md',
    shape: 'round',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Doe',
    size: 'md',
  },
};

export const ImageFallback: Story = {
  name: 'Broken image falls back to initials',
  args: {
    src: 'https://example.com/broken-image.jpg',
    alt: 'Jane Doe',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-4">
      <Avatar
        alt="Jane Doe"
        size="sm"
      />
      <Avatar
        alt="Jane Doe"
        size="md"
      />
      <Avatar
        alt="Jane Doe"
        size="lg"
      />
      <Avatar
        alt="Jane Doe"
        size="xl"
      />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-4">
      <Avatar
        alt="Jane Doe"
        shape="round"
      />
      <Avatar
        alt="Jane Doe"
        shape="square"
      />
    </div>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <div className="crow:flex crow:items-center crow:gap-4">
      <Avatar
        alt="Jane Doe"
        status="online"
      />
      <Avatar
        alt="John Roe"
        status="away"
      />
      <Avatar
        alt="Amy Lee"
        status="busy"
      />
      <Avatar
        alt="Sam Kim"
        status="offline"
      />
    </div>
  ),
};

export const IconFallback: Story = {
  render: () => <Avatar size="lg" />,
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar alt="Jane Doe" />
      <Avatar alt="John Roe" />
      <Avatar alt="Amy Lee" />
      <Avatar alt="Sam Kim" />
      <Avatar alt="Max Fox" />
    </AvatarGroup>
  ),
};

export const GroupLarge: Story = {
  render: () => (
    <AvatarGroup
      max={4}
      size="lg"
    >
      <Avatar src="https://i.pravatar.cc/150?img=1" />
      <Avatar src="https://i.pravatar.cc/150?img=2" />
      <Avatar src="https://i.pravatar.cc/150?img=3" />
      <Avatar src="https://i.pravatar.cc/150?img=4" />
      <Avatar src="https://i.pravatar.cc/150?img=5" />
      <Avatar src="https://i.pravatar.cc/150?img=6" />
    </AvatarGroup>
  ),
};
