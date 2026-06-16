import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CommandPalette, { type CommandItem } from './index';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  parameters: {
    docs: {
      description: {
        component:
          'A Cmd/Ctrl+K triggered overlay with a search input and a filtered, keyboard-navigable command list. Press Escape or click the backdrop to close.',
      },
    },
  },
  argTypes: {
    open: {
      control: false,
      description: 'Controlled open state. Omit to let the component manage its own state.',
    },
    onOpenChange: { control: false },
    items: { control: false },
    onSelect: { control: false },
    placeholder: { control: 'text' },
    emptyMessage: { control: 'text' },
    disableShortcut: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const items: CommandItem[] = [
  { id: 'new-file', label: 'New File', group: 'File', shortcut: '⌘N' },
  { id: 'open-file', label: 'Open File…', group: 'File', shortcut: '⌘O' },
  { id: 'save', label: 'Save', group: 'File', shortcut: '⌘S' },
  { id: 'copy', label: 'Copy', group: 'Edit', shortcut: '⌘C' },
  { id: 'paste', label: 'Paste', group: 'Edit', shortcut: '⌘V' },
  {
    id: 'toggle-theme',
    label: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    group: 'View',
  },
  { id: 'disabled-item', label: 'Unavailable Action', disabled: true },
];

export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          type="button"
          className="crow:px-4 crow:py-2 crow:rounded-md crow:bg-primary-500 crow:text-white crow:font-p2-medium"
          onClick={() => setOpen(true)}
        >
          Open Command Palette (or press ⌘K / Ctrl+K)
        </button>
        <CommandPalette
          {...args}
          items={items}
          open={open}
          onOpenChange={setOpen}
          onSelect={(item) => console.error('selected', item.id)}
        />
      </div>
    );
  },
};

export const UncontrolledShortcutOnly: Story = {
  name: 'Uncontrolled (shortcut only)',
  render: (args) => (
    <div className="crow:font-p2-regular crow:text-gray-500">
      Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> to open — this instance manages its own open state.
      <CommandPalette
        {...args}
        items={items}
      />
    </div>
  ),
};
