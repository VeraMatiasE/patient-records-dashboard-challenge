import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast } from "./Toast";
import type { ToastItem } from "./toast.types";

describe("Toast", () => {
  it("should render a success toast", () => {
    const toast: ToastItem = {
      id: 1,
      type: "success",
      message: "Patient added successfully.",
    };

    const { container } = render(<Toast toast={toast} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Patient added successfully.")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render an error toast", () => {
    const toast: ToastItem = {
      id: 2,
      type: "error",
      message: "Failed to save patient.",
    };

    const { container } = render(<Toast toast={toast} />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Failed to save patient.")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should expose polite live region", () => {
    const toast: ToastItem = {
      id: 1,
      type: "success",
      message: "Saved.",
    };

    render(<Toast toast={toast} />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });
});
