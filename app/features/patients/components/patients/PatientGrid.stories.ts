import type { Meta, StoryObj } from "@storybook/react-vite";
import { PatientGrid } from "./PatientGrid";
import type { Patient } from "~/features/patients/types/patient";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "Example patient description.",
    website: "example.com",
    createdAt: "1990-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "Another example patient.",
    website: "janesmith.dev",
    createdAt: "1990-01-01",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Patient used for Storybook demos.",
    website: "michael.dev",
    createdAt: "1990-01-01",
  },
];

const meta: Meta<typeof PatientGrid> = {
  title: "Patients/PatientGrid",
  component: PatientGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof PatientGrid>;

export const Default: Story = {
  args: {
    loading: false,
    patients,
  },
};

export const SinglePatient: Story = {
  args: {
    loading: false,
    patients: [patients[0]],
  },
};

export const Empty: Story = {
  args: {
    loading: false,
    patients: [],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    patients: [],
  },
};

export const ManyPatients: Story = {
  args: {
    loading: false,
    patients: Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      name: `Patient ${index + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(index % 10) + 1}`,
      description: "Generated patient for grid visualization.",
      website: `patient${index + 1}.com`,
      createdAt: ``,
    })),
  },
};
