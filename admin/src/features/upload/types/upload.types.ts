export interface UploadedImage {
  publicId: string;

  url: string;

  width?: number;

  height?: number;

  format?: string;

  bytes?: number;
}

export interface UploadedFile {
  publicId: string;

  url: string;

  format: string;

  bytes: number;

  resourceType: string;
}