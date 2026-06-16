import type { Meta, StoryObj } from '@storybook/react';
import React, { ComponentType } from 'react';
import IconDocumentMenu from '../../icons/IconDocumentMenu';
import IconFolderFileImage from '../../icons/IconFolderFileImage';
import Tree, { TreeNode } from './index';

const meta = {
  title: 'Components/Tree',
  component: Tree,
  subcomponents: { TreeNode: TreeNode as ComponentType<unknown> },
  parameters: {
    docs: {
      description: {
        component: `### \n\`\`\`js\nimport Tree, { TreeNode } from 'crow-ui/Tree';\nOr\nimport { Tree, TreeNode } from 'crow-ui';\n\`\`\``,
      },
    },
  },
  argTypes: {
    selectable: {
      description: 'Enables single-node selection highlighting.',
    },
    defaultSelectedKey: {
      description: 'Key of the node selected on initial render (only relevant when `selectable`).',
    },
    onSelect: {
      description: 'Called when a node is selected (only relevant when `selectable`).',
    },
  },
} satisfies Meta<typeof Tree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeNode
        nodeKey="src"
        label="src"
        defaultExpanded
        icon={<IconFolderFileImage className="crow:w-4 crow:h-4" />}
      >
        <TreeNode
          nodeKey="components"
          label="components"
          defaultExpanded
          icon={<IconFolderFileImage className="crow:w-4 crow:h-4" />}
        >
          <TreeNode
            nodeKey="button"
            label="Button"
            icon={<IconFolderFileImage className="crow:w-4 crow:h-4" />}
          >
            <TreeNode
              nodeKey="button-index"
              label="index.tsx"
              icon={<IconDocumentMenu className="crow:w-4 crow:h-4" />}
            />
            <TreeNode
              nodeKey="button-stories"
              label="Button.stories.tsx"
              icon={<IconDocumentMenu className="crow:w-4 crow:h-4" />}
            />
          </TreeNode>
          <TreeNode
            nodeKey="tree"
            label="Tree"
            icon={<IconFolderFileImage className="crow:w-4 crow:h-4" />}
          >
            <TreeNode
              nodeKey="tree-index"
              label="index.tsx"
              icon={<IconDocumentMenu className="crow:w-4 crow:h-4" />}
            />
          </TreeNode>
        </TreeNode>
        <TreeNode
          nodeKey="styles"
          label="styles.css"
          icon={<IconDocumentMenu className="crow:w-4 crow:h-4" />}
        />
      </TreeNode>
      <TreeNode
        nodeKey="package"
        label="package.json"
        icon={<IconDocumentMenu className="crow:w-4 crow:h-4" />}
      />
    </Tree>
  ),
};

export const Selectable: Story = {
  args: {
    selectable: true,
    defaultSelectedKey: 'about',
  },
  render: (args) => (
    <Tree {...args}>
      <TreeNode
        nodeKey="pages"
        label="Pages"
        defaultExpanded
      >
        <TreeNode
          nodeKey="home"
          label="Home"
        />
        <TreeNode
          nodeKey="about"
          label="About"
        />
        <TreeNode
          nodeKey="contact"
          label="Contact"
        />
      </TreeNode>
    </Tree>
  ),
};

export const WithDisabledNode: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeNode
        nodeKey="team"
        label="Team"
        defaultExpanded
      >
        <TreeNode
          nodeKey="engineering"
          label="Engineering"
        />
        <TreeNode
          nodeKey="design"
          label="Design (archived)"
          disabled
        />
      </TreeNode>
    </Tree>
  ),
};

export const DeeplyNested: Story = {
  render: (args) => (
    <Tree {...args}>
      <TreeNode
        nodeKey="level-1"
        label="Level 1"
        defaultExpanded
      >
        <TreeNode
          nodeKey="level-2"
          label="Level 2"
          defaultExpanded
        >
          <TreeNode
            nodeKey="level-3"
            label="Level 3"
            defaultExpanded
          >
            <TreeNode
              nodeKey="level-4"
              label="Level 4"
              defaultExpanded
            >
              <TreeNode
                nodeKey="level-5"
                label="Level 5"
              />
            </TreeNode>
          </TreeNode>
        </TreeNode>
      </TreeNode>
    </Tree>
  ),
};
