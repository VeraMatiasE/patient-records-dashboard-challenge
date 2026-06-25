import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { PatientCard } from "./PatientCard";

vi.mock("~/shared/ui/Avatar", () => ({
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
  it("renders patient info correctly", () => {
    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("ID #1")).toBeInTheDocument();
  });

  it("does not render website when empty", () => {
    render(
      <PatientCard
        patient={{ ...patient, website: "" }}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.queryByText(/webpage/i)).not.toBeInTheDocument();
  });

  it("toggles expanded state correctly", async () => {
    const user = userEvent.setup();

    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    const toggleButton = screen.getByRole("button", {
      name: /show details/i,
    });

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);

    expect(
      screen.getByRole("button", { name: /hide details/i }),
    ).toBeInTheDocument();
  });

  it("shows fallback description when empty", () => {
    render(
      <PatientCard
        patient={{ ...patient, description: "" }}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });

  it("calls favorite handler when clicking favorite button", async () => {
    const user = userEvent.setup();
    const onToggleFavorite = vi.fn();

    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onEdit={vi.fn()}
      />,
    );

    const favButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });

    await user.click(favButton);

    expect(onToggleFavorite).toHaveBeenCalledWith("1");
  });

  it("calls edit handler when clicking edit button", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <PatientCard
        patient={patient}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onEdit={onEdit}
      />,
    );

    const editButton = screen.getByRole("button", {
      name: /edit patient/i,
    });

    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(patient);
  });
});
