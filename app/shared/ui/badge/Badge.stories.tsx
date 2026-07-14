import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Shared/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "42",
    variant: "neutral",
  },
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "radio",
      options: ["neutral", "primary", "success", "danger"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const LargeNumber: Story = {
  args: {
    children: "999+",
  },
};

export const Text: Story = {
  args: {
    children: "New",
    variant: "primary",
  },
};
