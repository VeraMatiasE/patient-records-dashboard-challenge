import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PatientListSection } from "./PatientListSection";
import type { Patient, PatientFilter } from "../../types/patient";

vi.mock("./PatientGrid", () => ({
  PatientGrid: () => <div data-testid="grid" />,
}));

vi.mock("~/shared/ui/pagination/Pagination", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

vi.mock("~/shared/ui/grid/Grid", () => ({
  Grid: ({ children }: any) => <div data-testid="grid">{children}</div>,
}));

vi.mock("./PatientCardSkeleton", () => ({
  PatientCardSkeleton: () => <div data-testid="skeleton" />,
}));

vi.mock("../filters/SearchToolBar", () => ({
  SearchToolbar: () => <div data-testid="search-toolbar" />,
}));

vi.mock("~/shared/ui/empty-state/EmptyState", () => ({
  EmptyState: ({ title, description }: any) => (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  ),
}));

const patient: Patient = {
  id: "1",
  name: "John Doe",
  avatar: "",
  createdAt: "2026-01-01T00:00:00Z",
  website: "",
  description: "",
};

const defaultProps = {
  patients: [patient],
  totalCount: 1,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  search: "",
  filter: "all" as PatientFilter,
  favoriteCount: 0,
  highlightedId: null,
  register: vi.fn(() => vi.fn()),
  onPageChange: vi.fn(),
  onEdit: vi.fn(),
  onToggleFavorite: vi.fn(),
  isFavorite: vi.fn(() => false),
  onSearchChange: vi.fn(),
  onFilterChange: vi.fn(),
};

describe("PatientListSection", () => {
  it("renders search toolbar, patient grid and pagination on success state", () => {
    render(<PatientListSection {...defaultProps} />);

    expect(screen.getByTestId("search-toolbar")).toBeInTheDocument();
    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("shows loading state and hides grid/pagination", () => {
    render(
      <PatientListSection
        {...defaultProps}
        patients={[]}
        totalCount={0}
        loading
      />,
    );

    expect(screen.getByText("Loading…")).toBeInTheDocument();

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("shows error state and hides grid/pagination", () => {
    render(
      <PatientListSection
        {...defaultProps}
        patients={[]}
        totalCount={0}
        error="API failed"
      />,
    );

    expect(screen.getByText("Failed to load patients")).toBeInTheDocument();
    expect(screen.getByText("API failed")).toBeInTheDocument();

    expect(screen.queryByTestId("grid")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("shows empty state when no patients", () => {
    render(
      <PatientListSection {...defaultProps} patients={[]} totalCount={0} />,
    );

    expect(screen.getByText("No patients found")).toBeInTheDocument();
  });
});
