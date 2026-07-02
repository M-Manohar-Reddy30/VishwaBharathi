export enum HeroStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum TextAlign {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINE = "outline",
}

export enum ButtonTarget {
  SELF = "_self",
  BLANK = "_blank",
}

export interface ImageAsset {
  publicId: string;

  url: string;

  alt: string;

  width: number;

  height: number;

  format: string;

  bytes: number;
}

export interface HeroButton {
  text: string;

  url: string;

  target: ButtonTarget;

  variant: ButtonVariant;
}

export interface HeroSEO {
  metaTitle: string;

  metaDescription: string;

  keywords: string[];

  canonicalUrl?: string;

  ogImage?: string;
}

export interface HeroAudit {
  createdBy: string;

  updatedBy?: string;
}

export interface HeroPayload {
  title: string;

  subtitle?: string;

  description?: string;

  desktopImage: ImageAsset;

  mobileImage: ImageAsset;

  primaryButton: HeroButton;

  secondaryButton?: HeroButton;

  overlayOpacity: number;

  textAlign: TextAlign;

  displayOrder: number;

  status: HeroStatus;

  publishedAt?: Date;

  expiresAt?: Date;

  seo: HeroSEO;

  audit: HeroAudit;
}