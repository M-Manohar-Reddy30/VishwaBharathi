import ApiError from "../../shared/errors/ApiError.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

import NoticeRepository from "./notice.repository.js";

import { NoticePayload } from "./notice.types.js";
import { BulkNoticePayload } from "./notice.bulk.validation.js";
import { ReorderNoticePayload } from "./notice.reorder.validation.js";

class NoticeService {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(payload: NoticePayload) {
    const exists =
      await NoticeRepository.existsByDisplayOrder(
        payload.displayOrder
      );

    if (exists) {
      throw new ApiError(
        409,
        "Display order already exists."
      );
    }

    const notice =
      await NoticeRepository.create(payload);

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.CREATE,
      resourceId: notice._id.toString(),
      resourceName: notice.title,
      metadata: {
        publishDate: notice.publishDate,
      },
    });

    return notice;
  }

  /*
  |--------------------------------------------------------------------------
  | Read
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return NoticeRepository.getPaginated(query);
  }

  async getActive() {
    return NoticeRepository.getActive();
  }

  async getById(id: string) {
    const notice =
      await NoticeRepository.findById(id);

    if (!notice) {
      throw new ApiError(
        404,
        "Notice not found."
      );
    }

    return notice;
  }

  async getTrash() {
    return NoticeRepository.getTrash();
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(
    id: string,
    payload: Partial<NoticePayload>
  ) {
    const notice =
      await NoticeRepository.update(
        id,
        payload
      );

    if (!notice) {
      throw new ApiError(
        404,
        "Notice not found."
      );
    }

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.UPDATE,
      resourceId: notice._id.toString(),
      resourceName: notice.title,
    });

    return notice;
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
    const notice =
      await NoticeRepository.findById(id);

    if (!notice) {
      throw new ApiError(
        404,
        "Notice not found."
      );
    }

    if (notice.isDeleted) {
      throw new ApiError(
        400,
        "Notice already in trash."
      );
    }

    const trashed =
      await NoticeRepository.softDelete(
        id,
        adminId
      );

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.TRASH,
      resourceId: notice._id.toString(),
      resourceName: notice.title,
    });

    return trashed;
  }

  /*
  |--------------------------------------------------------------------------
  | Restore
  |--------------------------------------------------------------------------
  */

  async restore(id: string) {
    const notice =
      await NoticeRepository.findById(id);

    if (!notice) {
      throw new ApiError(
        404,
        "Notice not found."
      );
    }

    if (!notice.isDeleted) {
      throw new ApiError(
        400,
        "Notice is already active."
      );
    }

    const restored =
      await NoticeRepository.restore(id);

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.RESTORE,
      resourceId: notice._id.toString(),
      resourceName: notice.title,
    });

    return restored;
  }

  /*
  |--------------------------------------------------------------------------
  | Force Delete
  |--------------------------------------------------------------------------
  */

  async forceDelete(id: string) {
    const notice =
      await NoticeRepository.findById(id);

    if (!notice) {
      throw new ApiError(
        404,
        "Notice not found."
      );
    }

    // Delete PDF
    await CloudinaryService.delete(
      notice.pdf.publicId
    );

    // Delete cover image if exists
    if (notice.coverImage?.publicId) {
      await CloudinaryService.delete(
        notice.coverImage.publicId
      );
    }

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.DELETE,
      resourceId: notice._id.toString(),
      resourceName: notice.title,
      metadata: {
        permanent: true,
      },
    });

    return NoticeRepository.forceDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Reorder
  |--------------------------------------------------------------------------
  */

  async reorder(
    payload: ReorderNoticePayload
  ) {
    const result =
      await NoticeRepository.reorder(
        payload.notices
      );

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.REORDER,
      metadata: {
        count: payload.notices.length,
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
    payload: BulkNoticePayload
  ) {
    await NoticeRepository.bulkTrash(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkRestore(
    payload: BulkNoticePayload
  ) {
    await NoticeRepository.bulkRestore(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.BULK_RESTORE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkForceDelete(
    payload: BulkNoticePayload
  ) {
    /*
    |--------------------------------------------------------------------------
    | Future Improvement
    |--------------------------------------------------------------------------
    | Delete Cloudinary files for all notices before
    | deleting database records.
    */

    await NoticeRepository.bulkForceDelete(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.NOTICE,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
        permanent: true,
      },
    });
  }
}

export default new NoticeService();