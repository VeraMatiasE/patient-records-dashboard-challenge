import type { Meta, StoryObj } from "@storybook/react-vite";
import { PatientCardSkeleton } from "./PatientCardSkeleton";

const meta: Meta<typeof PatientCardSkeleton> = {
  title: "Patients/PatientCardSkeleton",
  component: PatientCardSkeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PatientCardSkeleton>;

export const Default: Story = {};
