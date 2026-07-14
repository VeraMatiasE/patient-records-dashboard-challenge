import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { FavoriteItem } from "./FavoriteItem";
import type { Patient } from "~/features/patients/types/patient";

const patientMock: Patient = {
  id: "1",
  name: "John Smith",
  avatar: "https://i.pravatar.cc/150?img=12",
  description: "Cardiology patient",
  website: "https://example.com",
  createdAt: "2026-01-10T10:00:00Z",
};

const meta = {
  title: "Patients/FavoriteItem",
  component: FavoriteItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onRemove: fn(),
    onClick: fn(),
  },
} satisfies Meta<typeof FavoriteItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    patient: patientMock,
  },
};

export const LongName: Story = {
  args: {
    patient: {
      ...patientMock,
      name: "Alexander Jonathan Montgomery Very Long Patient Name",
    },
  },
};

export const DifferentPatient: Story = {
  args: {
    patient: {
      ...patientMock,
      id: "25",
      name: "Maria Garcia",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  },
};
