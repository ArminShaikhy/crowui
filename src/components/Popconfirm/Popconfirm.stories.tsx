import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import IconDelete from '../../icons/IconDelete';
import { fullWidthStory } from '../../utils/storybook/helpers';

import Popconfirm from './index';

const meta: Meta<typeof Popconfirm> = {
  title: 'Components/Popconfirm',
  component: Popconfirm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Popconfirm from 'crow-ui/Popconfirm';\nOr\nimport { Popconfirm } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  beforeEach: () => fullWidthStory({ alignItems: '!flex-start', height: '300px' }),
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the popover panel',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Additional CSS classes for the trigger wrapper element',
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Initial position of the popover (will auto-flip if needed)',
    },
    disabled: {
      control: 'boolean',
    },
    confirmLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popconfirm>;

const renderTrigger = (
  label: string,
  toggle: () => void,
  ref: React.Ref<HTMLElement>,
): React.ReactElement => (
  <button
    ref={ref as React.Ref<HTMLButtonElement>}
    onClick={toggle}
    className="crow:inline-flex crow:items-center crow:justify-center crow:gap-2 crow:px-4 crow:py-2 crow:text-sm crow:font-medium crow:text-error-600 crow:bg-white crow:border crow:border-error-300 crow:rounded-md crow:shadow-sm crow:hover:bg-error-50"
  >
    <IconDelete className="crow:w-4 crow:h-4" />
    {label}
  </button>
);

export const Default: Story = {
  args: {
    title: 'حذف آیتم',
    description: 'آیا از حذف این آیتم اطمینان دارید؟ این عملیات قابل بازگشت نیست.',
    trigger: (toggle, ref) => renderTrigger('حذف', toggle, ref),
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const CustomLabels: Story = {
  args: {
    title: 'خروج از حساب کاربری',
    description: 'با خروج از حساب، نشست فعلی شما پایان می‌یابد.',
    confirmLabel: 'خروج',
    cancelLabel: 'بمان',
    trigger: (toggle, ref) => renderTrigger('خروج', toggle, ref),
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const LoadingConfirm: Story = {
  args: {
    title: 'حذف آیتم',
    description: 'در حال پردازش درخواست شما...',
    confirmLoading: true,
    trigger: (toggle, ref) => renderTrigger('حذف', toggle, ref),
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const Disabled: Story = {
  args: {
    title: 'حذف آیتم',
    description: 'آیا از حذف این آیتم اطمینان دارید؟',
    disabled: true,
    trigger: (toggle, ref) => renderTrigger('حذف (غیرفعال)', toggle, ref),
    onConfirm: () => {},
    onCancel: () => {},
  },
};

export const BottomPosition: Story = {
  args: {
    title: 'حذف آیتم',
    description: 'آیا از حذف این آیتم اطمینان دارید؟',
    position: 'bottom-center',
    trigger: (toggle, ref) => renderTrigger('حذف', toggle, ref),
    onConfirm: () => {},
    onCancel: () => {},
  },
};
