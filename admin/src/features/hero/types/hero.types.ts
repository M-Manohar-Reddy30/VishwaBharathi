export type HeroStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface HeroImage {
  publicId: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface HeroButton {
  text: string;
  url: string;
  target: "_self" | "_blank";
  variant:
    | "primary"
    | "secondary"
    | "outline";
}

export interface Hero {
  _id: string;

  title: string;

  subtitle?: string;

  description?: string;

  desktopImage: HeroImage;

  mobileImage: HeroImage;

  primaryButton?: HeroButton;

  secondaryButton?: HeroButton;

  overlayOpacity: number;

  textAlign:
    | "left"
    | "center"
    | "right";

  displayOrder: number;

  status: HeroStatus;

  publishedAt?: string;

  expiresAt?: string;

  createdAt: string;

  updatedAt: string;
}