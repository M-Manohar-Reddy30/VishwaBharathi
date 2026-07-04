import ApiError from "../../shared/errors/ApiError.js";

import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";
import { PaginationQuery } from "../../shared/types/pagination.types.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

import GalleryRepository from "./gallery.repository.js";
import { GalleryPayload } from "./gallery.validation.js";
import { BulkGalleryPayload } from "./gallery.bulk.validation.js";

class GalleryService {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(payload: GalleryPayload) {
    const exists = await GalleryRepository.existsByDisplayOrder(
      payload.displayOrder
    );

    if (exists) {
      throw new ApiError(
        409,
        "Display order already exists."
      );
    }

    const gallery = await GalleryRepository.create(payload);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.CREATE,
      resourceId: gallery._id.toString(),
      resourceName: gallery.title,
      metadata: {
        category: gallery.category,
      },
    });

    return gallery;
  }

  /*
  |--------------------------------------------------------------------------
  | Read
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return GalleryRepository.getPaginated(query);
  }

  async getById(id: string) {
    const gallery = await GalleryRepository.findById(id);

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    return gallery;
  }

  async getTrash() {
    return GalleryRepository.getTrash();
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(
    id: string,
    payload: Partial<GalleryPayload>
  ) {
    const gallery = await GalleryRepository.update(
      id,
      payload
    );

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.UPDATE,
      resourceId: gallery._id.toString(),
      resourceName: gallery.title,
    });

    return gallery;
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
    const gallery = await GalleryRepository.findById(id);

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    if (gallery.isDeleted) {
      throw new ApiError(
        400,
        "Gallery image is already in trash."
      );
    }

    const trashed = await GalleryRepository.softDelete(
      id,
      adminId
    );

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.TRASH,
      resourceId: gallery._id.toString(),
      resourceName: gallery.title,
    });

    return trashed;
  }

  /*
  |--------------------------------------------------------------------------
  | Restore
  |--------------------------------------------------------------------------
  */

  async restore(id: string) {
    const gallery = await GalleryRepository.findById(id);

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    if (!gallery.isDeleted) {
      throw new ApiError(
        400,
        "Gallery image is already active."
      );
    }

    const restored = await GalleryRepository.restore(id);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.RESTORE,
      resourceId: gallery._id.toString(),
      resourceName: gallery.title,
    });

    return restored;
  }

  /*
  |--------------------------------------------------------------------------
  | Permanent Delete
  |--------------------------------------------------------------------------
  */

  async forceDelete(id: string) {
    const gallery = await GalleryRepository.findById(id);

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    await CloudinaryService.delete(
      gallery.image.publicId
    );

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.DELETE,
      resourceId: gallery._id.toString(),
      resourceName: gallery.title,
      metadata: {
        permanent: true,
      },
    });

    return GalleryRepository.forceDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Reorder
  |--------------------------------------------------------------------------
  */

  async reorder(
    images: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    const result = await GalleryRepository.reorder(images);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.REORDER,
      metadata: {
        count: images.length,
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
    payload: BulkGalleryPayload
  ) {
    await GalleryRepository.bulkTrash(payload.ids);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkRestore(
    payload: BulkGalleryPayload
  ) {
    await GalleryRepository.bulkRestore(payload.ids);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.BULK_RESTORE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkForceDelete(
    payload: BulkGalleryPayload
  ) {
    await GalleryRepository.bulkForceDelete(payload.ids);

    await AuditService.log({
      module: AuditModule.GALLERY,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
        permanent: true,
      },
    });
  }
}

export default new GalleryService();