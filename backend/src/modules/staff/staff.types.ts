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

export interface StaffPayload {
  name: string;

  designation: string;

  qualification: string;

  experience?: string;

  bio: string;

  photo: {
    publicId: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };

  department: StaffDepartment;

  displayOrder: number;

  status: StaffStatus;
}