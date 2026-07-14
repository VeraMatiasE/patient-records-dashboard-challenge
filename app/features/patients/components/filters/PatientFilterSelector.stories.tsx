import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PatientFilterSelector } from "./PatientFilterSelector";
import { fn } from "storybook/test";

const meta = {
  title: "Shared/PatientFilterSelector",
  component: PatientFilterSelector,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof PatientFilterSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    value: "all",
    totalCount: 24,
    favoriteCount: 7,
  },
  render: (args) => {
    const [value, setValue] = useState<"all" | "favorites">(args.value);

    return (
      <PatientFilterSelector
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange(newValue);
        }}
      />
    );
  },
};

export const NoFavorites: Story = {
  args: {
    value: "all",
    totalCount: 24,
    favoriteCount: 0,
  },
};

export const FavoritesSelected: Story = {
  args: {
    value: "favorites",
    totalCount: 24,
    favoriteCount: 7,
  },
};
