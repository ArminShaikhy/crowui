import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Carousel from './index';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Carousel from 'crow-ui/Carousel';\nOr\nimport { Carousel } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    trackClassName: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    showControls: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showIndicators: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    indicatorsClassName: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    initialSlide: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    autoplay: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean | {delay?: number}' },
        defaultValue: { summary: 'false', detail: 'if true: {delay: 5000}' },
      },
    },
    loop: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onSlideIndexChange: {
      control: { type: 'object' },
      table: {
        type: { summary: 'function', detail: '(slideIndex: number) => void' },
      },
    },
    prevButtonAriaLabel: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    nextButtonAriaLabel: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: { type: 'object' },
      description: 'one element per slide',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const slideColors = [
  'crow:bg-primary-500',
  'crow:bg-secondary-500',
  'crow:bg-violet-500',
  'crow:bg-flamingo-500',
];

export const Default: Story = {
  args: {
    className: 'crow:w-[480px] crow:h-[260px] crow:rounded-2xl',
    onSlideIndexChange() {},
    children: Array(4)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className={`crow:h-[260px] crow:flex crow:items-center crow:justify-center crow:text-white crow:font-h6-bold ${slideColors[index % slideColors.length]}`}
        >
          {index + 1}
        </div>
      )),
  },
};

export const Autoplay: Story = {
  args: {
    ...Default.args,
    autoplay: { delay: 2500 },
  },
};

export const WithoutLoop: Story = {
  args: {
    ...Default.args,
    loop: false,
  },
};

export const WithoutControls: Story = {
  args: {
    ...Default.args,
    showControls: false,
  },
};
