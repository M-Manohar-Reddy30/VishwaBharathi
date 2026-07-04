export type NoticeStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface NoticePayload {
  title: string;

  description: string;

  pdf: {
    publicId: string;
    url: string;
    format: string;
    bytes: number;
  };

  coverImage?: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  publishDate: Date;

  displayOrder: number;

  status: NoticeStatus;
}