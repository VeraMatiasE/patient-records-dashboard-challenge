import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("should render label and input", () => {
    render(<Field label="Full name" value="" onChange={vi.fn()} />);

    const input = screen.getByLabelText(/full name/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("should render textarea when multiline is true", () => {
    render(<Field label="Description" value="" multiline onChange={vi.fn()} />);

    expect(screen.getByLabelText(/description/i)).toBeInstanceOf(
      HTMLTextAreaElement,
    );
  });

  it("should render required indicator", () => {
    render(<Field label="Full name" value="" required onChange={vi.fn()} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("should render placeholder", () => {
    render(
      <Field
        label="Website"
        value=""
        placeholder="https://example.com"
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByPlaceholderText("https://example.com"),
    ).toBeInTheDocument();
  });

  it("should call onChange when typing", () => {
    const onChange = vi.fn();

    render(<Field label="Full name" value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: {
        value: "John Doe",
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("John Doe");
  });

  it("should render error message", () => {
    render(
      <Field label="Website" value="" error="Invalid URL" onChange={vi.fn()} />,
    );

    expect(screen.getByText("Invalid URL")).toBeInTheDocument();
  });

  it("should render custom input type", () => {
    render(
      <Field label="Password" type="password" value="" onChange={vi.fn()} />,
    );

    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "type",
      "password",
    );
  });
});
