import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, type FC } from 'react';

import type { SegmentedControlProps } from './types';
import IconBulletedList from '../../icons/IconBulletedList';
import IconCalendar from '../../icons/IconCalendar';
import { fullWidthStory } from '../../utils/storybook/helpers';

import SegmentedControl from './index';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport SegmentedControl from 'crow-ui/SegmentedControl';\nOr\nimport { SegmentedControl } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  beforeEach: () => fullWidthStory(),
  argTypes: {
    options: {
      control: { type: 'object' },
      table: {
        type: {
          summary: 'SegmentedControlOption[]',
          detail: 'value: string\nlabel: ReactNode\nicon?: ReactNode\ndisabled?: boolean\n',
        },
      },
    },
    value: {
      control: { type: 'text' },
    },
    onChange: {
      table: {
        type: { summary: 'onChange: (value: string) => void' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    fullWidth: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

const SegmentedControlExample: FC<SegmentedControlProps> = (props) => {
  const [value, setValue] = useState(props.value);

  return (
    <SegmentedControl
      {...props}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  args: {
    options: [
      { value: 'day', label: 'روزانه' },
      { value: 'week', label: 'هفتگی' },
      { value: 'month', label: 'ماهانه' },
    ],
    value: 'day',
    onChange: () => {},
  },
  render: (args) => <SegmentedControlExample {...args} />,
};

export const WithIcons: Story = {
  args: {
    options: [
      {
        value: 'list',
        label: 'لیست',
        icon: <IconBulletedList className="crow:w-4 crow:h-4" />,
      },
      {
        value: 'calendar',
        label: 'تقویم',
        icon: <IconCalendar className="crow:w-4 crow:h-4" />,
      },
    ],
    value: 'list',
    onChange: () => {},
  },
  render: (args) => <SegmentedControlExample {...args} />,
};

export const Variants: Story = {
  render: () => {
    const options = [
      { value: 'one', label: 'یک' },
      { value: 'two', label: 'دو' },
      { value: 'three', label: 'سه' },
    ];

    return (
      <div className="crow:flex crow:flex-col crow:gap-6">
        <SegmentedControlExample
          options={options}
          value="one"
          onChange={() => {}}
          variant="default"
        />
        <SegmentedControlExample
          options={options}
          value="two"
          onChange={() => {}}
          variant="outline"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const options = [
      { value: 'one', label: 'یک' },
      { value: 'two', label: 'دو' },
      { value: 'three', label: 'سه' },
    ];

    return (
      <div className="crow:flex crow:flex-col crow:items-start crow:gap-6">
        <SegmentedControlExample
          options={options}
          value="one"
          onChange={() => {}}
          size="small"
        />
        <SegmentedControlExample
          options={options}
          value="one"
          onChange={() => {}}
          size="medium"
        />
        <SegmentedControlExample
          options={options}
          value="one"
          onChange={() => {}}
          size="large"
        />
      </div>
    );
  },
};

export const FullWidth: Story = {
  args: {
    options: [
      { value: 'overview', label: 'بررسی کلی' },
      { value: 'analytics', label: 'تجزیه و تحلیل' },
      { value: 'reports', label: 'گزارش‌ها' },
    ],
    value: 'overview',
    onChange: () => {},
    fullWidth: true,
  },
  render: (args) => (
    <div className="crow:w-full crow:max-w-xl">
      <SegmentedControlExample {...args} />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'free', label: 'رایگان' },
      { value: 'pro', label: 'حرفه‌ای' },
      { value: 'enterprise', label: 'سازمانی', disabled: true },
    ],
    value: 'free',
    onChange: () => {},
  },
  render: (args) => <SegmentedControlExample {...args} />,
};

export const Disabled: Story = {
  args: {
    options: [
      { value: 'day', label: 'روزانه' },
      { value: 'week', label: 'هفتگی' },
    ],
    value: 'day',
    onChange: () => {},
    disabled: true,
  },
  render: (args) => <SegmentedControlExample {...args} />,
};
