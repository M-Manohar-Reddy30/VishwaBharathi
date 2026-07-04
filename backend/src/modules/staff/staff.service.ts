import ApiError from "../../shared/errors/ApiError.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

import StaffRepository from "./staff.repository.js";

import { StaffPayload } from "./staff.types.js";
import { BulkStaffPayload } from "./staff.bulk.validation.js";
import { ReorderStaffPayload } from "./staff.reorder.validation.js";

class StaffService {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(payload: StaffPayload) {
    const exists = await StaffRepository.existsByDisplayOrder(
      payload.displayOrder
    );

    if (exists) {
      throw new ApiError(
        409,
        "Display order already exists."
      );
    }

    const staff = await StaffRepository.create(payload);

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.CREATE,
      resourceId: staff._id.toString(),
      resourceName: staff.name,
      metadata: {
        designation: staff.designation,
        department: staff.department,
      },
    });

    return staff;
  }

  /*
  |--------------------------------------------------------------------------
  | Read
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return StaffRepository.getPaginated(query);
  }

  async getActive() {
    return StaffRepository.getActive();
  }

  async getById(id: string) {
    const staff = await StaffRepository.findById(id);

    if (!staff) {
      throw new ApiError(
        404,
        "Staff member not found."
      );
    }

    return staff;
  }

  async getTrash() {
    return StaffRepository.getTrash();
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(
    id: string,
    payload: Partial<StaffPayload>
  ) {
    const staff = await StaffRepository.update(
      id,
      payload
    );

    if (!staff) {
      throw new ApiError(
        404,
        "Staff member not found."
      );
    }

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.UPDATE,
      resourceId: staff._id.toString(),
      resourceName: staff.name,
    });

    return staff;
  }

  /*
  |--------------------------------------------------------------------------
  | Trash
  |--------------------------------------------------------------------------
  */

  async trash(
    id: string,
    adminId?: string
  ) {
    const staff = await StaffRepository.findById(id);

    if (!staff) {
      throw new ApiError(
        404,
        "Staff member not found."
      );
    }

    if (staff.isDeleted) {
      throw new ApiError(
        400,
        "Staff member already in trash."
      );
    }

    const trashed = await StaffRepository.softDelete(
      id,
      adminId
    );

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.TRASH,
      resourceId: staff._id.toString(),
      resourceName: staff.name,
    });

    return trashed;
  }

  /*
  |--------------------------------------------------------------------------
  | Restore
  |--------------------------------------------------------------------------
  */

  async restore(id: string) {
    const staff = await StaffRepository.findById(id);

    if (!staff) {
      throw new ApiError(
        404,
        "Staff member not found."
      );
    }

    if (!staff.isDeleted) {
      throw new ApiError(
        400,
        "Staff member is already active."
      );
    }

    const restored = await StaffRepository.restore(id);

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.RESTORE,
      resourceId: staff._id.toString(),
      resourceName: staff.name,
    });

    return restored;
  }

  /*
  |--------------------------------------------------------------------------
  | Force Delete
  |--------------------------------------------------------------------------
  */

  async forceDelete(id: string) {
    const staff = await StaffRepository.findById(id);

    if (!staff) {
      throw new ApiError(
        404,
        "Staff member not found."
      );
    }

    await CloudinaryService.delete(
      staff.photo.publicId
    );

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.DELETE,
      resourceId: staff._id.toString(),
      resourceName: staff.name,
      metadata: {
        permanent: true,
      },
    });

    return StaffRepository.forceDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Reorder
  |--------------------------------------------------------------------------
  */

  async reorder(
    payload: ReorderStaffPayload
  ) {
    const result = await StaffRepository.reorder(
      payload.staff
    );

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.REORDER,
      metadata: {
        count: payload.staff.length,
      },
    });

    return result;
  }

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  async bulkTrash(
    payload: BulkStaffPayload
  ) {
    await StaffRepository.bulkTrash(payload.ids);

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkRestore(
    payload: BulkStaffPayload
  ) {
    await StaffRepository.bulkRestore(payload.ids);

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.BULK_RESTORE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkForceDelete(
    payload: BulkStaffPayload
  ) {
    await StaffRepository.bulkForceDelete(payload.ids);

    await AuditService.log({
      module: AuditModule.STAFF,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
        permanent: true,
      },
    });
  }
}

export default new StaffService();