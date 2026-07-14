import type { Meta, StoryObj } from "@storybook/react-vite";
import { PatientListSection } from "./PatientListSection";
import type { Patient } from "~/features/patients/types/patient";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    description: "Patient description",
    website: "example.com",
    createdAt: "1990-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    description: "Patient description",
    website: "janesmith.dev",
    createdAt: "1990-01-02",
  },
  {
    id: "3",
    name: "Michael Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    description: "Patient description",
    website: "michael.dev",
    createdAt: "1990-01-03",
  },
];

const meta: Meta<typeof PatientListSection> = {
  title: "Patients/PatientListSection",
  component: PatientListSection,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    search: "",
    filter: "all",
    favoriteCount: 0,
    highlightedId: null,
    register: () => () => {},
    isFavorite: () => false,
    onToggleFavorite: () => {},
    onEdit: () => {},
    onSearchChange: () => {},
    onFilterChange: () => {},
    onPageChange: () => {},
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PatientListSection>;

export const Default: Story = {
  args: {
    patients,
    totalCount: 3,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 5,
  },
};

export const Loading: Story = {
  args: {
    patients: [],
    totalCount: 0,
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
};

export const Empty: Story = {
  args: {
    patients: [],
    totalCount: 0,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
};

export const Error: Story = {
  args: {
    patients: [],
    totalCount: 0,
    loading: false,
    error: "Unable to connect to the API. Please try again later.",
    currentPage: 1,
    totalPages: 1,
  },
};

export const LastPage: Story = {
  args: {
    patients,
    totalCount: 150,
    loading: false,
    error: null,
    currentPage: 15,
    totalPages: 15,
  },
};

export const WithSearch: Story = {
  args: {
    patients: [patients[0]],
    search: "john",
    totalCount: 1,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
};
export const FavoritesFilter: Story = {
  args: {
    patients,
    filter: "favorites",
    favoriteCount: 3,
    totalCount: 3,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    isFavorite: () => true,
  },
};
export const HighlightedPatient: Story = {
  args: {
    patients,
    highlightedId: "2",
    totalCount: 3,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
};
