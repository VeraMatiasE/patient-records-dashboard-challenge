import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { PatientModal } from "./PatientModal";
import type { Patient } from "../types/patient";

const patient: Patient = {
  id: "1",
  name: "John Doe",
  avatar: "https://i.pravatar.cc/150?img=1",
  description: "Annual health checkup.",
  website: "https://example.com",
  createdAt: "2026-01-01T00:00:00Z",
};

const meta = {
  title: "Patients/PatientModal",
  component: PatientModal,
  parameters: {
    layout: "centered",
  },
  args: {
    open: true,
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
} satisfies Meta<typeof PatientModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    patient: null,
  },
};

export const Edit: Story = {
  args: {
    patient,
  },
};

export const Closed: Story = {
  args: {
    open: false,
    patient: null,
  },
};
