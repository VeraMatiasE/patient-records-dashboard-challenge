import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("should not render when only one page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render all page buttons", () => {
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />,
    );

    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
  });

  it("should call onPageChange when page is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Page 2" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should disable previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />,
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={() => {}} />,
    );

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("should go to previous page when prev clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Previous page"));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should go to next page when next clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Next page"));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
