import { useState } from "react";
import { SearchInput } from "./SearchInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta = {
  title: "Shared/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function SearchInputStory(args: React.ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState(args.value);

  return (
    <div className="w-96">
      <SearchInput
        {...args}
        value={value}
        onSearch={(search) => {
          setValue(search);
          console.log("Search:", search);
        }}
      />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <SearchInputStory {...args} />,
  args: {
    value: "",
    placeholder: "Search patients...",
    onSearch: fn(),
  },
};

export const WithInitialValue: Story = {
  render: (args) => <SearchInputStory {...args} />,
  args: {
    value: "John Doe",
    placeholder: "Search patients...",
    onSearch: fn(),
  },
};

export const EmptyPlaceholder: Story = {
  render: (args) => <SearchInputStory {...args} />,
  args: {
    value: "",
    placeholder: "",
    onSearch: fn(),
  },
};
