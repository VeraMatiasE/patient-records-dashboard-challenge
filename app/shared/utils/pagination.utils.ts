export function getPageFromIndex(index: number, pageSize: number) {
  return Math.floor(index / pageSize) + 1;
}

export function getTotalPages(totalItems: number, pageSize: number) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
