import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import IconArrowDownMd from '../../icons/IconArrowDownMd';
import IconDownload from '../../icons/IconDownload';
import IconEditProfile from '../../icons/IconEditProfile';
import IconLogout from '../../icons/IconLogout';
import IconSetting from '../../icons/IconSetting';
import IconShare from '../../icons/IconShare';
import IconUser from '../../icons/IconUser';
import { fullWidthStory } from '../../utils/storybook/helpers';
import Divider from '../Divider';

import Menu from './index';

Menu.displayName = 'Menu';
if (Menu.Item) {
  Menu.Item.displayName = 'Menu.Item';
}

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Menu from 'crow-ui/Menu';\nOr\nimport { Menu } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  beforeEach: () => fullWidthStory({ alignItems: '!flex-start', height: '400px' }),
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the menu container',
    },
    popoverClassName: {
      control: 'text',
      description: 'Additional CSS classes for the popover menu',
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
      description: 'Initial position of the menu (will auto-flip if needed)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const renderTrigger = (
  label: string,
  toggle: () => void,
  ref: React.Ref<HTMLElement>,
): React.ReactElement => (
  <button
    ref={ref as React.Ref<HTMLButtonElement>}
    onClick={toggle}
    className="crow:inline-flex crow:items-center crow:justify-center crow:gap-2 crow:px-4 crow:py-2 crow:text-sm crow:font-medium crow:text-gray-700 crow:bg-white crow:border crow:border-gray-300 crow:rounded-md crow:shadow-sm crow:hover:bg-gray-50"
  >
    {label}
    <IconArrowDownMd className="crow:w-6 crow:h-6" />
  </button>
);

const renderTitle = (label: string): React.ReactElement => (
  <p className="crow:py-4 crow:font-p2-regular crow:text-gray-400">{label}</p>
);

export const Default: Story = {
  args: {
    trigger: (toggle, ref) => renderTrigger('گزینه‌های منو', toggle, ref),
    children: (
      <>
        {renderTitle('تنظیمات حساب کاربری')}
        <Menu.Item
          icon={<IconUser className="crow:w-4 crow:h-4" />}
          onClick={() => {}}
          endElement={null}
        >
          پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          تنظیمات
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          className="crow:text-red-500 crow:bg-red-50 crow:hover:bg-red-100 crow:hover:text-red-500"
        >
          خروج
        </Menu.Item>
      </>
    ),
  },
};

export const WithSections: Story = {
  args: {
    trigger: (toggle, ref) => renderTrigger('گزینه‌ها', toggle, ref),
    children: (
      <>
        {renderTitle('مجوزهای کاربری')}
        <Menu.Item
          icon={<IconUser className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          مشاهده پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          تنظیمات ادمین
        </Menu.Item>
        <Divider
          type="horizontal"
          className="crow:-mx-4 crow:!w-auto"
        />
        {renderTitle('مجوزهای کاربری')}
        <Menu.Item
          icon={<IconUser className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          مشاهده پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          تنظیمات ادمین
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          className="crow:text-red-500 crow:bg-red-50 crow:hover:bg-red-100 crow:hover:text-red-500"
        >
          خروج
        </Menu.Item>
      </>
    ),
  },
};

export const WithDisabledItems: Story = {
  args: {
    trigger: (toggle, ref) => renderTrigger('گزینه‌های غیر فعال', toggle, ref),
    children: (
      <>
        {renderTitle('مجوزهای کاربری')}
        <Menu.Item
          icon={<IconUser className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          مشاهده پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconEditProfile className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          disabled
        >
          ویرایش پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          disabled
        >
          تنظیمات ادمین
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          className="crow:text-red-500 crow:bg-red-50 crow:hover:bg-red-100 crow:hover:text-red-500"
        >
          خروج
        </Menu.Item>
      </>
    ),
  },
};

export const WithEndElements: Story = {
  args: {
    trigger: (toggle, ref) => renderTrigger('اعلانات', toggle, ref),
    children: (
      <>
        {renderTitle('تنظیمات اعلان‌ها')}
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          endElement={<span className="crow:text-xs crow:text-gray-400">ON</span>}
        >
          اعلان‌های ایمیلی
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          endElement={<span className="crow:text-xs crow:text-gray-400">OFF</span>}
        >
          اعلان‌های پوش
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
          endElement={
            <span className="crow:text-xs crow:bg-blue-100 crow:text-blue-600 crow:px-2 crow:py-1 crow:rounded">
              NEW
            </span>
          }
        >
          اعلان‌های پیامکی
        </Menu.Item>
      </>
    ),
  },
};

export const CustomStyling: Story = {
  args: {
    className: 'crow:w-full crow:max-w-sm',
    popoverClassName: 'crow:w-full',
    trigger: (toggle, ref) => renderTrigger('منوی با استایل سفارشی', toggle, ref),
    children: (
      <>
        {renderTitle('تم سفارشی')}
        <Menu.Item
          icon={<IconUser className="crow:w-6 crow:h-6 crow:text-blue-500" />}
          onClick={() => {}}
          className="crow:hover:bg-blue-50 crow:hover:text-blue-700"
        >
          پروفایل
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6 crow:text-blue-500" />}
          onClick={() => {}}
          className="crow:hover:bg-blue-50 crow:hover:text-blue-700"
        >
          تنظیمات
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout className="crow:w-6 crow:h-6 crow:text-red-500" />}
          onClick={() => {}}
          className="crow:hover:bg-red-50 crow:hover:text-red-700"
        >
          خروج
        </Menu.Item>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    trigger: (toggle, ref) => renderTrigger('منوی طولانی', toggle, ref),
    popoverClassName: 'crow:w-98',
    children: (
      <>
        {renderTitle('گزینه‌های گسترش‌یافته')}
        <Menu.Item
          icon={<IconUser className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          مدیریت کاربران و اداری
        </Menu.Item>
        <Menu.Item
          icon={<IconSetting className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          تنظیمات سیستم و پیکربندی
        </Menu.Item>
        <Menu.Item
          icon={<IconEditProfile className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          ابزارهای ویرایش و انتشار محتوا
        </Menu.Item>
        <Menu.Item
          icon={<IconDownload className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          مدیریت صادرات داده و پشتیبان‌گیری
        </Menu.Item>
        <Menu.Item
          icon={<IconShare className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          گزینه‌های اشتراک‌گذاری و ویژگی‌های همکاری
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout className="crow:w-6 crow:h-6" />}
          onClick={() => {}}
        >
          عملیات پاکسازی و نگهداری
        </Menu.Item>
      </>
    ),
  },
};
