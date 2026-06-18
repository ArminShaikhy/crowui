import type { Preview } from '@storybook/react';
import React from 'react';

import '@/src/styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Getting Started', ['Introductions', 'Colors', 'Contributing'], 'Components'],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    colorMode: {
      name: 'Theme',
      description: 'Toggle dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        className={context.globals.colorMode === 'dark' ? 'dark' : ''}
        style={{ direction: 'rtl' }}
      >
        <div className="crow:bg-surface crow:p-4">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
