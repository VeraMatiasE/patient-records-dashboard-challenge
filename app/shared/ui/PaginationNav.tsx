export function PaginationNav({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className="flex justify-center gap-1.5 mt-8 pt-6 border-t border-border"
      aria-label="Pagination"
    >
      {children}
    </nav>
  );
}
