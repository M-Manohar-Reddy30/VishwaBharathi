export type AdmissionStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface AdmissionStep {
  title: string;
  description: string;
}

export interface AdmissionDocument {
  name: string;
}

export interface AdmissionPayload {
  bannerTitle: string;

  bannerDescription: string;

  bannerImage: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  process: AdmissionStep[];

  eligibility: string[];

  requiredDocuments: AdmissionDocument[];

  feeStructurePdf?: {
    publicId: string;
    url: string;
    format: string;
    bytes: number;
  };

  brochurePdf?: {
    publicId: string;
    url: string;
    format: string;
    bytes: number;
  };

  applyNowUrl?: string;

  status: AdmissionStatus;
}