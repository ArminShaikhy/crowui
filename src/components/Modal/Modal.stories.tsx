import type { Meta, StoryObj } from '@storybook/react';
import React, { FC, useState } from 'react';
import Button from '../Button';
import Modal, { ModalProps } from './index';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Modal from 'crow-ui/Modal';\nOr\nimport { Modal } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    open: {
      control: { type: 'boolean', disable: true },
    },
    onClose: {
      control: { type: 'object', disable: true },
    },
    children: {
      control: { disable: true },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    title: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    confirmLabel: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'تایید' },
      },
    },
    cancelLabel: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'انصراف' },
      },
    },
    onConfirm: {
      control: { type: 'object', disable: true },
    },
    onCancel: {
      control: { type: 'object', disable: true },
    },
    confirmLoading: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    headerActionElement: {
      control: { disable: true },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    closeIconAriaLabel: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalExample: FC<ModalProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open modal</Button>
      <Modal
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      >
        {props.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'عنوان',
    description: 'متن توضیحات',
    onConfirm: () => {},
    onCancel: () => {},
    children: (
      <div className="crow:border crow:border-primary-500 crow:border-dashed crow:bg-gray-50 crow:text-gray-500 crow:rounded-lg crow:flex crow:items-center crow:justify-center crow:h-[200px] crow:w-[400px]">
        Component
      </div>
    ),
  },
  render: (args) => <ModalExample {...args} />,
};

export const ConfirmLoading: Story = {
  args: {
    ...Default.args,
    confirmLoading: true,
  },
  render: (args) => <ModalExample {...args} />,
};
