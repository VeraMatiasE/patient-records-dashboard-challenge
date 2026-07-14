import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("should not render when open is false", () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>,
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should render title and children when open", () => {
    render(
      <Modal open title="Patient" onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(
      screen.getByRole("heading", { name: "Patient" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("should not render a title when none is provided", () => {
    render(
      <Modal open onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>,
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should call onClose when clicking the close button", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open title="Patient" onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /close modal/i,
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking the backdrop", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { container } = render(
      <Modal open title="Patient" onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    const backdrop = container.firstChild as HTMLElement;

    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when clicking inside the modal", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open title="Patient" onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    await user.click(screen.getByText("Modal content"));

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open title="Patient" onClose={onClose}>
        <p>Modal content</p>
      </Modal>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
