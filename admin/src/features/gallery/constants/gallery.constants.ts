export const GALLERY_QUERY_KEYS = {
  all: ["gallery"],

  list: (params?: unknown) => [
    "gallery",
    "list",
    params,
  ],

  detail: (id: string) => [
    "gallery",
    id,
  ],

  trash: ["gallery", "trash"],
};

export const GALLERY_CATEGORIES = [
  {
    label: "Campus",
    value: "CAMPUS",
  },
  {
    label: "Events",
    value: "EVENT",
  },
  {
    label: "Sports",
    value: "SPORTS",
  },
  {
    label: "Academics",
    value: "ACADEMICS",
  },
  {
    label: "Cultural",
    value: "CULTURAL",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

export const GALLERY_STATUS = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Hidden",
    value: "HIDDEN",
  },
];