import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Field } from "./Field";

const meta = {
  title: "Shared/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Full name",
    value: "",
    onChange: fn(),
    placeholder: "Enter a value",
  },
  argTypes: {
    onChange: {
      action: "changed",
    },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "John Doe",
  },
};

export const WithError: Story = {
  args: {
    required: true,
    value: "",
    error: "Name is required",
  },
};

export const Multiline: Story = {
  args: {
    multiline: true,
    label: "Description",
    placeholder: "Write a description...",
  },
};

export const Url: Story = {
  args: {
    label: "Website",
    type: "url",
    value: "https://example.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "password123",
  },
};
