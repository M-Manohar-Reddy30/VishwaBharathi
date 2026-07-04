export const HERO_QUERY_KEYS = {
  all: ["heroes"] as const,

  list: (params?: unknown) =>
    ["heroes", params] as const,

  detail: (id: string) =>
    ["hero", id] as const,
};