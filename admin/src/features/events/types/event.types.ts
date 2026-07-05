export type EventStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type EventCategory =
  | "ACADEMIC"
  | "CULTURAL"
  | "SPORTS"
  | "WORKSHOP"
  | "SEMINAR"
  | "AWARENESS"
  | "CELEBRATION"
  | "OTHER";

export interface EventImage {
  publicId: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface Event {
  _id: string;

  title: string;

  slug: string;

  description: string;

  bannerImage: EventImage;

  venue: string;

  category: EventCategory;

  startDate: string;

  endDate: string;

  displayOrder: number;

  status: EventStatus;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface EventFormPayload {
  title: string;

  slug: string;

  description: string;

  bannerImage: EventImage;

  venue: string;

  category: EventCategory;

  startDate: Date;

  endDate: Date;

  displayOrder: number;

  status: EventStatus;
}