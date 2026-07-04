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

export interface GalleryPayload {
  title: string;

  description?: string;

  image: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  category: GalleryCategory;

  tags?: string[];

  displayOrder: number;
}