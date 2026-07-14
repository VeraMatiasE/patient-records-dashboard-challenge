import type { Meta, StoryObj } from "@storybook/react-vite";
import { FavoritesSidebar } from "./FavoritesSidebar";
import type { Patient } from "../types/patient";
import { useState } from "react";

const favoritePatients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "Annual health checkup.",
    website: "https://example.com/john-doe",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "Follow-up consultation.",
    website: "https://example.com/jane-smith",
    createdAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Routine appointment.",
    website: "https://example.com/michael-johnson",
    createdAt: "2026-01-03T00:00:00Z",
  },
];

const meta = {
  title: "Patients/FavoritesSidebar",
  component: FavoritesSidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen justify-end bg-background">
        <Story />
      </div>
    ),
  ],
  args: {
    onRemove: () => {},
    onSelect: () => {},
  },
} satisfies Meta<typeof FavoritesSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    patients: [],
  },
};

export const WithFavorites: Story = {
  render: function Render(args) {
    const [patients, setPatients] = useState(args.patients);

    return (
      <FavoritesSidebar
        {...args}
        patients={patients}
        onRemove={(id) =>
          setPatients((prev) => prev.filter((p) => p.id !== id))
        }
      />
    );
  },
  args: {
    patients: favoritePatients,
  },
};

export const ManyFavorites: Story = {
  args: {
    patients: Array.from({ length: 25 }, (_, index) => ({
      id: String(index + 1),
      name: `Patient ${index + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
      description: "Routine appointment.",
      website: "https://example.com",
      createdAt: "2026-01-01T00:00:00Z",
    })),
  },
};
