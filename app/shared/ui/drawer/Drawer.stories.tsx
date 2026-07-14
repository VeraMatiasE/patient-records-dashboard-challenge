import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Drawer } from "./Drawer";

const meta = {
  title: "Shared/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onClose: fn(),
    title: "Favorites",
    children: (
      <div className="space-y-3">
        <p className="text-sm text-text">Drawer content goes here.</p>

        <p className="text-sm text-text-secondary">
          This component can contain any content.
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const LongContent: Story = {
  args: {
    open: true,
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} className="text-sm text-text">
            Drawer item {index + 1}
          </p>
        ))}
      </div>
    ),
  },
};
