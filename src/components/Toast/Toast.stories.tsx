import type { Meta, StoryObj } from '@storybook/react';
import { useToast } from './context';
import Button from '../Button';
import ToastProvider from './index';

import '@/src/styles.css';

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport ToastProvider, { useToast } from 'crow-ui/Toast';\nOr\nimport { ToastProvider, useToast } from 'crow-ui';\n\`\`\``,
      },
    },
  },
};
export default meta;

const ToastDemo = ({ variant }: { variant?: 'info' | 'success' | 'warning' | 'error' }) => {
  const { add } = useToast();
  return (
    <div className="crow:flex crow:gap-2 crow:flex-wrap">
      <Button
        onClick={() => add({ message: 'Info: operation completed.', variant: variant ?? 'info' })}
      >
        Info
      </Button>
      <Button onClick={() => add({ message: 'Success! Changes saved.', variant: 'success' })}>
        Success
      </Button>
      <Button onClick={() => add({ message: 'Warning: check your input.', variant: 'warning' })}>
        Warning
      </Button>
      <Button onClick={() => add({ message: 'Error: something went wrong.', variant: 'error' })}>
        Error
      </Button>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const BottomCenter: StoryObj = {
  render: () => (
    <ToastProvider defaultPosition="bottom-center">
      <ToastDemo />
    </ToastProvider>
  ),
};
