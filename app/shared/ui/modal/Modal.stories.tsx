import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Modal } from "./Modal";

const meta = {
  title: "Shared/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    title: "Patient Details",
    onClose: fn(),
    children: (
      <div className="p-5">
        <p className="text-sm text-text-secondary">
          This is an example of modal content.
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },
};

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
    children: (
      <div className="p-5 space-y-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} className="text-sm text-text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc ut laoreet vulputate, nunc nisl aliquam nunc, vitae
            aliquam nisl nunc vitae nisl.
          </p>
        ))}
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
