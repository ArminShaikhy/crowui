import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../Button';
import Card from '../Card';
import { ThemeProvider, useTheme } from './index';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport { ThemeProvider, useTheme } from 'crow-ui/ThemeProvider';\nOr\nimport { ThemeProvider, useTheme } from 'crow-ui';\n\`\`\`\n\nOptional sugar over the raw \`.dark\` class mechanism. Adding \`class="dark"\` to any ancestor element works on its own; use ThemeProvider for system-preference detection, persistence, and a \`useTheme()\` hook to build a toggle.`,
      },
    },
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const ToggleDemo = () => {
  const { mode, setMode } = useTheme();
  return (
    <div className="crow:flex crow:flex-col crow:gap-4 crow:p-6 crow:bg-surface">
      <p className="crow:text-gray-900">Current mode: {mode}</p>
      <div className="crow:flex crow:gap-2">
        <Button onClick={() => setMode('light')}>Light</Button>
        <Button onClick={() => setMode('dark')}>Dark</Button>
        <Button onClick={() => setMode('system')}>System</Button>
      </div>
      <Card>Card content reacting to the active theme.</Card>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ThemeProvider defaultMode="light">
      <ToggleDemo />
    </ThemeProvider>
  ),
};
