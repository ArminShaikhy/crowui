import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../Button';
import Collapse from './index';

const meta = {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Collapse from 'crow-ui/Collapse';\nOr\nimport { Collapse } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    trigger: {
      control: { type: 'text' },
      table: { type: { summary: 'ReactNode' } },
    },
    open: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
    },
    defaultOpen: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      control: false,
      table: { type: { summary: '(open: boolean) => void' } },
    },
    hideArrow: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  args: {
    trigger: 'عنوان قابل کلیک',
    defaultOpen: false,
    hideArrow: false,
    disabled: false,
  },
} satisfies Meta<typeof Collapse>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Collapse {...args}>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
      چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
      مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
    </Collapse>
  ),
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Collapse {...args}>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
    </Collapse>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Collapse {...args}>این محتوا قابل نمایش نیست چون غیرفعال است.</Collapse>,
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="crow:flex crow:flex-col crow:gap-3">
          <Button onClick={() => setOpen((prev) => !prev)}>
            {open ? 'بستن از بیرون' : 'باز کردن از بیرون'}
          </Button>
          <Collapse
            trigger="عنوان کنترل‌شده"
            open={open}
            onOpenChange={setOpen}
          >
            این Collapse توسط state بیرونی کنترل می‌شود.
          </Collapse>
        </div>
      );
    };
    return <ControlledExample />;
  },
};
