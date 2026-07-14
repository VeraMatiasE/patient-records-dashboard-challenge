import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Shared/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  args: {
    onPageChange: fn(),
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 8,
    totalPages: 15,
  },
};
