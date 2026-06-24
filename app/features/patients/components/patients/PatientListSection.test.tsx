import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PatientListSection } from "./PatientListSection";

vi.mock("./PatientGrid", () => ({
  PatientGrid: () => <div data-testid="grid" />,
}));

vi.mock("~/shared/ui/Pagination", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

vi.mock("~/shared/ui/EmptyState", () => ({
  EmptyState: ({ title, description }: any) => (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  ),
}));

describe("PatientListSection", () => {
  it("should render patients list", () => {
    render(
      <PatientListSection
        patients={[{ id: "1" } as any]}
        totalCount={1}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("should show loading text", () => {
    render(
      <PatientListSection
        patients={[]}
        totalCount={0}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(screen.getByTestId("grid")).toBeInTheDocument();
  });

  it("should show error state", () => {
    render(
      <PatientListSection
        patients={[]}
        totalCount={0}
        loading={false}
        error="API failed"
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByText("Failed to load patients")).toBeInTheDocument();
    expect(screen.getByText("API failed")).toBeInTheDocument();
  });

  it("should show empty state when no patients", () => {
    render(
      <PatientListSection
        patients={[]}
        totalCount={0}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />,
    );

    expect(screen.getByText("No patients found")).toBeInTheDocument();
  });

  it("should hide pagination on loading", () => {
    render(
      <PatientListSection
        patients={[]}
        totalCount={0}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />,
    );

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
