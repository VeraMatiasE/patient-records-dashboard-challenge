import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PatientForm } from "./PatientForm";
import type { PatientFormData } from "../schemas/patient.schema";

const initialValues: PatientFormData = {
  name: "John Doe",
  description: "Test patient",
  website: "https://example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
};

describe("PatientForm", () => {
  it("should render all fields", () => {
    render(<PatientForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/avatar url/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should render initial values", () => {
    render(
      <PatientForm
        initialValues={initialValues}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/full name/i)).toHaveValue(initialValues.name);

    expect(screen.getByLabelText(/description/i)).toHaveValue(
      initialValues.description,
    );

    expect(screen.getByLabelText(/website/i)).toHaveValue(
      initialValues.website,
    );

    expect(screen.getByLabelText(/avatar url/i)).toHaveValue(
      initialValues.avatar,
    );
  });

  it("should call onCancel when clicking Cancel", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<PatientForm onSubmit={vi.fn()} onCancel={onCancel} />);

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should submit valid data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<PatientForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test patient" },
    });

    fireEvent.change(screen.getByLabelText(/website/i), {
      target: { value: "https://example.com" },
    });

    fireEvent.change(screen.getByLabelText(/avatar url/i), {
      target: { value: "https://i.pravatar.cc/150?img=1" },
    });

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      description: "Test patient",
      website: "https://example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    });
  });

  it("should show validation errors when submitting invalid data", async () => {
    const user = userEvent.setup();

    render(<PatientForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();

    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });
});
