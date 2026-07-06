export type NoticeStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface NoticeFile {
  publicId: string;

  url: string;

  format: string;

  bytes: number;
}

export interface NoticeImage {
  publicId: string;

  url: string;

  alt?: string;

  width?: number;

  height?: number;

  format?: string;

  bytes?: number;
}

export interface Notice {
  _id: string;

  title: string;

  description: string;

  pdf: NoticeFile;

  coverImage?: NoticeImage;

  publishDate: string;

  displayOrder: number;

  status: NoticeStatus;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface NoticeFormPayload {
  title: string;

  description: string;

  pdf: NoticeFile;

  coverImage?: NoticeImage;

  publishDate: Date;

  displayOrder: number;

  status: NoticeStatus;
}