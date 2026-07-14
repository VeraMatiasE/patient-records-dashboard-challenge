import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast } from "./Toast";

const meta = {
  title: "Shared/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  args: {
    toast: {
      id: 1,
      type: "success",
      message: "John Doe was added successfully.",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    toast: {
      id: 2,
      type: "error",
      message: "Failed to save patient.",
    },
  },
};

export const LongMessage: Story = {
  args: {
    toast: {
      id: 3,
      type: "success",
      message:
        "John Doe was added successfully. The patient information has been updated and is now available in the dashboard.",
    },
  },
};
