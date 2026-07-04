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

export interface EventPayload {
  title: string;

  slug: string;

  description: string;

  bannerImage: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  startDate: Date;

  endDate: Date;

  venue: string;

  category: EventCategory;

  displayOrder: number;

  status: EventStatus;
}