import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText } from './index';

import '@/src/styles.css';

const meta: Meta = {
  title: 'Components/Skeleton',
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from 'crow-ui/Skeleton';\nOr\nimport { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from 'crow-ui';\n\`\`\``,
      },
    },
  },
};
export default meta;

export const Block: StoryObj = {
  render: () => (
    <Skeleton
      variant="block"
      width={240}
      height={120}
    />
  ),
};

export const Line: StoryObj = {
  render: () => (
    <div className="crow:w-64">
      <Skeleton variant="line" />
    </div>
  ),
};

export const Circle: StoryObj = {
  render: () => <SkeletonAvatar size={48} />,
};

export const Text: StoryObj = {
  render: () => (
    <div className="crow:w-64">
      <SkeletonText lines={4} />
    </div>
  ),
};

export const Card: StoryObj = {
  render: () => (
    <div className="crow:w-72">
      <SkeletonCard />
    </div>
  ),
};

export const NoAnimation: StoryObj = {
  render: () => (
    <div className="crow:w-72">
      <SkeletonCard animate={false} />
    </div>
  ),
};
