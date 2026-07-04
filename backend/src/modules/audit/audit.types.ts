export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  TRASH = "TRASH",
  RESTORE = "RESTORE",
  PUBLISH = "PUBLISH",
  ARCHIVE = "ARCHIVE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REORDER = "REORDER",
  BULK_PUBLISH = "BULK_PUBLISH",
  BULK_ARCHIVE = "BULK_ARCHIVE",
  BULK_DELETE = "BULK_DELETE",
  BULK_RESTORE = "BULK_RESTORE",
}

export enum AuditModule {
  HERO = "HERO",
  GALLERY = "GALLERY",
  STAFF = "STAFF",
  EVENT = "EVENT",
  NOTICE = "NOTICE",
  SETTINGS = "SETTINGS",
  AUTH = "AUTH",
  ADMISSION = "ADMISSION",
  CONTACT = "CONTACT",
}

export interface AuditLogPayload {
  module: AuditModule;
  action: AuditAction;

  resourceId?: string;
  resourceName?: string;

  admin?: string;

  ip?: string;

  userAgent?: string;

  metadata?: Record<string, unknown>;
}