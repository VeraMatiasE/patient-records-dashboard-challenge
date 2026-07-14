import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FavoritesList } from "./FavoritesList";
import type { Patient } from "~/features/patients/types/patient";

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=12",
    description: "Cardiologist patient",
    website: "https://example.com",
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=32",
    description: "General medicine patient",
    website: "https://example.com",
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
    id: "3",
    name: "Alexander Johnson Very Long Patient Name",
    avatar: "https://i.pravatar.cc/150?img=45",
    description: "Pediatric patient",
    website: "https://example.com",
    createdAt: "2026-03-01T10:00:00Z",
  },
];

const meta = {
  title: "Patients/FavoritesList",
  component: FavoritesList,
  parameters: {
    layout: "centered",
  },
  args: {
    onRemove: fn(),
    onSelect: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FavoritesList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    patients: [],
  },
};

export const WithFavorites: Story = {
  args: {
    patients: mockPatients,
  },
};

export const SingleFavorite: Story = {
  args: {
    patients: [mockPatients[0]],
  },
};
