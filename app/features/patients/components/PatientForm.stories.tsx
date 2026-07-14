import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PatientForm } from "./PatientForm";

const meta = {
  title: "Patients/PatientForm",
  component: PatientForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[28rem] rounded-[var(--radius-card)] border border-border bg-surface shadow">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof PatientForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {};

export const Edit: Story = {
  args: {
    initialValues: {
      name: "John Doe",
      description:
        "Patient with chronic condition requiring regular follow-up.",
      website: "https://example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
};

export const PartialData: Story = {
  args: {
    initialValues: {
      name: "Jane Doe",
      description: "New patient.",
      website: "",
      avatar: "",
    },
  },
};
