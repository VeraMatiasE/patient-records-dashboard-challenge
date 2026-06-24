import { PageButton } from "./PageButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center gap-1.5 mt-8 pt-6 border-t border-border"
      aria-label="Pagination"
    >
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </PageButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <PageButton
          key={p}
          onClick={() => onPageChange(p)}
          active={currentPage === p}
          aria-label={`Page ${p}`}
          aria-current={currentPage === p ? "page" : undefined}
        >
          {p}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </PageButton>
    </nav>
  );
}
