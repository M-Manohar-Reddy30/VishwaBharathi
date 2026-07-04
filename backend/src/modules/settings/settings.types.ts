export type WebsiteStatus =
  | "ACTIVE"
  | "MAINTENANCE";

export interface SettingsPayload {
  schoolName: string;

  shortName: string;

  logo: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  favicon: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  email: string;

  phone: string;

  alternatePhone?: string;

  address: string;

  socialLinks: {
    facebook?: string;

    instagram?: string;

    youtube?: string;

    linkedin?: string;
  };

  googleMapsEmbed?: string;

  seo: {
    metaTitle: string;

    metaDescription: string;

    keywords: string[];
  };

  copyright: string;

  websiteStatus: WebsiteStatus;
}