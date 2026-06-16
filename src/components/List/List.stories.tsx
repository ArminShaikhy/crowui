import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import IconEditProfile from '../../icons/IconEditProfile';
import IconEmail from '../../icons/IconEmail';
import IconLogout from '../../icons/IconLogout';
import IconSetting from '../../icons/IconSetting';
import { fullWidthStory } from '../../utils/storybook/helpers';
import Badge from '../Badge';

import List from './index';

List.displayName = 'List';
if (List.Item) {
  List.Item.displayName = 'List.Item';
}

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport List from 'crow-ui/List';\nOr\nimport { List, ListItem } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  beforeEach: () => fullWidthStory({ alignItems: '!flex-start', height: '400px' }),
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the list container',
    },
    divided: {
      control: 'boolean',
      description: 'Renders a divider between consecutive items',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const avatar = (initials: string) => (
  <span className="crow:flex crow:h-8 crow:w-8 crow:items-center crow:justify-center crow:rounded-full crow:bg-primary-100 crow:text-xs crow:font-medium crow:text-primary-600">
    {initials}
  </span>
);

export const Default: Story = {
  args: {
    className: 'crow:w-80',
    children: (
      <>
        <List.Item leading={<IconEditProfile className="crow:w-5 crow:h-5" />}>پروفایل</List.Item>
        <List.Item leading={<IconSetting className="crow:w-5 crow:h-5" />}>تنظیمات</List.Item>
        <List.Item leading={<IconLogout className="crow:w-5 crow:h-5" />}>خروج</List.Item>
      </>
    ),
  },
};

export const Divided: Story = {
  args: {
    className: 'crow:w-80',
    divided: true,
    children: (
      <>
        <List.Item leading={<IconEditProfile className="crow:w-5 crow:h-5" />}>پروفایل</List.Item>
        <List.Item leading={<IconSetting className="crow:w-5 crow:h-5" />}>تنظیمات</List.Item>
        <List.Item leading={<IconLogout className="crow:w-5 crow:h-5" />}>خروج</List.Item>
      </>
    ),
  },
};

export const WithTrailingElements: Story = {
  args: {
    className: 'crow:w-96',
    divided: true,
    children: (
      <>
        <List.Item
          leading={<IconEmail className="crow:w-5 crow:h-5" />}
          trailing={
            <Badge
              value={3}
              valueType="number"
              color="primary"
            />
          }
        >
          پیام‌ها
        </List.Item>
        <List.Item
          leading={<IconSetting className="crow:w-5 crow:h-5" />}
          trailing={<span className="crow:text-xs crow:text-gray-400">ON</span>}
        >
          اعلان‌های ایمیلی
        </List.Item>
        <List.Item
          leading={<IconLogout className="crow:w-5 crow:h-5" />}
          trailing={
            <span className="crow:text-xs crow:bg-error-50 crow:text-error-500 crow:px-2 crow:py-1 crow:rounded">
              خروج
            </span>
          }
        >
          خروج از حساب
        </List.Item>
      </>
    ),
  },
};

export const WithAvatars: Story = {
  args: {
    className: 'crow:w-96',
    divided: true,
    children: (
      <>
        <List.Item leading={avatar('AR')}>آرمین شیخی</List.Item>
        <List.Item leading={avatar('MJ')}>مریم جعفری</List.Item>
        <List.Item leading={avatar('SK')}>سینا کریمی</List.Item>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    className: 'crow:w-80',
    divided: true,
    children: (
      <>
        <List.Item
          leading={<IconEditProfile className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
        >
          پروفایل
        </List.Item>
        <List.Item
          leading={<IconSetting className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
        >
          تنظیمات
        </List.Item>
        <List.Item
          leading={<IconLogout className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
        >
          خروج
        </List.Item>
      </>
    ),
  },
};

export const ActiveState: Story = {
  args: {
    className: 'crow:w-80',
    children: (
      <>
        <List.Item
          onClick={() => {}}
          active
        >
          جدیدترین
        </List.Item>
        <List.Item onClick={() => {}}>قدیمی‌ترین</List.Item>
        <List.Item onClick={() => {}}>پرطرفدارترین</List.Item>
      </>
    ),
  },
};

export const DisabledItems: Story = {
  args: {
    className: 'crow:w-80',
    divided: true,
    children: (
      <>
        <List.Item
          leading={<IconEditProfile className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
        >
          پروفایل
        </List.Item>
        <List.Item
          leading={<IconSetting className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
          disabled
        >
          تنظیمات (غیرفعال)
        </List.Item>
        <List.Item
          leading={<IconLogout className="crow:w-5 crow:h-5" />}
          onClick={() => {}}
        >
          خروج
        </List.Item>
      </>
    ),
  },
};

export const Sizes: Story = {
  args: {
    className: 'crow:w-80',
    children: (
      <>
        <List.Item
          leading={<IconEditProfile className="crow:w-4 crow:h-4" />}
          size="compact"
        >
          کامپکت
        </List.Item>
        <List.Item
          leading={<IconSetting className="crow:w-4 crow:h-4" />}
          size="compact"
        >
          کامپکت
        </List.Item>
        <List.Item leading={<IconEditProfile className="crow:w-5 crow:h-5" />}>معمولی</List.Item>
        <List.Item leading={<IconSetting className="crow:w-5 crow:h-5" />}>معمولی</List.Item>
      </>
    ),
  },
};
