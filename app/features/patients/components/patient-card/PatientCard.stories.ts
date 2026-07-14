import type { Meta, StoryObj } from "@storybook/react-vite";
import { PatientCard } from "./PatientCard";
import type { Patient } from "~/features/patients/types/patient";

const mockPatient: Patient = {
  id: "1",
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=1",
  description: "Patient with a complete profile used for Storybook examples.",
  website: "example.com",
  createdAt: "1990-01-01",
};

const meta: Meta<typeof PatientCard> = {
  title: "Patients/PatientCard",
  component: PatientCard,
  parameters: {
    layout: "centered",
  },
  args: {
    patient: mockPatient,
    isFavorite: false,
    onToggleFavorite: () => {},
    onEdit: () => {},
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PatientCard>;

export const Default: Story = {};

export const Favorite: Story = {
  args: {
    isFavorite: true,
  },
};

export const WithoutWebsite: Story = {
  args: {
    patient: {
      ...mockPatient,
      website: "",
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    patient: {
      ...mockPatient,
      description: "",
    },
  },
};

export const LongContent: Story = {
  args: {
    patient: {
      ...mockPatient,
      name: "Jonathan Alexander Maximilian Doe-Smith",
      description:
        "This is a very long description intended to verify how the card behaves when displaying a large amount of text. It helps validate wrapping, spacing, and overflow handling within the expanded section of the component.",
      website: "very-long-domain-name-for-testing-layout-behavior.example.com",
    },
  },
};

export const WithoutAvatar: Story = {
  args: {
    patient: {
      ...mockPatient,
      avatar: "",
    },
  },
};
