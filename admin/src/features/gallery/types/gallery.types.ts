export type GalleryStatus =
  | "ACTIVE"
  | "HIDDEN";

export type GalleryCategory =
  | "CAMPUS"
  | "EVENT"
  | "SPORTS"
  | "ACADEMICS"
  | "CULTURAL"
  | "OTHER";

export interface GalleryImage {
  publicId: string;

  url: string;

  alt?: string;

  width?: number;

  height?: number;

  format?: string;

  bytes?: number;
}

export interface Gallery {
  _id: string;

  title: string;

  description?: string;

  image: GalleryImage;

  category: GalleryCategory;

  tags: string[];

  displayOrder: number;

  status: GalleryStatus;

  createdAt: string;

  updatedAt: string;
}