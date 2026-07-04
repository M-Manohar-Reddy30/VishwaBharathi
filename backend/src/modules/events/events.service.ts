import ApiError from "../../shared/errors/ApiError.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

import EventRepository from "./events.repository.js";

import type { EventPayload } from "./events.types.js";
import { EVENT_STATUS } from "./events.constants.js";
import { BulkEventPayload } from "./events.bulk.validation.js";
import { ReorderEventPayload } from "./events.reorder.validation.js";

class EventService {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(payload: EventPayload) {
    const exists =
      await EventRepository.existsByDisplayOrder(
        payload.displayOrder
      );

    if (exists) {
      throw new ApiError(
        409,
        "Display order already exists."
      );
    }

    const event =
      await EventRepository.create(payload);

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.CREATE,
      resourceId: event._id.toString(),
      resourceName: event.title,
      metadata: {
        category: event.category,
      },
    });

    return event;
  }

  /*
  |--------------------------------------------------------------------------
  | Read
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return EventRepository.getPaginated(query);
  }

  async getPublished() {
    return EventRepository.getPublished();
  }

  async getById(id: string) {
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    return event;
  }

  async getTrash() {
    return EventRepository.getTrash();
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(
    id: string,
    payload: Partial<EventPayload>
  ) {
    const event =
      await EventRepository.update(
        id,
        payload
      );

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.UPDATE,
      resourceId: event._id.toString(),
      resourceName: event.title,
    });

    return event;
  }

  /*
  |--------------------------------------------------------------------------
  | Publish
  |--------------------------------------------------------------------------
  */

  async publish(id: string) {
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    if (event.status === EVENT_STATUS.PUBLISHED) {
      throw new ApiError(
        400,
        "Event already published."
      );
    }

    const published =
      await EventRepository.publish(id);

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.PUBLISH,
      resourceId: event._id.toString(),
      resourceName: event.title,
    });

    return published;
  }

  /*
  |--------------------------------------------------------------------------
  | Archive
  |--------------------------------------------------------------------------
  */

  async archive(id: string) {
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    if (event.status === EVENT_STATUS.ARCHIVED) {
      throw new ApiError(
        400,
        "Event already archived."
      );
    }

    const archived =
      await EventRepository.archive(id);

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.ARCHIVE,
      resourceId: event._id.toString(),
      resourceName: event.title,
    });

    return archived;
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
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    if (event.isDeleted) {
      throw new ApiError(
        400,
        "Event already in trash."
      );
    }

    const trashed =
      await EventRepository.softDelete(
        id,
        adminId
      );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.TRASH,
      resourceId: event._id.toString(),
      resourceName: event.title,
    });

    return trashed;
  }

  /*
  |--------------------------------------------------------------------------
  | Restore
  |--------------------------------------------------------------------------
  */

  async restore(id: string) {
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    if (!event.isDeleted) {
      throw new ApiError(
        400,
        "Event is already active."
      );
    }

    const restored =
      await EventRepository.restore(id);

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.RESTORE,
      resourceId: event._id.toString(),
      resourceName: event.title,
    });

    return restored;
  }

  /*
  |--------------------------------------------------------------------------
  | Force Delete
  |--------------------------------------------------------------------------
  */

  async forceDelete(id: string) {
    const event =
      await EventRepository.findById(id);

    if (!event) {
      throw new ApiError(
        404,
        "Event not found."
      );
    }

    await CloudinaryService.delete(
      event.bannerImage.publicId
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.DELETE,
      resourceId: event._id.toString(),
      resourceName: event.title,
      metadata: {
        permanent: true,
      },
    });

    return EventRepository.forceDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Reorder
  |--------------------------------------------------------------------------
  */

  async reorder(
    payload: ReorderEventPayload
  ) {
    const result =
      await EventRepository.reorder(
        payload.events
      );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.REORDER,
      metadata: {
        count: payload.events.length,
      },
    });

    return result;
  }

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  async bulkPublish(
    payload: BulkEventPayload
  ) {
    await EventRepository.bulkPublish(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.BULK_PUBLISH,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkArchive(
    payload: BulkEventPayload
  ) {
    await EventRepository.bulkArchive(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.BULK_ARCHIVE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkTrash(
    payload: BulkEventPayload
  ) {
    await EventRepository.bulkTrash(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkRestore(
    payload: BulkEventPayload
  ) {
    await EventRepository.bulkRestore(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.BULK_RESTORE,
      metadata: {
        count: payload.ids.length,
      },
    });
  }

  async bulkForceDelete(
    payload: BulkEventPayload
  ) {
    await EventRepository.bulkForceDelete(
      payload.ids
    );

    await AuditService.log({
      module: AuditModule.EVENT,
      action: AuditAction.BULK_DELETE,
      metadata: {
        count: payload.ids.length,
        permanent: true,
      },
    });
  }
}

export default new EventService();