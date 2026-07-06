export type StaffStatus =
  | "ACTIVE"
  | "INACTIVE";

export type StaffDepartment =
  | "MANAGEMENT"
  | "ADMINISTRATION"
  | "SPECIAL_EDUCATION"
  | "THERAPY"
  | "VOCATIONAL_TRAINING"
  | "SUPPORT_STAFF"
  | "OTHER";

export interface StaffImage {
  publicId: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface Staff {
  _id: string;

  name: string;

  designation: string;

  qualification: string;

  experience?: string;

  bio: string;

  photo: StaffImage;

  department: StaffDepartment;

  displayOrder: number;

  status: StaffStatus;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface StaffFormPayload {
  name: string;

  designation: string;

  qualification: string;

  experience?: string;

  bio: string;

  photo: StaffImage;

  department: StaffDepartment;

  displayOrder: number;

  status: StaffStatus;
}