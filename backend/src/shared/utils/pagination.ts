export function getPagination(page = 1, limit = 10) {
  const currentPage = Math.max(Number(page), 1);

  const perPage = Math.min(Math.max(Number(limit), 1), 100);

  return {
    page: currentPage,
    limit: perPage,
    skip: (currentPage - 1) * perPage,
  };
}