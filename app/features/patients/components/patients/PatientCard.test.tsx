import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PatientCard } from "./PatientCard";
import userEvent from "@testing-library/user-event";

vi.mock("./Avatar", () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

const patient = {
  id: "1",
  name: "John Doe",
  avatar: "avatar.png",
  description: "Test patient",
  website: "example.com",
  createdAt: "2024-01-01",
};

describe("PatientCard", () => {
  it("should render patient info", () => {
    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onEdit={() => {}}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("ID #1")).toBeInTheDocument();
  });

  it("should not render website when empty", () => {
    render(
      <PatientCard
        patient={{ ...patient, website: "" }}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onEdit={() => {}}
      />,
    );

    expect(screen.queryByText(/webpage/i)).not.toBeInTheDocument();
  });

  it("should toggle expanded state", async () => {
    const user = userEvent.setup();

    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onEdit={() => {}}
      />,
    );

    const button = screen.getByRole("button", { name: /show details/i });

    await user.click(button);

    expect(screen.getByText(/hide details/i)).toBeInTheDocument();
  });

  it("should show fallback description", () => {
    render(
      <PatientCard
        patient={{ ...patient, description: "" }}
        isFavorite={false}
        onToggleFavorite={() => {}}
        onEdit={() => {}}
      />,
    );

    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });
});
