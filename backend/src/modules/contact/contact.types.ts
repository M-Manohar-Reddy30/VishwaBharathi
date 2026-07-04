export type ContactStatus =
  | "UNREAD"
  | "READ";

export interface ContactPayload {
  name: string;

  email: string;

  phone: string;

  subject: string;

  message: string;

  status: ContactStatus;
}