import { useState } from "react";
import { PAGE_SIZE } from "~/shared/constants/pagination";
import { getTotalPages } from "../utils/pagination.utils";

export function usePagination<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const totalPages = getTotalPages(items.length, pageSize);
  const currentPage = Math.min(page, totalPages);
  const paged = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return { paged, currentPage, totalPages, setPage };
}
